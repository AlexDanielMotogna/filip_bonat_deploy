import nodemailer from 'nodemailer'

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

  console.log('🌐 KreditAnfrage API called')
  console.log('📦 Request body:', req.body)

  try {
    const data = req.body

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.kreditDetails) {
      console.error('❌ Missing required fields')
      return res.status(400).json({
        success: false,
        message: 'Alle Pflichtfelder müssen ausgefüllt werden'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      console.error('❌ Invalid email format')
      return res.status(400).json({
        success: false,
        message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      })
    }

    // Format currency for email
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('de-AT', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    }

    // Generate email template for berater
    const beraterEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AC082;">Neue Kreditanfrage eingegangen</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Kontaktdaten</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
        </div>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4AC082;">
          <h3 style="margin-top: 0; color: #4AC082;">Kreditdetails</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Kreditbetrag:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">${formatCurrency(data.kreditDetails.kreditbetrag)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Laufzeit:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">${data.kreditDetails.laufzeit} Monate</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Zinssatz:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">${data.kreditDetails.zinssatz.toFixed(2)}%</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Kreditkosten:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">${data.kreditDetails.kreditkosten.toFixed(2)}%</td>
            </tr>
            <tr style="background: #f0f8f0;">
              <td style="padding: 12px 0; font-size: 16px;"><strong>Monatliche Rate:</strong></td>
              <td style="padding: 12px 0; text-align: right; font-size: 16px; color: #4AC082;"><strong>${formatCurrency(data.kreditDetails.monatlicheRate)}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Gesamtrückzahlung:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-align: right;">${formatCurrency(data.kreditDetails.gesamtrueckzahlung)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Davon Zinsen:</strong></td>
              <td style="padding: 8px 0; text-align: right;">${formatCurrency(data.kreditDetails.zinsen)}</td>
            </tr>
          </table>
        </div>

        ${data.message ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Nachricht</h3>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Diese E-Mail wurde automatisch über den Kreditrechner der Website generiert.</p>
          <p><strong>Wichtig:</strong> Bitte kontaktieren Sie den Kunden zeitnah für die weitere Bearbeitung.</p>
        </div>
      </div>
    `

    // Send email to berater
    console.log('📧 Sending KreditAnfrage email to berater...')
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Neue Kreditanfrage von ${data.name}`,
      html: beraterEmailHtml
    })
    console.log('✅ Berater email sent successfully')

    // Send confirmation email to client
    console.log('📧 Sending confirmation email to client...')
    
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AC082;">Vielen Dank für Ihre Kreditanfrage!</h2>
        
        <p>Liebe/r ${data.name},</p>
        
        <p>vielen Dank für Ihre Kreditanfrage. Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden, um Ihnen ein individuelles Angebot zu unterbreiten.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Ihre Kreditanfrage im Überblick</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <p><strong>Gewünschter Kreditbetrag:</strong> ${formatCurrency(data.kreditDetails.kreditbetrag)}</p>
          <p><strong>Laufzeit:</strong> ${data.kreditDetails.laufzeit} Monate</p>
          <p><strong>Berechnete monatliche Rate:</strong> ${formatCurrency(data.kreditDetails.monatlicheRate)}</p>
        </div>
        
        <div style="background: #d1ecf1; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #bee5eb;">
          <p style="margin: 0;"><strong>Nächste Schritte:</strong></p>
          <ul style="margin: 10px 0;">
            <li>Wir prüfen Ihre Kreditanfrage</li>
            <li>Ein Berater wird sich bei Ihnen melden</li>
            <li>Gemeinsam erstellen wir Ihr individuelles Angebot</li>
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
      to: data.email,
      subject: 'Bestätigung Ihrer Kreditanfrage - Filip Bonat',
      html: clientEmailHtml
    })
    console.log('✅ Client confirmation email sent successfully')

    console.log('🎉 Both KreditAnfrage emails sent successfully')

    res.json({
      success: true,
      message: 'Ihre Kreditanfrage wurde erfolgreich gesendet. Wir werden uns zeitnah bei Ihnen melden.'
    })

  } catch (error) {
    console.error('❌ Error processing KreditAnfrage:', error)

    res.status(500).json({
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
    })
  }
}
