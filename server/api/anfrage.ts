import { Router } from 'express'
import { emailService } from '../services/EmailService'
import { validateFormData, sanitizeObject } from '../utils/validation'
import { processAndSaveFiles } from '../utils/fileUtils'
import { prisma } from '../prisma'
import { findOrCreateUser } from '../utils/userDeduplication'

const router = Router()

// Simple rate limiting implementation
const requestCounts = new Map<string, { count: number; resetTime: number }>()

const rateLimitMiddleware = (req: any, res: any, next: any) => {
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Reasonable limit for anfrage

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
    console.log('🔄 Processing anfrage request...')

    // Sanitize input data
    const sanitizedData = sanitizeObject(req.body)
    const { name, email, phone, message, unterlagen, category, subcategory, houseLink, uploadedFiles } = sanitizedData

    console.log('✅ Data sanitized successfully')

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

    console.log('✅ Validation passed')

    // Find or create user
    console.log('🔄 Finding or creating user...')
    const user = await findOrCreateUser({
      name,
      email,
      phone: phone || '',
      message: message || '',
      unterlagen: unterlagen || '',
      category: category || '',
      subcategory: subcategory || '',
      id: ''
    })
    console.log('✅ User found/created:', user.id)

    // Create AnfrageSubmission record
    console.log('🔄 Creating AnfrageSubmission record...')
    const anfrageSubmission = await prisma.anfrageSubmission.create({
      data: {
        userId: user.id,
        name,
        email,
        phone: phone || '',
        message: message || '',
        unterlagen: unterlagen || '',
        category: category || '',
        subcategory: subcategory || '',
        houseLink: houseLink || null
      }
    })
    console.log('✅ AnfrageSubmission created:', anfrageSubmission.id)

    // Process and save files if any
    let attachments: Array<{ filename: string; content: Buffer; contentType: string }> = []
    if (uploadedFiles && Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
      try {
        attachments = await processAndSaveFiles(uploadedFiles, anfrageSubmission.id)
      } catch (fileError) {
        console.error('Error processing files:', fileError)
        // Continue without files rather than failing the entire request
      }
    }

    // Send email notification to berater (with attachments)
    console.log('🔄 Sending email notification to berater...')
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
    console.log('✅ Berater email sent successfully')

    // Send confirmation email to client (without attachments)
    console.log('🔄 Sending confirmation email to client...')
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
    console.log('✅ Client confirmation email sent successfully')

    console.log('🎉 Anfrage processed successfully - both emails sent and data saved to database')
    res.json({
      success: true,
      message: 'Anfrage erfolgreich gesendet',
      data: {
        id: anfrageSubmission.id,
        createdAt: anfrageSubmission.createdAt
      }
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
