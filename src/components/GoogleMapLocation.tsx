import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo1 from '../assets/img/logo/logo1.png';
import { currentYear } from '@/helper/constants';

const GoogleMapLocation: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <iframe
        title="Ubicación en Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.0654162825685!2d15.08384651209704!3d47.37164170405259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4771de69b3515801%3A0x24d62d3d5ca66e19!2sLagergasse%204%2C%208700%20Leitendorf!5e0!3m2!1ses!2sat!4v1757504230178!5m2!1ses!2sat"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div>
        <Col lg={12}>
          <div className="space50" />
          <div className="footer-area">
            <div className="btn-area1">
              <Link to="/">
                <img src={Logo1} alt="" />
              </Link>
            </div>
            <p>© {currentYear} Filip Bonat. Alle Rechte vorbehalten.</p>
          </div>
        </Col>
      </div>
    </div>

  );
};

export default GoogleMapLocation;
