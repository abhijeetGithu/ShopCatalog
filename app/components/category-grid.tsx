import Link from "next/link"
import { Laptop, Shirt, Home, Gift, Dumbbell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "../lib/data"

export default function CategoryGrid() {
  const categoryIcons = {
    electronics: Laptop,
    clothing: Shirt,
    home: Home,
    accessories: Gift,
    fitness: Dumbbell,
  }

  return (
    <>
      {categories.map((category) => {
        const Icon = categoryIcons[category.id as keyof typeof categoryIcons]

        return (
          <Link key={category.id} href={`/products?category=${category.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md group">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="font-medium text-white">{category.name}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </>
  )
}

