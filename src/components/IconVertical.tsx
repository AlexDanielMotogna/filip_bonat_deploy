'use client'
import { useEffect, useState } from 'react'

const IconVertical = () => {
  const [activeSection, setActiveSection] = useState('Startseite')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Check for modal overlays
    const checkForModals = () => {
      const modalOverlays = document.querySelectorAll('.modal-overlay, .contact-modal-overlay, .modal')
      setIsModalOpen(modalOverlays.length > 0)
    }

    // Initial check
    checkForModals()

    // Create observer to watch for modal changes
    const observer = new MutationObserver(checkForModals)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Use the actual HTML IDs that exist in the page
      const sections = ['Startseite', 'Übermich', 'Leistungen', 'Kompetenzen', 'Bewertungen', 'Kontakt']
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Set initial active section
    handleScroll()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)

    // Smooth scroll to section using the actual HTML ID
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'Startseite', label: 'STARTSEITE' },
    { id: 'Übermich', label: 'ÜBER MICH' },
    { id: 'Leistungen', label: 'LEISTUNGEN' },
    { id: 'Kompetenzen', label: 'KOMPETENZEN' },
    { id: 'Bewertungen', label: 'BEWERTUNGEN' },
    { id: 'Kontakt', label: 'KONTAKT' }
  ]

  // Don't render the menu if a modal is open
  if (isModalOpen) {
    return null
  }

  return (
    <div className="vertical-nav-container">
      <nav className="vertical-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(item.id)
            }}
          >
            <span className="nav-text">{item.label}</span>
            <div className="nav-indicator"></div>
          </a>
        ))}
      </nav>
    </div>
  )
}

export default IconVertical
