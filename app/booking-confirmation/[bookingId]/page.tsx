"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, CheckCircle, Clock, MapPin, Phone, Calendar, Home } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface Booking {
  id: string
  serviceId: string
  serviceName: string
  pharmacyId: string
  pharmacyName: string
  date: Date
  time: string
  address: string
  notes?: string
  price: number
  status: string
  createdAt: Date
}

export default function BookingConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)

  const bookingId = params.bookingId as string

  useEffect(() => {
    // Get booking from localStorage (in real app, this would be from API)
    const bookings = JSON.parse(localStorage.getItem("healthApp_bookings") || "[]")
    const foundBooking = bookings.find((b: Booking) => b.id === bookingId)

    if (foundBooking) {
      // Convert date string back to Date object
      foundBooking.date = new Date(foundBooking.date)
      foundBooking.createdAt = new Date(foundBooking.createdAt)
      setBooking(foundBooking)
    } else {
      router.push("/services")
    }
  }, [bookingId, router])

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>جاري التحميل...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">صحتي</h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">تم تأكيد حجزك بنجاح!</h2>
          <p className="text-gray-600">سيتم التواصل معك قريباً لتأكيد الموعد</p>
        </div>

        {/* Booking Details */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>تفاصيل الحجز</CardTitle>
              <Badge variant="secondary">#{booking.id}</Badge>
            </div>
            <CardDescription>معلومات حجزك الكاملة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service Info */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                <p className="text-green-600 font-semibold text-xl">{booking.price} ريال</p>
              </div>
            </div>

            {/* Pharmacy Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-semibold">{booking.pharmacyName}</p>
                  <p className="text-sm text-gray-600">الصيدلية المختارة</p>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-semibold">{format(booking.date, "PPP", { locale: ar })}</p>
                  <p className="text-sm text-gray-600">التاريخ</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-semibold">{booking.time}</p>
                  <p className="text-sm text-gray-600">الوقت</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <p className="font-semibold">العنوان</p>
                <p className="text-gray-600">{booking.address}</p>
              </div>
            </div>

            {/* Notes */}
            {booking.notes && (
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">ملاحظات</p>
                  <p className="text-gray-600">{booking.notes}</p>
                </div>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">حالة الحجز</span>
              </div>
              <Badge variant="secondary">في انتظار التأكيد</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>الخطوات التالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold">
                  1
                </div>
                <div>
                  <p className="font-semibold">تأكيد الحجز</p>
                  <p className="text-sm text-gray-600">ستتلقى اتصالاً من الصيدلية خلال 15 دقيقة لتأكيد الموعد</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold">
                  2
                </div>
                <div>
                  <p className="font-semibold">التحضير للزيارة</p>
                  <p className="text-sm text-gray-600">تأكد من وجودك في العنوان المحدد في الوقت المناسب</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold">
                  3
                </div>
                <div>
                  <p className="font-semibold">تلقي الخدمة</p>
                  <p className="text-sm text-gray-600">سيصل المختص في الوقت المحدد لتقديم الخدمة</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>معلومات التواصل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold">للاستفسارات أو التعديل</p>
                <p className="text-blue-600 font-semibold">920000000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/profile" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              عرض حجوزاتي
            </Button>
          </Link>
          <Link href="/services" className="flex-1">
            <Button className="w-full">حجز خدمة أخرى</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
