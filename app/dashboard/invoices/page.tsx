"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  FileText,
  Camera,
  Share,
  Mail,
  MessageSquare,
  Eye,
} from "lucide-react"
import { useState } from "react"

const invoices = [
  {
    id: "INV-001",
    party: "ABC Enterprises",
    date: "2024-12-15",
    amount: "₹25,000",
    gst: "₹4,500",
    total: "₹29,500",
    status: "Paid",
    type: "B2B",
    category: "Sales",
  },
  {
    id: "INV-002",
    party: "XYZ Corporation",
    date: "2024-12-14",
    amount: "₹18,500",
    gst: "₹3,330",
    total: "₹21,830",
    status: "Pending",
    type: "B2B",
    category: "Sales",
  },
  {
    id: "PUR-001",
    party: "Supplier Ltd",
    date: "2024-12-13",
    amount: "₹15,000",
    gst: "₹2,700",
    total: "₹17,700",
    status: "Paid",
    type: "B2B",
    category: "Purchase",
  },
]

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [invoiceItems, setInvoiceItems] = useState([
    { name: "", qty: 1, price: 0, discount: 0, taxRate: 18, amount: 0 },
  ])

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { name: "", qty: 1, price: 0, discount: 0, taxRate: 18, amount: 0 }])
  }

  const calculateItemAmount = (item: any) => {
    const baseAmount = item.qty * item.price
    const discountAmount = (baseAmount * item.discount) / 100
    const taxableAmount = baseAmount - discountAmount
    const taxAmount = (taxableAmount * item.taxRate) / 100
    return taxableAmount + taxAmount
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.party.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "sales" && invoice.category === "Sales") ||
      (activeTab === "purchase" && invoice.category === "Purchase") ||
      (activeTab === "drafts" && invoice.status === "Draft")
    return matchesSearch && matchesTab
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600">Create, manage and track your invoices</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  OCR Upload
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Invoice via OCR</DialogTitle>
                  <DialogDescription>Upload an image or PDF to extract invoice data automatically</DialogDescription>
                </DialogHeader>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-500 mb-4">Supports JPG, PNG, PDF up to 10MB</p>
                  <Button>Choose Files</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                  <DialogDescription>Fill in the details to create a new invoice</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Basic Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceNo">Invoice Number</Label>
                      <Input id="invoiceNo" value="INV-004" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoiceDate">Invoice Date</Label>
                      <Input id="invoiceDate" type="date" defaultValue="2024-12-16" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                  </div>

                  {/* Party Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="party">Select Party</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose party" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="abc">ABC Enterprises</SelectItem>
                          <SelectItem value="xyz">XYZ Corporation</SelectItem>
                          <SelectItem value="pqr">PQR Industries</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyGstin">Party GSTIN</Label>
                      <Input id="partyGstin" value="27ABCDE1234F1Z5" readOnly />
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold">Invoice Items</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addInvoiceItem}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item Name</TableHead>
                            <TableHead>HSN Code</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Discount %</TableHead>
                            <TableHead>Tax %</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoiceItems.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input placeholder="Item name" className="min-w-32" />
                              </TableCell>
                              <TableCell>
                                <Input placeholder="HSN" className="w-20" />
                              </TableCell>
                              <TableCell>
                                <Input type="number" defaultValue="1" className="w-16" />
                              </TableCell>
                              <TableCell>
                                <Input type="number" placeholder="0.00" className="w-20" />
                              </TableCell>
                              <TableCell>
                                <Input type="number" placeholder="0" className="w-16" />
                              </TableCell>
                              <TableCell>
                                <Select defaultValue="18">
                                  <SelectTrigger className="w-16">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0">0%</SelectItem>
                                    <SelectItem value="5">5%</SelectItem>
                                    <SelectItem value="12">12%</SelectItem>
                                    <SelectItem value="18">18%</SelectItem>
                                    <SelectItem value="28">28%</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input value="₹0.00" readOnly className="w-20" />
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ewayBill">E-Way Bill Number</Label>
                      <Input id="ewayBill" placeholder="Enter E-Way Bill No." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transportMode">Transport Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="road">Road</SelectItem>
                          <SelectItem value="rail">Rail</SelectItem>
                          <SelectItem value="air">Air</SelectItem>
                          <SelectItem value="ship">Ship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Additional notes or terms..." rows={3} />
                  </div>

                  {/* Totals */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹0.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Discount:</span>
                          <span>₹0.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CGST:</span>
                          <span>₹0.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SGST:</span>
                          <span>₹0.00</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>IGST:</span>
                          <span>₹0.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cess:</span>
                          <span>₹0.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total:</span>
                          <span>₹0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Create Invoice</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search invoices by number or party..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Invoices ({filteredInvoices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sales">Sales (B2B/B2C)</TabsTrigger>
                <TabsTrigger value="purchase">Purchase</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="invalid">Invalid</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice No.</TableHead>
                        <TableHead>Party</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>GST</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.party}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>{invoice.gst}</TableCell>
                          <TableCell className="font-medium">{invoice.total}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{invoice.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                invoice.status === "Paid"
                                  ? "default"
                                  : invoice.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  WhatsApp
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
