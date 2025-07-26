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
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
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
  Users,
  Building,
  FileText,
  Calculator,
  Database,
  Shield,
  Bell,
  Palette,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Upload,
  Download,
  Eye,
  EyeOff,
  Save,
} from "lucide-react"
import { useState } from "react"

const users = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@business.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-12-15",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@business.com",
    role: "Staff",
    status: "Active",
    lastLogin: "2024-12-14",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@business.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2024-12-10",
  },
]

const gstSlabs = [
  { id: 1, description: "Essential Items", rate: 0 },
  { id: 2, description: "Basic Necessities", rate: 5 },
  { id: 3, description: "Standard Items", rate: 12 },
  { id: 4, description: "Regular Items", rate: 18 },
  { id: 5, description: "Luxury Items", rate: 28 },
]

const paymentModes = [
  { id: 1, name: "Cash", enabled: true },
  { id: 2, name: "Bank Transfer", enabled: true },
  { id: 3, name: "UPI", enabled: true },
  { id: 4, name: "Credit Card", enabled: true },
  { id: 5, name: "Cheque", enabled: true },
  { id: 6, name: "Digital Wallet", enabled: false },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [compactLayout, setCompactLayout] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and application preferences</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1">
                  <TabsTrigger value="users" className="flex flex-col gap-1 h-16">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Users</span>
                  </TabsTrigger>
                  <TabsTrigger value="company" className="flex flex-col gap-1 h-16">
                    <Building className="w-4 h-4" />
                    <span className="text-xs">Company</span>
                  </TabsTrigger>
                  <TabsTrigger value="invoice" className="flex flex-col gap-1 h-16">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">Invoice</span>
                  </TabsTrigger>
                  <TabsTrigger value="tax" className="flex flex-col gap-1 h-16">
                    <Calculator className="w-4 h-4" />
                    <span className="text-xs">Tax</span>
                  </TabsTrigger>
                  <TabsTrigger value="backup" className="flex flex-col gap-1 h-16">
                    <Database className="w-4 h-4" />
                    <span className="text-xs">Backup</span>
                  </TabsTrigger>
                  <TabsTrigger value="roles" className="flex flex-col gap-1 h-16">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">Roles</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex flex-col gap-1 h-16">
                    <Bell className="w-4 h-4" />
                    <span className="text-xs">Alerts</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="flex flex-col gap-1 h-16">
                    <Palette className="w-4 h-4" />
                    <span className="text-xs">Theme</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* User Management */}
              <TabsContent value="users" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">User Management</h3>
                      <p className="text-sm text-gray-600">Add and manage users with role-based access</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>
                            Create a new user account with specific role and permissions
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="userName">Full Name</Label>
                              <Input id="userName" placeholder="Enter full name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="userEmail">Email</Label>
                              <Input id="userEmail" type="email" placeholder="user@email.com" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="userRole">Role</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="staff">Staff</SelectItem>
                                  <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="userPhone">Phone</Label>
                              <Input id="userPhone" placeholder="+91 98765 43210" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label>Module Access</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                "Dashboard",
                                "Clients",
                                "Invoices",
                                "Expenses",
                                "GST Filing",
                                "Transactions",
                                "Reports",
                                "Settings",
                              ].map((module) => (
                                <div key={module} className="flex items-center space-x-2">
                                  <Checkbox id={module} defaultChecked />
                                  <Label htmlFor={module} className="text-sm">
                                    {module}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Create User</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
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
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Activity
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    {user.status === "Active" ? (
                                      <EyeOff className="w-4 h-4 mr-2" />
                                    ) : (
                                      <Eye className="w-4 h-4 mr-2" />
                                    )}
                                    {user.status === "Active" ? "Disable" : "Enable"}
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
                </div>
              </TabsContent>

              {/* Company Profile */}
              <TabsContent value="company" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Company Profile</h3>
                    <p className="text-sm text-gray-600">Update your business information and details</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input id="businessName" defaultValue="Acme Enterprises" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pan">PAN Number</Label>
                            <Input id="pan" defaultValue="ABCDE1234F" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gstin">GSTIN</Label>
                            <Input id="gstin" defaultValue="27ABCDE1234F1Z5" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Business Address</Label>
                          <Textarea
                            id="address"
                            defaultValue="123 Business Street, Commercial Area, Mumbai - 400001"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" defaultValue="+91 98765 43210" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="contact@acme.com" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Bank Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input id="bankName" defaultValue="HDFC Bank" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input id="accountNumber" defaultValue="1234567890123456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ifsc">IFSC Code</Label>
                            <Input id="ifsc" defaultValue="HDFC0001234" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Input id="branch" defaultValue="Mumbai Main" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="logo">Company Logo</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Upload company logo</p>
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Choose File
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Invoice Settings */}
              <TabsContent value="invoice" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Invoice Settings</h3>
                    <p className="text-sm text-gray-600">Customize your invoice format and preferences</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Invoice Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                            <Input id="invoicePrefix" defaultValue="INV-" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dueDays">Default Due Days</Label>
                            <Input id="dueDays" type="number" defaultValue="30" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="footerNote">Footer Note</Label>
                          <Textarea id="footerNote" defaultValue="Thank you for your business!" rows={2} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="template">Invoice Template</Label>
                          <Select defaultValue="modern">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="classic">Classic</SelectItem>
                              <SelectItem value="modern">Modern</SelectItem>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="einvoicing" />
                          <Label htmlFor="einvoicing">Enable E-invoicing</Label>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Terms & Conditions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Label htmlFor="terms">Default Terms & Conditions</Label>
                          <Textarea
                            id="terms"
                            defaultValue="1. Payment is due within 30 days of invoice date.&#10;2. Late payments may incur additional charges.&#10;3. All disputes must be reported within 7 days."
                            rows={8}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Tax & Payment Settings */}
              <TabsContent value="tax" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Tax & Payment Settings</h3>
                    <p className="text-sm text-gray-600">Configure GST rates and payment methods</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>GST Rate Slabs</CardTitle>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Rate
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add GST Rate</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="rateDescription">Description</Label>
                                  <Input id="rateDescription" placeholder="Enter rate description" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="ratePercent">GST Rate (%)</Label>
                                  <Input id="ratePercent" type="number" placeholder="0" />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button>Add Rate</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {gstSlabs.map((slab) => (
                            <div key={slab.id} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <span className="font-medium">{slab.description}</span>
                                <span className="text-sm text-gray-500 ml-2">({slab.rate}%)</span>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {paymentModes.map((mode) => (
                            <div key={mode.id} className="flex items-center justify-between p-2 border rounded">
                              <div className="flex items-center space-x-2">
                                <Switch checked={mode.enabled} />
                                <span>{mode.name}</span>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4 bg-transparent">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Payment Method
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Backup & Restore */}
              <TabsContent value="backup" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Backup & Restore</h3>
                    <p className="text-sm text-gray-600">Manage your data backups and restore points</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Automatic Backup</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Enable automatic backup</Label>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="backupFrequency">Backup Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="backupTime">Backup Time</Label>
                          <Input id="backupTime" type="time" defaultValue="02:00" />
                        </div>
                        <Button className="w-full">
                          <Database className="w-4 h-4 mr-2" />
                          Create Backup Now
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Backup History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { date: "2024-12-15", size: "25.6 MB", status: "Success" },
                            { date: "2024-12-14", size: "24.8 MB", status: "Success" },
                            { date: "2024-12-13", size: "24.2 MB", status: "Success" },
                            { date: "2024-12-12", size: "23.9 MB", status: "Failed" },
                          ].map((backup, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <p className="font-medium">{backup.date}</p>
                                <p className="text-sm text-gray-500">{backup.size}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={backup.status === "Success" ? "default" : "destructive"}>
                                  {backup.status}
                                </Badge>
                                {backup.status === "Success" && (
                                  <Button variant="ghost" size="icon">
                                    <Download className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Role-Based Access */}
              <TabsContent value="roles" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Role-Based Access Control</h3>
                      <p className="text-sm text-gray-600">Create custom roles and manage permissions</p>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Role
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {["Admin", "Staff", "Viewer"].map((role) => (
                      <Card key={role}>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>{role}</CardTitle>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {[
                              "Dashboard",
                              "Clients",
                              "Invoices",
                              "Expenses",
                              "GST Filing",
                              "Transactions",
                              "Reports",
                              "Settings",
                            ].map((module) => (
                              <div key={module} className="flex items-center justify-between">
                                <span className="text-sm">{module}</span>
                                <Switch
                                  defaultChecked={
                                    role === "Admin" ||
                                    (role === "Staff" && module !== "Settings") ||
                                    (role === "Viewer" && ["Dashboard", "Reports"].includes(module))
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Notifications & Alerts */}
              <TabsContent value="notifications" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Alerts & Notifications</h3>
                    <p className="text-sm text-gray-600">Configure notification preferences and alerts</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Filing Reminders</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>GSTR-1 Filing Reminder</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>GSTR-3B Filing Reminder</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Payment Due Reminders</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reminderDays">Remind before (days)</Label>
                          <Input id="reminderDays" type="number" defaultValue="3" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Communication Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Email Notifications</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>SMS Notifications</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>WhatsApp Notifications</Label>
                          <Switch />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notificationEmail">Notification Email</Label>
                          <Input id="notificationEmail" type="email" defaultValue="admin@business.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notificationPhone">Notification Phone</Label>
                          <Input id="notificationPhone" defaultValue="+91 98765 43210" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Appearance */}
              <TabsContent value="appearance" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Appearance Settings</h3>
                    <p className="text-sm text-gray-600">Customize the look and feel of your application</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Theme Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Dark Mode</Label>
                          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                        </div>
                        <div className="space-y-2">
                          <Label>Accent Color</Label>
                          <div className="flex gap-2">
                            {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                              <button
                                key={color}
                                className="w-8 h-8 rounded-full border-2 border-gray-300"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Compact Layout</Label>
                          <Switch checked={compactLayout} onCheckedChange={setCompactLayout} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Display Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Date Format</Label>
                          <Select defaultValue="dd-mm-yyyy">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                              <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Currency Format</Label>
                          <Select defaultValue="inr">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inr">₹ (INR)</SelectItem>
                              <SelectItem value="usd">$ (USD)</SelectItem>
                              <SelectItem value="eur">€ (EUR)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Number Format</Label>
                          <Select defaultValue="indian">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="indian">Indian (1,23,456)</SelectItem>
                              <SelectItem value="international">International (123,456)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
