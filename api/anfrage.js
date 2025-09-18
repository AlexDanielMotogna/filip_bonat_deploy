import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import { v2 as cloudinary } from 'cloudinary'
import { PDFDocument } from 'pdf-lib'

// Initialize Prisma
const prisma = new PrismaClient()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Utility functions
function sanitizeObject(obj) {
  const sanitized = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = value.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}

function validateFormData(data, rules) {
  const errors = []
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field]
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors.push(`${field} is required`)
      continue
    }
    
    if (value && rule.minLength && value.toString().length < rule.minLength) {
      errors.push(`${field} must be at least ${rule.minLength} characters`)
    }
    
    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      errors.push(`${field} must be no more than ${rule.maxLength} characters`)
    }
    
    if (value && rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push(`${field} must be a valid email`)
    }
    
    if (value && rule.phone && !/^[\+]?[0-9\s\-\(\)]{7,20}$/.test(value)) {
      errors.push(`${field} must be a valid phone number`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

async function findOrCreateUser(userData) {
  try {
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { 
            AND: [
              { name: userData.name },
              { phone: userData.phone }
            ]
          }
        ]
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone || ''
        }
      })
    }

    return user
  } catch (error) {
    console.error('Error in findOrCreateUser:', error)
    throw error
  }
}

async function convertToPdfBuffer(file) {
  if (file.mimeType === 'application/pdf') {
    return Buffer.from(file.base64.split(',')[1], 'base64')
  }

  if (file.mimeType.startsWith('image/')) {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const imgBytes = Buffer.from(file.base64.split(',')[1], 'base64')

    let img
    if (file.mimeType === 'image/jpeg') img = await pdfDoc.embedJpg(imgBytes)
    else if (file.mimeType === 'image/png') img = await pdfDoc.embedPng(imgBytes)
    else throw new Error(`Unsupported image type: ${file.mimeType}`)

    page.drawImage(img, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    })

    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes)
  }

  throw new Error(`Unsupported file type: ${file.mimeType}`)
}

async function convertFileToPdf(file) {
  const pdfBuffer = await convertToPdfBuffer(file)
  
  return {
    filename: `${file.name}.pdf`,
    content: pdfBuffer,
    contentType: 'application/pdf'
  }
}

// Rate limiting
const requestCounts = new Map()

function rateLimitMiddleware(req) {
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100 // TEMPORARILY INCREASED FOR TESTING

  const clientData = requestCounts.get(clientIP)

  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + windowMs })
    return true
  } else if (clientData.count < maxRequests) {
    clientData.count++
    return true
  } else {
    return false
  }
}

export default async function handler(req, res) {
  // ✅ CORS
  const allowedOrigins = [
    'https://filip-bonat-deploy.vercel.app',
    // opcional: previews
    'https://filip-bonat-deploy-*.vercel.app'
  ]

  const origin = req.headers.origin
  if (allowedOrigins.includes(origin) || origin?.includes('vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    console.log('🔄 Processing anfrage request...')

    // Sanitize input data
    const sanitizedData = sanitizeObject(req.body)
    const { name, email, phone, message, unterlagen, uploadedFiles, category, subcategory, houseLink } = sanitizedData

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

    // Find or create user FIRST (like in schadenmeldung)
    console.log('🔄 Finding or creating user...')
    console.log('📋 User data:', { name, email, phone: phone || '' })
    const user = await findOrCreateUser({
      name,
      email,
      phone: phone || ''
    })
    console.log('✅ User found/created:', user.id)
    console.log('👤 User details:', { id: user.id, name: user.name, email: user.email })

    // Create anfrage submission BEFORE emails (like in schadenmeldung)
    console.log('🔄 Creating AnfrageSubmission record...')
    console.log('📋 AnfrageSubmission data:', {
      name,
      email,
      phone: phone || '',
      message: message || '',
      unterlagen: unterlagen || '',
      category: category || '',
      subcategory: subcategory || '',
      houseLink: houseLink || '',
      userId: user.id
    })
    
    const anfrageSubmission = await prisma.anfrageSubmission.create({
      data: {
        name,
        email,
        phone: phone || '',
        message: message || '',
        unterlagen: unterlagen || '',
        category: category || '',
        subcategory: subcategory || '',
        houseLink: houseLink || '',
        userId: user.id
      }
    })
    console.log('✅ AnfrageSubmission created successfully!')
    console.log('📄 AnfrageSubmission details:', {
      id: anfrageSubmission.id,
      name: anfrageSubmission.name,
      email: anfrageSubmission.email,
      category: anfrageSubmission.category,
      subcategory: anfrageSubmission.subcategory,
      userId: anfrageSubmission.userId,
      createdAt: anfrageSubmission.createdAt
    })

    // Process attachments if any
    let attachments = []
    if (uploadedFiles && Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
      try {
        attachments = await Promise.all(
          uploadedFiles.map(async (file) => {
            if (!file.base64 || !file.name) {
              throw new Error('Invalid file data')
            }

            // Detect MIME type
            function detectMimeType(fileName, mimeType, base64) {
              if (mimeType && mimeType !== 'application/octet-stream' && mimeType !== '') {
                return mimeType
              }

              const base64Header = base64.split(',')[0].toLowerCase()
              if (base64Header.includes('application/pdf')) return 'application/pdf'
              if (base64Header.includes('image/jpeg') || base64Header.includes('image/jpg')) return 'image/jpeg'
              if (base64Header.includes('image/png')) return 'image/png'
              if (base64Header.includes('image/gif')) return 'image/gif'
              if (base64Header.includes('image/webp')) return 'image/webp'

              const extension = fileName.toLowerCase().split('.').pop()
              switch (extension) {
                case 'pdf': return 'application/pdf'
                case 'jpg':
                case 'jpeg': return 'image/jpeg'
                case 'png': return 'image/png'
                case 'gif': return 'image/gif'
                case 'webp': return 'image/webp'
                default: return 'application/pdf'
              }
            }

            const buffer = Buffer.from(file.base64.split(',')[1], 'base64')
            const detectedMimeType = detectMimeType(file.name, file.mimeType, file.base64)

            let filename = file.name
            if (detectedMimeType === 'application/pdf' && !filename.toLowerCase().endsWith('.pdf')) {
              filename = `${filename}.pdf`
            } else if (detectedMimeType.startsWith('image/') && !filename.includes('.')) {
              const extension = detectedMimeType.split('/')[1]
              filename = `${filename}.${extension}`
            }

            console.log(`🔧 Anfrage file processed: ${file.name} as ${detectedMimeType}`)

            // Convert images to PDF automatically using the working function
            let finalAttachment
            
            if (detectedMimeType.startsWith('image/') || detectedMimeType === 'application/pdf') {
              const fileForConversion = {
                name: filename,
                base64: file.base64,
                mimeType: detectedMimeType
              }
              
              finalAttachment = await convertFileToPdf(fileForConversion)
              console.log(`📄 File converted to PDF: ${finalAttachment.filename}`)
            } else {
              finalAttachment = {
                filename: filename,
                content: buffer,
                contentType: detectedMimeType
              }
            }

            // Save file to database
            await prisma.file.create({
              data: {
                name: finalAttachment.filename,
                originalName: file.name,
                mimeType: finalAttachment.contentType,
                size: finalAttachment.content.length,
                anfrageId: anfrageSubmission.id
              }
            })

            return {
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
          })
        )
        console.log('✅ Files processed and saved to database:', attachments.length)
      } catch (fileError) {
        console.error('Error processing files:', fileError)
        return res.status(400).json({
          success: false,
          message: 'Error processing uploaded files'
        })
      }
    }

    // Send email notification to berater (with attachments)
    const beraterEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AC082;">Neue Anfrage eingegangen</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Kontaktdaten</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          ${category ? `<p><strong>Kategorie:</strong> ${category}</p>` : ''}
          ${subcategory ? `<p><strong>Unterkategorie:</strong> ${subcategory}</p>` : ''}
          ${houseLink ? `<p><strong>Immobilien-Link:</strong> <a href="${houseLink}">${houseLink}</a></p>` : ''}
        </div>

        ${message ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Nachricht</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}

        ${unterlagen ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Benötigte Unterlagen</h3>
          <p>${unterlagen}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Diese E-Mail wurde automatisch über die Website generiert.</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ANFRAGE_RECIPIENT_EMAIL,
      subject: `Neue Anfrage von ${name}`,
      html: beraterEmailHtml,
      attachments: attachments
    })

    console.log('✅ Berater email sent successfully')

    // Send confirmation email to client (without attachments)
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AC082;">Vielen Dank für Ihre Anfrage!</h2>
        
        <p>Liebe/r ${name},</p>
        
        <p>vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Ihre Anfrage im Überblick</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          ${category ? `<p><strong>Kategorie:</strong> ${category}</p>` : ''}
          ${subcategory ? `<p><strong>Unterkategorie:</strong> ${subcategory}</p>` : ''}
        </div>
        
        <p>Mit freundlichen Grüßen<br>
        Ihr Filip Bonat Team</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Bestätigung Ihrer Anfrage - Filip Bonat',
      html: clientEmailHtml
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

    res.status(500).json({
      success: false,
      message: 'Server error while processing request'
    })
  } finally {
    await prisma.$disconnect()
  }
}
