import React from 'react'
import { FaPhone, FaWhatsapp, FaEnvelope, FaTimes } from 'react-icons/fa'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const handleContactMethod = (method: 'phone' | 'whatsapp' | 'email') => {
    switch (method) {
      case 'phone':
        window.location.href = 'tel:+436767857277'
        break
      case 'whatsapp':
        window.open('https://wa.me/+43676785727', '_blank')
        break
      case 'email':
        window.location.href = 'mailto:info@filipbonat.com'
        break
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón cerrar */}
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Kontakt aufnehmen</h2>
          <button
            onClick={onClose}
            className="modal-close"
            aria-label="Schließen"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Opciones */}
        <div className="contact-options space-y-3">
          <button
            className="contact-option phone"
            onClick={() => handleContactMethod('phone')}
          >
            <FaPhone />
            <span>Telefon</span>
          </button>
          <button
            className="contact-option whatsapp"
            onClick={() => handleContactMethod('whatsapp')}
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </button>
          <button
            className="contact-option email"
            onClick={() => handleContactMethod('email')}
          >
            <FaEnvelope />
            <span>E-Mail</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
