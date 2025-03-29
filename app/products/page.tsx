import { Suspense } from "react"
import ProductsGrid from "./components/products-grid"
import ProductsFilter from "./components/products-filter"
import ProductsSort from "./components/products-sort"
import ProductsLoading from "./loading"

export const metadata = {
  title: "Products | E-Commerce Catalog",
  description: "Browse our collection of premium products",
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "featured"
  const minPrice = typeof searchParams.minPrice === "string" ? Number.parseInt(searchParams.minPrice) : undefined
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseInt(searchParams.maxPrice) : undefined
  const brand = typeof searchParams.brand === "string" ? searchParams.brand : undefined
  const rating = typeof searchParams.rating === "string" ? Number.parseInt(searchParams.rating) : undefined
  const inStock = searchParams.inStock === "true"

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <ProductsFilter
            selectedCategory={category}
            selectedBrand={brand}
            selectedRating={rating}
            selectedPriceRange={[minPrice || 0, maxPrice || 1000]}
            selectedInStock={inStock}
          />
        </aside>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : "All Products"}
            </h1>
            <ProductsSort selectedSort={sort} />
          </div>
          <Suspense fallback={<ProductsLoading />}>
            <ProductsGrid
              category={category}
              sort={sort}
              minPrice={minPrice}
              maxPrice={maxPrice}
              brand={brand}
              rating={rating}
              inStock={inStock}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

