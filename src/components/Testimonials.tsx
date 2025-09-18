'use client'
import TestimonialsImg from '@/assets/img/all-images/testimonials/tesi-img1.png'
import TestimonialsImg2 from '@/assets/img/all-images/testimonials/tesi-img2.png'
import TestimonialsImg3 from '@/assets/img/all-images/testimonials/tesi-img3.png'
import Sublogo1 from '@/assets/img/icons/sublogo1.svg'
import Aos from 'aos'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Testimonial = () => {
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
      <div id="Bewertungen">
        <div className="testimonial-section-area">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="testimonial-header heading1">
                  <h5 data-aos="fade-left" data-aos-duration={900}>
                    <img src={Sublogo1} alt="" />
                    Stimmen
                  </h5>
                  <div className="space24" />
                  <h2 data-aos="fade-left" data-aos-duration={1000}>
                    Was Kund:innen
                  </h2>
                  <div className="space24" />
                </div>
                <div className="space60" />
              </Col>
              <Col lg={7} md={6} data-aos="zoom-in" data-aos-duration={900}>
                <div className="testimonial-boxarea">
                  <div className="list">
                    <ul>
                      {[...Array(5)].map((_, i) => (
                        <li key={i}><FaStar className="fa-solid" /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="space20" />
                  <p>
                    "Die Zusammenarbeit mit Herrn Bonat war außergewöhnlich. Seine Fachkompetenz und klare Kommunikation haben uns geholfen, unsere Versicherungen neu zu strukturieren. Sehr empfehlenswert!"
                  </p>
                  <div className="space24" />
                  <div className="mans-area">
                    <div className="man">
                      <img src={TestimonialsImg} alt="" />
                    </div>
                    <div className="content">
                      <Link to="">David Elson</Link>
                      <p>Unternehmer</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={5} md={6} data-aos="zoom-in" data-aos-duration={1000}>
                <div className="testimonial-boxarea">
                  <div className="list">
                    <ul>
                      {[...Array(5)].map((_, i) => (
                        <li key={i}><FaStar className="fa-solid" /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="space20" />
                  <p>
                    "Filip Bonat hat uns durch den Versicherungsdschungel geführt und dabei auf unsere individuelle Situation Rücksicht genommen. So geht Kundenservice!"
                  </p>
                  <div className="space24" />
                  <div className="mans-area">
                    <div className="man">
                      <img src={TestimonialsImg2} alt="" />
                    </div>
                    <div className="content">
                      <Link to="">Chris Glasser</Link>
                      <p>Freiberufler</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={5} md={6} data-aos="zoom-in" data-aos-duration={1100}>
                <div className="testimonial-boxarea">
                  <div className="list">
                    <ul>
                      {[...Array(5)].map((_, i) => (
                        <li key={i}><FaStar className="fa-solid" /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="space20" />
                  <p>
                    "Kompetent, freundlich und immer erreichbar – dank seiner Hilfe habe ich jetzt eine maßgeschneiderte Absicherung für mein Unternehmen."
                  </p>
                  <div className="space24" />
                  <div className="mans-area">
                    <div className="man">
                      <img src={TestimonialsImg3} alt="" />
                    </div>
                    <div className="content">
                      <Link to="">Rodger Struck</Link>
                      <p>Selbstständiger</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={7} md={6} data-aos="zoom-in" data-aos-duration={1200}>
                <div className="testimonial-boxarea">
                  <div className="list">
                    <ul>
                      {[...Array(5)].map((_, i) => (
                        <li key={i}><FaStar className="fa-solid" /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="space20" />
                  <p>
                    "Ich fühlte mich jederzeit gut beraten. Filip hat mir geholfen, Klarheit in meine bestehenden Verträge zu bringen und unnötige Kosten zu vermeiden."
                  </p>
                  <div className="space24" />
                  <div className="mans-area">
                    <div className="man">
                      <img src={TestimonialsImg3} alt="" />
                    </div>
                    <div className="content">
                      <Link to="">Mary Freund</Link>
                      <p>Privatkundin</p>
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

export default Testimonial
