import { createAndSendAnfrage } from './anfrageService'
import type { AnfrageSubmission } from './utils/types'

export async function sendAnfrageEmail(
  submission: AnfrageSubmission,
  attachments: any[]
) {
  return createAndSendAnfrage(submission, attachments);
}

export type { AnfrageSubmission } from './utils/types'