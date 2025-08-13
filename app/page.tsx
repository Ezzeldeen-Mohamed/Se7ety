"use client"

import { Badge } from "@/components/ui/badge"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MapPin, Clock, Shield, Star, Users, Zap, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, logout } = useAuth()

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">صحتي</h1>
              </div>
              <div className="flex items-center gap-4">
                {user.type === "user" ? (
                  <>
                    <Link href="/services">
                      <Button variant="outline" size="sm">
                        الخدمات
                      </Button>
                    </Link>
                    <Link href="/bookings">
                      <Button variant="outline" size="sm">
                        حجوزاتي
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="outline" size="sm">
                        الملف الشخصي
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/pharmacy/dashboard">
                      <Button variant="outline" size="sm">
                        لوحة التحكم
                      </Button>
                    </Link>
                    <Link href="/pharmacy/services">
                      <Button variant="outline" size="sm">
                        إدارة الخدمات
                      </Button>
                    </Link>
                  </>
                )}
                <span className="text-gray-700">مرحباً، {user.name}</span>
                <Button variant="outline" onClick={logout}>
                  تسجيل خروج
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {user.type === "user" ? <UserDashboard /> : <PharmacyDashboard />}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Heart className="h-16 w-16 text-green-600" />
              <h1 className="text-6xl font-bold text-gray-900">صحتي</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              خدمات صحية منزلية موثوقة عبر الصيدليات المحلية
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              احجز خدمات قياس الضغط والسكر، الحقن، جلسات البخار، والاستشارات الأولية من منزلك
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  تسجيل دخول
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                  إنشاء حساب جديد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار صحتي؟</h2>
            <p className="text-lg text-gray-600">نوفر لك خدمات صحية موثوقة وسريعة في منزلك</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>صيدليات قريبة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>اعثر على أقرب صيدلية معتمدة في منطقتك</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>حجز فوري</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>احجز خدمتك واحصل على تأكيد فوري</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>خدمة موثوقة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>جميع الصيدليات معتمدة ومرخصة</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>رعاية شخصية</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>خدمة شخصية تناسب احتياجاتك الصحية</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-green-100">مستخدم راضي</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <MapPin className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-green-100">صيدلية شريكة</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Zap className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">5000+</div>
              <div className="text-green-100">خدمة مكتملة</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-1">4.8</div>
              <div className="text-green-100">تقييم المستخدمين</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">ابدأ رحلتك الصحية اليوم</h2>
          <p className="text-lg text-gray-600 mb-8">انضم إلى آلاف المستخدمين الذين يثقون في خدماتنا الصحية المنزلية</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                إنشاء حساب مجاني
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                تصفح الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function UserDashboard() {
  const quickServices = [
    { id: "1", name: "قياس الضغط", price: 50, duration: 15, icon: "🩺", color: "bg-red-500" },
    { id: "2", name: "قياس السكر", price: 40, duration: 10, icon: "🩸", color: "bg-blue-500" },
    { id: "3", name: "إعطاء حقن", price: 30, duration: 5, icon: "💉", color: "bg-green-500" },
    { id: "4", name: "جلسة بخار", price: 60, duration: 30, icon: "🌬️", color: "bg-purple-500" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h2>
          <p className="text-gray-600">اختر الخدمة التي تحتاجها</p>
        </div>
        <Link href="/services">
          <Button className="bg-green-600 hover:bg-green-700">عرض جميع الخدمات</Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickServices.map((service) => (
          <Link key={service.id} href={`/book/${service.id}`}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{service.icon}</div>
                  <div className={`w-3 h-3 ${service.color} rounded-full`}></div>
                </div>
                <CardTitle className="text-lg group-hover:text-green-600 transition-colors">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{service.price} ريال</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.duration} دقيقة
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
          <CardDescription>آخر الحجوزات والخدمات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">قياس الضغط - صيدلية النور</p>
                  <p className="text-sm text-gray-600">15 يناير 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-center py-4">
              <Link href="/bookings">
                <Button variant="outline">عرض جميع الحجوزات</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PharmacyDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم الصيدلية</h2>
          <p className="text-gray-600">إدارة الطلبات والخدمات</p>
        </div>
        <Link href="/pharmacy/dashboard">
          <Button className="bg-green-600 hover:bg-green-700">لوحة التحكم الكاملة</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">الطلبات الجديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">5</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
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
              <p className="text-3xl font-bold text-green-600">3</p>
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">قيد التنفيذ</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">إجمالي اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-purple-600">420 ريال</p>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">من 8 طلبات</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">التقييم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-yellow-600">4.8</p>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">من 127 تقييم</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>الطلبات الأخيرة</CardTitle>
          <CardDescription>آخر الطلبات المستلمة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { service: "قياس الضغط", customer: "أحمد محمد", time: "10:30", status: "جديد" },
              { service: "إعطاء حقن", customer: "فاطمة علي", time: "11:15", status: "مؤكد" },
              { service: "قياس السكر", customer: "محمد سالم", time: "12:00", status: "مكتمل" },
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{order.service}</p>
                  <p className="text-sm text-gray-600">
                    {order.customer} - {order.time}
                  </p>
                </div>
                <Badge
                  variant={order.status === "جديد" ? "default" : order.status === "مؤكد" ? "secondary" : "outline"}
                >
                  {order.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
