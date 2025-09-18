import React, { useState } from 'react'
import { useFormSubmission } from '../hooks/useFormSubmission'
import { validateKreditAnfrageForm, type KreditAnfrageFormData } from '../utils/formValidators'
import { API_ENDPOINTS } from '../config/api'
import SuccessModal from './SuccessModal'
import DatenschutzCheckbox from './DatenschutzCheckbox'

interface KreditAnfrageModalProps {
  show: boolean
  onClose: () => void
  kreditDetails: {
    kreditbetrag: number
    laufzeit: number
    zinssatz: number
    kreditkosten: number
    monatlicheRate: number
    gesamtrueckzahlung: number
    zinsen: number
  }
}

interface SubmissionData {
  name: string
  email: string
  phone: string
  message: string
  kreditDetails: {
    kreditbetrag: number
    laufzeit: number
    zinssatz: number
    kreditkosten: number
    monatlicheRate: number
    gesamtrueckzahlung: number
    zinsen: number
  }
}

const KreditAnfrageModal: React.FC<KreditAnfrageModalProps> = ({ show, onClose, kreditDetails }) => {
  // const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [acceptedDatenschutz, setAcceptedDatenschutz] = useState(false)
  const [datenschutzError, setDatenschutzError] = useState(false)

  const submitKreditAnfrage = async (data: SubmissionData) => {
    console.log('🌐 KreditAnfrage: Making API call to:', API_ENDPOINTS.KREDIT_ANFRAGE)
    console.log('📦 KreditAnfrage: Request payload:', data)

    try {
      const response = await fetch(API_ENDPOINTS.KREDIT_ANFRAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('📡 KreditAnfrage: Response status:', response.status, response.statusText)

      if (!response.ok) {
        console.error('❌ KreditAnfrage: HTTP Error:', response.status, response.statusText)
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('📥 KreditAnfrage: Response data:', result)

      if (!result.success) {
        console.error('❌ KreditAnfrage: API Error:', result.message)
        throw new Error(result.message || 'Ein Fehler ist aufgetreten')
      }

      console.log('✅ KreditAnfrage: API call successful')
      return result
    } catch (error) {
      console.error('❌ KreditAnfrage: Fetch error:', error)
      throw error
    }
  }

  const { state, submitForm, resetState } = useFormSubmission(submitKreditAnfrage)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (): string | null => {
    const kreditFormData: KreditAnfrageFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    }

    const result = validateKreditAnfrageForm(kreditFormData)
    return result.isValid ? null : result.error || 'Validation failed'
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
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
      console.log('❌ Validation error:', validationError)
      return
    }

    try {
      const submissionData: SubmissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || '',
        kreditDetails
      }

      await submitForm(submissionData)

      // Reset form immediately after successful submission
      console.log('✅ KreditAnfrage submitted successfully')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
      setAcceptedDatenschutz(false)
    } catch (error) {
      console.error('❌ Error submitting KreditAnfrage form:', error)
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
            <h2>Kreditanfrage stellen</h2>
            <p>Stellen Sie eine unverbindliche Anfrage für Ihren Kredit</p>
          </div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {state.error && <div className="error-message">{state.error}</div>}

          {/* Kredit Details Summary */}
          <div className="form-section">
            <h3>Ihre Kreditdetails</h3>
            <div className="kredit-summary">
              <div className="summary-row">
                <span>Kreditbetrag:</span>
                <strong>{formatCurrency(kreditDetails.kreditbetrag)}</strong>
              </div>
              <div className="summary-row">
                <span>Laufzeit:</span>
                <strong>{kreditDetails.laufzeit} Monate</strong>
              </div>
              <div className="summary-row">
                <span>Zinssatz:</span>
                <strong>{kreditDetails.zinssatz.toFixed(2)}%</strong>
              </div>
              <div className="summary-row highlight">
                <span>Monatliche Rate:</span>
                <strong>{formatCurrency(kreditDetails.monatlicheRate)}</strong>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="form-section">
            <h3>Ihre Kontaktdaten</h3>
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
                <label>Telefon *</label>
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

          {/* Message */}
          <div className="form-section">
            <div className="form-group">
              <label>Nachricht (optional)</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Haben Sie spezielle Wünsche oder Fragen zu Ihrem Kredit?"
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
                  Wird gesendet...
                </>
              ) : (
                'Kreditanfrage senden'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={state.loading}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default KreditAnfrageModal
