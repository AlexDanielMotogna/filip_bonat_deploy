// server/utils/schadenEmailService.ts
import { sendMail } from './utils/mailTransport'
import type { SchadenMeldungSubmission } from './utils/types'
import { processAndSaveSchadenFiles } from './utils/schadenFileUtils'

export async function createAndSendSchadenMeldung(submission: SchadenMeldungSubmission) {
  // Procesar archivos si existen
  const attachments = submission.uploadedFiles && submission.uploadedFiles.length > 0
    ? await processAndSaveSchadenFiles(submission.uploadedFiles, submission.id!)
    : []

  const html = `
    <h1>Neue Schadenmeldung</h1>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Telefon:</strong> ${submission.telefon || "Nicht angegeben"}</p>
    <p><strong>Wie ist passiert:</strong> ${submission.wiePassiert}</p>
    <p><strong>Wo ist passiert:</strong> ${submission.woPassiert}</p>
    <p><strong>Wann ist passiert:</strong> ${new Date(submission.wannPassiert).toLocaleString('de-DE')}</p>
  `

  await sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: submission.email,
    subject: `Neue Schadenmeldung - ${submission.name}`,
    html,
    attachments,
  })

  return { ok: true }
}