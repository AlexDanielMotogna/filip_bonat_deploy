'use client'
import Mail1 from '@/assets/img/icons/mail1.svg'
import Sublogo from '@/assets/img/icons/sublogo1.svg'
import Aos from 'aos'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Contact = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    })
    return () => {
      Aos.refresh()
    }
  }, [])
  return (
    <>
      <div id="Kontakt">
        <div className="contact-section-area">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="contact-heading heading1">
                  <h5 data-aos="fade-left" data-aos-duration={900}>
                    <img src={Sublogo} alt="" />
                    Kontakt
                  </h5>
                  <div className="space24" />
                  <h2 data-aos="fade-left" data-aos-duration={1000}>
                    Haben Sie Fragen oder ein Projekt?
                  </h2>
                  <div className="space24" />
                </div>
                <div className="space50" />
                <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
                  <h3>Lassen Sie uns zusammenarbeiten!</h3>
                  <div className="space12" />
                  <Row>
                    <Col lg={6} md={6}>
                      <div className="input-area">
                        <input type="text" placeholder="Vollständiger Name" />
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="input-area">
                        <input type="email" placeholder="E-Mail-Adresse" />
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="input-area">
                        <input type="number" placeholder="Telefonnummer" />
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="input-area">
                        <input type="text" placeholder="Betreff" />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="input-area">
                        <input type="text" placeholder="Ihr Budget (optional)" />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="input-area">
                        <textarea placeholder="Nachricht" />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="input-area">
                        <button type="submit" className="vl-btn1">
                          Senden <img src={Mail1} alt="" />
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Contact
