import { useState } from 'react'
import { validateFile } from '../utils/fileValidation'
import { fileToBase64 } from '../utils/file'
import imageCompression from 'browser-image-compression'

export interface FileUploadProgress {
  [key: string]: {
    progress: number
    status: 'pending' | 'compressing' | 'uploading' | 'complete' | 'error'
    error?: string
  }
}

export interface ProcessedFile {
  file: File
  base64: string
  mimeType: string
}

export interface UseFileUploadReturn {
  uploadProgress: FileUploadProgress
  processFile: (key: string, file: File | null) => Promise<ProcessedFile | null>
  resetProgress: () => void
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [uploadProgress, setUploadProgress] = useState<FileUploadProgress>({})

  const processFile = async (key: string, file: File | null): Promise<ProcessedFile | null> => {
    if (!file) {
      // Remove file from progress
      setUploadProgress(prev => {
        const { [key]: _, ...remainingProgress } = prev
        return remainingProgress
      })
      return null
    }

    try {
      // Validate file
      validateFile(file)

      setUploadProgress(prev => ({
        ...prev,
        [key]: { progress: 0, status: 'compressing' }
      }))

      // Compress image if needed
      let processedFile = file
      if (file.type.startsWith('image/')) {
        processedFile = await imageCompression(file, {
          maxSizeMB: 3,           // Aumentamos a 3MB para mejor calidad
          initialQuality: 0.8,    // Calidad 80% (mejor que el default 0.6)
          useWebWorker: true,
          // Removemos maxWidthOrHeight para mantener resolución original
        })
      }

      setUploadProgress(prev => ({
        ...prev,
        [key]: { progress: 50, status: 'uploading' }
      }))

      // Convert to base64
      const base64 = await fileToBase64(processedFile)

      setUploadProgress(prev => ({
        ...prev,
        [key]: { progress: 100, status: 'complete' }
      }))

      // Log para debugging de tipos MIME
      console.log(`📁 File processed: ${file.name}`)
      console.log(`📄 Original MIME type: ${file.type}`)
      console.log(`📄 Processed file MIME type: ${processedFile.type}`)
      console.log(`✅ Using MIME type: ${file.type}`)

      return {
        file: processedFile,
        base64,
        mimeType: file.type // Usar el tipo original del archivo, no el procesado
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error processing file'

      setUploadProgress(prev => ({
        ...prev,
        [key]: {
          progress: 0,
          status: 'error',
          error: errorMessage
        }
      }))

      throw new Error(errorMessage)
    }
  }

  const resetProgress = () => {
    setUploadProgress({})
  }

  return {
    uploadProgress,
    processFile,
    resetProgress
  }
}
