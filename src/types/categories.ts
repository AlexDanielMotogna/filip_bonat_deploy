export interface CategoryTab {
  id: string
  name: string
  unterlagen: string[]
}

export interface CategorySubcategory {
  id: string
  name: string
  tabs: CategoryTab[]
}

export interface Category {
  id: string
  title: string
  icon: string
  description: string
  subcategories: CategorySubcategory[]
}
