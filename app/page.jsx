"use client"
import { useState } from "react"
import AdminDashboard from "./components/AdminDashboard"
import DonorsPage from "./components/DonorsPage"
import PatientsPage from "./components/PatientsPage"
import BloodBanksPage from "./components/BloodBanksPage"
import Navigation from "./components/Navigation"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [users, setUsers] = useState([
    { email: "admin@bloodbank.com", password: "admin123", role: "admin", name: "Admin User" },
  ])

  const handleLogin = (credentials) => {
    const user = users.find((u) => u.email === credentials.email && u.password === credentials.password)
    if (user) {
      setIsAuthenticated(true)
      setIsAdmin(user.role === "admin")
      setCurrentPage("dashboard")
      return true
    }
    return false
  }

  const handleRegister = (userData) => {
    // Check if user already exists
    const existingUser = users.find((u) => u.email === userData.email)
    if (existingUser) {
      return { success: false, message: "User already exists with this email" }
    }

    // Add new user
    const newUser = {
      email: userData.email,
      password: userData.password,
      role: "admin", // For demo purposes, all registered users are admins
      name: `${userData.firstName} ${userData.lastName}`,
    }

    setUsers([...users, newUser])
    return { success: true, message: "Registration successful! Please login." }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    setCurrentPage("dashboard")
    setShowRegister(false)
  }

  if (!isAuthenticated) {
    if (showRegister) {
      return <RegisterPage onRegister={handleRegister} onSwitchToLogin={() => setShowRegister(false)} />
    }
    return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard onNavigate={setCurrentPage} />
      case "donors":
        return <DonorsPage />
      case "patients":
        return <PatientsPage />
      case "blood-banks":
        return <BloodBanksPage />
      default:
        return <AdminDashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} isAdmin={isAdmin} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">{renderPage()}</main>
    </div>
  )
}
