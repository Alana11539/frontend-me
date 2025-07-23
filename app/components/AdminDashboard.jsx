"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navigation from "./Navigation";
import axiosInstance from "../../redux/axiosInstance"

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [bloodAvailability, setBloodAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy session to mock admin login (you can replace with real session state)
  const isAdmin = true;

  useEffect(() => {
    // Temporary mock activities
    setRecentActivities([
      { id: 1, type: "patient", action: "New patient registered", user: "Ali", time: "10 mins ago" },
      { id: 2, type: "donor", action: "Donor donated blood", user: "Zara", time: "30 mins ago" },
      { id: 3, type: "blood-bank", action: "Stock updated", user: "Admin", time: "1 hour ago" },
    ]);
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await  axiosInstance.get("/api/admin");
      setStats(data.stats || []);
      setRecentActivities(data.recentActivities || []);
      setBloodAvailability(data.bloodAvailability || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load dashboard");
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-orange-100 text-orange-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "patient": return "🏥";
      case "donor": return "🧑‍🦰";
      case "blood-bank": return "🩸";
      default: return "🔔";
    }
  };

  const onNavigate = (page) => {
    switch (page) {
      case "donors": router.push("/donors"); break;
      case "patients": router.push("/patients"); break;
      case "blood-banks": router.push("/blood-banks"); break;
      default: break;
    }
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    router.push("/login");
  };

  const currentPage = "admin-dashboard";

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation at top */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <div className="space-y-8 px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here’s what’s happening.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </div>
            </div>
          ))}
        </div>

        {/* Blood Availability & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blood Availability */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow border">
            <div className="p-6 border-b flex justify-between">
              <h2 className="text-xl font-bold">Blood Availability</h2>
              <button onClick={() => onNavigate("blood-banks")} className="text-sm text-red-600 hover:underline">
                View All
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {bloodAvailability.map((blood, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{blood.type}</div>
                  <div className="text-lg text-gray-700">{blood.units} units</div>
                  <div className={`mt-2 inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(blood.status)}`}>
                    {blood.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Recent Activities</h2>
            </div>
            <div className="p-6 space-y-4">
              {recentActivities.map((activity, index) => {
                const key = activity?.id || `${activity?.action}-${index}`;
                const icon = getActivityIcon(activity?.type);
                return (
                  <div key={key} className="flex space-x-3 items-start">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                      {icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{activity?.action}</p>
                      <p className="text-sm text-gray-500">{activity?.user}</p>
                      <p className="text-xs text-gray-400">{activity?.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Manage Donors", desc: "Add, edit, or view donor records", icon: "👥", path: "donors" },
              { title: "Manage Patients", desc: "Add, edit, or view patient records", icon: "🏥", path: "patients" },
              { title: "Blood Banks", desc: "View blood bank information", icon: "🩸", path: "blood-banks" },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(action.path)}
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 flex items-center justify-center text-xl bg-gray-100 rounded-lg mr-4">
                  {action.icon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
