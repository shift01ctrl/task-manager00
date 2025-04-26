
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Trash2, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import TaskFilters from "@/components/TaskFilters"
import TaskSearch from "@/components/TaskSearch"
import TaskSort from "@/components/TaskSort"

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700"
    case "low":
      return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "in-progress":
      return <Clock className="h-5 w-5 text-blue-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-400" />
  }
}

const CardView = ({
  tasks,
  toggleTask,
  deleteTask,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}) => {
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1">
          <TaskSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <TaskSort sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <TaskFilters filter={filter} setFilter={setFilter} />
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-3"
          >
            <Card className="overflow-hidden">
              <div className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                    >
                      {getStatusIcon(task.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-lg ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-700"
                          }`}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {task.description}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        Due: {format(new Date(task.dueDate), "PPP")}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default CardView
