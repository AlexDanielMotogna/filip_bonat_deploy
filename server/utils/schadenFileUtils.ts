// server/utils/schadenFileUtils.ts
import { uploadBase64File } from './cloudinaryConfig'
import { prisma } from '../prisma'
import type { UploadedFile } from './types'

export async function processAndSaveSchadenFiles(files: UploadedFile[], schadenMeldungId: string) {
  const attachments: { filename: string; content: Buffer; contentType: string; disposition?: string; cid?: string }[] = []

  for (const file of files ?? []) {
    console.log(`🔍 Processing file: ${file.name}`)
    console.log(`📄 MIME type received: ${file.mimeType}`)
    console.log(`📊 Base64 prefix: ${file.base64.substring(0, 50)}...`)

    const fileBuffer = Buffer.from(file.base64.split(',')[1], 'base64')
    console.log(`📦 Buffer size: ${fileBuffer.length} bytes`)

    // Función robusta para detectar MIME type
    function detectMimeType(fileName: string, mimeType: string, base64: string): string {
      // 1. Usar MIME type si es válido
      if (mimeType && mimeType !== 'application/octet-stream' && mimeType !== '') {
        return mimeType
      }

      // 2. Detectar desde base64 header
      const base64Header = base64.split(',')[0].toLowerCase()
      if (base64Header.includes('application/pdf')) {
        return 'application/pdf'
      }
      if (base64Header.includes('image/jpeg') || base64Header.includes('image/jpg')) {
        return 'image/jpeg'
      }
      if (base64Header.includes('image/png')) {
        return 'image/png'
      }
      if (base64Header.includes('image/gif')) {
        return 'image/gif'
      }
      if (base64Header.includes('image/webp')) {
        return 'image/webp'
      }

      // 3. Detectar desde extensión de archivo
      const extension = fileName.toLowerCase().split('.').pop()
      switch (extension) {
        case 'pdf':
          return 'application/pdf'
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg'
        case 'png':
          return 'image/png'
        case 'gif':
          return 'image/gif'
        case 'webp':
          return 'image/webp'
        case 'doc':
          return 'application/msword'
        case 'docx':
          return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        case 'txt':
          return 'text/plain'
        default:
          // 4. Fallback seguro - nunca devolver vacío o octet-stream
          return 'application/pdf' // Asumir PDF si no se puede detectar
      }
    }

    const detectedMimeType = detectMimeType(file.name, file.mimeType, file.base64)
    console.log(`🔧 Final MIME type: ${detectedMimeType}`)

    const cloudinaryUpload = await uploadBase64File(file.base64, 'schadenmeldungen')

    // Guardar en base de datos
    await prisma.file.create({
      data: {
        name: file.name,
        originalName: file.name,
        mimeType: detectedMimeType,
        size: fileBuffer.length,
        cloudinaryUrl: cloudinaryUpload.url,
        cloudinaryPublicId: cloudinaryUpload.publicId,
        schadenMeldungId,
      },
    })

    // Asegurar que el filename tenga la extensión correcta
    let filename = file.name
    if (detectedMimeType === 'application/pdf' && !filename.toLowerCase().endsWith('.pdf')) {
      filename = `${filename}.pdf`
    } else if (detectedMimeType.startsWith('image/') && !filename.includes('.')) {
      const extension = detectedMimeType.split('/')[1]
      filename = `${filename}.${extension}`
    }

    // Preparar archivo para email con headers específicos para Outlook
    const attachment: any = {
      filename: filename,
      content: fileBuffer,
      contentType: detectedMimeType,
      disposition: 'attachment',
      encoding: 'base64',
      headers: {
        'Content-Type': detectedMimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Transfer-Encoding': 'base64'
      }
    }

    // Para PDFs, agregar headers adicionales que Outlook requiere
    if (detectedMimeType === 'application/pdf') {
      attachment.headers['Content-Description'] = 'PDF Document'
      attachment.headers['X-Attachment-Id'] = filename.replace(/[^a-zA-Z0-9]/g, '_')
    }

    attachments.push(attachment)

    console.log(`✅ File processed: ${file.name} as ${detectedMimeType}`)
  }

  return attachments
}
