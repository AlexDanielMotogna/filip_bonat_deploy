import React from 'react'

interface CategoryCardProps {
  category: {
    id: string
    title: string
    icon: string
    description: string
  }
  onClick: () => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="text-4xl mb-4">{category.icon}</div>
      <h2 className="text-xl font-bold mb-2">{category.title}</h2>
      <p className="text-gray-600">{category.description}</p>
    </div>
  )
}

export default CategoryCard
