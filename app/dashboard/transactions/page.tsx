"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  CreditCard,
  Banknote,
  Smartphone,
  FileText,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

const transactions = {
  cash: [
    {
      id: "CSH-001",
      date: "2024-12-15",
      amount: "₹5,000",
      description: "Cash sales",
      type: "Credit",
      status: "Completed",
    },
    {
      id: "CSH-002",
      date: "2024-12-14",
      amount: "₹2,500",
      description: "Office expenses",
      type: "Debit",
      status: "Completed",
    },
  ],
  bank: [
    {
      id: "BNK-001",
      date: "2024-12-15",
      amount: "₹25,000",
      description: "Customer payment",
      type: "Credit",
      status: "Cleared",
      bank: "HDFC Bank",
    },
    {
      id: "BNK-002",
      date: "2024-12-14",
      amount: "₹15,000",
      description: "Supplier payment",
      type: "Debit",
      status: "Cleared",
      bank: "HDFC Bank",
    },
  ],
  upi: [
    {
      id: "UPI-001",
      date: "2024-12-15",
      amount: "₹3,500",
      description: "Online sale",
      type: "Credit",
      status: "Success",
      upiId: "customer@paytm",
    },
    {
      id: "UPI-002",
      date: "2024-12-14",
      amount: "₹1,200",
      description: "Utility bill",
      type: "Debit",
      status: "Success",
      upiId: "business@phonepe",
    },
  ],
  cheque: [
    {
      id: "CHQ-001",
      date: "2024-12-15",
      amount: "₹50,000",
      description: "Invoice payment",
      type: "Credit",
      status: "Cleared",
      chequeNo: "123456",
      bank: "ICICI Bank",
    },
    {
      id: "CHQ-002",
      date: "2024-12-10",
      amount: "₹30,000",
      description: "Rent payment",
      type: "Debit",
      status: "Issued",
      chequeNo: "123457",
      bank: "HDFC Bank",
    },
  ],
  loans: [
    {
      id: "LOAN-001",
      type: "Business Loan",
      principal: "₹5,00,000",
      balance: "₹3,50,000",
      emi: "₹25,000",
      nextDue: "2024-12-20",
      status: "Active",
    },
    {
      id: "LOAN-002",
      type: "Equipment Loan",
      principal: "₹2,00,000",
      balance: "₹75,000",
      emi: "₹15,000",
      nextDue: "2024-12-25",
      status: "Active",
    },
  ],
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("cash")
  const [searchTerm, setSearchTerm] = useState("")

  const getCurrentTransactions = () => {
    return transactions[activeTab as keyof typeof transactions] || []
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Transaction Management</h1>
            <p className="text-gray-600">Track all your financial transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                  <DialogDescription>Record a new financial transaction</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transactionType">Transaction Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transactionMode">Mode *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit">Credit (Received)</SelectItem>
                          <SelectItem value="debit">Debit (Paid)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount *</Label>
                      <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transactionDate">Date *</Label>
                      <Input id="transactionDate" type="date" defaultValue="2024-12-16" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Input id="description" placeholder="Enter transaction description" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="referenceNo">Reference Number</Label>
                      <Input id="referenceNo" placeholder="Transaction reference" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="purchase">Purchase</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                          <SelectItem value="loan">Loan</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Additional notes..." rows={3} />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Save Transaction</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inflow</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹2,45,000</div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Outflow</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹1,85,000</div>
              <p className="text-xs text-red-600">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">₹60,000</div>
              <p className="text-xs text-blue-600">Current balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Cheques</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">2</div>
              <p className="text-xs text-orange-600">Awaiting clearance</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search transactions..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
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

        {/* Transaction Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="cash" className="flex items-center gap-2">
                  <Banknote className="w-4 h-4" />
                  Cash
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Bank
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  UPI
                </TabsTrigger>
                <TabsTrigger value="cheque" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Cheque
                </TabsTrigger>
                <TabsTrigger value="loans" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Loans
                </TabsTrigger>
              </TabsList>

              {/* Cash Transactions */}
              <TabsContent value="cash" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.cash.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === "Credit" ? "default" : "secondary"}>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === "Credit" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                            }
                          >
                            {transaction.amount}
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {transaction.status}
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
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Receipt
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

              {/* Bank Transactions */}
              <TabsContent value="bank" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.bank.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.bank}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === "Credit" ? "default" : "secondary"}>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === "Credit" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                            }
                          >
                            {transaction.amount}
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {transaction.status}
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
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Statement
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

              {/* UPI Transactions */}
              <TabsContent value="upi" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>UPI ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.upi.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className="font-mono text-sm">{transaction.upiId}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === "Credit" ? "default" : "secondary"}>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === "Credit" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                            }
                          >
                            {transaction.amount}
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {transaction.status}
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
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Receipt
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

              {/* Cheque Transactions */}
              <TabsContent value="cheque" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Cheque No.</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.cheque.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className="font-mono">{transaction.chequeNo}</TableCell>
                          <TableCell>{transaction.bank}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === "Credit" ? "default" : "secondary"}>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === "Credit" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                            }
                          >
                            {transaction.amount}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "Cleared"
                                  ? "default"
                                  : transaction.status === "Issued"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {transaction.status === "Cleared" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {transaction.status === "Issued" && <Clock className="w-3 h-3 mr-1" />}
                              {transaction.status === "Bounced" && <XCircle className="w-3 h-3 mr-1" />}
                              {transaction.status}
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
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                {transaction.status === "Issued" && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark as Cleared
                                  </DropdownMenuItem>
                                )}
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

              {/* Loan Tracking */}
              <TabsContent value="loans" className="mt-6">
                <div className="grid gap-4">
                  {transactions.loans.map((loan) => (
                    <Card key={loan.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{loan.type}</CardTitle>
                            <CardDescription>Loan ID: {loan.id}</CardDescription>
                          </div>
                          <Badge variant={loan.status === "Active" ? "default" : "secondary"}>{loan.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Principal Amount</p>
                            <p className="text-lg font-semibold">{loan.principal}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Outstanding Balance</p>
                            <p className="text-lg font-semibold text-orange-600">{loan.balance}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Monthly EMI</p>
                            <p className="text-lg font-semibold">{loan.emi}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Next Due Date</p>
                            <p className="text-lg font-semibold flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {loan.nextDue}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Statement
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Update EMI
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
