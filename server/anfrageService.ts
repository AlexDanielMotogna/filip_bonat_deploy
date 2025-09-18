import { sendMail } from './utils/mailTransport'
import type { AnfrageSubmission } from './utils/types'

export async function createAndSendAnfrage(submission: AnfrageSubmission, attachments: any[]) {


  const html = `
    <h1>Neue Anfrage</h1>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Telefon:</strong> ${submission.phone || "Nicht angegeben"}</p>
    <p><strong>Unterlagen:</strong> ${submission.unterlagen || '-'}</p>
    <p><strong>Nachricht:</strong> ${submission.message || '-'}</p>
    <p><strong>Kategorie:</strong> ${submission.category || '-'}</p>
    <p><strong>Subkategorie:</strong> ${submission.subcategory || '-'}</p>
  `

  await sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: submission.email,
    subject: `Neue Anfrage - ${submission.name} / ${submission.category || '-'} / ${submission.subcategory || '-'}`,
    html,
    attachments,
  })

  return { ok: true }
}

export type { AnfrageSubmission } from './utils/types'