
import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    onLogout()
    navigate("/login")
  }

  return (
    <div className="mb-6 flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <span className="font-medium">{user?.name}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  )
}

export default Navbar
