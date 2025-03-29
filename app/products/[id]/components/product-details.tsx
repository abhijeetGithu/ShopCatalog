"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, ChevronRight, Truck, RotateCcw, Shield, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../../../components/cart-provider"
import type { Product, Review } from "../../../lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/data/products"

interface ProductDetailsProps {
  product: Product
  reviews: Review[]
}

export default function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href={`/products?category=${product.category}`} className="text-muted-foreground hover:text-foreground">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-[500px] object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, i) => (
              <div
                key={i}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  activeImage === i ? "ring-2 ring-primary" : "hover:opacity-80"
                }`}
                onClick={() => setActiveImage(i)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.brand}</Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating} rating)</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{product.reviewCount || reviews.length} reviews</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
              {product.inStock ? (
                <div className="flex items-center gap-1 text-green-600 mt-1">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">In Stock</span>
                </div>
              ) : (
                <div className="text-red-500 mt-1 text-sm">Out of Stock</div>
              )}
            </div>
          </div>

          <div className="border-t border-b py-4">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Color: <span className="text-primary">{selectedColor}</span>
                </span>
              </div>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className={`h-10 w-10 rounded-full border cursor-pointer flex items-center justify-center ${
                        selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "white"
                            ? "#ffffff"
                            : color.toLowerCase() === "black"
                              ? "#000000"
                              : color.toLowerCase() === "silver"
                                ? "#c0c0c0"
                                : color.toLowerCase() === "blue"
                                  ? "#0000ff"
                                  : color.toLowerCase() === "red"
                                    ? "#ff0000"
                                    : color.toLowerCase() === "navy"
                                      ? "#000080"
                                      : color.toLowerCase() === "gray"
                                        ? "#808080"
                                        : color.toLowerCase() === "green"
                                          ? "#008000"
                                          : color.toLowerCase() === "purple"
                                            ? "#800080"
                                            : color.toLowerCase() === "brown"
                                              ? "#a52a2a"
                                              : color.toLowerCase() === "rose gold"
                                                ? "#b76e79"
                                                : "#ddd",
                      }}
                    >
                      {selectedColor === color && (
                        <Check className={`h-5 w-5 ${color.toLowerCase() === "white" ? "text-black" : "text-white"}`} />
                      )}
                      <span className="sr-only">{color}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Size: <span className="text-primary">{selectedSize}</span>
                </span>
                <Button variant="link" className="p-0 h-auto">
                  Size Guide
                </Button>
              </div>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className={`h-10 w-full rounded-md border cursor-pointer flex items-center justify-center transition-colors ${
                        selectedSize === size ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <span className="font-medium">Quantity</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= 10}>
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1" onClick={handleAddToCart} disabled={!product.inStock} size="lg">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              variant={isWishlisted ? "default" : "outline"}
              className={`flex-1 ${isWishlisted ? "bg-red-500 hover:bg-red-600" : ""}`}
              onClick={toggleWishlist}
              size="lg"
            >
              <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-white" : ""}`} />
              {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">Free standard shipping on orders over $50</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <RotateCcw className="h-5 w-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Secure Checkout</p>
                <p className="text-sm text-muted-foreground">SSL encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="details" className="text-base">
              Product Details
            </TabsTrigger>
            <TabsTrigger value="specifications" className="text-base">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-base">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-6 border rounded-lg">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About this item</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.details?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-6 border rounded-lg">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Brand</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">
                      {product.name.replace(/\s+/g, "-").toLowerCase()}-{product.id}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Warranty</span>
                    <span className="font-medium">1 Year</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">In Stock</span>
                    <span className="font-medium">{product.inStock ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium flex items-center">
                      {product.rating}
                      <Star className="h-4 w-4 text-yellow-400 ml-1" fill="currentColor" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-6 border rounded-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="grid md:grid-cols-5 gap-6 mb-8">
                <div className="md:col-span-2">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-5xl font-bold">{product.rating}</div>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {product.reviewCount || reviews.length} reviews
                    </p>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter((r) => Math.floor(r.rating) === star).length
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0

                      return (
                        <div key={star} className="flex items-center gap-2">
                          <div className="flex items-center w-20">
                            <span className="text-sm">{star} stars</span>
                          </div>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="w-10 text-right">
                            <span className="text-sm text-muted-foreground">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium">{review.user.avatar}</span>
                          </div>
                          <div>
                            <p className="font-medium">{review.user.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-medium mt-3">{review.title}</h4>
                      <p className="text-sm mt-2">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>

              {reviews.length > 3 && (
                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* This would typically map through related products */}
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                  </Link>
                </div>
                <CardContent className="p-4">
                  <Link href={`/products/${relatedProduct.id}`} className="font-medium hover:underline">
                    {relatedProduct.name}
                  </Link>
                  <p className="font-bold mt-1">${relatedProduct.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

