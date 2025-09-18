'use client'
import Bars from '@/assets/img/icons/bars-icons1.svg'
import Logo from '@/assets/img/logo/logo1.png'
import Logo2 from '@/assets/img/logo/logo2.png'
import { useState } from 'react'
import { Col, Container, Offcanvas, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import KreditrechnerModal from './KreditrechnerModal'
import SchadenMeldungModal from './SchadenMeldungModal'

const TopNav = () => {
  const { i18n, t } = useTranslation()
  const [show, setShow] = useState(false)
  const [showKreditModal, setShowKreditModal] = useState(false)
  const [showSchadenModal, setShowSchadenModal] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <header>
        <div className="header-area homepage1 header header-sticky " id="header">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="header-elements">
                  <div className="site-logo">
                    <Link to="/">
                      <img src={Logo} alt="" />
                    </Link>
                  </div>

                  {/* Quick Actions in Top Navbar - Visible on desktop */}
                  <div className="quick-actions-top d-none d-lg-flex gap-4 align-items-center">
                    <a href="#" onClick={() => setShowKreditModal(true)}>
                      {t('KREDITRECHNER')}
                    </a>
                    <a href="#">
                      {t('DOKUMENTE HOCHLADEN')}
                    </a>
                    <a href="#" onClick={() => setShowSchadenModal(true)}> {/* ← Cambia este */}
                      {t('SCHADENMELDUNG')}
                    </a>
                  </div>

                  <div className="btn-area d-lg-flex gap-3 align-items-center">
                    <select
                      onChange={(e) => changeLanguage(e.target.value)}
                      defaultValue={i18n.language}
                      className="lang-select"
                    >
                      <option value="de">DE</option>
                      {/*  <option value="en">EN</option>
                      <option value="es">ES</option>
                      <option value="pl">PL</option>
                      <option value="hr">HR</option>
                      <option value="hu">HU</option>
                      <option value="ro">RO</option>
                      <option value="sk">SK</option>
                      <option value="sl">SL</option> */}
                    </select>
                    <button
                      onClick={handleShow}
                      className="hamburger_menu"
                      data-bs-toggle="offcanvas"
                      role="button"
                      aria-controls="offcanvasMenu"
                    >
                      <img src={Bars} alt="" />
                    </button>
                  </div>
                </div>

                {/* Quick Actions for Mobile - Visible below navbar on mobile */}
                <div className="quick-actions-mobile d-lg-none mt-3">
                  <div className="d-flex justify-content-around">
                    <a href="#" onClick={() => setShowKreditModal(true)} className="quick-action-item">
                      {t('KREDITRECHNER')}
                    </a>
                    <a href="#" className="quick-action-item">
                      {t('UNTERLAGE HOCHLADEN')}
                    </a>
                    <a href="#" onClick={() => setShowSchadenModal(true)} className="quick-action-item">
                      {t('SCHADENMELDUNG')}
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </header>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        scroll={true}
        className="header-site-icon"
      >
        <div className="slide-bar slide-bar1" style={{ padding: '50px' }}>
          <div className="sidebar-info">
            <div className="sidebar-logo">
              <Link to="/">
                <img src={Logo2} alt="logo" />
              </Link>
            </div>

            {/* Quick Actions Section - Featured Box */}
            <div className="space24" />
            <div className="quick-actions-featured">
              <div className="featured-header">
                <h3 className="featured-title">SCHNELLZUGRIFF</h3>
                <p className="featured-subtitle">Direkter Zugang zu wichtigen Services</p>
              </div>
              <div className="featured-actions">
                <button
                  className="featured-action-btn kredit-btn"
                  onClick={() => {
                    setShowSchadenModal(false)
                    setShowKreditModal(true)
                  }}
                >
                  <div className="action-content">
                    <span className="action-title">{t('KREDITRECHNER')}</span>
                    <span className="action-desc">Berechnen Sie Ihren Kredit</span>
                  </div>
                </button>
                <button className="featured-action-btn upload-btn">
                  <div className="action-content">
                    <span className="action-title">{t('UNTERLAGE HOCHLADEN')}</span>
                    <span className="action-desc">Dokumente sicher übertragen</span>
                  </div>
                </button>
                <button
                  className="featured-action-btn schaden-btn"
                  onClick={() => {
                    setShowKreditModal(false)
                    setShowSchadenModal(true)
                  }}
                >
                  <div className="action-content">
                    <span className="action-title">{t('SCHADENMELDUNG')}</span>
                    <span className="action-desc">Schaden schnell melden</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Main Navigation Menu */}
            <div className="main-navigation">
              <h4 className="nav-section-title">Navigation</h4>
              <div className="nav-divider"></div>
              <ul className="main-nav-list">
                <li>
                  <a
                    href="#Startseite"
                    className="nav-link"
                    onClick={() => {
                      setShowKreditModal(false)
                      setShowSchadenModal(false)
                    }}
                  >
                    {t('Startseite')}
                  </a>
                </li>
                <li>
                  <a
                    href="#Übermich"
                    className="nav-link"
                    onClick={() => {
                      setShowKreditModal(false)
                      setShowSchadenModal(false)
                    }}
                  >
                    {t('Übermich')}
                  </a>
                </li>
                <li>
                  <a
                    href="#Leistungen"
                    className="nav-link"
                    onClick={() => {
                      setShowKreditModal(false)
                      setShowSchadenModal(false)
                    }}
                  >
                    {t('Leistungen')}
                  </a>
                </li>
                <li>
                  <a
                    href="#Kompetenzen"
                    className="nav-link"
                    onClick={() => {
                      setShowKreditModal(false)
                      setShowSchadenModal(false)
                    }}
                  >
                    {t('Kompetenzen')}
                  </a>
                </li>
                <li>
                  <a
                    href="#Bewertungen"
                    className="nav-link"
                    onClick={() => {
                      setShowKreditModal(false)
                      setShowSchadenModal(false)
                    }}
                  >
                    {t('Bewertungen')}
                  </a>
                </li>
                <li>
                  <a
                    href="#Kontakt"
                    className="nav-link"
                    onClick={() => {
                      setShowKreditModal(false)
                      setShowSchadenModal(false)
                    }}
                  >
                    {t('Kontakt')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Offcanvas>

      {/* Kreditrechner Modal */}
      <KreditrechnerModal
        isOpen={showKreditModal}
        onClose={() => setShowKreditModal(false)}
      />
      {/* Schadenmeldung Modal */}
      <SchadenMeldungModal
        show={showSchadenModal}
        onClose={() => setShowSchadenModal(false)}
      />
    </>
  )
}

export default TopNav
