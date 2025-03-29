export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand?: string
  images: string[]
  rating: number
  reviewCount?: number
  inStock: boolean
  featured?: boolean
  colors?: string[]
  sizes?: string[]
  details?: string[]
}

export interface Category {
  id: string
  name: string
  description?: string
  image?: string
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  brands: string[]
  ratings: number[]
  availability: boolean
}

export interface SortOption {
  label: string
  value: string
}

export interface Review {
  id: string
  productId: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  title: string
  comment: string
  date: string
}

