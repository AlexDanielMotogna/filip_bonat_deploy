import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SubcategoryModalProps {
  category: {
    id: string
    title: string
    subcategories: Array<{
      id: string
      name: string
      tabs: Array<{
        id: string
        name: string
        unterlagen: string[]
      }>
    }>
  }
  onClose: () => void
  onSubcategorySelect: (subcategory: any) => void
  onAnfrageClick: (unterlagen: string[], categoryTitle: string, subcategoryName: string) => void
}

const SubcategoryModal: React.FC<SubcategoryModalProps> = ({
  category,
  onClose,
  onAnfrageClick
}) => {
  const { t } = useTranslation()

  const [selectedSubcategory, setSelectedSubcategory] = useState(category.subcategories[0])
  const [activeTab, setActiveTab] = useState(selectedSubcategory.tabs[0])

  const handleSubcategoryChange = (subcategory: any) => {
    setSelectedSubcategory(subcategory)
    setActiveTab(subcategory.tabs[0])
  }

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal subcategory-modal-content">
        <div className="modal-header">
          <div className="header-content">
            <h2>
              <span className="business-icon">{category.title.includes('Firma')}</span>
              {category.title} {t("Optionen")}
            </h2>
            <p>Wählen Sie Ihre gewünschte Option und starten Sie Ihre Anfrage</p>
          </div>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Subcategory Selection */}
          <div className="subcategory-tabs">
            {category.subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => handleSubcategoryChange(subcategory)}
                className={`tab-btn ${selectedSubcategory.id === subcategory.id ? 'active' : ''}`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>

          {/* Tabs within Subcategory */}
          <div className="subcategory-tabs">
            {selectedSubcategory.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab.id === tab.id ? 'active' : ''}`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Unterlagen Section */}
          <div className="unterlagen-list">
            <h3>{t("Benötigte Unterlagen")}</h3>
            <ul>
              {activeTab.unterlagen.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onAnfrageClick(activeTab.unterlagen, category.title, selectedSubcategory.name)}
            className="action-btn"
          >
            <span>{t("Anfrage starten")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubcategoryModal
