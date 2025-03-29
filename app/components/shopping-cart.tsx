"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { Trash2 } from "lucide-react"

export function ShoppingCart() {
  const { cartItems, removeFromCart } = useCart()

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <img 
              src={item.images[0]}
              alt={item.name} 
              className="h-16 w-16 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="font-medium">${item.price}</p>
            </div>
          </div>
          
          <Button
            variant="destructive"
            onClick={() => removeFromCart(item.id)}
            className="flex items-center gap-2 px-3"
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove</span>
          </Button>
        </div>
      ))}
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">
          Subtotal: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
        </span>
        <Button>Checkout</Button>
      </div>
    </div>
  )
}