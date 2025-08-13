"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, User, History, Settings, Phone, Mail, Calendar, MapPin, Star } from "lucide-react"
import Link from "next/link"

// Mock booking history
const bookingHistory = [
  {
    id: "1",
    service: "قياس الضغط",
    pharmacy: "صيدلية النور",
    date: "2024-01-15",
    time: "10:30",
    status: "completed",
    price: 50,
    rating: 5,
  },
  {
    id: "2",
    service: "قياس السكر",
    pharmacy: "صيدلية الشفاء",
    date: "2024-01-10",
    time: "14:15",
    status: "completed",
    price: 40,
    rating: 4,
  },
  {
    id: "3",
    service: "إعطاء حقن",
    pharmacy: "صيدلية النور",
    date: "2024-01-08",
    time: "09:00",
    status: "completed",
    price: 30,
    rating: 5,
  },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>يجب تسجيل الدخول</CardTitle>
            <CardDescription>سجل دخولك لعرض ملفك الشخصي</CardDescription>
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
      completed: { label: "مكتمل", variant: "default" as const },
      pending: { label: "في الانتظار", variant: "secondary" as const },
      cancelled: { label: "ملغي", variant: "destructive" as const },
    }
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" as const }
  }

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false)
    // Update user context with new data
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
            <div className="flex items-center gap-4">
              <Link href="/services">
                <Button variant="outline" size="sm">
                  الخدمات
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                تسجيل خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h2>
          <p className="text-gray-600">إدارة معلوماتك الشخصية وتاريخ الحجوزات</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              المعلومات الشخصية
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              تاريخ الحجوزات
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>المعلومات الشخصية</CardTitle>
                    <CardDescription>عرض وتعديل معلوماتك الشخصية</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  >
                    {isEditing ? "حفظ" : "تعديل"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>نوع الحساب</Label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                      <Badge variant={user.type === "pharmacy" ? "default" : "secondary"}>
                        {user.type === "pharmacy" ? "صيدلية" : "مستخدم"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>تاريخ التسجيل: {new Date(user.createdAt).toLocaleDateString("ar-SA")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>تاريخ الحجوزات</CardTitle>
                <CardDescription>عرض جميع حجوزاتك السابقة والحالية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{booking.service}</h3>
                            <Badge {...getStatusBadge(booking.status)}>{getStatusBadge(booking.status).label}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.pharmacy}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {booking.date} - {booking.time}
                              </span>
                            </div>
                          </div>
                          {booking.rating && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 mr-2">({booking.rating}/5)</span>
                            </div>
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-lg font-bold text-green-600">{booking.price} ريال</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {bookingHistory.length === 0 && (
                  <div className="text-center py-8">
                    <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد حجوزات</h3>
                    <p className="text-gray-600 mb-4">لم تقم بأي حجوزات بعد</p>
                    <Link href="/services">
                      <Button>تصفح الخدمات</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات</CardTitle>
                <CardDescription>إدارة إعدادات حسابك والتفضيلات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">الإشعارات</h3>
                      <p className="text-sm text-gray-600">تلقي إشعارات حول حالة الحجوزات</p>
                    </div>
                    <Button variant="outline" size="sm">
                      إدارة
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">الخصوصية</h3>
                      <p className="text-sm text-gray-600">إعدادات الخصوصية والأمان</p>
                    </div>
                    <Button variant="outline" size="sm">
                      إدارة
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">تغيير كلمة المرور</h3>
                      <p className="text-sm text-gray-600">تحديث كلمة مرور حسابك</p>
                    </div>
                    <Button variant="outline" size="sm">
                      تغيير
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="destructive" onClick={logout} className="w-full">
                      تسجيل خروج من الحساب
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
