import React, { useState } from 'react'
import { FaHandPointer } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AnfrageModal from '../../components/shared/AnfrageModal'
import SubcategoryModal from '../../components/shared/SubcategoryModal'
import TopNav from '../../components/TopNav'
import { privatCategories } from '../../data/privatCategories'
import type { Category } from '../../types/categories'

const PrivatPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [setSelectedSubcategory] = useState<any>(null)
  const [showAnfrageModal, setShowAnfrageModal] = useState(false)
  const [selectedUnterlagen, setSelectedUnterlagen] = useState<string[]>([])
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>('')
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState<string>('')

  const { t } = useTranslation();

  const handleCategoryClick = (category: Category) => {
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
        <div className="privat-page-area">
          <div className="container">
            <div className="page-header">
              <h1>
                {t('Privat')}<span>{t('kunden')}</span>
              </h1>
              <p>
                {t('Maßgeschneiderte Versicherungslösungen für Ihre persönlichen Bedürfnisse')}
              </p>
            </div>

            <div className="category-grid">
              {privatCategories.map((category) => (
                <div
                  key={category.id}
                  className="category-card clickable"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{t(category.title)}</h3>
                  <p>{t(category.description)}</p>
                  <span className="click-hint">
                    <FaHandPointer />
                  </span>
                </div>
              ))}
            </div>

            <div className="navigation-area">
              <Link to="/firma" className="nav-btn">
                {t('Zu Firmenkunden →')}
              </Link>
            </div>
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
            unterlagen={selectedUnterlagen.map((u) => t(u))}
            category={selectedCategoryTitle}
            subcategory={selectedSubcategoryName}
            onClose={() => setShowAnfrageModal(false)}
          />
        )}
      </div>
    </>
  )
}

export default PrivatPage
