import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroBackground from "./components/hero-background"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "./components/featured-products"
import CategoryGrid from "./components/category-grid"
import AnimatedBackground from "./components/animated-background"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32">
        <HeroBackground />
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-400 text-transparent bg-clip-text animate-gradient">
                Discover Quality Products
              </h1>
              <p className="mx-auto max-w-[700px] text-indigo-200/90 md:text-xl bg-gradient-to-r from-fuchsia-200/80 via-purple-300/80 to-cyan-200/80 text-transparent bg-clip-text animate-gradient-slow">
                Shop our curated collection of premium products. From fashion to electronics, we have everything you
                need.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/products">
                <Button className="px-8 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-gray-100 hover:from-fuchsia-600 hover:to-indigo-600 transition-all duration-300">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 text-transparent bg-clip-text animate-gradient">
                Featured Products
              </h2>
              <p className="mx-auto max-w-[700px] text-violet-200/90 md:text-xl">
                Check out our most popular items handpicked for you
              </p>
            </div>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 pt-8">
            <FeaturedProducts />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                Shop by Category
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-8">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-primary/5 dark:to-purple-600/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                <p className="text-muted-foreground md:text-xl">
                  Subscribe to our newsletter for the latest products, deals, and updates.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button className="sm:w-auto">Subscribe</Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-lg">
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Benefits of Subscribing</h3>
                  <ul className="text-left space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Early access to sales
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Exclusive discounts
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      New product notifications
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

