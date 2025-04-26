
import React from "react"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Moon className="h-4 w-4" />
    </div>
  )
}

export default ThemeToggle
