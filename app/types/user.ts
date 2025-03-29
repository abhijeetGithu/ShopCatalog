export interface UserInfo {
    id: string
    name: string
    email: string
    phone: string
    notifications: {
      email: boolean
      sms: boolean
      promotions: boolean
    }
    addresses: Array<{
      id: string
      type: string
      street: string
      city: string
      state: string
      zipCode: string
      country: string
      isDefault: boolean
    }>
    paymentMethods: Array<{
      id: string
      type: string
      last4: string
      expiryDate: string
      isDefault: boolean
    }>
  }