'use client'
import Aos from 'aos'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const Main = () => {
  const navigate = useNavigate()
  const [loadingPath, setLoadingPath] = useState<string | null>(null)
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    })
    return () => {
      Aos.refresh()
    }
  }, [])

  const handleNavigate = (path: string) => {
    if (loadingPath) return
    setLoadingPath(path)
    setTimeout(() => {
      navigate(path)
      setLoadingPath(null)
    }, 1000)
  }

  return (
    <div id="Startseite">
      <div className="hero-heading-area heading1 text-left">
        <div className="space24" />

        {/* H1 unificado */}
        <h1 data-aos="fade-left" data-aos-duration={900}>
          {t("Individuelle Finanzberatung, die")} <span>{t("Vertrauen")}</span> {t("schafft")}
        </h1>

        <div className="space32" />
        <div className="space32" />

        {/* Subheadline corta */}
        <h3 className="subheadline" data-aos="fade-left" data-aos-duration={1100}>
          {t("Sind Sie Privat oder Firmenkunde?")}
        </h3>

        {/* Botones */}
        <div
          className="main-btn-area small-buttons"
          data-aos="fade-up"
          data-aos-duration={2200}
        >
          <button
            type="button"
            onClick={() => handleNavigate("/privat")}
            className="btn btn-privat btn-sm"
            disabled={!!loadingPath}
          >
            {loadingPath === "/privat" ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                {t("loading")}
              </>
            ) : (
              t("privat")
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/firma")}
            className="btn btn-firma btn-sm"
            disabled={!!loadingPath}
          >
            {loadingPath === "/firma" ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                {t("loading")}
              </>
            ) : (
              t("firma")
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Main
