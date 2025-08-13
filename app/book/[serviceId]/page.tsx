"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Heart, MapPin, Clock, Star, CalendarIcon, ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

// Mock data
const services = [
  {
    id: "1",
    name: "قياس الضغط",
    description: "قياس ضغط الدم بدقة في المنزل مع تقرير مفصل",
    price: 50,
    duration: 15,
    category: "measurement",
    icon: "🩺",
  },
  {
    id: "2",
    name: "قياس السكر",
    description: "فحص مستوى السكر في الدم مع متابعة النتائج",
    price: 40,
    duration: 10,
    category: "measurement",
    icon: "🩸",
  },
  {
    id: "3",
    name: "إعطاء حقن",
    description: "حقن طبية آمنة بواسطة متخصصين مؤهلين",
    price: 30,
    duration: 5,
    category: "injection",
    icon: "💉",
  },
  {
    id: "4",
    name: "جلسة بخار للأطفال",
    description: "جلسات بخار علاجية للأطفال لعلاج مشاكل التنفس",
    price: 60,
    duration: 30,
    category: "therapy",
    icon: "🌬️",
  },
  {
    id: "5",
    name: "استشارة أولية",
    description: "تقييم شامل للحالة الصحية مع توصيات العلاج",
    price: 80,
    duration: 20,
    category: "consultation",
    icon: "👩‍⚕️",
  },
]

const pharmacies = [
  {
    id: "1",
    name: "صيدلية النور",
    address: "شارع الملك فهد، الرياض",
    distance: 1.2,
    rating: 4.8,
    reviewCount: 127,
    isAvailable: true,
    estimatedTime: "15-20 دقيقة",
    services: ["1", "2", "3", "4", "5"],
  },
  {
    id: "2",
    name: "صيدلية الشفاء",
    address: "طريق الملك عبدالعزيز، الرياض",
    distance: 2.1,
    rating: 4.6,
    reviewCount: 89,
    isAvailable: true,
    estimatedTime: "20-25 دقيقة",
    services: ["1", "2", "3", "5"],
  },
  {
    id: "3",
    name: "صيدلية الحياة",
    address: "شارع العليا، الرياض",
    distance: 3.5,
    rating: 4.7,
    reviewCount: 156,
    isAvailable: false,
    estimatedTime: "غير متاح",
    services: ["1", "2", "4", "5"],
  },
  {
    id: "4",
    name: "صيدلية الأمل",
    address: "حي النخيل، الرياض",
    distance: 1.8,
    rating: 4.9,
    reviewCount: 203,
    isAvailable: true,
    estimatedTime: "10-15 دقيقة",
    services: ["1", "2", "3", "4", "5"],
  },
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
]

export default function BookServicePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPharmacy, setSelectedPharmacy] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const serviceId = params.serviceId as string
  const service = services.find((s) => s.id === serviceId)
  const availablePharmacies = pharmacies.filter((p) => p.services.includes(serviceId) && p.isAvailable)

  useEffect(() => {
    if (!service) {
      router.push("/services")
    }
  }, [service, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>يجب تسجيل الدخول</CardTitle>
            <CardDescription>سجل دخولك لحجز الخدمات</CardDescription>
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

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>خدمة غير موجودة</CardTitle>
            <CardDescription>الخدمة المطلوبة غير متاحة</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/services">
              <Button className="w-full">العودة للخدمات</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleBooking = async () => {
    if (!selectedPharmacy || !selectedDate || !selectedTime || !address) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      serviceId: service.id,
      serviceName: service.name,
      pharmacyId: selectedPharmacy,
      pharmacyName: pharmacies.find((p) => p.id === selectedPharmacy)?.name,
      date: selectedDate,
      time: selectedTime,
      address,
      notes,
      price: service.price,
      status: "pending",
      createdAt: new Date(),
    }

    // Store booking (in real app, this would be sent to backend)
    const existingBookings = JSON.parse(localStorage.getItem("healthApp_bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("healthApp_bookings", JSON.stringify(existingBookings))

    setIsLoading(false)
    router.push(`/booking-confirmation/${booking.id}`)
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedToStep2 = selectedPharmacy !== ""
  const canProceedToStep3 = selectedDate && selectedTime
  const canCompleteBooking = address.trim() !== ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/services" className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" />
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">صحتي</h1>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">حجز خدمة</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{service.icon}</div>
              <div>
                <CardTitle className="text-2xl">{service.name}</CardTitle>
                <CardDescription className="text-lg mt-1">{service.description}</CardDescription>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {service.price} ريال
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} دقيقة</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-green-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentStep === 1 && "اختر الصيدلية"}
                {currentStep === 2 && "اختر الوقت"}
                {currentStep === 3 && "تأكيد الحجز"}
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>اختر الصيدلية</CardTitle>
              <CardDescription>اختر الصيدلية الأقرب إليك</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPharmacy} onValueChange={setSelectedPharmacy}>
                <div className="space-y-4">
                  {availablePharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value={pharmacy.id} id={pharmacy.id} />
                      <Label htmlFor={pharmacy.id} className="flex-1 cursor-pointer">
                        <Card className="hover:bg-gray-50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="text-gray-600 text-sm">{pharmacy.address}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium">{pharmacy.rating}</span>
                                    <span className="text-sm text-gray-500">({pharmacy.reviewCount})</span>
                                  </div>
                                  <div className="text-sm text-gray-600">{pharmacy.distance} كم</div>
                                </div>
                              </div>
                              <div className="text-left">
                                <Badge variant={pharmacy.isAvailable ? "default" : "secondary"}>
                                  {pharmacy.estimatedTime}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {availablePharmacies.length === 0 && (
                <div className="text-center py-8">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد صيدليات متاحة</h3>
                  <p className="text-gray-600">لا توجد صيدليات تقدم هذه الخدمة في منطقتك حالياً</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>اختر التاريخ والوقت</CardTitle>
              <CardDescription>حدد الوقت المناسب لك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">التاريخ</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-right font-normal bg-transparent">
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {selectedDate && (
                <div>
                  <Label className="text-base font-semibold mb-3 block">الوقت المتاح</Label>
                  <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <div key={time} className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value={time} id={time} />
                          <Label
                            htmlFor={time}
                            className="flex-1 cursor-pointer text-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                          >
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>تأكيد الحجز</CardTitle>
              <CardDescription>أدخل عنوانك وأي ملاحظات إضافية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">العنوان *</Label>
                <Input
                  id="address"
                  placeholder="أدخل عنوانك بالتفصيل"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  placeholder="أي ملاحظات أو تعليمات خاصة"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">ملخص الحجز</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>الخدمة:</span>
                    <span>{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الصيدلية:</span>
                    <span>{pharmacies.find((p) => p.id === selectedPharmacy)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التاريخ:</span>
                    <span>{selectedDate ? format(selectedDate, "PPP", { locale: ar }) : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الوقت:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المدة:</span>
                    <span>{service.duration} دقيقة</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>الإجمالي:</span>
                    <span className="text-green-600">{service.price} ريال</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="px-8 bg-transparent">
            السابق
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={nextStep}
              disabled={(currentStep === 1 && !canProceedToStep2) || (currentStep === 2 && !canProceedToStep3)}
              className="px-8"
            >
              التالي
            </Button>
          ) : (
            <Button onClick={handleBooking} disabled={!canCompleteBooking || isLoading} className="px-8">
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحجز...
                </>
              ) : (
                "تأكيد الحجز"
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
