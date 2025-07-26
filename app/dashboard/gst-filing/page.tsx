"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calculator,
  FileText,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
  Eye,
  Edit,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { useState } from "react"

const gstReturns = [
  {
    type: "GSTR-1",
    period: "November 2024",
    dueDate: "2024-12-11",
    status: "Filed",
    arn: "AB1234567890123456789",
    filedDate: "2024-12-10",
    progress: 100,
  },
  {
    type: "GSTR-3B",
    period: "November 2024",
    dueDate: "2024-12-20",
    status: "In Progress",
    arn: "",
    filedDate: "",
    progress: 75,
  },
  {
    type: "GSTR-1",
    period: "December 2024",
    dueDate: "2025-01-11",
    status: "Pending",
    arn: "",
    filedDate: "",
    progress: 25,
  },
]

const b2bData = [
  {
    gstin: "27ABCDE1234F1Z5",
    partyName: "ABC Enterprises",
    invoiceNo: "INV-001",
    invoiceDate: "2024-11-15",
    taxableValue: 25000,
    cgst: 2250,
    sgst: 2250,
    igst: 0,
    total: 29500,
  },
  {
    gstin: "29XYZAB5678G2H6",
    partyName: "XYZ Corporation",
    invoiceDate: "2024-11-20",
    invoiceNo: "INV-002",
    taxableValue: 18500,
    cgst: 1665,
    sgst: 1665,
    igst: 0,
    total: 21830,
  },
]

const reconciliationData = [
  {
    gstin: "27ABCDE1234F1Z5",
    partyName: "ABC Enterprises",
    gstr1Amount: 29500,
    gstr2aAmount: 29500,
    difference: 0,
    status: "Matched",
  },
  {
    gstin: "29XYZAB5678G2H6",
    partyName: "XYZ Corporation",
    gstr1Amount: 21830,
    gstr2aAmount: 20000,
    difference: 1830,
    status: "Mismatch",
  },
]

export default function GSTFilingPage() {
  const [selectedReturn, setSelectedReturn] = useState("GSTR-1")
  const [selectedPeriod, setSelectedPeriod] = useState("2024-11")
  const [activeTab, setActiveTab] = useState("summary")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">GST Filing</h1>
            <p className="text-gray-600">Manage your GST returns and compliance</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload GSTR-2A
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload GSTR-2A for Reconciliation</DialogTitle>
                  <DialogDescription>Upload your GSTR-2A file to match with GSTR-1 data</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="period">Select Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-11">November 2024</SelectItem>
                        <SelectItem value="2024-10">October 2024</SelectItem>
                        <SelectItem value="2024-09">September 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Upload GSTR-2A File</p>
                    <p className="text-sm text-gray-500 mb-4">Supports JSON, Excel files up to 10MB</p>
                    <Button>Choose File</Button>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Upload & Reconcile</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              File Return
            </Button>
          </div>
        </div>

        {/* Filing Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Returns Filed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-green-600">This financial year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-orange-600">Due this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tax Liability</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹66,250</div>
              <p className="text-xs text-blue-600">Current period</p>
            </CardContent>
          </Card>
        </div>

        {/* Return Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Return Type & Period</CardTitle>
            <CardDescription>Choose the GST return type and period for filing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="returnType">Return Type</Label>
                <Select value={selectedReturn} onValueChange={setSelectedReturn}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GSTR-1">GSTR-1 (Outward Supplies)</SelectItem>
                    <SelectItem value="GSTR-3B">GSTR-3B (Monthly Return)</SelectItem>
                    <SelectItem value="GSTR-9">GSTR-9 (Annual Return)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-12">December 2024</SelectItem>
                    <SelectItem value="2024-11">November 2024</SelectItem>
                    <SelectItem value="2024-10">October 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Summary
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filing Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              {selectedReturn} - {selectedPeriod}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="b2b">B2B Details</TabsTrigger>
                <TabsTrigger value="b2c">B2C Details</TabsTrigger>
                <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Outward Supplies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Taxable Value:</span>
                        <span className="font-medium">₹4,35,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CGST:</span>
                        <span className="font-medium">₹39,150</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SGST:</span>
                        <span className="font-medium">₹39,150</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IGST:</span>
                        <span className="font-medium">₹12,500</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-bold">
                        <span>Total Tax:</span>
                        <span>₹90,800</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Input Tax Credit</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>ITC Available:</span>
                        <span className="font-medium">₹24,550</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ITC Utilized:</span>
                        <span className="font-medium">₹24,550</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ITC Balance:</span>
                        <span className="font-medium">₹0</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-bold text-blue-600">
                        <span>Net Tax Payable:</span>
                        <span>₹66,250</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    File Now
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="b2b" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>GSTIN</TableHead>
                        <TableHead>Party Name</TableHead>
                        <TableHead>Invoice No.</TableHead>
                        <TableHead>Invoice Date</TableHead>
                        <TableHead>Taxable Value</TableHead>
                        <TableHead>CGST</TableHead>
                        <TableHead>SGST</TableHead>
                        <TableHead>IGST</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {b2bData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{item.gstin}</TableCell>
                          <TableCell>{item.partyName}</TableCell>
                          <TableCell>{item.invoiceNo}</TableCell>
                          <TableCell>{item.invoiceDate}</TableCell>
                          <TableCell>₹{item.taxableValue.toLocaleString()}</TableCell>
                          <TableCell>₹{item.cgst.toLocaleString()}</TableCell>
                          <TableCell>₹{item.sgst.toLocaleString()}</TableCell>
                          <TableCell>₹{item.igst.toLocaleString()}</TableCell>
                          <TableCell className="font-medium">₹{item.total.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="b2c" className="mt-6">
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">B2C Summary</h3>
                  <p className="text-gray-600 mb-4">Consolidated B2C sales data for the selected period</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">₹1,25,000</div>
                        <div className="text-sm text-gray-600">Taxable Value</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">₹22,500</div>
                        <div className="text-sm text-gray-600">Total Tax</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">₹1,47,500</div>
                        <div className="text-sm text-gray-600">Total Value</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reconciliation" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">GSTR-1 vs GSTR-2A Reconciliation</h3>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      <AlertTriangle className="w-3 h-3 mr-1" />2 Mismatches Found
                    </Badge>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>GSTIN</TableHead>
                          <TableHead>Party Name</TableHead>
                          <TableHead>GSTR-1 Amount</TableHead>
                          <TableHead>GSTR-2A Amount</TableHead>
                          <TableHead>Difference</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reconciliationData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-mono text-sm">{item.gstin}</TableCell>
                            <TableCell>{item.partyName}</TableCell>
                            <TableCell>₹{item.gstr1Amount.toLocaleString()}</TableCell>
                            <TableCell>₹{item.gstr2aAmount.toLocaleString()}</TableCell>
                            <TableCell
                              className={item.difference !== 0 ? "text-red-600 font-medium" : "text-green-600"}
                            >
                              ₹{Math.abs(item.difference).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={item.status === "Matched" ? "default" : "destructive"}>
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {item.status === "Mismatch" && (
                                <Button variant="outline" size="sm">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Resolve
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Filing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Filing History
            </CardTitle>
            <CardDescription>Track your GST return filing status and history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Return Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>ARN</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gstReturns.map((returnItem, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{returnItem.type}</TableCell>
                      <TableCell>{returnItem.period}</TableCell>
                      <TableCell>{returnItem.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            returnItem.status === "Filed"
                              ? "default"
                              : returnItem.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {returnItem.status === "Filed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {returnItem.status === "In Progress" && <Clock className="w-3 h-3 mr-1" />}
                          {returnItem.status === "Pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {returnItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={returnItem.progress} className="w-16 h-2" />
                          <span className="text-sm text-gray-600">{returnItem.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{returnItem.arn || "-"}</TableCell>
                      <TableCell>{returnItem.filedDate || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
