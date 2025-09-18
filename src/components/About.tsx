'use client'
import Home2 from '@/assets/img/icons/home2.svg'
import Home3 from '@/assets/img/icons/home3.svg'
import Home4 from '@/assets/img/icons/home4.svg'
import Home5 from '@/assets/img/icons/home5.svg'
import Sicon1 from '@/assets/img/icons/s-icon1.svg'
import Sicon2 from '@/assets/img/icons/s-icon2.svg'
import Sicon3 from '@/assets/img/icons/s-icon3.svg'
import Sublogo1 from '@/assets/img/icons/sublogo1.svg'
import Aos from 'aos'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

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
      <div id="Übermich">
        <div className="about-section-area">
          <div className="heading1">
            <h5 data-aos="fade-left" data-aos-duration={800}>
              <img src={Sublogo1} alt="" />
              {t("Über mich")}
            </h5>
            <div className="space24" />
            <h1 data-aos="fade-left" data-aos-duration={1000}>
              {t("Kompetente Beratung")}
            </h1>
            <div className="space24" />
            <h1 className="head" data-aos="fade-left" data-aos-duration={1100}>
              {t("für")} <span>{t("Ihre Sicherheit")}</span>
            </h1>
          </div>
          <div className="space60" />
          <div className="about-boxarea">
            <Row>
              <Col lg={12} data-aos="fade-left" data-aos-duration={1200}>
                <div className="about-main-boxes">
                  <h4>{t("Filip Bonat")}</h4>
                  <div className="space24" />
                  <p>
                    {t("intro_filip")}
                    <br />
                    {t("goal_filip")}
                  </p>
                </div>
              </Col>

              {/* Box 1 */}
              <Col lg={6} md={6} data-aos="fade-up" data-aos-duration={900}>
                <div className="about-boxes2">
                  <img src={Home2} alt="" />
                  <div className="content-area">
                    <h4>{t("Vertrauensvolle Beratung")}</h4>
                    <div className="space16" />
                    <p>{t("trust_text")}</p>
                  </div>
                </div>
              </Col>

              {/* Box 2 */}
              <Col lg={6} md={6} data-aos="fade-up" data-aos-duration={1000}>
                <div className="about-boxes2">
                  <img src={Home3} alt="" />
                  <div className="content-area">
                    <h4>{t("Transparente Kommunikation")}</h4>
                    <div className="space16" />
                    <p>{t("clear_text")}</p>
                  </div>
                </div>
              </Col>

              {/* Box 3 */}
              <Col lg={6} md={6} data-aos="fade-up" data-aos-duration={1100}>
                <div className="about-boxes2">
                  <img src={Home4} alt="" />
                  <div className="content-area">
                    <h4>{t("Ganzheitlicher Ansatz")}</h4>
                    <div className="space16" />
                    <p>{t("holistic_text")}</p>
                  </div>
                </div>
              </Col>

              {/* Box 4 */}
              <Col lg={6} md={6} data-aos="fade-up" data-aos-duration={1200}>
                <div className="about-boxes2">
                  <img src={Home5} alt="" />
                  <div className="content-area">
                    <h4>{t("Digitale Kompetenz")}</h4>
                    <div className="space16" />
                    <p>{t("digital_text")}</p>
                  </div>
                </div>
              </Col>

              <div className="soace20" />

              {/* Berufserfahrung */}
              <Col lg={6} md={6}>
                <h3>{t("Berufserfahrung")}</h3>
                <div className="space32" />
                <div className="about-others-box" data-aos="zoom-in" data-aos-duration={900}>
                  <Link to="">{t("seit 2020")}</Link>
                  <div className="space16" />
                  <h4>
                    <Link to="">{t("Versicherungsexperte")}</Link>
                  </h4>
                  <div className="space16" />
                  <p>Finova</p>
                  <div className="space32" />
                  <Link to="">{t("Beratung in allen Versicherungsfragen")} <br />
                    {t("Risikoanalyse und maßgeschneiderte Policen")} <br />
                    {t("Betreuung von Privat- und Firmenkunden")}
                  </Link>
                </div>

                <div className="about-others-box text-center" data-aos="zoom-in" data-aos-duration={1000}>
                  <h4>{t("Stay With Me")}</h4>
                  <div className="space18" />
                  <ul>
                    <li><Link to=""><img src={Sicon1} alt="" /></Link></li>
                    <li><Link to=""><img src={Sicon2} alt="" /></Link></li>
                    <li><Link to=""><img src={Sicon3} alt="" /></Link></li>
                  </ul>
                </div>
              </Col>

              {/* Ausbildung */}
              <Col lg={6} md={6}>
                <h3>{t("Ausbildung")}</h3>
                <div className="space32" />
                <div className="about-others-box" data-aos="zoom-in" data-aos-duration={1100}>
                  <Link to="">{t("2010 - 2013")}</Link>
                  <div className="space16" />
                  <h4>
                    <Link to="">{t("Zertifizierter Versicherungsberater (WKO)")}</Link>
                  </h4>
                  <div className="space16" />
                  <p>Graz</p>
                  <div className="space32" />
                  <Link to="">{t("2013 - 2015")}</Link>
                  <div className="space16" />
                  <h4>
                    <Link to="">{t("Österreichische Finanzakademie")}</Link>
                  </h4>
                  <div className="space16" />
                  <p>Graz</p>
                </div>
              </Col>

              <div className="space20" />
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
