"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Heart, Edit, Save, X, Plus } from "lucide-react"
import Link from "next/link"

interface PharmacyService {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  isActive: boolean
  icon: string
}

const initialServices: PharmacyService[] = [
  {
    id: "1",
    name: "قياس الضغط",
    description: "قياس ضغط الدم بدقة في المنزل مع تقرير مفصل",
    price: 50,
    duration: 15,
    category: "measurement",
    isActive: true,
    icon: "🩺",
  },
  {
    id: "2",
    name: "قياس السكر",
    description: "فحص مستوى السكر في الدم مع متابعة النتائج",
    price: 40,
    duration: 10,
    category: "measurement",
    isActive: true,
    icon: "🩸",
  },
  {
    id: "3",
    name: "إعطاء حقن",
    description: "حقن طبية آمنة بواسطة متخصصين مؤهلين",
    price: 30,
    duration: 5,
    category: "injection",
    isActive: true,
    icon: "💉",
  },
  {
    id: "4",
    name: "جلسة بخار للأطفال",
    description: "جلسات بخار علاجية للأطفال لعلاج مشاكل التنفس",
    price: 60,
    duration: 30,
    category: "therapy",
    isActive: false,
    icon: "🌬️",
  },
  {
    id: "5",
    name: "استشارة أولية",
    description: "تقييم شامل للحالة الصحية مع توصيات العلاج",
    price: 80,
    duration: 20,
    category: "consultation",
    isActive: true,
    icon: "👩‍⚕️",
  },
]

export default function PharmacyServicesPage() {
  const { user } = useAuth()
  const [services, setServices] = useState<PharmacyService[]>(initialServices)
  const [editingService, setEditingService] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<PharmacyService>>({})

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

  const startEditing = (service: PharmacyService) => {
    setEditingService(service.id)
    setEditData(service)
  }

  const cancelEditing = () => {
    setEditingService(null)
    setEditData({})
  }

  const saveService = () => {
    if (editingService && editData) {
      setServices((prev) =>
        prev.map((service) => (service.id === editingService ? { ...service, ...editData } : service)),
      )
      setEditingService(null)
      setEditData({})
    }
  }

  const toggleServiceStatus = (serviceId: string) => {
    setServices((prev) =>
      prev.map((service) => (service.id === serviceId ? { ...service, isActive: !service.isActive } : service)),
    )
  }

  const getCategoryName = (category: string) => {
    const categories = {
      measurement: "القياسات",
      injection: "الحقن",
      therapy: "العلاج",
      consultation: "الاستشارات",
    }
    return categories[category as keyof typeof categories] || category
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/pharmacy/dashboard" className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">صحتي - إدارة الخدمات</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/pharmacy/dashboard">
                <Button variant="outline" size="sm">
                  لوحة التحكم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">إدارة الخدمات</h2>
            <p className="text-gray-600">تحديث أسعار ومعلومات الخدمات المتاحة</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 ml-2" />
            إضافة خدمة جديدة
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      {editingService === service.id ? (
                        <Input
                          value={editData.name || ""}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="font-semibold text-lg"
                        />
                      ) : (
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                      )}
                      <Badge variant="secondary" className="text-xs mt-1">
                        {getCategoryName(service.category)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => toggleServiceStatus(service.id)}
                      disabled={editingService === service.id}
                    />
                  </div>
                </div>
                {editingService === service.id ? (
                  <textarea
                    value={editData.description || ""}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full p-2 border rounded-md text-sm resize-none"
                    rows={2}
                  />
                ) : (
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">السعر (ريال)</Label>
                    {editingService === service.id ? (
                      <Input
                        type="number"
                        value={editData.price || ""}
                        onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                      />
                    ) : (
                      <div className="text-2xl font-bold text-green-600">{service.price}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">المدة (دقيقة)</Label>
                    {editingService === service.id ? (
                      <Input
                        type="number"
                        value={editData.duration || ""}
                        onChange={(e) => setEditData({ ...editData, duration: Number(e.target.value) })}
                      />
                    ) : (
                      <div className="text-lg font-semibold text-gray-700">{service.duration}</div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "متاح" : "غير متاح"}
                  </Badge>
                  <div className="flex gap-2">
                    {editingService === service.id ? (
                      <>
                        <Button size="sm" onClick={saveService} className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 ml-1" />
                          حفظ
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          <X className="h-4 w-4 ml-1" />
                          إلغاء
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => startEditing(service)}>
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">الخدمات المتاحة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{services.filter((s) => s.isActive).length}</p>
              <p className="text-sm text-gray-500">من {services.length} خدمة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">متوسط السعر</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length)} ريال
              </p>
              <p className="text-sm text-gray-500">للخدمة الواحدة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">متوسط المدة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round(services.reduce((sum, s) => sum + s.duration, 0) / services.length)} دقيقة
              </p>
              <p className="text-sm text-gray-500">للخدمة الواحدة</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
