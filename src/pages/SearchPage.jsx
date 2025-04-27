
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Calendar, Clock } from "lucide-react"
import { format } from "date-fns"

const SearchPage = ({
  tasks,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) => {
  const [advancedFilters, setAdvancedFilters] = useState({
    priority: "all",
    status: "all",
    dateRange: "all",
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority = advancedFilters.priority === "all" || task.priority === advancedFilters.priority
    const matchesStatus = advancedFilters.status === "all" || task.status === advancedFilters.status

    let matchesDate = true
    if (advancedFilters.dateRange === "today") {
      matchesDate = format(new Date(task.dueDate), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
    } else if (advancedFilters.dateRange === "week") {
      const taskDate = new Date(task.dueDate)
      const today = new Date()
      const weekFromNow = new Date()
      weekFromNow.setDate(weekFromNow.getDate() + 7)
      matchesDate = taskDate >= today && taskDate <= weekFromNow
    }

    return matchesSearch && matchesPriority && matchesStatus && matchesDate
  })

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700",
    }
    return colors[priority] || "bg-gray-100 text-gray-700"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✅"
      case "in-progress":
        return "🔄"
      default:
        return "📋"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Search Tasks 🔍</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Advanced Filters */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Priority</label>
              <select
                className="w-full rounded-md border p-2"
                value={advancedFilters.priority}
                onChange={(e) =>
                  setAdvancedFilters({ ...advancedFilters, priority: e.target.value })
                }
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <select
                className="w-full rounded-md border p-2"
                value={advancedFilters.status}
                onChange={(e) =>
                  setAdvancedFilters({ ...advancedFilters, status: e.target.value })
                }
              >
                <option value="all">All Statuses</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Due Date</label>
              <select
                className="w-full rounded-md border p-2"
                value={advancedFilters.dateRange}
                onChange={(e) =>
                  setAdvancedFilters({ ...advancedFilters, dateRange: e.target.value })
                }
              >
                <option value="all">All Dates</option>
                <option value="today">Due Today</option>
                <option value="week">Due This Week</option>
              </select>
            </div>
          </div>

          {/* Search Results */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium">
              Search Results ({filteredTasks.length} tasks found)
            </h3>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getStatusIcon(task.status)}</span>
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(task.dueDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchPage
