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
const transporter = nodemailer.createTransporter({
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
          phone: userData.phone || '',
          message: userData.message || '',
          unterlagen: userData.unterlagen || '',
          category: userData.category || '',
          subcategory: userData.subcategory || ''
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

async function uploadBase64File(base64Data, folder) {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: folder,
      resource_type: 'auto'
    })
    
    return {
      url: result.secure_url,
      publicId: result.public_id
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

async function processAndSaveFiles(files, schadenMeldungId) {
  const attachments = []

  for (const file of files ?? []) {
    const pdfBuffer = await convertToPdfBuffer(file)
    const pdfBase64 = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`

    const cloudinaryUpload = await uploadBase64File(pdfBase64, 'schaden_files')

    await prisma.file.create({
      data: {
        name: `${file.name}.pdf`,
        originalName: file.name,
        mimeType: 'application/pdf',
        size: pdfBuffer.length,
        cloudinaryUrl: cloudinaryUpload.url,
        cloudinaryPublicId: cloudinaryUpload.publicId,
        schadenMeldungId,
      },
    })

    attachments.push({
      filename: `${file.name}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    })
  }

  return attachments
}

// Rate limiting
const requestCounts = new Map()

function rateLimitMiddleware(req) {
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3 // Lower limit for damage reports

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
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  // Rate limiting
  if (!rateLimitMiddleware(req)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later'
    })
  }

  try {
    console.log('🔄 Processing schadenmeldung request...')

    // Sanitize input data
    const sanitizedData = sanitizeObject(req.body)
    const { name, email, telefon, wiePassiert, woPassiert, wannPassiert, uploadedFiles } = sanitizedData

    console.log('✅ Data sanitized successfully')

    // Validate required fields
    const validationResult = validateFormData(sanitizedData, {
      name: { required: true, minLength: 2, maxLength: 100 },
      email: { required: true, email: true, maxLength: 255 },
      telefon: { maxLength: 20 },
      wiePassiert: { required: true, minLength: 10, maxLength: 2000 },
      woPassiert: { required: true, minLength: 5, maxLength: 500 },
      wannPassiert: { required: true }
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
      phone: telefon || '',
      message: '',
      unterlagen: '',
      category: 'schadenmeldung',
      subcategory: '',
      id: ''
    })
    console.log('✅ User found/created:', user.id)

    // Create SchadenMeldung record
    console.log('🔄 Creating SchadenMeldung record...')
    const schadenmeldung = await prisma.schadenMeldung.create({
      data: {
        userId: user.id,
        name,
        email,
        telefon: telefon || '',
        wiePassiert,
        woPassiert,
        wannPassiert: new Date(wannPassiert)
      }
    })
    console.log('✅ SchadenMeldung created:', schadenmeldung.id)

    // Process and save files if any
    let attachments = []
    if (uploadedFiles && Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
      try {
        // Convert uploadedFiles format to match processAndSaveFiles expectation
        const filesForProcessing = uploadedFiles.map(file => ({
          name: file.name,
          base64: file.base64,
          mimeType: file.mimeType
        }))
        
        attachments = await processAndSaveFiles(filesForProcessing, schadenmeldung.id)
      } catch (fileError) {
        console.error('Error processing files:', fileError)
        // Continue without files rather than failing the entire request
      }
    }

    // Send email notification to berater (with attachments)
    console.log('🔄 Sending email notification to berater...')
    
    const beraterEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Neue Schadenmeldung eingegangen</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Kontaktdaten</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${telefon || 'Nicht angegeben'}</p>
        </div>

        <div style="background: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h3 style="margin-top: 0; color: #856404;">Schadendetails</h3>
          <p><strong>Wann ist der Schaden passiert:</strong><br>${new Date(wannPassiert).toLocaleString('de-DE')}</p>
          <p><strong>Wo ist der Schaden passiert:</strong><br>${woPassiert}</p>
          <p><strong>Wie ist der Schaden passiert:</strong><br>${wiePassiert.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Diese E-Mail wurde automatisch über die Website generiert.</p>
          <p><strong>Wichtig:</strong> Bitte kontaktieren Sie den Kunden zeitnah für die weitere Bearbeitung des Schadens.</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SCHADEN_RECIPIENT_EMAIL,
      subject: `Neue Schadenmeldung von ${name}`,
      html: beraterEmailHtml,
      attachments: attachments
    })
    console.log('✅ Berater email sent successfully')

    // Send confirmation email to client (without attachments)
    console.log('🔄 Sending confirmation email to client...')
    
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AC082;">Vielen Dank für Ihre Schadenmeldung!</h2>
        
        <p>Liebe/r ${name},</p>
        
        <p>vielen Dank für Ihre Schadenmeldung. Wir haben Ihre Meldung erhalten und werden uns schnellstmöglich bei Ihnen melden, um den Schaden zu bearbeiten.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Ihre Schadenmeldung im Überblick</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${telefon || 'Nicht angegeben'}</p>
          <p><strong>Schadensdatum:</strong> ${new Date(wannPassiert).toLocaleString('de-DE')}</p>
          <p><strong>Schadensort:</strong> ${woPassiert}</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #bee5eb;">
          <p style="margin: 0;"><strong>Nächste Schritte:</strong></p>
          <ul style="margin: 10px 0;">
            <li>Wir prüfen Ihre Schadenmeldung</li>
            <li>Ein Sachverständiger wird sich bei Ihnen melden</li>
            <li>Gemeinsam klären wir das weitere Vorgehen</li>
          </ul>
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
      subject: 'Bestätigung Ihrer Schadenmeldung - Filip Bonat',
      html: clientEmailHtml
    })
    console.log('✅ Client confirmation email sent successfully')

    console.log('🎉 Schadenmeldung processed successfully - both emails sent')
    res.json({
      success: true,
      message: 'Schadenmeldung erfolgreich eingereicht',
      data: {
        id: schadenmeldung.id,
        createdAt: schadenmeldung.createdAt
      }
    })

  } catch (error) {
    console.error('❌ Error in /api/schadenmeldung:', error)

    // Don't expose internal error details to client
    res.status(500).json({
      success: false,
      message: 'Server error while processing request'
    })
  } finally {
    await prisma.$disconnect()
  }
}
