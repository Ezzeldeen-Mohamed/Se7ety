export interface User {
  id: string
  name: string
  email: string
  phone: string
  type: "user" | "pharmacy"
  createdAt: Date
}

export interface Pharmacy extends User {
  type: "pharmacy"
  businessName: string
  license: string
  address: string
  location: {
    lat: number
    lng: number
  }
  services: string[]
  rating: number
  isVerified: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number // in minutes
  category: "measurement" | "injection" | "consultation" | "therapy"
}

export interface Booking {
  id: string
  userId: string
  pharmacyId: string
  serviceId: string
  scheduledTime: Date
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  address: string
  notes?: string
  totalPrice: number
  createdAt: Date
}
