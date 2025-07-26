"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Eye,
  Printer,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const reportTypes = [
  { id: "sales", name: "Sales Report", description: "Detailed sales analysis and trends", icon: TrendingUp },
  {
    id: "purchase",
    name: "Purchase / ITC Report",
    description: "Purchase transactions and ITC claims",
    icon: TrendingDown,
  },
  { id: "gstr1", name: "GSTR-1 Report", description: "Outward supplies summary", icon: FileText },
  { id: "gstr2a", name: "GSTR-2A Report", description: "Inward supplies summary", icon: FileText },
  { id: "gstr3b", name: "GSTR-3B Report", description: "Monthly return summary", icon: FileText },
  { id: "gstr9", name: "GSTR-9 Report", description: "Annual return summary", icon: FileText },
  { id: "pl", name: "Profit & Loss", description: "P&L statement for selected period", icon: BarChart3 },
  { id: "balance", name: "Balance Sheet", description: "Financial position statement", icon: BarChart3 },
  { id: "ledger", name: "Customer/Vendor Ledger", description: "Party-wise transaction summary", icon: Users },
  { id: "expense", name: "Expense Summary", description: "Category-wise expense analysis", icon: DollarSign },
  { id: "loan", name: "Loan Account Statement", description: "Loan EMI and balance tracking", icon: Calendar },
]

const salesData = [
  { month: "Aug", sales: 450000, profit: 67500 },
  { month: "Sep", sales: 520000, profit: 78000 },
  { month: "Oct", sales: 480000, profit: 72000 },
  { month: "Nov", sales: 550000, profit: 82500 },
  { month: "Dec", sales: 570000, profit: 85500 },
]

const gstData = [
  { type: "CGST", amount: 45000 },
  { type: "SGST", amount: 45000 },
  { type: "IGST", amount: 25000 },
  { type: "Cess", amount: 5000 },
]

const customerLedger = [
  { party: "ABC Enterprises", opening: 25000, sales: 125000, payments: 100000, closing: 50000 },
  { party: "XYZ Corporation", opening: 15000, sales: 85000, payments: 90000, closing: 10000 },
  { party: "PQR Industries", opening: 30000, sales: 95000, payments: 80000, closing: 45000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("")
  const [dateFrom, setDateFrom] = useState("2024-11-01")
  const [dateTo, setDateTo] = useState("2024-11-30")
  const [selectedParty, setSelectedParty] = useState("all")

  const generateReport = () => {
    // Report generation logic would go here
    console.log("Generating report:", selectedReport, dateFrom, dateTo)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate comprehensive business reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹5,70,000</div>
              <p className="text-xs text-green-600">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
              <TrendingDown className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3,85,000</div>
              <p className="text-xs text-blue-600">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹85,500</div>
              <p className="text-xs text-purple-600">15% profit margin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GST Collected</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,20,000</div>
              <p className="text-xs text-orange-600">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>Select report type and filters to generate custom reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((report) => (
                      <SelectItem key={report.id} value={report.id}>
                        {report.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFrom">From Date</Label>
                <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">To Date</Label>
                <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="party">Party (Optional)</Label>
                <Select value={selectedParty} onValueChange={setSelectedParty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All parties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Parties</SelectItem>
                    <SelectItem value="abc">ABC Enterprises</SelectItem>
                    <SelectItem value="xyz">XYZ Corporation</SelectItem>
                    <SelectItem value="pqr">PQR Industries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={generateReport} className="w-full bg-blue-600 hover:bg-blue-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <report.icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription className="text-sm">{report.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales & Profit Trend</CardTitle>
              <CardDescription>Monthly sales and profit analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                  <Bar dataKey="profit" fill="#10b981" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GST Collection Breakdown</CardTitle>
              <CardDescription>Tax collection by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gstData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {gstData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sample Report - Customer Ledger */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Customer Ledger Summary</CardTitle>
                <CardDescription>Party-wise outstanding and transaction summary</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Party Name</TableHead>
                    <TableHead>Opening Balance</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Payments Received</TableHead>
                    <TableHead>Closing Balance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerLedger.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.party}</TableCell>
                      <TableCell>₹{customer.opening.toLocaleString()}</TableCell>
                      <TableCell>₹{customer.sales.toLocaleString()}</TableCell>
                      <TableCell>₹{customer.payments.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">₹{customer.closing.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={customer.closing > 0 ? "secondary" : "default"}>
                          {customer.closing > 0 ? "Outstanding" : "Clear"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Sales Report - November 2024", date: "2024-12-01", type: "PDF", size: "2.5 MB" },
                { name: "GSTR-3B - October 2024", date: "2024-11-20", type: "Excel", size: "1.8 MB" },
                { name: "P&L Statement - Q3 2024", date: "2024-11-15", type: "PDF", size: "3.2 MB" },
                { name: "Customer Ledger - November 2024", date: "2024-11-10", type: "Excel", size: "2.1 MB" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">
                        Generated on {report.date} • {report.type} • {report.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
