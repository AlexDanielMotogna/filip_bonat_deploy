import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormSubmission } from '../../hooks/useFormSubmission'
import { useFileUpload } from '../../hooks/useFileUpload'
import { API_ENDPOINTS } from '../../config/api'
import { groupDocuments } from '../../utils/documentGrouping'
import { validateAnfrageForm, type AnfrageFormData } from '../../utils/formValidators'
import { validateTotalFileSizeWithPdfConversion, isApproachingLimit } from '../../utils/fileSizeValidation'
import SuccessModal from '../SuccessModal'
import FileUploadItem from "../FileUploadItem"
import DatenschutzCheckbox from "../DatenschutzCheckbox"

interface AnfrageModalProps {
  unterlagen: string[]
  category: string
  subcategory: string
  onClose: () => void
}

interface SubmissionData {
  name: string
  email: string
  phone: string
  message: string
  unterlagen: string
  category: string
  subcategory: string
  houseLink?: string
  uploadedFiles: Array<{
    name: string
    base64: string
    mimeType: string
    category: string
    subcategory: string
  }>
}

const AnfrageModal: React.FC<AnfrageModalProps> = ({ unterlagen, category, subcategory, onClose }) => {
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    houseLink: '',
    uploadedDocs: {} as Record<string, { file: File; base64: string; mimeType?: string } | null>
  })
  const [acceptedDatenschutz, setAcceptedDatenschutz] = useState(false)
  const [datenschutzError, setDatenschutzError] = useState(false)
  // const [isProcessingFiles, setIsProcessingFiles] = useState(false)
  // const [fileProcessingProgress, setFileProcessingProgress] = useState<{
  //   current: number
  //   total: number
  //   currentFileName: string
  // } | null>(null)

  const { uploadProgress, processFile } = useFileUpload()

  const submitAnfrage = async (data: SubmissionData) => {
    console.log('🌐 AnfrageModal: Making API call to:', API_ENDPOINTS.ANFRAGE)
    console.log('📦 AnfrageModal: Request payload:', {
      ...data,
      uploadedFiles: data.uploadedFiles.map(f => ({ name: f.name, mimeType: f.mimeType, size: f.base64.length }))
    })

    try {
      const response = await fetch(API_ENDPOINTS.ANFRAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('📡 AnfrageModal: Response status:', response.status, response.statusText)
      console.log('📡 AnfrageModal: Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        console.error('❌ AnfrageModal: HTTP Error:', response.status, response.statusText)
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('📥 AnfrageModal: Response data:', result)

      // Check if the response indicates success
      if (!result.success) {
        console.error('❌ AnfrageModal: API Error:', result.message)
        throw new Error(result.message || 'An unexpected error occurred')
      }

      // Verify we have the data object with id
      if (!result.data || !result.data.id) {
        console.error('❌ AnfrageModal: No data.id in response')
        throw new Error('Server did not return a valid response')
      }

      console.log('✅ AnfrageModal: API call successful')
      return result
    } catch (error) {
      console.error('❌ AnfrageModal: Fetch error:', error)
      throw error
    }
  }

  const { state, submitForm, resetState } = useFormSubmission(submitAnfrage)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = async (unterlage: string, file: File | null) => {
    try {
      const processed = await processFile(unterlage, file)

      if (processed) {
        setFormData(prev => ({
          ...prev,
          uploadedDocs: {
            ...prev.uploadedDocs,
            [unterlage]: {
              file: processed.file,
              base64: processed.base64,
              mimeType: processed.mimeType
            }
          }
        }))
      } else {
        // Remove file from formData
        setFormData(prev => {
          const { [unterlage]: _, ...remainingDocs } = prev.uploadedDocs
          return {
            ...prev,
            uploadedDocs: remainingDocs
          }
        })
      }
    } catch (error) {
      console.error('Error processing file:', error)
      alert(error instanceof Error ? error.message : 'Error processing file. Please try again.')
    }
  }

  const validateForm = (): string | null => {
    const anfrageFormData: AnfrageFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      houseLink: formData.houseLink
    }

    const result = validateAnfrageForm(anfrageFormData, t)
    return result.isValid ? null : result.error || 'Validation failed'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptedDatenschutz) {
      setDatenschutzError(true)
      return
    }
    setDatenschutzError(false)

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      return
    }

    // Validate file sizes before submission
    const fileSizeValidation = validateTotalFileSizeWithPdfConversion(formData.uploadedDocs)
    if (!fileSizeValidation.isValid) {
      alert(fileSizeValidation.error)
      return
    }

    try {
      // Process uploaded files sequentially with progress (if any)
      const uploadedDocsEntries = Object.entries(formData.uploadedDocs).filter(([_, doc]) => doc !== null)

      if (uploadedDocsEntries.length > 0) {
        console.log('📁 Processing files:', uploadedDocsEntries.length, 'files')
        // Files are already processed in handleFileUpload
      }

      const submissionData: SubmissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        message: formData.message || '',
        unterlagen: Object.keys(formData.uploadedDocs).join(', ') || '',
        category: category || '',
        subcategory: subcategory || '',
        houseLink: formData.houseLink || undefined,
        uploadedFiles: Object.entries(formData.uploadedDocs).map(([unterlage, doc]) => ({
          name: doc?.file.name || unterlage,
          base64: doc?.base64 || '',
          mimeType: doc?.mimeType || 'application/octet-stream',
          category: category || '',
          subcategory: subcategory || ''
        }))
      }

      await submitForm(submissionData)

      // Reset form immediately after successful submission
      console.log('✅ Anfrage submitted successfully')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        houseLink: '',
        uploadedDocs: {}
      })
      setAcceptedDatenschutz(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

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
            <h2>{t('anfrage.title')}</h2>
            <p>{t('anfrage.subtitle')}</p>
          </div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {state.error && <div className="error-message">{state.error}</div>}

          {/* Personal Info */}
          <div className="form-section">
            <h3>{t('anfrage.personalInfo')}</h3>
            <div className="form-group">
              <label>{t('form.name')} *</label>
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
                <label>{t('form.email')} *</label>
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
                <label>{t('form.phone')} *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* House Link Field - Only for kaufen/verkaufen */}
          {(subcategory === 'Kaufen' || subcategory === 'Verkaufen') && (
            <div className="form-section">
              <h3>Immobilien-Link</h3>
              <div className="form-group">
                <label>Link zur Immobilie (Willhaben, Immobilienscout24, etc.)</label>
                <input
                  type="url"
                  name="houseLink"
                  value={formData.houseLink}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://www.willhaben.at/iad/immobilien/..."
                />
                <small className="field-hint">
                  Fügen Sie hier den Link zur Immobilie von Willhaben, Immobilienscout24 oder einer anderen Plattform ein
                </small>
              </div>
            </div>
          )}

          {/* Documents Upload */}
          <div className="form-section">
            <h3>{t('anfrage.documents')}</h3>
            <p className="section-description">{t('anfrage.documentsHint')}</p>

            {/* File Size Indicator */}
            {Object.keys(formData.uploadedDocs).some(key => formData.uploadedDocs[key] !== null) && (
              <div className="file-size-indicator">
                {(() => {
                  const sizeValidation = validateTotalFileSizeWithPdfConversion(formData.uploadedDocs)
                  const isWarning = isApproachingLimit(sizeValidation.totalSize)
                  const isError = !sizeValidation.isValid

                  return (
                    <div className={`size-info ${isError ? 'error' : isWarning ? 'warning' : 'normal'}`}>
                      <div className="size-text">
                        <span className="size-label">Geschätzte Gesamtgröße (nach PDF-Konvertierung):</span>
                        <span className="size-value">{sizeValidation.totalSizeFormatted} / {sizeValidation.maxSizeFormatted}</span>
                      </div>
                      <div className="size-bar">
                        <div
                          className="size-progress"
                          style={{
                            width: `${Math.min(100, (sizeValidation.totalSize / sizeValidation.maxSize) * 100)}%`,
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

            <div className="upload-list">
              {groupDocuments(unterlagen).map((section, sectionIndex) => (
                <div key={sectionIndex} className="document-section">
                  <div className="section-header">
                    <h4 className="section-title">{section.title}</h4>
                  </div>
                  <div className="section-documents">
                    {section.documents.map((unterlage, docIndex) => (
                      <FileUploadItem
                        key={`${sectionIndex}-${docIndex}`}
                        unterlage={unterlage}
                        index={unterlagen.indexOf(unterlage)}
                        fileUploaded={formData.uploadedDocs[unterlage] || undefined}
                        progress={uploadProgress[unterlage]}
                        onFileChange={(file) => handleFileUpload(unterlage, file)}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="form-section">
            <div className="form-group">
              <label>{t('form.message')}</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder={t('form.messagePlaceholder') || ''}
              />
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
              disabled={state.loading}
            >
              {state.loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  {t('form.submitting')}
                </>
              ) : (
                t('form.submit')
              )}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary" disabled={state.loading}>
              {t('form.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AnfrageModal
