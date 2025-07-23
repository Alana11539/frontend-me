"use client"
import { useEffect, useState } from "react"
import axios from "axios";
import axiosInstance from "../../redux/axiosInstance"

export default function BloodBankPage() {
  const [bloodInventory, setBloodInventory] = useState([])
  const [bloodBanks, setBloodBanks] = useState([])
  const [criticalBloodTypes, setCriticalBloodTypes] = useState([])

  const getStatus = (units) => {
    if (units >= 40) return "Excellent"
    if (units >= 25) return "Good"
    if (units >= 15) return "Medium"
    if (units >= 8) return "Low"
    return "Critical"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent": return "border-green-500 text-green-700"
      case "Good": return "border-blue-500 text-blue-700"
      case "Medium": return "border-yellow-500 text-yellow-700"
      case "Low": return "border-orange-500 text-orange-700"
      case "Critical": return "border-red-500 text-red-700"
      default: return "border-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Excellent": return "✅"
      case "Good": return "👍"
      case "Medium": return "⚠️"
      case "Low": return "❗"
      case "Critical": return "🚨"
      default: return "❓"
    }
  }

  useEffect(() => {
    const fetchBloodStock = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

        const res = await axiosInstance.get("/api/bloodbank/blood-stock", {
        headers: {
          Authorization: `Bearer ${token}` // ✅ attach token properly
        },
        withCredentials: true,
      })

        const stock = res.data.bloodStock

        const formatted = Object.entries(stock).map(([type, units]) => ({
          type: type.replace("_Positive", "+").replace("_Negative", "-"),
          units,
          status: getStatus(units),
          lastUpdated: "Just now"
        }))

        setBloodInventory(formatted)
        setCriticalBloodTypes(formatted.filter(b => getStatus(b.units) === "Critical"))

      } catch (error) {
        console.error("Failed to fetch blood stock:", error)
      }
    }

    fetchBloodStock()
  }, []);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blood Banks</h1>
          <p className="text-gray-600 mt-1">View blood bank locations and current inventory status</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalBloodTypes.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">🚨</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Critical Blood Shortage Alert</h3>
              <p className="text-red-700">Immediate attention required for the following blood types:</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {criticalBloodTypes.map((blood) => (
              <div key={blood.type} className="bg-red-100 border border-red-300 rounded-lg px-4 py-2">
                <div className="font-bold text-red-900">{blood.type}</div>
                <div className="text-sm text-red-700">{blood.units} units remaining</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Contact Emergency Services
            </button>
            <button className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors">
              Send Donor Alerts
            </button>
          </div>
        </div>
      )}

      {/* Blood Inventory Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Current Blood Inventory</h2>
          <p className="text-gray-600 mt-1">Real-time blood availability across all blood banks</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bloodInventory.map((blood) => (
              <div key={blood.type} className={`border-2 rounded-xl p-6 text-center ${getStatusColor(blood.status)}`}>
                <div className="text-3xl mb-2">{getStatusIcon(blood.status)}</div>
                <div className="text-2xl font-bold mb-1">{blood.type}</div>
                <div className="text-xl font-semibold mb-2">{blood.units} units</div>
                <div className="text-sm font-medium mb-1">{blood.status}</div>
                <div className="text-xs opacity-75">Updated {blood.lastUpdated}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blood Banks List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Blood Bank Locations</h2>
          <p className="text-gray-600 mt-1">Contact information and operating hours</p>
        </div>
        <div className="divide-y divide-gray-200">
          {bloodBanks.map((bank) => (
            <div key={bank.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{bank.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">📍</span>
                        <span className="text-gray-700">{bank.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">📞</span>
                        <span className="text-gray-700">{bank.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">✉️</span>
                        <span className="text-gray-700">{bank.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">🕒</span>
                        <span className="text-gray-700">{bank.operatingHours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-500">🚨</span>
                        <span className="text-gray-700">Emergency: {bank.emergencyContact}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-6">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Contact
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Inventory Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Detailed Blood Inventory</h2>
          <p className="text-gray-600 mt-1">Complete breakdown of blood units by type and status</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available Units
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action Required
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bloodInventory.map((blood) => (
                <tr key={blood.type} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold text-sm">{blood.type}</span>
                      </div>
                      <div className="font-medium text-gray-900">{blood.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-2xl font-bold text-gray-900">{blood.units}</div>
                    <div className="text-sm text-gray-500">units</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(blood.status)}`}
                    >
                      <span className="mr-1">{getStatusIcon(blood.status)}</span>
                      {blood.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blood.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {blood.status === "Critical" && (
                      <button className="text-red-600 hover:text-red-900 hover:underline">Emergency Alert</button>
                    )}
                    {blood.status === "Low" && (
                      <button className="text-orange-600 hover:text-orange-900 hover:underline">Request Donors</button>
                    )}
                    {(blood.status === "Good" || blood.status === "Excellent") && (
                      <span className="text-green-600">No Action Needed</span>
                    )}
                    {blood.status === "Medium" && (
                      <button className="text-yellow-600 hover:text-yellow-900 hover:underline">Monitor Closely</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
