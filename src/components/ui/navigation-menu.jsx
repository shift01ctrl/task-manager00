
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const NavigationMenu = () => {
  const location = useLocation()

  const links = [
    { href: "/", label: "Card View" },
    { href: "/table", label: "Table View" },
    { href: "/calendar", label: "Calendar View" },
    { href: "/timeline", label: "Timeline View" },
  ]

  return (
    <nav className="mb-8 flex justify-center space-x-4">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium transition-colors",
            location.pathname === link.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavigationMenu
