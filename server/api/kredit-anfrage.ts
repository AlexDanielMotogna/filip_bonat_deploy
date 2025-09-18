import { Request, Response } from 'express'
import { emailService } from '../services/EmailService'
import { envConfig } from '../config/env'

interface KreditAnfrageData {
  name: string
  email: string
  phone: string
  message: string
  kreditDetails: {
    kreditbetrag: number
    laufzeit: number
    zinssatz: number
    kreditkosten: number
    monatlicheRate: number
    gesamtrueckzahlung: number
    zinsen: number
  }
}

export const handleKreditAnfrage = async (req: Request, res: Response) => {
  console.log('🌐 KreditAnfrage API called')
  console.log('📦 Request body:', req.body)

  try {
    const data: KreditAnfrageData = req.body

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
    const formatCurrency = (amount: number): string => {
      return new Intl.NumberFormat('de-AT', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    }

    // Generate email template
    const emailTemplate = {
      subject: `Neue Kreditanfrage von ${data.name}`,
      html: `
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
      `,
      text: `
Neue Kreditanfrage eingegangen

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone}

Kreditdetails:
Kreditbetrag: ${formatCurrency(data.kreditDetails.kreditbetrag)}
Laufzeit: ${data.kreditDetails.laufzeit} Monate
Zinssatz: ${data.kreditDetails.zinssatz.toFixed(2)}%
Kreditkosten: ${data.kreditDetails.kreditkosten.toFixed(2)}%
Monatliche Rate: ${formatCurrency(data.kreditDetails.monatlicheRate)}
Gesamtrückzahlung: ${formatCurrency(data.kreditDetails.gesamtrueckzahlung)}
Davon Zinsen: ${formatCurrency(data.kreditDetails.zinsen)}

${data.message ? `Nachricht:\n${data.message}` : ''}
      `
    }

    // Send email to berater
    console.log('📧 Sending KreditAnfrage email to berater...')
    await emailService.sendEmail({
      to: envConfig.ANFRAGE_RECIPIENT_EMAIL,
      template: emailTemplate
    })
    console.log('✅ Berater email sent successfully')

    // Send confirmation email to client
    console.log('📧 Sending confirmation email to client...')
    await emailService.sendKreditAnfrageConfirmation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message || '',
      kreditDetails: {
        kreditbetrag: data.kreditDetails.kreditbetrag,
        laufzeit: data.kreditDetails.laufzeit,
        monatlicheRate: data.kreditDetails.monatlicheRate
      }
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
