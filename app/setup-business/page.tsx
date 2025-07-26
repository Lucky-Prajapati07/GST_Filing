"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Bot, Building, Upload, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SetupBusinessPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 2000)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Bot className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Smart GST Filing</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Business Setup</h1>
          <p className="text-gray-600">Let's set up your business profile</p>
        </div>

        <div className="mb-8">
          <Progress value={(step / 2) * 100} className="w-full" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Step {step} of 2</span>
            <span>{step === 1 ? "Business Details" : "Document Upload"}</span>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              {step === 1 ? "Business Information" : "Upload Documents"}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? "Enter your business details for GST compliance"
                : "Upload required documents for verification"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input id="businessName" placeholder="Enter business name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprietorship">Proprietorship</SelectItem>
                        <SelectItem value="pvt-ltd">Private Limited</SelectItem>
                        <SelectItem value="llp">LLP</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="natureOfBusiness">Nature of Business</Label>
                  <Input id="natureOfBusiness" placeholder="e.g., Retail, Manufacturing, Services" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number *</Label>
                    <Input id="pan" placeholder="ABCDE1234F" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN *</Label>
                    <Input id="gstin" placeholder="22ABCDE1234F1Z5" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Enter city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input id="pincode" placeholder="400001" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea id="address" placeholder="Enter complete business address" rows={3} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactMobile">Contact Mobile *</Label>
                    <Input id="contactMobile" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" placeholder="business@email.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signatoryName">Authorized Signatory Name *</Label>
                    <Input id="signatoryName" placeholder="Enter signatory name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signatoryMobile">Signatory Mobile *</Label>
                    <Input id="signatoryMobile" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">PAN Card *</h3>
                    <p className="text-sm text-gray-600 mb-4">Upload clear image of PAN card</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">GST Certificate *</h3>
                    <p className="text-sm text-gray-600 mb-4">Upload GST registration certificate</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Business License (Optional)</h3>
                    <p className="text-sm text-gray-600 mb-4">Upload business license or registration</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Document Guidelines</h4>
                      <ul className="text-sm text-blue-800 mt-2 space-y-1">
                        <li>• Upload clear, readable images (JPG, PNG, PDF)</li>
                        <li>• Maximum file size: 5MB per document</li>
                        <li>• Ensure all text is visible and not blurred</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button onClick={handleNext} disabled={isLoading}>
                {isLoading ? "Setting up..." : step === 2 ? "Complete Setup" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
