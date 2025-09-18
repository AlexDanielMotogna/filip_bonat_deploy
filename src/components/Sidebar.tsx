'use client'
import Hero from '@/assets/img/all-images/hero/hero-img1.png'
import Sicon1 from '@/assets/img/icons/s-icon1.svg'
import Sicon2 from '@/assets/img/icons/s-icon2.svg'
import Sicon3 from '@/assets/img/icons/s-icon3.svg'
import Sicon4 from '@/assets/img/icons/s-icon4.svg'
import Aos from 'aos'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { currentYear } from '../helper/constants'
import ContactModal from './ContactModal'
import { useTranslation } from 'react-i18next'

const SidebarPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    Aos.init({ duration: 1000, once: true })
    return () => {
      Aos.refresh()
    }
  }, [])

  return (
    <>
      <div className="reveal-item rounded img1 image-anime" data-aos="reveal-item">
        <div
          className="reveal-animation reveal-end reveal-primary aos"
          data-aos="reveal-end"
        />
        <img className="w-100" src={Hero} alt="image" />
      </div>

      <div className="space18" />
      <h3>Filip Bonat</h3>
      <div className="space16" />
      <p>{t('sidebar.description')}</p>

      <div className="space32" />
      <ul>
        <li>
          <Link to="tel:+436767857277">
            <img src={Sicon1} alt="Telefon" />
          </Link>
        </li>
        <li>
          <Link to="https://wa.me/+436767857277">
            <img src={Sicon2} alt="WhatsApp" />
          </Link>
        </li>
        <li>
          <Link to="mailto:info@filipbonat.com">
            <img src={Sicon3} alt="Email" />
          </Link>
        </li>
        <li>
          <a
            href="https://www.google.com/maps/place/Lagergasse+4,+8700+Leitendorf/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Sicon4} alt="Maps" />
          </a>
        </li>
      </ul>

      <div className="space44" />
      <div className="btn-area1 text-center">
        <button
          className="vl-btn1"
          onClick={() => setIsModalOpen(true)}
        >
          {t('sidebar.cta')}
        </button>
      </div>

      <div className="space30" />
      <p>© {currentYear} Filip Bonat. {t('sidebar.rights')}</p>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default SidebarPage
