// components/SchadenMeldungModal.tsx
'use client'
import { useState } from 'react'
import { API_ENDPOINTS } from '../config/api'
import { useFileUpload } from '../hooks/useFileUpload'
import { useFormSubmission } from '../hooks/useFormSubmission'
import { validateSchadenMeldungForm, type SchadenMeldungFormData } from '../utils/formValidators'
import { validateTotalFileSizeWithPdfConversion, formatBytes } from '../utils/fileSizeValidation'
import DatenschutzCheckbox from './DatenschutzCheckbox'
import SuccessModal from './SuccessModal'

interface SchadenMeldungModalProps {
  show: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  telefon: string
  wiePassiert: string
  woPassiert: string
  wannPassiert: string
  images: File[]
}

interface SubmissionData {
  name: string
  email: string
  telefon: string
  wiePassiert: string
  woPassiert: string
  wannPassiert: string
  uploadedFiles: Array<{
    name: string
    base64: string
    mimeType: string
  }>
}

export default function SchadenMeldungModal({ show, onClose }: SchadenMeldungModalProps) {
  // const { t } = useTranslation()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    telefon: '',
    wiePassiert: '',
    woPassiert: '',
    wannPassiert: '',
    images: []
  })

  const [acceptedDatenschutz, setAcceptedDatenschutz] = useState(false)
  const [datenschutzError, setDatenschutzError] = useState(false)
  const [isProcessingFiles, setIsProcessingFiles] = useState(false)
  const [fileProcessingProgress, setFileProcessingProgress] = useState<{
    current: number
    total: number
    currentFileName: string
  } | null>(null)

  const { processFile } = useFileUpload()

  const submitSchadenMeldung = async (data: SubmissionData) => {
    console.log('🌐 SchadenMeldung: Making API call to:', API_ENDPOINTS.SCHADENMELDUNG)
    console.log('📦 SchadenMeldung: Request payload:', {
      ...data,
      uploadedFiles: data.uploadedFiles.map(f => ({ name: f.name, mimeType: f.mimeType, size: f.base64.length }))
    })

    try {
      const response = await fetch(API_ENDPOINTS.SCHADENMELDUNG, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('📡 SchadenMeldung: Response status:', response.status, response.statusText)
      console.log('📡 SchadenMeldung: Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        console.error('❌ SchadenMeldung: HTTP Error:', response.status, response.statusText)

        // Try to get error details from response
        try {
          const errorData = await response.json()
          console.error('❌ SchadenMeldung: Error details:', errorData)
          throw new Error(errorData.message || `HTTP Error: ${response.status} ${response.statusText}`)
        } catch (parseError) {
          console.error('❌ SchadenMeldung: Could not parse error response:', parseError)
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        }
      }

      const result = await response.json()
      console.log('📥 SchadenMeldung: Response data:', result)

      if (!result.success) {
        console.error('❌ SchadenMeldung: API Error:', result.message)
        throw new Error(result.message || 'Ein Fehler ist aufgetreten')
      }

      console.log('✅ SchadenMeldung: API call successful')
      return result
    } catch (error) {
      console.error('❌ SchadenMeldung: Fetch error:', error)
      throw error
    }
  }

  const { state, submitForm, resetState } = useFormSubmission(submitSchadenMeldung)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData(prev => ({ ...prev, images: filesArray }))
    }
  }

  const validateForm = (): string | null => {
    const schadenFormData: SchadenMeldungFormData = {
      name: formData.name,
      email: formData.email,
      telefon: formData.telefon,
      wiePassiert: formData.wiePassiert,
      woPassiert: formData.woPassiert,
      wannPassiert: formData.wannPassiert,
      images: formData.images
    }

    const result = validateSchadenMeldungForm(schadenFormData)
    return result.isValid ? null : result.error || 'Validation failed'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔄 SchadenMeldung form submission started')

    if (!acceptedDatenschutz) {
      setDatenschutzError(true)
      return
    }
    setDatenschutzError(false)

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      console.log('❌ Validation error:', validationError)
      return
    }

    console.log('✅ Form validation passed')

    // Validate file sizes before processing (convert File[] to the expected format)
    if (formData.images.length > 0) {
      const fileDataForValidation: Record<string, { file: File; base64: string; mimeType?: string } | null> = {}

      // Create temporary base64 data for size calculation
      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i]
        const reader = new FileReader()
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })

        const base64 = await base64Promise
        fileDataForValidation[file.name] = {
          file,
          base64,
          mimeType: file.type
        }
      }

      const fileSizeValidation = validateTotalFileSizeWithPdfConversion(fileDataForValidation)
      if (!fileSizeValidation.isValid) {
        alert(fileSizeValidation.error)
        return
      }
    }

    try {
      // Process uploaded files sequentially with progress
      console.log('📁 Processing files:', formData.images.length, 'files')
      setIsProcessingFiles(true)
      const uploadedFiles: Array<{
        name: string
        base64: string
        mimeType: string
      } | null> = []

      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i]
        setFileProcessingProgress({
          current: i + 1,
          total: formData.images.length,
          currentFileName: file.name
        })

        console.log(`📁 Processing file ${i + 1}/${formData.images.length}: ${file.name}`)

        try {
          const processed = await processFile(file.name, file)
          uploadedFiles.push(processed ? {
            name: file.name,
            base64: processed.base64,
            mimeType: processed.mimeType
          } : null)
        } catch (error) {
          console.error(`❌ Error processing file ${file.name}:`, error)
          uploadedFiles.push(null)
        }
      }

      setIsProcessingFiles(false)
      setFileProcessingProgress(null)

      const submissionData: SubmissionData = {
        name: formData.name,
        email: formData.email,
        telefon: formData.telefon || '',
        wiePassiert: formData.wiePassiert,
        woPassiert: formData.woPassiert,
        wannPassiert: formData.wannPassiert,
        uploadedFiles: uploadedFiles.filter(Boolean) as Array<{
          name: string
          base64: string
          mimeType: string
        }>
      }

      console.log('📤 Submitting data to API:', {
        ...submissionData,
        uploadedFiles: submissionData.uploadedFiles.map(f => ({ name: f.name, mimeType: f.mimeType, size: f.base64.length }))
      })

      await submitForm(submissionData)

      // Reset form immediately after successful submission
      console.log('✅ SchadenMeldung submitted successfully')
      setFormData({
        name: '',
        email: '',
        telefon: '',
        wiePassiert: '',
        woPassiert: '',
        wannPassiert: '',
        images: []
      })
      setAcceptedDatenschutz(false)
      setIsProcessingFiles(false)
      setFileProcessingProgress(null)
    } catch (error) {
      console.error('❌ Error submitting SchadenMeldung form:', error)
    }
  }

  if (!show) return null

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal">

        {/* Success Modal */}
        {state.success && (
          <div className="modal-overlay">
            <SuccessModal onClose={() => { resetState(); onClose() }} />
          </div>
        )}

        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2>Schadenmeldung</h2>
            <p>Melden Sie Ihren Schaden schnell und einfach</p>
          </div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {state.error && <div className="error-message">{state.error}</div>}

          {/* Personal Info */}
          <div className="form-section">
            <h3>Persönliche Daten</h3>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>E-Mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Schadendetails */}
          <div className="form-section">
            <h3>Schadendetails</h3>
            <div className="form-group">
              <label>Wann ist der Schaden passiert? *</label>
              <input
                type="datetime-local"
                name="wannPassiert"
                required
                value={formData.wannPassiert}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Wo ist der Schaden passiert? *</label>
              <input
                type="text"
                name="woPassiert"
                required
                value={formData.woPassiert}
                onChange={handleInputChange}
                className="form-input"
                placeholder="z.B. Hauptstraße 123, 1010 Wien"
              />
            </div>
            <div className="form-group">
              <label>Wie ist der Schaden passiert? *</label>
              <textarea
                name="wiePassiert"
                rows={4}
                required
                value={formData.wiePassiert}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Beschreiben Sie bitte detailliert, wie der Schaden entstanden ist..."
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="form-section">
            <h3>Bilder und Dokumente hochladen</h3>
            <p className="section-description">Laden Sie Fotos und relevante Dokumente zu Ihrem Schaden hoch (Mehrfachauswahl möglich)</p>

            {/* File Size Indicator */}
            {formData.images.length > 0 && (
              <div className="file-size-indicator">
                {(() => {
                  // Convert File[] to the expected format for validation
                  const fileDataForValidation: Record<string, { file: File; base64: string; mimeType?: string } | null> = {}

                  formData.images.forEach((file, index) => {
                    // Create a temporary base64 for size calculation (we don't need the actual base64 here, just size)
                    const tempBase64 = `data:${file.type};base64,${btoa('temp')}`
                    fileDataForValidation[`file_${index}`] = {
                      file,
                      base64: tempBase64,
                      mimeType: file.type
                    }
                  })

                  // Calculate total size directly from File objects (more accurate)
                  let totalSize = 0
                  formData.images.forEach(file => {
                    const estimatedPdfSize = file.type.startsWith('image/') ? Math.round(file.size * 1.4) : file.size
                    totalSize += estimatedPdfSize
                  })

                  const maxSize = 25 * 1024 * 1024 // 25MB
                  const isValid = totalSize <= maxSize
                  const isWarning = totalSize >= (maxSize * 0.8)
                  const isError = !isValid

                  return (
                    <div className={`size-info ${isError ? 'error' : isWarning ? 'warning' : 'normal'}`}>
                      <div className="size-text">
                        <span className="size-label">Geschätzte Gesamtgröße (nach PDF-Konvertierung):</span>
                        <span className="size-value">{formatBytes(totalSize)} / {formatBytes(maxSize)}</span>
                      </div>
                      <div className="size-bar">
                        <div
                          className="size-progress"
                          style={{
                            width: `${Math.min(100, (totalSize / maxSize) * 100)}%`,
                            backgroundColor: isError ? '#dc3545' : isWarning ? '#ffc107' : '#28a745'
                          }}
                        />
                      </div>
                      {isError && (
                        <div className="size-error">
                          ⚠️ Das E-Mail-Limit von 25MB wird überschritten. Bitte reduzieren Sie die Dateigröße.
                        </div>
                      )}
                      {isWarning && !isError && (
                        <div className="size-warning">
                          ⚠️ Sie nähern sich dem E-Mail-Limit von 25MB.
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            )}

            <div className="upload-item">
              <span className="upload-label">Dateien auswählen</span>
              <div className="upload-wrapper">
                <input
                  id="schaden-files"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="schaden-files" className="file-upload-btn">
                  📂 Dateien hochladen
                </label>
                <span className="file-name">
                  {formData.images.length > 0
                    ? `${formData.images.length} Datei(en) ausgewählt`
                    : "Keine Dateien ausgewählt"
                  }
                </span>

                {/* Circular Progress Loader - Right side */}
                {isProcessingFiles && fileProcessingProgress && (
                  <div className="circular-progress-container">
                    <div className="circular-progress">
                      <svg className="progress-ring" width="24" height="24">
                        <circle
                          className="progress-ring-circle"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="transparent"
                          r="10"
                          cx="12"
                          cy="12"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 10}`,
                            strokeDashoffset: `${2 * Math.PI * 10 * (1 - (fileProcessingProgress.current / fileProcessingProgress.total))}`,
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                            transition: 'stroke-dashoffset 0.3s ease'
                          }}
                        />
                      </svg>
                      <span className="progress-text">
                        {fileProcessingProgress.current}/{fileProcessingProgress.total}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Datenschutz Checkbox */}
          <DatenschutzCheckbox
            accepted={acceptedDatenschutz}
            error={datenschutzError}
            onChange={setAcceptedDatenschutz}
            errorMessage="Sie müssen die Datenschutzerklärung akzeptieren"
            linkUrl="/datenschutz"
          />


          {/* Actions */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={state.loading || isProcessingFiles}
            >
              {isProcessingFiles ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  {`Verarbeite Dateien... (${fileProcessingProgress?.current || 0}/${fileProcessingProgress?.total || 0})`}
                </>
              ) : state.loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Wird gesendet...
                </>
              ) : (
                'Schaden melden'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={state.loading || isProcessingFiles}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
