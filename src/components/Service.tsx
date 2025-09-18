'use client'
import Sublog1 from '@/assets/img/icons/sublogo1.svg'
import Aos from 'aos'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Service = () => {
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
      <div id="Leistungen">
        <div className="service-section-area">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="service-header heading1">
                  <h5 data-aos="fade-left" data-aos-duration={800}>
                    <img src={Sublog1} alt="" />
                    {t("services.title")}
                  </h5>
                  <div className="space24" />
                  <h2 data-aos="fade-left" data-aos-duration={1000}>
                    {t("services.subtitle1")}
                  </h2>
                  <div className="space24" />
                  <h2 className="head" data-aos="fade-left" data-aos-duration={1100}>
                    {t("services.subtitle2")} <span>{t("services.subtitle2_span")}</span>
                  </h2>
                  <div className="space50" />

                  {/* Box 1 */}
                  <div className="div" data-aos="fade-left" data-aos-duration={900}>
                    <div className="service-main-boxes">
                      <h4>{t("services.box1.title")}</h4>
                      <div className="space24" />
                      <p>{t("services.box1.text")}</p>
                    </div>
                  </div>

                  <div className="space30" />

                  {/* Box 2 */}
                  <div className="div" data-aos="fade-left" data-aos-duration={1000}>
                    <div className="service-main-boxes">
                      <h4>{t("services.box2.title")}</h4>
                      <div className="space24" />
                      <p>{t("services.box2.text")}</p>
                    </div>
                  </div>

                  <div className="space30" />

                  {/* Box 3 */}
                  <div className="div" data-aos="fade-left" data-aos-duration={1100}>
                    <div className="service-main-boxes">
                      <h4>{t("services.box3.title")}</h4>
                      <div className="space24" />
                      <p>{t("services.box3.text")}</p>
                    </div>
                  </div>

                  <div className="space30" />

                  {/* Box 4 */}
                  <div className="div" data-aos="fade-left" data-aos-duration={1200}>
                    <div className="service-main-boxes">
                      <h4>{t("services.box4.title")}</h4>
                      <div className="space24" />
                      <p>{t("services.box4.text")}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Service
