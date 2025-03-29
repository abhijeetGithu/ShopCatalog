import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "./components/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Commerce Product Catalog",
  description: "Browse our collection of premium products",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 perspective-1000">
        <div className="relative min-h-screen preserve-3d">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <Header />
              <main className="relative z-10">
                {children}
              </main>
            </CartProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}



import './globals.css'