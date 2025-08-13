"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search, Clock, MapPin, Filter } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "1",
    name: "قياس الضغط",
    description: "قياس ضغط الدم بدقة في المنزل مع تقرير مفصل",
    price: 50,
    duration: 15,
    category: "measurement",
    icon: "🩺",
    features: ["قياس دقيق", "تقرير فوري", "نصائح طبية"],
  },
  {
    id: "2",
    name: "قياس السكر",
    description: "فحص مستوى السكر في الدم مع متابعة النتائج",
    price: 40,
    duration: 10,
    category: "measurement",
    icon: "🩸",
    features: ["فحص سريع", "نتائج فورية", "توصيات غذائية"],
  },
  {
    id: "3",
    name: "إعطاء حقن",
    description: "حقن طبية آمنة بواسطة متخصصين مؤهلين",
    price: 30,
    duration: 5,
    category: "injection",
    icon: "💉",
    features: ["تعقيم كامل", "حقن آمنة", "متابعة ما بعد الحقن"],
  },
  {
    id: "4",
    name: "جلسة بخار للأطفال",
    description: "جلسات بخار علاجية للأطفال لعلاج مشاكل التنفس",
    price: 60,
    duration: 30,
    category: "therapy",
    icon: "🌬️",
    features: ["آمنة للأطفال", "معدات معقمة", "متابعة مستمرة"],
  },
  {
    id: "5",
    name: "استشارة أولية",
    description: "تقييم شامل للحالة الصحية مع توصيات العلاج",
    price: 80,
    duration: 20,
    category: "consultation",
    icon: "👩‍⚕️",
    features: ["تقييم شامل", "خطة علاج", "متابعة دورية"],
  },
  {
    id: "6",
    name: "قياس الأكسجين",
    description: "قياس مستوى الأكسجين في الدم",
    price: 35,
    duration: 8,
    category: "measurement",
    icon: "🫁",
    features: ["قياس دقيق", "نتائج فورية", "نصائح صحية"],
  },
]

export default function ServicesPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "جميع الخدمات" },
    { id: "measurement", name: "القياسات" },
    { id: "injection", name: "الحقن" },
    { id: "therapy", name: "العلاج" },
    { id: "consultation", name: "الاستشارات" },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>يجب تسجيل الدخول</CardTitle>
            <CardDescription>سجل دخولك لعرض الخدمات المتاحة</CardDescription>
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
              <span className="text-gray-700">مرحباً، {user.name}</span>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  الملف الشخصي
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">الخدمات المتاحة</h2>
          <p className="text-gray-600">اختر الخدمة الصحية التي تحتاجها</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ابحث عن خدمة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                <Filter className="h-4 w-4 ml-1" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {categories.find((c) => c.id === service.category)?.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price and Duration */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{service.price} ريال</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{service.duration} دقيقة</span>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <Link href={`/book/${service.id}`}>
                  <Button className="w-full group-hover:bg-green-700 transition-colors">
                    <MapPin className="h-4 w-4 ml-2" />
                    احجز الآن
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد خدمات</h3>
            <p className="text-gray-600">لم نجد خدمات تطابق بحثك. جرب كلمات مختلفة.</p>
          </div>
        )}
      </main>
    </div>
  )
}
