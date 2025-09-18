'use client'
import Portfolio1 from '@/assets/img/all-images/portfolio/portfolio-img1.png'
import Portfolio2 from '@/assets/img/all-images/portfolio/portfolio-img2.png'
import Portfolio3 from '@/assets/img/all-images/portfolio/portfolio-img3.png'
import Portfolio4 from '@/assets/img/all-images/portfolio/portfolio-img4.png'
import Sublogo1 from '@/assets/img/icons/sublogo1.svg'
import Aos from 'aos'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Portfolio = () => {
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
      <div id="list-item-5">
        <div className="portfolio-section-area">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="portfolio-header heading1">
                  <h5 data-aos="fade-left" data-aos-duration={800}>
                    <img src={Sublogo1} alt="" />
                    My Portfolio
                  </h5>
                  <div className="space24" />
                  <h2 data-aos="fade-left" data-aos-duration={1000}>
                    Innovation Designs
                  </h2>
                  <div className="space24" />
                  <h2 className="head" data-aos="fade-left" data-aos-duration={1100}>
                    Real <span>Results</span>
                  </h2>
                </div>
              </Col>
              <div className="space50" />
              <Col lg={12} data-aos="fade-left" data-aos-duration={1000}>
                <div className="portfolio-boxarea click-here">
                  <div className="img1">
                    <Link to="">
                      <img src={Portfolio1} alt="" />
                    </Link>
                  </div>
                  <div className="space24" />
                  <Link to="">Reelup - E commercer Video Platform</Link>
                </div>
              </Col>
              <Col lg={6} md={6} data-aos="fade-left" data-aos-duration={1100}>
                <div className="portfolio-boxarea2 click-here">
                  <div className="img1">
                    <Link to="">
                      <img src={Portfolio3} alt="" />
                    </Link>
                  </div>
                  <div className="space24" />
                  <Link to="">Academy - Sales Career</Link>
                </div>
              </Col>
              <Col lg={6} md={6} data-aos="fade-left" data-aos-duration={1200}>
                <div className="portfolio-boxarea2 click-here">
                  <div className="img1">
                    <Link to="">
                      <img src={Portfolio4} alt="" />
                    </Link>
                  </div>
                  <div className="space24" />
                  <Link to="">Leadlogic- Dashboard Design</Link>
                </div>
              </Col>
              <div className="col-lg-12" data-aos="fade-left" data-aos-duration={1100}>
                <div className="portfolio-boxarea click-here">
                  <div className="img1">
                    <Link to="">
                      <img src={Portfolio2} alt="" />
                    </Link>
                  </div>
                  <div className="space24" />
                  <Link to="">Reelup - E commercer Video Platform</Link>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Portfolio
