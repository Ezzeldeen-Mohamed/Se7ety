"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Phone,
  Star,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface Booking {
  id: string
  serviceId: string
  serviceName: string
  customerName: string
  customerPhone: string
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

// Mock bookings data for pharmacy
const mockBookings: Booking[] = [
  {
    id: "1",
    serviceId: "1",
    serviceName: "قياس الضغط",
    customerName: "أحمد محمد",
    customerPhone: "0501234567",
    pharmacyId: "1",
    pharmacyName: "صيدلية النور",
    date: new Date(2024, 0, 20),
    time: "10:30",
    address: "شارع الملك فهد، الرياض",
    price: 50,
    status: "pending",
    createdAt: new Date(2024, 0, 19),
  },
  {
    id: "2",
    serviceId: "3",
    serviceName: "إعطاء حقن",
    customerName: "فاطمة علي",
    customerPhone: "0509876543",
    pharmacyId: "1",
    pharmacyName: "صيدلية النور",
    date: new Date(2024, 0, 20),
    time: "11:15",
    address: "حي العليا، الرياض",
    notes: "حقنة فيتامين ب12",
    price: 30,
    status: "confirmed",
    createdAt: new Date(2024, 0, 19),
  },
  {
    id: "3",
    serviceId: "2",
    serviceName: "قياس السكر",
    customerName: "محمد سالم",
    customerPhone: "0551122334",
    pharmacyId: "1",
    pharmacyName: "صيدلية النور",
    date: new Date(2024, 0, 19),
    time: "14:00",
    address: "شارع التحلية، الرياض",
    price: 40,
    status: "completed",
    createdAt: new Date(2024, 0, 18),
  },
  {
    id: "4",
    serviceId: "4",
    serviceName: "جلسة بخار للأطفال",
    customerName: "سارة أحمد",
    customerPhone: "0556677889",
    pharmacyId: "1",
    pharmacyName: "صيدلية النور",
    date: new Date(2024, 0, 20),
    time: "16:00",
    address: "حي النخيل، الرياض",
    notes: "طفل عمره 5 سنوات",
    price: 60,
    status: "in-progress",
    createdAt: new Date(2024, 0, 20),
  },
]

export default function PharmacyDashboard() {
  const { user, logout } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [selectedTab, setSelectedTab] = useState("overview")

  // Redirect if not pharmacy user
  useEffect(() => {
    if (user && user.type !== "pharmacy") {
      window.location.href = "/"
    }
  }, [user])

  if (!user || user.type !== "pharmacy") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>غير مصرح</CardTitle>
            <CardDescription>هذه الصفحة مخصصة للصيدليات فقط</CardDescription>
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
      pending: { label: "جديد", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
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

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus as any } : booking)),
    )
  }

  // Statistics
  const stats = {
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    inProgress: bookings.filter((b) => b.status === "in-progress").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    todayRevenue: bookings
      .filter((b) => b.status === "completed" && format(b.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"))
      .reduce((sum, b) => sum + b.price, 0),
    totalRevenue: bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.price, 0),
  }

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
            <p className="text-gray-600">{booking.customerName}</p>
            <p className="text-sm text-gray-500">{booking.customerPhone}</p>
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
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateBookingStatus(booking.id, "confirmed")}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <CheckCircle className="h-4 w-4 ml-1" />
                  تأكيد
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateBookingStatus(booking.id, "cancelled")}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  إلغاء
                </Button>
              </>
            )}
            {booking.status === "confirmed" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateBookingStatus(booking.id, "in-progress")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                بدء الخدمة
              </Button>
            )}
            {booking.status === "in-progress" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateBookingStatus(booking.id, "completed")}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                إنهاء الخدمة
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 ml-1" />
              اتصال
            </Button>
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
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">صحتي - لوحة الصيدلية</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">مرحباً، {user.name}</span>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 ml-1" />
                الإعدادات
              </Button>
              <Button variant="outline" onClick={logout}>
                تسجيل خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h2>
          <p className="text-gray-600">إدارة طلبات الخدمات الصحية</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="pending">الطلبات الجديدة ({stats.pending})</TabsTrigger>
            <TabsTrigger value="active">النشطة ({stats.confirmed + stats.inProgress})</TabsTrigger>
            <TabsTrigger value="completed">المكتملة ({stats.completed})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">الطلبات الجديدة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">في انتظار التأكيد</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">الطلبات النشطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-blue-600">{stats.confirmed + stats.inProgress}</p>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">مؤكدة وقيد التنفيذ</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">إيرادات اليوم</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-green-600">{stats.todayRevenue} ريال</p>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">من {stats.completed} خدمة</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">التقييم</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-purple-600">4.8</p>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">من 127 تقييم</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
                <CardDescription>آخر الطلبات والتحديثات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            booking.status === "pending"
                              ? "bg-yellow-500"
                              : booking.status === "confirmed"
                                ? "bg-blue-500"
                                : booking.status === "in-progress"
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium">
                            {booking.serviceName} - {booking.customerName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {format(booking.date, "dd/MM/yyyy")} - {booking.time}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusBadge(booking.status).color}>
                        {getStatusBadge(booking.status).label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-6">
              {bookings.filter((b) => b.status === "pending").length > 0 ? (
                bookings
                  .filter((b) => b.status === "pending")
                  .map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات جديدة</h3>
                    <p className="text-gray-600">جميع الطلبات تم التعامل معها</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-6">
              {bookings.filter((b) => b.status === "confirmed" || b.status === "in-progress").length > 0 ? (
                bookings
                  .filter((b) => b.status === "confirmed" || b.status === "in-progress")
                  .map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات نشطة</h3>
                    <p className="text-gray-600">لا توجد طلبات مؤكدة أو قيد التنفيذ حالياً</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-6">
              {bookings.filter((b) => b.status === "completed").length > 0 ? (
                bookings
                  .filter((b) => b.status === "completed")
                  .map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات مكتملة</h3>
                    <p className="text-gray-600">ستظهر هنا الطلبات المكتملة</p>
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
