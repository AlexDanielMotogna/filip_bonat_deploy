import { Col, Container, Row } from 'react-bootstrap'
import About from '../../components/About'
import Contact from '../../components/Contact'
import GoogleMapLocation from '../../components/GoogleMapLocation'
import IconVertical from '../../components/IconVertical'
import Main from '../../components/Main'
import Service from '../../components/Service'
import SidebarPage from '../../components/Sidebar'
import Skills from '../../components/Skills'
import Testimonial from '../../components/Testimonials'
import TopNav from '../../components/TopNav'

const HomePage = () => {
  return (
    <>
      <div className="body1">
        <TopNav />
        <IconVertical />
        <div className="main-hero-area parallaxie">
          <Container>
            <Row>
              <Col lg={4}>
                <div className="personal-contact-box" data-aos="fade-right" data-aos-duration={1000}>
                  <SidebarPage />
                </div>
              </Col>
              <Col lg={8}>
                <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex={0}>
                  <Main />
                  <div className="space50" />
                  <Service />
                  <div className="space50" />
                  <About />
                  <div className="space50" />
                  <Skills />
                  <div className="space30" />
                  <Testimonial />
                  <div className="space30" />
                  <Contact />
                  <div className="space30" />
                  <GoogleMapLocation />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default HomePage
