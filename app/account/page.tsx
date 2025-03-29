"use client"
import { Home, Edit, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { UserInfo } from "../types/user"
const userOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    total: 299.99,
    status: "Delivered",
    items: [
      {
        id: "ITEM-1",
        name: "Apple watch",
        quantity: 2,
        price: 149.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VhEhQASr5j2Pf736uVyOWc26vdXa9HLWRQ&s"
      }
    ]
  }
]
export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user")
      if (!response.ok) throw new Error("Failed to fetch user data")
      const data = await response.json()
      setUserInfo(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user data. Please try again.",
        variant: "destructive",
      })
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userInfo) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })

      if (!response.ok) throw new Error("Failed to update profile")

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleInputChange = (field: keyof UserInfo, value: string) => {
    if (!userInfo) return
    setUserInfo({ ...userInfo, [field]: value })
  }
  if (!mounted) {
    return null
  }

  if (!userInfo) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and view your orders</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and email preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                      <p className="text-muted-foreground">{userInfo.email}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={userInfo.name.split(" ")[0]}
                          onChange={(e) => {
                            const lastName = userInfo.name.split(" ")[1] || ""
                            handleInputChange("name", `${e.target.value} ${lastName}`)
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={userInfo.name.split(" ")[1] || ""}
                          onChange={(e) => {
                            const firstName = userInfo.name.split(" ")[0]
                            handleInputChange("name", `${firstName} ${e.target.value}`)
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => fetchUserData()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p className="text-sm">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs ${order.status === "Delivered"
                                  ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                                  : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                                  }`}
                              >
                                {order.status}
                              </span>
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 divide-y">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              <p className="text-sm">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userInfo.addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 relative ${address.isDefault ? "border-primary" : ""}`}
                    >
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{address.type}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {address.street}
                            <br />
                            {address.city}, {address.state} {address.zipCode}
                            <br />
                            {address.country}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            {!address.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-[200px]">
                    <Home className="h-8 w-8 mb-2 text-muted-foreground" />
                    <h4 className="font-medium">Add New Address</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">Add a new shipping or billing address</p>
                    <Button>Add Address</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userInfo.paymentMethods.map((payment) => (
                    <div
                      key={payment.id}
                      className={`border rounded-lg p-4 relative ${payment.isDefault ? "border-primary" : ""}`}
                    >
                      {payment.isDefault && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{payment.cardType}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            •••• •••• •••• {payment.lastFourDigits}
                            <br />
                            Expires: {payment.expiryDate}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            {!payment.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-[200px]">
                    <CreditCard className="h-8 w-8 mb-2 text-muted-foreground" />
                    <h4 className="font-medium">Add New Payment Method</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">Add a new credit card or payment method</p>
                    <Button>Add Payment Method</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

