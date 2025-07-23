"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Bell, MapPin, Clock, AlertTriangle, Settings, Filter, Calendar } from "lucide-react"

export default function AlertsPage() {
  const [notifications, setNotifications] = useState({
    urgent: true,
    nearby: true,
    bloodType: true,
    events: false,
  })

  const [alerts] = useState([
    {
      id: 1,
      type: "urgent",
      title: "Urgent: O+ Blood Needed",
      message: "Critical shortage of O+ blood at City General Hospital. Immediate donations needed.",
      location: "City General Hospital, New York, NY",
      time: "2 hours ago",
      bloodType: "O+",
      distance: "0.5 miles",
      isRead: false,
    },
    {
      id: 2,
      type: "urgent",
      title: "Emergency Blood Request",
      message: "Patient in critical condition needs AB- blood urgently.",
      location: "Metropolitan Medical Center, NY",
      time: "4 hours ago",
      bloodType: "AB-",
      distance: "1.2 miles",
      isRead: false,
    },
    {
      id: 3,
      type: "event",
      title: "Blood Drive This Weekend",
      message: "Community blood drive at Central Park. All blood types welcome.",
      location: "Central Park, New York, NY",
      time: "1 day ago",
      bloodType: "All",
      distance: "2.1 miles",
      isRead: true,
    },
    {
      id: 4,
      type: "info",
      title: "Thank You for Your Donation",
      message: "Your recent donation has helped save 3 lives. Thank you for being a hero!",
      location: "City General Hospital, New York, NY",
      time: "3 days ago",
      bloodType: "O+",
      distance: "0.5 miles",
      isRead: true,
    },
    {
      id: 5,
      type: "reminder",
      title: "Donation Eligibility Reminder",
      message: "You're now eligible to donate blood again. Schedule your next donation.",
      location: "Your area",
      time: "1 week ago",
      bloodType: "O+",
      distance: "-",
      isRead: true,
    },
  ])

  const getAlertIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "event":
        return <Calendar className="h-5 w-5 text-blue-600" />
      case "info":
        return <Heart className="h-5 w-5 text-green-600" />
      case "reminder":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case "urgent":
        return "border-l-red-500 bg-red-50"
      case "event":
        return "border-l-blue-500 bg-blue-50"
      case "info":
        return "border-l-green-500 bg-green-50"
      case "reminder":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getBadgeVariant = (type) => {
    switch (type) {
      case "urgent":
        return "destructive"
      case "event":
        return "default"
      case "info":
        return "secondary"
      case "reminder":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">BloodConnect</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-red-600">
              Dashboard
            </Link>
            <Link href="/blood-banks" className="text-gray-600 hover:text-red-600">
              Blood Banks
            </Link>
            <Link href="/donor-portal" className="text-gray-600 hover:text-red-600">
              Donor Portal
            </Link>
            <Link href="/alerts" className="text-red-600 font-medium">
              Alerts
            </Link>
          </nav>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alert Center</h1>
          <p className="text-gray-600">Stay updated with urgent blood requests and donation opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Alert Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="event">Events</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="reminder">Reminders</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Blood Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">Mark All as Read</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 ${getAlertColor(alert.type)} ${!alert.isRead ? "shadow-md" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <CardTitle className={`text-lg ${!alert.isRead ? "font-bold" : "font-medium"}`}>
                            {alert.title}
                          </CardTitle>
                          <CardDescription className="mt-1">{alert.message}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!alert.isRead && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
                        <Badge variant={getBadgeVariant(alert.type)}>
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{alert.time}</span>
                      </div>
                      {alert.distance !== "-" && (
                        <Badge variant="outline" className="text-xs">
                          {alert.distance}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {alert.bloodType}
                      </Badge>
                    </div>
                    {alert.type === "urgent" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Respond Now
                        </Button>
                        <Button size="sm" variant="outline">
                          Get Directions
                        </Button>
                      </div>
                    )}
                    {alert.type === "event" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                        <Button size="sm" variant="outline">
                          Add to Calendar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Customize your alert preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="urgent-alerts" className="text-sm">
                    Urgent Blood Requests
                  </Label>
                  <Switch
                    id="urgent-alerts"
                    checked={notifications.urgent}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, urgent: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="nearby-alerts" className="text-sm">
                    Nearby Opportunities
                  </Label>
                  <Switch
                    id="nearby-alerts"
                    checked={notifications.nearby}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, nearby: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="bloodtype-alerts" className="text-sm">
                    My Blood Type Requests
                  </Label>
                  <Switch
                    id="bloodtype-alerts"
                    checked={notifications.bloodType}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, bloodType: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="event-alerts" className="text-sm">
                    Blood Drive Events
                  </Label>
                  <Switch
                    id="event-alerts"
                    checked={notifications.events}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, events: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Unread Alerts</span>
                  <Badge variant="destructive">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Week</span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Urgent Requests</span>
                  <Badge variant="destructive">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Upcoming Events</span>
                  <Badge variant="default">1</Badge>
                </div>
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
                <p className="text-sm text-gray-700 mb-3">For life-threatening emergencies requiring immediate blood</p>
                <p className="font-bold text-red-600 text-lg mb-3">1-800-BLOOD-911</p>
                <Button className="w-full bg-red-600 hover:bg-red-700">Call Emergency Line</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
