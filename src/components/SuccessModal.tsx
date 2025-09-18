import React from 'react'

interface SuccessModalProps {
  onClose: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="success-modal">
      <h2>Erfolg!</h2>
      <p>Ihre Anfrage wurde erfolgreich gesendet.</p>
      <button onClick={onClose} className="btn-primary">
        OK
      </button>
    </div>
  )
}

export default SuccessModal
