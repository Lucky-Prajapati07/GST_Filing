"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Users,
  Building,
  FileText,
  TrendingUp,
  AlertCircle,
  Search,
  MoreHorizontal,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const quickStats = [
  { title: "Total Users", value: "12,847", change: "+12%", icon: Users, color: "text-blue-600" },
  { title: "Active Businesses", value: "8,432", change: "+8%", icon: Building, color: "text-green-600" },
  { title: "GST Filings", value: "45,231", change: "This month", icon: FileText, color: "text-purple-600" },
  { title: "Platform Revenue", value: "₹24.5L", change: "+15%", icon: TrendingUp, color: "text-orange-600" },
]

const recentSignups = [
  {
    id: "USR-001",
    name: "Rajesh Kumar",
    email: "rajesh@email.com",
    business: "Kumar Enterprises",
    mobile: "+91 98765 43210",
    signupDate: "Dec 15, 2024",
    lastLogin: "2 hours ago",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya@email.com",
    business: "Sharma Trading Co",
    mobile: "+91 87654 32109",
    signupDate: "Dec 14, 2024",
    lastLogin: "1 day ago",
    status: "Pending",
  },
  {
    id: "USR-003",
    name: "Amit Patel",
    email: "amit@email.com",
    business: "Patel Industries",
    mobile: "+91 76543 21098",
    signupDate: "Dec 13, 2024",
    lastLogin: "3 hours ago",
    status: "Active",
  },
]

const filingStats = [
  { month: "Aug", success: 450, failed: 25 },
  { month: "Sep", success: 520, failed: 18 },
  { month: "Oct", success: 480, failed: 32 },
  { month: "Nov", success: 550, failed: 15 },
  { month: "Dec", success: 570, failed: 12 },
]

const usersByState = [
  { state: "Maharashtra", users: 2845, color: "#0088FE" },
  { state: "Gujarat", users: 2156, color: "#00C49F" },
  { state: "Karnataka", users: 1987, color: "#FFBB28" },
  { state: "Delhi", users: 1654, color: "#FF8042" },
  { state: "Others", users: 4205, color: "#8884D8" },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Monitor platform performance and user activity</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Healthy
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.color}`}>{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Filing Success Rate</CardTitle>
              <CardDescription>Monthly filing statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filingStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="success" fill="#10b981" name="Successful" />
                  <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users by State</CardTitle>
              <CardDescription>Geographic distribution of users</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={usersByState}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ state, percent }) => `${state} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="users"
                  >
                    {usersByState.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Active Users */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Most Active Users</CardTitle>
            <CardDescription>Users with highest activity this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Rajesh Kumar", business: "Kumar Enterprises", filings: 15, invoices: 245 },
                { name: "Priya Sharma", business: "Sharma Trading", filings: 12, invoices: 189 },
                { name: "Amit Patel", business: "Patel Industries", filings: 11, invoices: 167 },
                { name: "Sunita Gupta", business: "Gupta Exports", filings: 9, invoices: 134 },
                { name: "Vikram Singh", business: "Singh Motors", filings: 8, invoices: 98 },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.business}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.filings} Filings</p>
                    <p className="text-sm text-gray-500">{user.invoices} Invoices</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Signups */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent User Registrations</CardTitle>
                <CardDescription>Latest users who joined the platform</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search users..." className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Signup Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSignups.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.business}</TableCell>
                      <TableCell className="font-mono text-sm">{user.mobile}</TableCell>
                      <TableCell>{user.signupDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {user.lastLogin}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status === "Active" ? (
                            <UserCheck className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              System Alerts & Notifications
            </CardTitle>
            <CardDescription>Important system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "success",
                  message: "Database backup completed successfully",
                  time: "2 hours ago",
                  icon: CheckCircle,
                },
                {
                  type: "warning",
                  message: "High server load detected - 85% CPU usage",
                  time: "5 hours ago",
                  icon: AlertCircle,
                },
                {
                  type: "info",
                  message: "Scheduled maintenance window: Dec 20, 2:00 AM - 4:00 AM",
                  time: "1 day ago",
                  icon: Clock,
                },
                {
                  type: "error",
                  message: "GST API rate limit exceeded - temporary slowdown",
                  time: "2 days ago",
                  icon: XCircle,
                },
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <alert.icon
                    className={`w-5 h-5 mt-0.5 ${
                      alert.type === "success"
                        ? "text-green-500"
                        : alert.type === "warning"
                          ? "text-orange-500"
                          : alert.type === "error"
                            ? "text-red-500"
                            : "text-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
