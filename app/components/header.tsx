"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import { ThemeToggle } from "./theme-toggle"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems } = useCart()
  const router = useRouter()
  const cartItemCount = cartItems.length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-none bg-background/40 backdrop-blur-lg supports-[backdrop-filter]:bg-background/20"
    >
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-bold">
                Home
              </Link>
              <Link href="/products" className="text-lg font-medium">
                All Products
              </Link>
              <Link href="/products?category=electronics" className="text-lg font-medium">
                Electronics
              </Link>
              <Link href="/products?category=clothing" className="text-lg font-medium">
                Clothing
              </Link>
              <Link href="/products?category=home" className="text-lg font-medium">
                Home & Kitchen
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-lg font-medium">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="ml-4 md:ml-0 flex items-center">
          <motion.span
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ShopCatalog
          </motion.span>
        </Link>
        <nav className="mx-6 hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/" className="text-sm font-medium transition-all hover:text-primary hover:scale-105">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
            All Products
          </Link>
          <Link
            href="/products?category=electronics"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Electronics
          </Link>
          <Link href="/products?category=clothing" className="text-sm font-medium transition-colors hover:text-primary">
            Clothing
          </Link>
          <Link href="/products?category=home" className="text-sm font-medium transition-colors hover:text-primary">
            Home & Kitchen
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.form
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                onSubmit={handleSearch}
                className="relative flex items-center"
              >
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="absolute right-8"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="absolute right-0"
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchQuery("")
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close search</span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </motion.button>
            )}
          </AnimatePresence>
          <Link href="/wishlist">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                  3
                </Badge>
              </Button>
            </motion.div>
          </Link>

          <Link href="/account">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </motion.div>
          </Link>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ThemeToggle />
          </motion.div>
          <Link href="/cart">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}

