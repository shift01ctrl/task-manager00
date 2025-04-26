
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { LayoutGrid, Table, Calendar, Calendar as Timeline, LogOut, User, Home, Search, Settings, Users, UserPlus, Menu,  } from 'lucide-react'
import ThemeToggle from "./ThemeToggle"

const VerticalNavbar = ({ user, onLogout, theme, setTheme }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(true)

  const links = [
    { href: "/home", icon: Home, label: "Home 🏠" },
    { href: "/", icon: LayoutGrid, label: "Card View 📇" },
    { href: "/table", icon: Table, label: "Table View 📊" },
    { href: "/calendar", icon: Calendar, label: "Calendar View 📅" },
    { href: "/timeline", icon: Timeline, label: "Timeline View ⏳" },
    { href: "/search", icon: Search, label: "Search 🔍" },
    { href: "/settings", icon: Settings, label: "Settings ⚙️" },
    { href: "/users", icon: Users, label: "Users 👥" },
    { href: "/teams", icon: UserPlus, label: "Teams 🤝" },
  ]

  const sidebarVariants = {
    open: { width: "256px", transition: { duration: 0.3 } },
    closed: { width: "80px", transition: { duration: 0.3 } },
  }

  const textVariants = {
    open: { opacity: 1, x: 0, display: "block" },
    closed: { opacity: 0, x: -10, display: "none" },
  }

  return (
    <motion.div
      initial="open"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="flex h-screen flex-col bg-white shadow-lg dark:bg-gray-800"
    >
      <div className="flex items-center justify-between p-4">
        <motion.div
          variants={textVariants}
          className="flex items-center gap-3"
        >
          <User className="h-8 w-8 text-primary" />
          <div>
            <p className="font-medium dark:text-white">Welcome 👋</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.name}
            </p>
          </div>
        </motion.div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <AnimatePresence>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
              >
                <Icon className="h-5 w-5" />
                <motion.span variants={textVariants}>
                  {link.label}
                </motion.span>
              </Link>
            )
          })}
        </AnimatePresence>
      </nav>

      <div className="border-t p-4 dark:border-gray-700">
        <motion.div variants={textVariants} className="mb-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </motion.div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-5 w-5" />
          <motion.span variants={textVariants}>Sign Out 👋</motion.span>
        </button>
      </div>
    </motion.div>
  )
}

export default VerticalNavbar
