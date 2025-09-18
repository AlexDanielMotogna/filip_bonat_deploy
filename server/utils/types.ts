export interface UploadedFile {
  name: string
  base64: string
  mimeType: string
}

export interface AnfrageSubmission {
  id: string;
  name: string
  email: string
  phone?: string
  message?: string
  unterlagen?: string
  uploadedFiles?: UploadedFile[]
  category?: string
  subcategory?: string
}

export interface SchadenMeldungSubmission {
  id: string;
  name: string
  email: string
  telefon?: string
  wiePassiert: string
  woPassiert: string
  wannPassiert: string
  uploadedFiles?: UploadedFile[]
}