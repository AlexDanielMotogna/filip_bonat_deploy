import React, { useState } from 'react'
import { FaHandPointer } from "react-icons/fa"
import { Link } from 'react-router-dom'
import AnfrageModal from '../../components/shared/AnfrageModal'
import SubcategoryModal from '../../components/shared/SubcategoryModal'
import TopNav from '../../components/TopNav'

const firmaCategories = [
  {
    id: 'betrieblich',
    title: 'Betriebliche Absicherung',
    icon: '',
    description: 'Schutz für Ihr Unternehmen',
    subcategories: [
      {
        id: 'betriebshaftpflicht',
        name: 'Betriebshaftpflicht',
        tabs: [
          {
            id: 'standard',
            name: 'Standard',
            unterlagen: ['Handelsregisterauszug', 'Gewerbeanmeldung', 'Jahresabschluss']
          },
          {
            id: 'erweitert',
            name: 'Erweitert',
            unterlagen: ['Betriebsbeschreibung', 'Mitarbeiterzahl', 'Umsatzprognose']
          }
        ]
      },
      {
        id: 'gebaeudeversicherung',
        name: 'Gebäudeversicherung',
        tabs: [
          {
            id: 'feuer',
            name: 'Feuerversicherung',
            unterlagen: ['Grundbuchauszug', 'Gebäudewert', 'Baupläne']
          },
          {
            id: 'elementar',
            name: 'Elementarschäden',
            unterlagen: ['Lageplan', 'Risikoanalyse', 'Versicherungswert']
          }
        ]
      }
    ]
  },
  {
    id: 'mitarbeiter',
    title: 'Mitarbeitervorsorge',
    icon: '',
    description: 'Benefits für Ihre Angestellten',
    subcategories: [
      {
        id: 'betriebliche-altersvorsorge',
        name: 'Betriebliche Altersvorsorge',
        tabs: [
          {
            id: 'direktversicherung',
            name: 'Direktversicherung',
            unterlagen: ['Mitarbeiterliste', 'Gehaltsstruktur', 'Versorgungsordnung']
          },
          {
            id: 'pensionskasse',
            name: 'Pensionskasse',
            unterlagen: ['Betriebsvereinbarung', 'Durchschnittsgehälter', 'Altersstruktur']
          }
        ]
      },
      {
        id: 'gruppenunfall',
        name: 'Gruppenunfallversicherung',
        tabs: [
          {
            id: 'basis',
            name: 'Basis-Schutz',
            unterlagen: ['Mitarbeiterzahl', 'Tätigkeitsbeschreibungen', 'Gefährdungsbeurteilung']
          },
          {
            id: 'premium',
            name: 'Premium-Schutz',
            unterlagen: ['Erweiterte Risikoanalyse', 'Unfallstatistik', 'Präventionsmaßnahmen']
          }
        ]
      }
    ]
  },
  {
    id: 'transport',
    title: 'Transport & Logistik',
    icon: '',
    description: 'Absicherung für Waren und Fahrzeuge',
    subcategories: [
      {
        id: 'transportversicherung',
        name: 'Transportversicherung',
        tabs: [
          {
            id: 'national',
            name: 'National',
            unterlagen: ['Transportvolumen', 'Warenarten', 'Transportwege']
          },
          {
            id: 'international',
            name: 'International',
            unterlagen: ['Exportlizenz', 'Zolldokumente', 'Incoterms']
          }
        ]
      },
      {
        id: 'fuhrpark',
        name: 'Fuhrparkversicherung',
        tabs: [
          {
            id: 'pkw',
            name: 'PKW-Flotte',
            unterlagen: ['Fahrzeugliste', 'Fahrerliste', 'Kilometerleistung']
          },
          {
            id: 'lkw',
            name: 'LKW-Flotte',
            unterlagen: ['Fahrzeugscheine', 'ADR-Bescheinigungen', 'Wartungsnachweise']
          }
        ]
      }
    ]
  },
  {
    id: 'cyber',
    title: 'Cyber & IT',
    icon: '',
    description: 'Digitale Risiken absichern',
    subcategories: [
      {
        id: 'cyberversicherung',
        name: 'Cyberversicherung',
        tabs: [
          {
            id: 'basis',
            name: 'Basis-Schutz',
            unterlagen: ['IT-Infrastruktur', 'Datenschutzkonzept', 'Notfallplan']
          },
          {
            id: 'komplett',
            name: 'Komplett-Schutz',
            unterlagen: ['Sicherheitsaudit', 'Compliance-Nachweis', 'Incident-Response-Plan']
          }
        ]
      },
      {
        id: 'elektronik',
        name: 'Elektronikversicherung',
        tabs: [
          {
            id: 'hardware',
            name: 'Hardware',
            unterlagen: ['Inventarliste', 'Anschaffungswerte', 'Wartungsverträge']
          },
          {
            id: 'software',
            name: 'Software & Lizenzen',
            unterlagen: ['Lizenzübersicht', 'Software-Inventar', 'Update-Politik']
          }
        ]
      }
    ]
  },
  {
    id: 'immobilien',
    title: 'Immobilien',
    icon: '',
    description: 'Gewerbeimmobilien für Unternehmen',
    subcategories: [
      {
        id: 'kaufen',
        name: 'Kaufen',
        tabs: [
          {
            id: 'standard',
            name: 'Gewerbeimmobilie kaufen',
            unterlagen: [
              'Handelsregisterauszug',
              'Gewerbeanmeldung',
              'Jahresabschluss (letzte 3 Jahre)',
              'BWA (letzte 12 Monate)',
              'Eigenkapitalnachweis',
              'Finanzierungsbestätigung',
              'Grundbuchauszug (falls vorhanden)',
              'Exposé der gewünschten Immobilie',
              'Nutzungskonzept',
              'Gesellschaftervertrag',
              'Steuerliche Unbedenklichkeitsbescheinigung'
            ]
          }
        ]
      },
      {
        id: 'verkaufen',
        name: 'Verkaufen',
        tabs: [
          {
            id: 'standard',
            name: 'Gewerbeimmobilie verkaufen',
            unterlagen: [
              'Handelsregisterauszug',
              'Grundbuchauszug',
              'Energieausweis',
              'Grundriss und Lagepläne',
              'Baubeschreibung',
              'Flächenberechnung',
              'Teilungserklärung (falls vorhanden)',
              'Nebenkostenabrechnungen (letzte 3 Jahre)',
              'Mietverträge (bei vermieteten Objekten)',
              'Instandhaltungsnachweis',
              'Brandschutznachweis',
              'Umweltgutachten (falls erforderlich)',
              'Verkehrswertgutachten'
            ]
          }
        ]
      }
    ]
  }
]

const FirmaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [setSelectedSubcategory] = useState<any>(null)
  const [showAnfrageModal, setShowAnfrageModal] = useState(false)
  const [selectedUnterlagen, setSelectedUnterlagen] = useState<string[]>([])
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>('')
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState<string>('')


  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category)
  }

  const handleSubcategorySelect = (subcategory: any) => {
    setSelectedSubcategory(subcategory)
  }

  const handleAnfrageClick = (unterlagen: string[], categoryTitle: string, subcategoryName: string) => {
    setSelectedUnterlagen(unterlagen)
    setSelectedCategoryTitle(categoryTitle)
    setSelectedSubcategoryName(subcategoryName)
    setShowAnfrageModal(true)
  }

  return (
    <>
      <div className="body1">
        <TopNav />
        <div className="firma-page-area">
          <div className="container">
            <div className="page-header">
              <h1>
                Firma<span>kunden</span>
              </h1>
              <p>
                Professionelle Versicherungslösungen für Ihr Unternehmen
              </p>
            </div>


            <div className="category-grid">
              {firmaCategories.map((category) => (
                <div
                  key={category.id}
                  className="category-card clickable"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <span className="click-hint">
                    <FaHandPointer />
                  </span>
                </div>
              ))}
            </div>

            <div className="business-features">
              <div className="page-header">
                <h2>Warum Unternehmen uns vertrauen</h2>
              </div>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-">⚡</div>
                  <h4>Schnelle Bearbeitung</h4>
                  <p>Ihre Anfragen werden binnen 24h bearbeitet</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"></div>
                  <h4>Maßgeschneidert</h4>
                  <p>Individuelle Lösungen für Ihr Unternehmen</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"></div>
                  <h4>Persönlicher Service</h4>
                  <p>Direkter Kontakt zu Ihrem Berater</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"></div>
                  <h4>Transparente Kosten</h4>
                  <p>Keine versteckten Gebühren</p>
                </div>
              </div>
            </div>

            {/* House Listings Section */}
            <div className="house-listings-section">
              <div className="page-header">
                <h2>Immobilien zum Kauf</h2>
                <p>Entdecken Sie verfügbare Gewerbeimmobilien</p>
              </div>
              <div className="house-listings-link">
                <a
                  href="https://www.willhaben.at/iad/immobilien/gewerbe-industrie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="house-link-btn"
                >
                  🏢 Gewerbeimmobilien auf Willhaben ansehen
                </a>
                <p className="link-description">
                  Klicken Sie hier, um aktuelle Gewerbeimmobilien zu durchsuchen
                </p>
              </div>
            </div>

            <div className="navigation-area">
              <Link to="/privat" className="nav-btn">
                Zu Privatkunden →
              </Link>
            </div>
          </div>

          {/* Subcategory Modal */}
          {selectedCategory && (
            <SubcategoryModal
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
              onSubcategorySelect={handleSubcategorySelect}
              onAnfrageClick={handleAnfrageClick}
            />
          )}

          {/* Anfrage Modal */}
          {showAnfrageModal && (
            <AnfrageModal
              unterlagen={selectedUnterlagen}
              category={selectedCategoryTitle}
              subcategory={selectedSubcategoryName}
              onClose={() => setShowAnfrageModal(false)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default FirmaPage
