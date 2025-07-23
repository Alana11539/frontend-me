"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MapPin,
  Bell,
  User,
  Calendar,
  Droplets,
  AlertTriangle,
  Settings
} from "lucide-react"
import axios from "axios"

export default function DashboardPage() {
  const [activities, setActivities] = useState([])
  const [user, setUser] = useState(null)
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await axios.get("http://localhost:5000/api/admin/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("API Response:", res.data)
        setUser(res.data.user)
        setAlerts(res.data.alerts || [])
      } catch (err) {
        console.error("Token error or unauthorized:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ✅ FIXED: Prevent crash when user is null */}
      {user && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Here's your blood donation dashboard</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
                <Droplets className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{user?.bloodType}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                <Heart className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.totalDonations}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Donation</CardTitle>
                <Calendar className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jan 15</div>
                <p className="text-xs text-muted-foreground">2024</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Alerts
              </CardTitle>
              <CardDescription>Blood donation requests in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle
                    className={`h-5 w-5 mt-0.5 ${alert.type === "urgent" ? "text-red-600" : "text-blue-600"}`}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <Badge variant={alert.type === "urgent" ? "destructive" : "secondary"}>
                    {alert.type === "urgent" ? "Urgent" : "Info"}
                  </Badge>
                </div>
              ))}
              <Link href="/alerts">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Alerts
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blood-banks">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Blood Banks
                  </Button>
                </Link>
                <Link href="/donor-portal">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <User className="h-4 w-4 mr-2" />
                    Donor Portal
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </Link>
                <Link href="/schedule-donation">
                  <Button className="w-full justify-start bg-red-600 hover:bg-red-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Donation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "JD"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Type:</span>
                  <Badge variant="secondary">{user?.bloodType}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span>{user?.city}, {user?.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Donor Status:</span>
                  <Badge variant={user?.isDonor ? "default" : "secondary"}>
                    {user?.isDonor ? "Active Donor" : "Not a Donor"}
                  </Badge>
                </div>
              </div>
              <Link href="/profile">
                <Button variant="outline" className="w-full bg-transparent">Edit Profile</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Donation Eligible</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                You're eligible to donate blood. Your last donation was over 8 weeks ago.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">Schedule Donation</Button>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">24/7 Blood Emergency Hotline</p>
              <p className="font-bold text-red-600 text-lg">1-800-BLOOD-911</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
