"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Calendar, MapPin, Clock, Phone, Star, History } from "lucide-react"
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
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  createdAt: Date
}

export default function BookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    // Get bookings from localStorage (in real app, this would be from API)
    const storedBookings = JSON.parse(localStorage.getItem("healthApp_bookings") || "[]")
    const userBookings = storedBookings.map((booking: any) => ({
      ...booking,
      date: new Date(booking.date),
      createdAt: new Date(booking.createdAt),
    }))
    setBookings(userBookings)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>يجب تسجيل الدخول</CardTitle>
            <CardDescription>سجل دخولك لعرض حجوزاتك</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/login">
              <Button className="w-full">تسجيل الدخول</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "في الانتظار", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      confirmed: { label: "مؤكد", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
      "in-progress": { label: "قيد التنفيذ", variant: "default" as const, color: "bg-green-100 text-green-800" },
      completed: { label: "مكتمل", variant: "outline" as const, color: "bg-gray-100 text-gray-800" },
      cancelled: { label: "ملغي", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    }
    return (
      statusMap[status as keyof typeof statusMap] || {
        label: status,
        variant: "secondary" as const,
        color: "bg-gray-100 text-gray-800",
      }
    )
  }

  const filterBookings = (status?: string) => {
    if (!status) return bookings
    return bookings.filter((booking) => booking.status === status)
  }

  const activeBookings = filterBookings("pending")
    .concat(filterBookings("confirmed"))
    .concat(filterBookings("in-progress"))
  const completedBookings = filterBookings("completed")
  const cancelledBookings = filterBookings("cancelled")

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
            <p className="text-gray-600">{booking.pharmacyName}</p>
          </div>
          <div className="text-left">
            <Badge className={getStatusBadge(booking.status).color}>{getStatusBadge(booking.status).label}</Badge>
            <p className="text-lg font-bold text-green-600 mt-1">{booking.price} ريال</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{format(booking.date, "PPP", { locale: ar })}</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{booking.time}</span>
          </div>

          <div className="flex items-start gap-2 text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span className="text-sm">{booking.address}</span>
          </div>

          {booking.notes && (
            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              <strong>ملاحظات:</strong> {booking.notes}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="text-sm text-gray-500">تم الحجز: {format(booking.createdAt, "dd/MM/yyyy")}</div>
          <div className="flex gap-2">
            {booking.status === "pending" && (
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 ml-1" />
                اتصال
              </Button>
            )}
            {booking.status === "completed" && (
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 ml-1" />
                تقييم
              </Button>
            )}
            <Link href={`/booking-confirmation/${booking.id}`}>
              <Button variant="outline" size="sm">
                التفاصيل
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
            <div className="flex items-center gap-4">
              <Link href="/services">
                <Button variant="outline" size="sm">
                  الخدمات
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  الملف الشخصي
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">حجوزاتي</h2>
          <p className="text-gray-600">إدارة ومتابعة جميع حجوزاتك</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              النشطة ({activeBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              المكتملة ({completedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              الملغية ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-6">
              {activeBookings.length > 0 ? (
                activeBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد حجوزات نشطة</h3>
                    <p className="text-gray-600 mb-4">لم تقم بأي حجوزات حالياً</p>
                    <Link href="/services">
                      <Button>احجز خدمة جديدة</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-6">
              {completedBookings.length > 0 ? (
                completedBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد حجوزات مكتملة</h3>
                    <p className="text-gray-600">ستظهر هنا الحجوزات المكتملة</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cancelled">
            <div className="space-y-6">
              {cancelledBookings.length > 0 ? (
                cancelledBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <div className="h-16 w-16 text-gray-300 mx-auto mb-4 flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-6 h-0.5 bg-gray-300 rotate-45"></div>
                        <div className="w-6 h-0.5 bg-gray-300 -rotate-45 absolute"></div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد حجوزات ملغية</h3>
                    <p className="text-gray-600">لم تقم بإلغاء أي حجوزات</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
