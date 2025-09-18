import { PDFDocument } from 'pdf-lib'
import { uploadBase64File } from './cloudinaryConfig'
import { prisma } from '../prisma'
import type { UploadedFile } from './types'

async function convertToPdfBuffer(file: UploadedFile): Promise<Buffer> {
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

export async function processAndSaveFiles(files: UploadedFile[], anfrageId: string) {
  const attachments: { filename: string; content: Buffer; contentType: string }[] = []

  for (const file of files ?? []) {
    const pdfBuffer = await convertToPdfBuffer(file)
    const pdfBase64 = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`

    const cloudinaryUpload = await uploadBase64File(pdfBase64, 'anfrage_files')

    await prisma.file.create({
      data: {
        name: `${file.name}.pdf`,
        originalName: file.name,
        mimeType: 'application/pdf',
        size: pdfBuffer.length,
        cloudinaryUrl: cloudinaryUpload.url,
        cloudinaryPublicId: cloudinaryUpload.publicId,
        anfrageId,
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

// Export the conversion function for use in other modules (like anfrage)
export async function convertFileToPdf(file: UploadedFile): Promise<{
  filename: string
  content: Buffer
  contentType: string
}> {
  const pdfBuffer = await convertToPdfBuffer(file)

  return {
    filename: `${file.name}.pdf`,
    content: pdfBuffer,
    contentType: 'application/pdf'
  }
}
