/**
 * File Size Validation Utilities
 * Handles validation of file sizes and total attachment limits for email sending
 */

export interface FileSizeInfo {
  filename: string
  size: number
  sizeFormatted: string
}

export interface FileSizeValidationResult {
  isValid: boolean
  totalSize: number
  totalSizeFormatted: string
  maxSize: number
  maxSizeFormatted: string
  files: FileSizeInfo[]
  error?: string
}

// Email attachment limit (25MB in bytes)
export const EMAIL_ATTACHMENT_LIMIT = 25 * 1024 * 1024 // 25MB

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Calculate file size from base64 string
 */
export function calculateBase64Size(base64String: string): number {
  // Remove data URL prefix if present
  const base64Data = base64String.includes(',')
    ? base64String.split(',')[1]
    : base64String

  // Calculate actual file size from base64
  // Base64 encoding increases size by ~33%, so we calculate the original size
  const padding = (base64Data.match(/=/g) || []).length
  const actualSize = (base64Data.length * 3) / 4 - padding

  return Math.round(actualSize)
}

/**
 * Validate total file size for email attachments
 */
export function validateTotalFileSize(
  uploadedFiles: Record<string, { file: File; base64: string; mimeType?: string } | null>
): FileSizeValidationResult {
  const files: FileSizeInfo[] = []
  let totalSize = 0

  // Calculate size for each uploaded file
  Object.entries(uploadedFiles).forEach(([unterlage, fileData]) => {
    if (fileData && fileData.base64) {
      const fileSize = calculateBase64Size(fileData.base64)
      const filename = fileData.file.name || unterlage

      files.push({
        filename,
        size: fileSize,
        sizeFormatted: formatBytes(fileSize)
      })

      totalSize += fileSize
    }
  })

  const isValid = totalSize <= EMAIL_ATTACHMENT_LIMIT

  return {
    isValid,
    totalSize,
    totalSizeFormatted: formatBytes(totalSize),
    maxSize: EMAIL_ATTACHMENT_LIMIT,
    maxSizeFormatted: formatBytes(EMAIL_ATTACHMENT_LIMIT),
    files,
    error: isValid
      ? undefined
      : `Die Gesamtgröße aller Dateien (${formatBytes(totalSize)}) überschreitet das Limit von ${formatBytes(EMAIL_ATTACHMENT_LIMIT)}. Bitte reduzieren Sie die Dateigröße oder entfernen Sie einige Dateien.`
  }
}

/**
 * Get warning threshold (80% of limit)
 */
export function getWarningThreshold(): number {
  return EMAIL_ATTACHMENT_LIMIT * 0.8 // 20MB
}

/**
 * Check if total size is approaching the limit
 */
export function isApproachingLimit(totalSize: number): boolean {
  return totalSize >= getWarningThreshold()
}

/**
 * Get remaining space for uploads
 */
export function getRemainingSpace(totalSize: number): number {
  return Math.max(0, EMAIL_ATTACHMENT_LIMIT - totalSize)
}

/**
 * Estimate PDF size after conversion (images typically get larger when converted to PDF)
 */
export function estimatePdfSize(originalSize: number, mimeType: string): number {
  if (mimeType.startsWith('image/')) {
    // Images typically increase by 20-50% when converted to PDF
    // We use 40% as a safe estimate
    return Math.round(originalSize * 1.4)
  }

  // PDFs and other files remain the same size
  return originalSize
}

/**
 * Validate file size with PDF conversion estimation
 */
export function validateTotalFileSizeWithPdfConversion(
  uploadedFiles: Record<string, { file: File; base64: string; mimeType?: string } | null>
): FileSizeValidationResult {
  const files: FileSizeInfo[] = []
  let totalSize = 0

  // Calculate estimated size after PDF conversion for each uploaded file
  Object.entries(uploadedFiles).forEach(([unterlage, fileData]) => {
    if (fileData && fileData.base64) {
      const originalSize = calculateBase64Size(fileData.base64)
      const estimatedSize = estimatePdfSize(originalSize, fileData.mimeType || '')
      const filename = fileData.file.name || unterlage

      files.push({
        filename: `${filename}${fileData.mimeType?.startsWith('image/') ? ' (→ PDF)' : ''}`,
        size: estimatedSize,
        sizeFormatted: formatBytes(estimatedSize)
      })

      totalSize += estimatedSize
    }
  })

  const isValid = totalSize <= EMAIL_ATTACHMENT_LIMIT

  return {
    isValid,
    totalSize,
    totalSizeFormatted: formatBytes(totalSize),
    maxSize: EMAIL_ATTACHMENT_LIMIT,
    maxSizeFormatted: formatBytes(EMAIL_ATTACHMENT_LIMIT),
    files,
    error: isValid
      ? undefined
      : `Die geschätzte Gesamtgröße aller Dateien nach PDF-Konvertierung (${formatBytes(totalSize)}) überschreitet das E-Mail-Limit von ${formatBytes(EMAIL_ATTACHMENT_LIMIT)}. Bitte reduzieren Sie die Dateigröße oder entfernen Sie einige Dateien.`
  }
}
