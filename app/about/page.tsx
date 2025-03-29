import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About Us | E-Commerce Catalog",
  description: "Learn more about our company and mission",
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 md:gap-12 lg:gap-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About Us</h1>
          <p className="text-muted-foreground text-lg">
            We're on a mission to provide high-quality products at affordable prices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2020, ShopCatalog started with a simple idea: make quality products accessible to everyone.
              What began as a small online store has grown into a comprehensive e-commerce platform offering thousands
              of products across multiple categories.
            </p>
            <p className="text-muted-foreground">
              Our team is passionate about curating the best products and providing exceptional customer service. We
              carefully select each item in our catalog to ensure it meets our high standards for quality,
              functionality, and value.
            </p>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src="https://static.vecteezy.com/system/resources/previews/005/374/513/non_2x/illustration-graphic-cartoon-character-of-digital-promotion-vector.jpg?height=400&width=600" alt="Our team" fill className="object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-hashtag_516790-1935.jpg?height=400&width=600" alt="Our mission" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At ShopCatalog, our mission is to make shopping easy, enjoyable, and accessible. We believe that everyone
              deserves access to quality products without breaking the bank.
            </p>
            <p className="text-muted-foreground">
              We're committed to sustainability and ethical business practices. We work with suppliers who share our
              values and are constantly looking for ways to reduce our environmental impact.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-muted rounded-lg p-6 space-y-2">
              <h3 className="font-bold">Quality</h3>
              <p className="text-muted-foreground">
                We never compromise on quality. Every product in our catalog is carefully selected and tested.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-6 space-y-2">
              <h3 className="font-bold">Affordability</h3>
              <p className="text-muted-foreground">
                We believe quality products should be accessible to everyone, regardless of budget.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-6 space-y-2">
              <h3 className="font-bold">Customer Service</h3>
              <p className="text-muted-foreground">
                Our customers are at the heart of everything we do. We're committed to providing exceptional service.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-6 space-y-2">
              <h3 className="font-bold">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental impact and promoting sustainable practices.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Join Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. If you're passionate about e-commerce and
            want to make a difference, we'd love to hear from you.
          </p>
          <Button asChild>
            <Link href="/careers">View Open Positions</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

