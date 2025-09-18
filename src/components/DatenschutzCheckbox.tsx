import { Trans, useTranslation } from 'react-i18next'

interface DatenschutzCheckboxProps {
  accepted: boolean
  error: boolean
  onChange: (value: boolean) => void
  errorMessage: string
  linkUrl: string
}

const DatenschutzCheckbox: React.FC<DatenschutzCheckboxProps> = ({
  accepted, error, onChange, errorMessage, linkUrl
}) => {
  const { t, i18n } = useTranslation()

  // Comprueba la cadena cruda de traducción para ver si incluye la etiqueta <link>
  const raw = i18n.getResource(i18n.language, 'translation', 'form.acceptDatenschutz') as string | undefined
  const translationContainsLinkTag = typeof raw === 'string' && raw.includes('<link')

  return (
    <div className="form-group checkbox">
      <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onChange(e.target.checked)}
        />

        {translationContainsLinkTag ? (
          // Si la traducción contiene <link> usamos Trans (renderizará el <a /> dentro)
          <Trans
            i18nKey="form.acceptDatenschutz"
            components={{
              link: <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            }}
          />
        ) : (
          // Si no, renderizamos texto + enlace explícito para que siempre haya un <a />
          <span>
            {t('form.acceptDatenschutz')}{' '}
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // evitar que el click en el link active/desactive el checkbox
                e.stopPropagation()
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              Datenschutzerklärung
            </a>
          </span>
        )}
      </label>

      {error && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default DatenschutzCheckbox