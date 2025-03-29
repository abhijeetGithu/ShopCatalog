"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface ProductsFilterProps {
  selectedCategory?: string
  selectedBrand?: string
  selectedRating?: number
  selectedPriceRange: [number, number]
  selectedInStock: boolean
}

export default function ProductsFilter({
  selectedCategory,
  selectedBrand,
  selectedRating,
  selectedPriceRange,
  selectedInStock,
}: ProductsFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState<[number, number]>(selectedPriceRange)
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "home", name: "Home & Kitchen" },
    { id: "accessories", name: "Accessories" },
  ]

  const brands = [
    { id: "SoundMaster", name: "SoundMaster" },
    { id: "TechFit", name: "TechFit" },
    { id: "TravelPro", name: "TravelPro" },
    { id: "PowerUp", name: "PowerUp" },
    { id: "ComfortWear", name: "ComfortWear" },
    { id: "UrbanStyle", name: "UrbanStyle" },
    { id: "HomeEssentials", name: "HomeEssentials" },
    { id: "KitchenPro", name: "KitchenPro" },
  ]

  const ratings = [
    { value: 4, label: "4 Stars & Up" },
    { value: 3, label: "3 Stars & Up" },
    { value: 2, label: "2 Stars & Up" },
    { value: 1, label: "1 Star & Up" },
  ]

  const createQueryString = (params: Record<string, string | number | boolean | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, String(value))
      }
    })

    return newSearchParams.toString()
  }

  const handleCategoryChange = (categoryId: string) => {
    router.push(
      `${pathname}?${createQueryString({
        category: categoryId === selectedCategory ? null : categoryId,
      })}`,
    )
  }

  const handleBrandChange = (brandId: string) => {
    router.push(
      `${pathname}?${createQueryString({
        brand: brandId === selectedBrand ? null : brandId,
      })}`,
    )
  }

  const handleRatingChange = (rating: number) => {
    router.push(
      `${pathname}?${createQueryString({
        rating: rating === selectedRating ? null : rating,
      })}`,
    )
  }

  const handlePriceRangeChange = () => {
    router.push(
      `${pathname}?${createQueryString({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      })}`,
    )
  }

  const handleInStockChange = (checked: boolean) => {
    router.push(
      `${pathname}?${createQueryString({
        inStock: checked ? true : null,
      })}`,
    )
  }

  const handleClearFilters = () => {
    router.push(pathname)
  }

  const filterContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center filter-header p-2 rounded-t">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
          Filters
        </h2>
        <Button
          variant="ghost"
          className="text-violet-400 hover:text-violet-300 transition-colors"
          onClick={handleClearFilters}
        >
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "brand", "rating", "availability"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="filter-item p-2 rounded hover:bg-violet-900/20">
                  <Checkbox
                    id={category.id}
                    checked={category.id === selectedCategory}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                    className="border-violet-400 data-[state=checked]:bg-violet-500"
                  />
                  <label htmlFor={category.id} className="ml-2 text-violet-200 hover:text-violet-100 transition-colors">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-violet-200 hover:text-violet-100">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-2">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                onValueCommit={handlePriceRangeChange}
                className="[&_[role=slider]]:bg-violet-400 [&_[role=slider]]:border-violet-500 [&_[role=slider]]:hover:bg-violet-300"
              />
              <div className="flex items-center justify-between">
                <span className="text-violet-200 bg-violet-900/30 px-3 py-1 rounded-md">
                  ${priceRange[0]}
                </span>
                <span className="text-violet-200 bg-violet-900/30 px-3 py-1 rounded-md">
                  ${priceRange[1]}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-violet-200 hover:text-violet-100">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="filter-item p-2 rounded hover:bg-violet-900/20">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={brand.id === selectedBrand}
                    onCheckedChange={() => handleBrandChange(brand.id)}
                    className="border-violet-400 data-[state=checked]:bg-violet-500"
                  />
                  <label htmlFor={`brand-${brand.id}`} className="ml-2 text-violet-200 hover:text-violet-100 transition-colors cursor-pointer">
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>


        <AccordionItem value="rating">
          <AccordionTrigger className="text-violet-200 hover:text-violet-100">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating.value} className="filter-item p-2 rounded hover:bg-violet-900/20">
                  <Checkbox
                    id={`rating-${rating.value}`}
                    checked={rating.value === selectedRating}
                    onCheckedChange={() => handleRatingChange(rating.value)}
                    className="border-violet-400 data-[state=checked]:bg-violet-500"
                  />
                  <label
                    htmlFor={`rating-${rating.value}`}
                    className="ml-2 text-violet-200 hover:text-violet-100 transition-colors cursor-pointer flex items-center"
                  >
                    <div className="flex mr-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating.value ? "text-yellow-400" : "text-violet-600"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1">{rating.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>


        <AccordionItem value="availability">
          <AccordionTrigger className="text-violet-200 hover:text-violet-100">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="filter-item p-2 rounded hover:bg-violet-900/20">
              <Checkbox
                id="in-stock"
                checked={selectedInStock}
                onCheckedChange={(checked) => handleInStockChange(checked as boolean)}
                className="border-violet-400 data-[state=checked]:bg-violet-500"
              />
              <label htmlFor="in-stock" className="ml-2 text-violet-200 hover:text-violet-100 transition-colors cursor-pointer">
                In Stock Only
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {/* Mobile Filter */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            {filterContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter */}
      <div className="hidden md:block sticky top-20">{filterContent}</div>
    </>
  )
}

