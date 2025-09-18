/**
 * Unified Email Service
 * Handles all email functionality for the application
 */

import { transporter } from '../utils/mailTransport'
import type { UploadedFile } from '../utils/types'

export interface EmailTemplate {
  subject: string
  html: string
  text?: string
}

export interface EmailAttachment {
  filename: string
  content: Buffer
  contentType: string
}

export interface EmailOptions {
  to: string
  from?: string
  template: EmailTemplate
  attachments?: EmailAttachment[]
}

export class EmailService {
  private transporter: any

  constructor() {
    this.transporter = transporter
  }

  /**
   * Get professional from address with name
   */
  private getFromAddress(): string {
    const email = process.env.SMTP_FROM || 'noreply@example.com'
    return `"Filip Bonat Team" <${email}>`
  }

  /**
   * Send email with template
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions = {
      from: options.from || this.getFromAddress(),
      to: options.to,
      subject: options.template.subject,
      html: options.template.html,
      text: options.template.text,
      attachments: options.attachments || []
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log(`Email sent successfully to ${options.to}`)
    } catch (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send email')
    }
  }

  /**
   * Generate Anfrage email template
   */
  generateAnfrageTemplate(data: {
    name: string
    email: string
    phone: string
    message: string
    category: string
    subcategory: string
    unterlagen: string
    houseLink?: string
  }): EmailTemplate {
    const subject = `Neue Anfrage: ${data.category} - ${data.subcategory}`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Neue Anfrage eingegangen</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Kontaktdaten</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Anfrage Details</h3>
          <p><strong>Kategorie:</strong> ${data.category}</p>
          <p><strong>Unterkategorie:</strong> ${data.subcategory}</p>
          <p><strong>Benötigte Unterlagen:</strong> ${data.unterlagen}</p>
          ${data.houseLink ? `<p><strong>Immobilien-Link:</strong> <a href="${data.houseLink}" target="_blank">${data.houseLink}</a></p>` : ''}
        </div>

        ${data.message ? `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Nachricht</h3>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Diese E-Mail wurde automatisch über das Kontaktformular der Website generiert.</p>
        </div>
      </div>
    `

    const text = `
Neue Anfrage eingegangen

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone}

Anfrage Details:
Kategorie: ${data.category}
Unterkategorie: ${data.subcategory}
Benötigte Unterlagen: ${data.unterlagen}

${data.message ? `Nachricht:\n${data.message}` : ''}
    `

    return { subject, html, text }
  }

  /**
   * Generate Schadenmeldung email template
   */
  generateSchadenmeldungTemplate(data: {
    name: string
    email: string
    telefon: string
    wiePassiert: string
    woPassiert: string
    wannPassiert: string
  }): EmailTemplate {
    const subject = `Neue Schadenmeldung von ${data.name}`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Neue Schadenmeldung eingegangen</h2>
        
        <div style="background: #ffebee; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #d32f2f;">
          <h3 style="margin-top: 0; color: #d32f2f;">Kontaktdaten</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.telefon || 'Nicht angegeben'}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Schadendetails</h3>
          <p><strong>Wann ist es passiert:</strong> ${data.wannPassiert}</p>
          <p><strong>Wo ist es passiert:</strong> ${data.woPassiert}</p>
          <p><strong>Wie ist es passiert:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 3px; margin: 10px 0;">
            ${data.wiePassiert.replace(/\n/g, '<br>')}
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Diese E-Mail wurde automatisch über das Schadenmeldungsformular der Website generiert.</p>
          <p><strong>Wichtig:</strong> Bitte bearbeiten Sie diese Schadenmeldung zeitnah.</p>
        </div>
      </div>
    `

    const text = `
Neue Schadenmeldung eingegangen

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.telefon || 'Nicht angegeben'}

Schadendetails:
Wann ist es passiert: ${data.wannPassiert}
Wo ist es passiert: ${data.woPassiert}
Wie ist es passiert:
${data.wiePassiert}
    `

    return { subject, html, text }
  }

  /**
   * Send Anfrage notification
   */
  async sendAnfrageNotification(
    data: {
      name: string
      email: string
      phone: string
      message: string
      category: string
      subcategory: string
      unterlagen: string
      houseLink?: string
    },
    attachments?: EmailAttachment[]
  ): Promise<void> {
    const { envConfig } = await import('../config/env')
    const template = this.generateAnfrageTemplate(data)

    await this.sendEmail({
      to: envConfig.ANFRAGE_RECIPIENT_EMAIL,
      template,
      attachments
    })
  }

  /**
   * Send Schadenmeldung notification
   */
  async sendSchadenmeldungNotification(
    data: {
      name: string
      email: string
      telefon: string
      wiePassiert: string
      woPassiert: string
      wannPassiert: string
    },
    attachments?: EmailAttachment[]
  ): Promise<void> {
    const { envConfig } = await import('../config/env')
    const template = this.generateSchadenmeldungTemplate(data)

    await this.sendEmail({
      to: envConfig.SCHADEN_RECIPIENT_EMAIL,
      template,
      attachments
    })
  }

  /**
   * Generate Anfrage confirmation template (for client)
   */
  generateAnfrageConfirmationTemplate(data: {
    name: string
    email: string
    phone: string
    message: string
    category: string
    subcategory: string
    unterlagen: string
  }): EmailTemplate {
    const subject = `Bestätigung - Ihre Anfrage wurde erhalten`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AC082;">Bestätigung Ihrer Anfrage</h2>
        
        <p>Sehr geehrte/r ${data.name},</p>
        
        <p>vielen Dank für Ihre Anfrage. Wir haben folgende Daten erhalten:</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Kontaktdaten</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
        </div>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4AC082;">
          <h3 style="margin-top: 0; color: #4AC082;">Anfrage Details</h3>
          <p><strong>Kategorie:</strong> ${data.category}</p>
          <p><strong>Unterkategorie:</strong> ${data.subcategory}</p>
          <p><strong>Benötigte Unterlagen:</strong> ${data.unterlagen}</p>
          ${data.message ? `<p><strong>Ihre Nachricht:</strong></p><p style="background: white; padding: 15px; border-radius: 3px; margin: 10px 0;">${data.message.replace(/\n/g, '<br>')}</p>` : ''}
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p style="margin: 0;"><strong>Nächste Schritte:</strong></p>
          <p style="margin: 5px 0 0 0;">Wir werden uns innerhalb der nächsten 24-48 Stunden bei Ihnen melden.</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Mit freundlichen Grüßen,<br>Ihr Filip Bonat Team</p>
          <p style="margin-top: 15px;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
        </div>
      </div>
    `

    const text = `
Bestätigung Ihrer Anfrage

Sehr geehrte/r ${data.name},

vielen Dank für Ihre Anfrage. Wir haben folgende Daten erhalten:

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone}

Anfrage Details:
Kategorie: ${data.category}
Unterkategorie: ${data.subcategory}
Benötigte Unterlagen: ${data.unterlagen}
${data.message ? `\nIhre Nachricht:\n${data.message}` : ''}

Nächste Schritte:
Wir werden uns innerhalb der nächsten 24-48 Stunden bei Ihnen melden.

Mit freundlichen Grüßen,
Ihr Filip Bonat Team
    `

    return { subject, html, text }
  }

  /**
   * Generate Schadenmeldung confirmation template (for client)
   */
  generateSchadenmeldungConfirmationTemplate(data: {
    name: string
    email: string
    telefon: string
    wiePassiert: string
    woPassiert: string
    wannPassiert: string
  }): EmailTemplate {
    const subject = `Bestätigung - Ihre Schadenmeldung wurde erhalten`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Bestätigung Ihrer Schadenmeldung</h2>
        
        <p>Sehr geehrte/r ${data.name},</p>
        
        <p>Ihre Schadenmeldung wurde erfolgreich übermittelt:</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Kontaktdaten</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.telefon || 'Nicht angegeben'}</p>
        </div>

        <div style="background: #ffebee; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #d32f2f;">
          <h3 style="margin-top: 0; color: #d32f2f;">Schadendetails</h3>
          <p><strong>Wann ist es passiert:</strong> ${data.wannPassiert}</p>
          <p><strong>Wo ist es passiert:</strong> ${data.woPassiert}</p>
          <p><strong>Beschreibung des Schadens:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 3px; margin: 10px 0;">
            ${data.wiePassiert.replace(/\n/g, '<br>')}
          </p>
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p style="margin: 0;"><strong>Nächste Schritte:</strong></p>
          <p style="margin: 5px 0 0 0;">Wir bearbeiten Ihren Schaden umgehend und melden uns zeitnah bei Ihnen.</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Mit freundlichen Grüßen,<br>Ihr Filip Bonat Team</p>
          <p style="margin-top: 15px;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
        </div>
      </div>
    `

    const text = `
Bestätigung Ihrer Schadenmeldung

Sehr geehrte/r ${data.name},

Ihre Schadenmeldung wurde erfolgreich übermittelt:

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.telefon || 'Nicht angegeben'}

Schadendetails:
Wann ist es passiert: ${data.wannPassiert}
Wo ist es passiert: ${data.woPassiert}
Beschreibung des Schadens:
${data.wiePassiert}

Nächste Schritte:
Wir bearbeiten Ihren Schaden umgehend und melden uns zeitnah bei Ihnen.

Mit freundlichen Grüßen,
Ihr Filip Bonat Team
    `

    return { subject, html, text }
  }

  /**
   * Generate Kredit-Anfrage confirmation template (for client)
   */
  generateKreditAnfrageConfirmationTemplate(data: {
    name: string
    email: string
    phone: string
    message: string
    kreditDetails: {
      kreditbetrag: number
      laufzeit: number
      monatlicheRate: number
    }
  }): EmailTemplate {
    const subject = `Bestätigung - Ihre Kreditanfrage wurde erhalten`

    // Format currency for display
    const formatCurrency = (amount: number): string => {
      return new Intl.NumberFormat('de-AT', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AC082;">Bestätigung Ihrer Kreditanfrage</h2>
        
        <p>Sehr geehrte/r ${data.name},</p>
        
        <p>Ihre Kreditanfrage wurde erfolgreich übermittelt:</p>

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
            <tr style="background: #f0f8f0;">
              <td style="padding: 12px 0; font-size: 16px;"><strong>Monatliche Rate:</strong></td>
              <td style="padding: 12px 0; text-align: right; font-size: 16px; color: #4AC082;"><strong>${formatCurrency(data.kreditDetails.monatlicheRate)}</strong></td>
            </tr>
          </table>
          ${data.message ? `<p style="margin-top: 15px;"><strong>Ihre Nachricht:</strong></p><p style="background: white; padding: 15px; border-radius: 3px; margin: 10px 0;">${data.message.replace(/\n/g, '<br>')}</p>` : ''}
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p style="margin: 0;"><strong>Nächste Schritte:</strong></p>
          <p style="margin: 5px 0 0 0;">Wir prüfen Ihre Anfrage und kontaktieren Sie innerhalb von 24 Stunden.</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Mit freundlichen Grüßen,<br>Ihr Filip Bonat Team</p>
          <p style="margin-top: 15px;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
        </div>
      </div>
    `

    const text = `
Bestätigung Ihrer Kreditanfrage

Sehr geehrte/r ${data.name},

Ihre Kreditanfrage wurde erfolgreich übermittelt:

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone}

Kreditdetails:
Kreditbetrag: ${formatCurrency(data.kreditDetails.kreditbetrag)}
Laufzeit: ${data.kreditDetails.laufzeit} Monate
Monatliche Rate: ${formatCurrency(data.kreditDetails.monatlicheRate)}
${data.message ? `\nIhre Nachricht:\n${data.message}` : ''}

Nächste Schritte:
Wir prüfen Ihre Anfrage und kontaktieren Sie innerhalb von 24 Stunden.

Mit freundlichen Grüßen,
Ihr Filip Bonat Team
    `

    return { subject, html, text }
  }

  /**
   * Send Anfrage confirmation to client
   */
  async sendAnfrageConfirmation(
    data: {
      name: string
      email: string
      phone: string
      message: string
      category: string
      subcategory: string
      unterlagen: string
      houseLink?: string
    }
  ): Promise<void> {
    const template = this.generateAnfrageConfirmationTemplate(data)

    await this.sendEmail({
      to: data.email,
      template
    })
  }

  /**
   * Send Schadenmeldung confirmation to client
   */
  async sendSchadenmeldungConfirmation(
    data: {
      name: string
      email: string
      telefon: string
      wiePassiert: string
      woPassiert: string
      wannPassiert: string
    }
  ): Promise<void> {
    const template = this.generateSchadenmeldungConfirmationTemplate(data)

    await this.sendEmail({
      to: data.email,
      template
    })
  }

  /**
   * Send Kredit-Anfrage confirmation to client
   */
  async sendKreditAnfrageConfirmation(
    data: {
      name: string
      email: string
      phone: string
      message: string
      kreditDetails: {
        kreditbetrag: number
        laufzeit: number
        monatlicheRate: number
      }
    }
  ): Promise<void> {
    const template = this.generateKreditAnfrageConfirmationTemplate(data)

    await this.sendEmail({
      to: data.email,
      template
    })
  }
}

// Export singleton instance
export const emailService = new EmailService()
