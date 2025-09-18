import { findOrCreateUser } from './userDeduplication';
import type { SchadenMeldungSubmission } from './types';

// Convertir SchadenMeldungSubmission a formato compatible con findOrCreateUser
export async function findOrCreateUserForSchaden(submission: SchadenMeldungSubmission) {
  const compatibleSubmission = {
    id: submission.id,
    name: submission.name,
    email: submission.email,
    phone: submission.telefon || '',
    message: '',
    unterlagen: '',
    category: 'schadenmeldung',
    subcategory: ''
  };

  return await findOrCreateUser(compatibleSubmission);
}