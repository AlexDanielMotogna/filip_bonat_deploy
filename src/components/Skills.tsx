'use client'
import Skill1 from '@/assets/img/all-images/skills/skill1.png'
import Skill2 from '@/assets/img/all-images/skills/skill2.png'
import Skill3 from '@/assets/img/all-images/skills/skill3.png'
import Skill4 from '@/assets/img/all-images/skills/skill4.png'
import Skill5 from '@/assets/img/all-images/skills/skill5.png'
import Skill6 from '@/assets/img/all-images/skills/skill6.png'
import Sublogo1 from '@/assets/img/icons/sublogo1.svg'
import Aos from 'aos'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'

const Skills = () => {
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
      <div id="Kompetenzen">
        <div className="skill-section-area">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="skill-header heading1">
                  <h5 data-aos="fade-left" data-aos-duration={800}>
                    <img src={Sublogo1} alt="" />
                    {t('skills.title')}
                  </h5>
                  <div className="space24" />
                  <h2 data-aos="fade-left" data-aos-duration={1000}>
                    {t('skills.subtitle1')}
                  </h2>
                  <div className="space24" />
                  <h2 className="head" data-aos="fade-left" data-aos-duration={1100}>
                    <span>{t('skills.subtitle2')}</span>
                  </h2>
                </div>
                <div className="space80" />
                <Row>
                  <Col lg={4} md={6} data-aos="zoom-out" data-aos-duration={900}>
                    <div className="skill-boxarea">
                      <div className="icons">
                        <img src={Skill1} alt={t('skills.skill1.alt')} />
                      </div>
                      <div className="space24" />
                      <h3>
                        <span className="counter">
                          <CountUp duration={3} start={0} end={100} />
                        </span>%
                      </h3>
                      <div className="space16" />
                      <p>{t('skills.skill1.text')}</p>
                    </div>
                  </Col>

                  <Col lg={4} md={6} data-aos="zoom-out" data-aos-duration={1000}>
                    <div className="skill-boxarea">
                      <div className="icons">
                        <img src={Skill2} alt={t('skills.skill2.alt')} />
                      </div>
                      <div className="space24" />
                      <h3>
                        <span className="counter">
                          <CountUp duration={3} start={0} end={95} />
                        </span>%
                      </h3>
                      <div className="space16" />
                      <p>{t('skills.skill2.text')}</p>
                    </div>
                  </Col>

                  <Col lg={4} md={6} data-aos="zoom-out" data-aos-duration={1100}>
                    <div className="skill-boxarea">
                      <div className="icons">
                        <img src={Skill3} alt={t('skills.skill3.alt')} />
                      </div>
                      <div className="space24" />
                      <h3>
                        <span className="counter">
                          <CountUp duration={3} start={0} end={90} />
                        </span>%
                      </h3>
                      <div className="space16" />
                      <p>{t('skills.skill3.text')}</p>
                    </div>
                  </Col>

                  <Col lg={4} md={6} data-aos="zoom-out" data-aos-duration={1200}>
                    <div className="skill-boxarea">
                      <div className="icons">
                        <img src={Skill4} alt={t('skills.skill4.alt')} />
                      </div>
                      <div className="space24" />
                      <h3>
                        <span className="counter">
                          <CountUp duration={3} start={0} end={89} />
                        </span>%
                      </h3>
                      <div className="space16" />
                      <p>{t('skills.skill4.text')}</p>
                    </div>
                  </Col>

                  <Col lg={4} md={6} data-aos="zoom-out" data-aos-duration={1000}>
                    <div className="skill-boxarea">
                      <div className="icons">
                        <img src={Skill5} alt={t('skills.skill5.alt')} />
                      </div>
                      <div className="space24" />
                      <h3>
                        <span className="counter">
                          <CountUp duration={3} start={0} end={92} />
                        </span>%
                      </h3>
                      <div className="space16" />
                      <p>{t('skills.skill5.text')}</p>
                    </div>
                  </Col>

                  <Col lg={4} md={6} data-aos="zoom-out" data-aos-duration={1100}>
                    <div className="skill-boxarea">
                      <div className="icons">
                        <img src={Skill6} alt={t('skills.skill6.alt')} />
                      </div>
                      <div className="space24" />
                      <h3>
                        <span className="counter">
                          <CountUp duration={3} start={0} end={85} />
                        </span>%
                      </h3>
                      <div className="space16" />
                      <p>{t('skills.skill6.text')}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Skills
