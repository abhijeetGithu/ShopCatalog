import { notFound } from "next/navigation"
import ProductDetails from "./components/product-details"
import { products, reviews } from "../../lib/data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    }
  }

  return {
    title: `${product.name} | ShopCatalog`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const productReviews = reviews.filter((review) => review.productId === params.id)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <ProductDetails product={product} reviews={productReviews} />
    </div>
  )
}

