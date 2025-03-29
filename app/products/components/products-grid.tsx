"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../../components/cart-provider"
import type { Product } from "../../lib/types"
import { products } from "../../lib/data"

interface ProductsGridProps {
  category?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  inStock?: boolean
}

export default function ProductsGrid({
  category,
  sort = "featured",
  minPrice = 0,
  maxPrice = 1000,
  brand,
  rating,
  inStock,
}: ProductsGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    // Simulate API fetch with filters
    const timer = setTimeout(() => {
      // Filter products based on props
      let filtered = [...products]

      if (category) {
        filtered = filtered.filter((product) => product.category === category)
      }

      if (brand) {
        filtered = filtered.filter((product) => product.brand === brand)
      }

      filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice)

      if (rating) {
        filtered = filtered.filter((product) => product.rating >= rating)
      }

      if (inStock) {
        filtered = filtered.filter((product) => product.inStock)
      }

      // Sort products
      filtered = filtered.sort((a, b) => {
        switch (sort) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "newest":
            return 0 // In a real app, we would sort by date
          case "featured":
          default:
            return b.featured ? 1 : -1
        }
      })

      setFilteredProducts(filtered)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [category, sort, minPrice, maxPrice, brand, rating, inStock])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square w-full bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="h-10 w-full bg-muted animate-pulse rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>
        <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
        <Link href="/products">
          <Button>View All Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="relative">
            <Link href={`/products/${product.id}`}>
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            {product.inStock ? (
              <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">In Stock</Badge>
            ) : (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Out of Stock
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <Link href={`/products/${product.id}`} className="font-medium hover:underline text-lg">
                  {product.name}
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="text-xs ml-1 text-muted-foreground">({product.rating})</span>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="rounded-full bg-primary hover:bg-primary/90"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

