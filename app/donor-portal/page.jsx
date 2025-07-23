"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, FileText, Calendar, Award, Activity } from "lucide-react"

export default function DonorPortalPage() {
  const [donorData] = useState({
    name: "John Doe",
    bloodType: "O+",
    totalDonations: 12,
    lastDonation: "2024-01-15",
    nextEligible: "2024-03-15",
    healthStatus: "Eligible",
    reports: [
      {
        id: 1,
        date: "2024-01-15",
        type: "Pre-Donation Health Check",
        status: "Passed",
        hemoglobin: "14.5 g/dL",
        bloodPressure: "120/80",
        pulse: "72 bpm",
        temperature: "98.6°F",
      },
      {
        id: 2,
        date: "2023-11-10",
        type: "Pre-Donation Health Check",
        status: "Passed",
        hemoglobin: "14.2 g/dL",
        bloodPressure: "118/78",
        pulse: "68 bpm",
        temperature: "98.4°F",
      },
    ],
    donations: [
      {
        id: 1,
        date: "2024-01-15",
        location: "City General Hospital",
        type: "Whole Blood",
        volume: "450ml",
        status: "Completed",
      },
      {
        id: 2,
        date: "2023-11-10",
        location: "Metropolitan Blood Center",
        type: "Whole Blood",
        volume: "450ml",
        status: "Completed",
      },
      {
        id: 3,
        date: "2023-09-05",
        location: "Community Health Blood Bank",
        type: "Platelets",
        volume: "300ml",
        status: "Completed",
      },
    ],
  })

  const progressToNextMilestone = (donorData.totalDonations % 5) * 20

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
            <Link href="/donor-portal" className="text-red-600 font-medium">
              Donor Portal
            </Link>
            <Link href="/alerts" className="text-gray-600 hover:text-red-600">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Portal</h1>
          <p className="text-gray-600">Track your donations, health reports, and achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donorData.totalDonations}</div>
              <p className="text-xs text-muted-foreground">Lives potentially saved: {donorData.totalDonations * 3}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
              <Activity className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{donorData.bloodType}</div>
              <p className="text-xs text-muted-foreground">Universal donor</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Status</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{donorData.healthStatus}</div>
              <p className="text-xs text-muted-foreground">Ready to donate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Mar 15</div>
              <p className="text-xs text-muted-foreground">2024</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Achievement Progress
            </CardTitle>
            <CardDescription>Progress towards your next milestone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Next Milestone: {Math.ceil(donorData.totalDonations / 5) * 5} Donations</span>
                  <span>
                    {donorData.totalDonations}/{Math.ceil(donorData.totalDonations / 5) * 5}
                  </span>
                </div>
                <Progress value={progressToNextMilestone} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  <Award className="h-3 w-3 mr-1" />
                  10+ Donations
                </Badge>
                <Badge variant="outline">
                  <Award className="h-3 w-3 mr-1" />
                  15 Donations (Next)
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="donations">Donation History</TabsTrigger>
          </TabsList>

          <TabsContent value="donations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Complete record of your blood donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donorData.donations.map((donation) => (
                    <Card key={donation.id} className="border-l-4 border-l-red-500">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium">{donation.location}</h4>
                            <p className="text-sm text-gray-600">{donation.date}</p>
                          </div>
                          <Badge variant="secondary">{donation.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Type:</span>
                            <div className="font-medium">{donation.type}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Volume:</span>
                            <div className="font-medium">{donation.volume}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
