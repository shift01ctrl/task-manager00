
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import CardViewPage from "@/pages/CardViewPage"
import TableViewPage from "@/pages/TableViewPage"
import CalendarViewPage from "@/pages/CalendarViewPage"
import TimelineViewPage from "@/pages/TimelineViewPage"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import ProtectedRoute from "@/components/ProtectedRoute"
import VerticalNavbar from "@/components/VerticalNavbar"

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [user, setUser] = useState(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("dueDate")
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme || "light"
  })
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const handleLogin = (userData) => {
    setUser(userData)
    toast({
      title: "Welcome back! 👋",
      description: "Successfully logged in",
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
    toast({
      title: "Goodbye! 👋",
      description: "Successfully logged out",
    })
  }

  const addTask = (e, taskDetails) => {
    e.preventDefault()
    if (!newTask.trim()) {
      toast({
        title: "Error ❌",
        description: "Task title cannot be empty",
        variant: "destructive",
      })
      return
    }

    const task = {
      id: Date.now(),
      title: newTask,
      description: taskDetails.description,
      completed: taskDetails.status === "completed",
      dueDate: taskDetails.dueDate,
      userId: user.id,
      priority: taskDetails.priority,
      status: taskDetails.status,
      assignedTo: user.id,
      createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, task])
    setNewTask("")
    toast({
      title: "Success ✨",
      description: "Task added successfully",
    })
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "completed" : "todo",
            }
          : task
      )
    )
    toast({
      title: "Updated ✅",
      description: "Task status updated",
    })
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    toast({
      title: "Deleted 🗑️",
      description: "Task deleted successfully",
    })
  }

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    )
    toast({
      title: "Updated ✨",
      description: "Task updated successfully",
    })
  }

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate)
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "title":
          return a.title.localeCompare(b.title)
        case "status":
          const statusOrder = { todo: 0, "in-progress": 1, completed: 2 }
          return statusOrder[a.status] - statusOrder[b.status]
        default:
          return 0
      }
    })
  }

  const filteredAndSortedTasks = sortTasks(
    tasks
      .filter(task => task.userId === (user?.id || null))
      .filter(task => {
        if (filter === "completed") return task.completed
        if (filter === "active") return !task.completed
        return true
      })
      .filter(task => {
        const searchLower = searchQuery.toLowerCase()
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        )
      })
  )

  const sharedProps = {
    tasks: filteredAndSortedTasks,
    newTask,
    setNewTask,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  }

  return (
    <Router>
      <div className={`flex min-h-screen ${theme === "dark" ? "dark" : ""}`}>
        {user && <VerticalNavbar user={user} onLogout={handleLogout} theme={theme} setTheme={setTheme} />}
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <CardViewPage {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table"
              element={
                <ProtectedRoute>
                  <TableViewPage {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarViewPage {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/timeline"
              element={
                <ProtectedRoute>
                  <TimelineViewPage {...sharedProps} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
