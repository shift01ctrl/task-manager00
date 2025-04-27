
import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Calendar } from "lucide-react"
import { format } from "date-fns"
import Timeline from "react-calendar-timeline"
import "react-calendar-timeline/lib/Timeline.css"

const TimelineView = ({ tasks, toggleTask }) => {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  )

  const timelineGroups = [
    { id: 1, title: "High Priority 🔴" },
    { id: 2, title: "Medium Priority 🟡" },
    { id: 3, title: "Low Priority 🟢" },
  ]

  const timelineItems = sortedTasks.map((task) => ({
    id: task.id,
    group: task.priority === "high" ? 1 : task.priority === "medium" ? 2 : 3,
    title: task.title,
    start_time: new Date(task.startDate || task.createdAt),
    end_time: new Date(task.endDate || task.dueDate),
    canMove: false,
    canResize: false,
    itemProps: {
      style: {
        background: task.completed ? "#10B981" : "#3B82F6",
        color: "white",
        borderRadius: "4px",
        padding: "4px",
      },
    },
  }))

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <Timeline
          groups={timelineGroups}
          items={timelineItems}
          defaultTimeStart={new Date().setMonth(new Date().getMonth() - 1)}
          defaultTimeEnd={new Date().setMonth(new Date().getMonth() + 1)}
          lineHeight={50}
          sidebarWidth={150}
          canMove={false}
          canResize={false}
        />
      </div>

      <div className="space-y-4">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <span className={`rounded-full px-2 py-1 text-sm ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
                <div className="mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Start: {format(new Date(task.startDate || task.createdAt), "PPP")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>End: {format(new Date(task.endDate || task.dueDate), "PPP")}</span>
                  </div>
                </div>
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => toggleTask(task.id)}
                >
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      task.completed ? "text-green-500" : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {task.description}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TimelineView
