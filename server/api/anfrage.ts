import { Router } from 'express'
import { emailService } from '../services/EmailService'
import { validateFormData, sanitizeObject } from '../utils/validation'
import { convertFileToPdf } from '../utils/fileUtils'

const router = Router()

// Simple rate limiting implementation
const requestCounts = new Map<string, { count: number; resetTime: number }>()

const rateLimitMiddleware = (req: any, res: any, next: any) => {
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5

  const clientData = requestCounts.get(clientIP)

  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize counter
    requestCounts.set(clientIP, { count: 1, resetTime: now + windowMs })
    next()
  } else if (clientData.count < maxRequests) {
    // Increment counter
    clientData.count++
    next()
  } else {
    // Rate limit exceeded
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later'
    })
  }
}

router.post('/', rateLimitMiddleware, async (req, res) => {
  try {
    // Sanitize input data
    const sanitizedData = sanitizeObject(req.body)
    const { name, email, phone, message, unterlagen, uploadedFiles, category, subcategory, houseLink } = sanitizedData

    // Validate required fields
    const validationResult = validateFormData(sanitizedData, {
      name: { required: true, minLength: 2, maxLength: 100 },
      email: { required: true, email: true, maxLength: 255 },
      phone: { required: true, phone: true, maxLength: 20 },
      category: { maxLength: 100 },
      subcategory: { maxLength: 100 },
      message: { maxLength: 2000 }
    })

    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.errors
      })
    }

    // Process attachments if any
    let attachments: Array<{ filename: string; content: Buffer; contentType: string }> = []
    if (uploadedFiles && Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
      try {
        // Note: For Anfrage, we don't save to database, just process for email
        attachments = await Promise.all(
          uploadedFiles.map(async (file: any) => {
            if (!file.base64 || !file.name) {
              throw new Error('Invalid file data')
            }

            // Función robusta para detectar MIME type (igual que en Schadenmeldung)
            function detectMimeType(fileName: string, mimeType: string, base64: string): string {
              // 1. Usar MIME type si es válido
              if (mimeType && mimeType !== 'application/octet-stream' && mimeType !== '') {
                return mimeType
              }

              // 2. Detectar desde base64 header
              const base64Header = base64.split(',')[0].toLowerCase()
              if (base64Header.includes('application/pdf')) {
                return 'application/pdf'
              }
              if (base64Header.includes('image/jpeg') || base64Header.includes('image/jpg')) {
                return 'image/jpeg'
              }
              if (base64Header.includes('image/png')) {
                return 'image/png'
              }
              if (base64Header.includes('image/gif')) {
                return 'image/gif'
              }
              if (base64Header.includes('image/webp')) {
                return 'image/webp'
              }

              // 3. Detectar desde extensión de archivo
              const extension = fileName.toLowerCase().split('.').pop()
              switch (extension) {
                case 'pdf':
                  return 'application/pdf'
                case 'jpg':
                case 'jpeg':
                  return 'image/jpeg'
                case 'png':
                  return 'image/png'
                case 'gif':
                  return 'image/gif'
                case 'webp':
                  return 'image/webp'
                case 'doc':
                  return 'application/msword'
                case 'docx':
                  return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                case 'txt':
                  return 'text/plain'
                default:
                  // 4. Fallback seguro - nunca devolver vacío o octet-stream
                  return 'application/pdf' // Asumir PDF si no se puede detectar
              }
            }

            const buffer = Buffer.from(file.base64.split(',')[1], 'base64')
            const detectedMimeType = detectMimeType(file.name, file.mimeType, file.base64)

            // Asegurar que el filename tenga la extensión correcta
            let filename = file.name
            if (detectedMimeType === 'application/pdf' && !filename.toLowerCase().endsWith('.pdf')) {
              filename = `${filename}.pdf`
            } else if (detectedMimeType.startsWith('image/') && !filename.includes('.')) {
              const extension = detectedMimeType.split('/')[1]
              filename = `${filename}.${extension}`
            }

            console.log(`🔧 Anfrage file processed: ${file.name} as ${detectedMimeType}`)

            // 🆕 Convert images to PDF automatically using the working function
            let finalAttachment: { filename: string; content: Buffer; contentType: string }

            if (detectedMimeType.startsWith('image/') || detectedMimeType === 'application/pdf') {
              // Use the same conversion logic as SchadenMeldung
              const fileForConversion = {
                name: filename,
                base64: file.base64,
                mimeType: detectedMimeType
              }

              finalAttachment = await convertFileToPdf(fileForConversion)
              console.log(`📄 File converted to PDF: ${finalAttachment.filename}`)
            } else {
              // For other file types, keep as-is
              finalAttachment = {
                filename: filename,
                content: buffer,
                contentType: detectedMimeType
              }
            }

            // Crear attachment con headers específicos para Outlook
            const attachment: any = {
              filename: finalAttachment.filename,
              content: finalAttachment.content,
              contentType: finalAttachment.contentType,
              disposition: 'attachment',
              encoding: 'base64',
              headers: {
                'Content-Type': finalAttachment.contentType,
                'Content-Disposition': `attachment; filename="${finalAttachment.filename}"`,
                'Content-Transfer-Encoding': 'base64'
              }
            }

            // Para PDFs, agregar headers adicionales que Outlook requiere
            if (finalAttachment.contentType === 'application/pdf') {
              attachment.headers['Content-Description'] = 'PDF Document'
              attachment.headers['X-Attachment-Id'] = finalAttachment.filename.replace(/[^a-zA-Z0-9]/g, '_')
            }

            return attachment
          })
        )
      } catch (fileError) {
        console.error('Error processing files:', fileError)
        return res.status(400).json({
          success: false,
          message: 'Error processing uploaded files'
        })
      }
    }

    // Send email notification to berater (with attachments)
    await emailService.sendAnfrageNotification(
      {
        name,
        email,
        phone: phone || '',
        message: message || '',
        category: category || '',
        subcategory: subcategory || '',
        unterlagen: unterlagen || '',
        houseLink: houseLink || ''
      },
      attachments
    )

    // Send confirmation email to client (without attachments)
    await emailService.sendAnfrageConfirmation({
      name,
      email,
      phone: phone || '',
      message: message || '',
      category: category || '',
      subcategory: subcategory || '',
      unterlagen: unterlagen || '',
      houseLink: houseLink || ''
    })

    console.log('✅ Both emails sent successfully (berater + client confirmation)')

    res.json({
      success: true,
      message: 'Anfrage erfolgreich gesendet'
    })

  } catch (error) {
    console.error('❌ Error in /api/anfrage:', error)

    // Don't expose internal error details to client
    res.status(500).json({
      success: false,
      message: 'Server error while processing request'
    })
  }
})

export default router
