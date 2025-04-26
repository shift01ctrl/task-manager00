
import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns"

const CalendarView = ({ tasks, toggleTask }) => {
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  return (
    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="text-center text-sm font-semibold text-gray-500"
        >
          {day}
        </div>
      ))}
      {days.map((day, index) => {
        const dayTasks = tasks.filter((task) =>
          isSameDay(new Date(task.dueDate), day)
        )
        return (
          <motion.div
            key={day.toString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-[100px]"
          >
            <Card className="h-full p-2">
              <div className="mb-1 text-right text-sm text-gray-500">
                {format(day, "d")}
              </div>
              <div className="space-y-1">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex cursor-pointer items-center gap-1 text-sm"
                    onClick={() => toggleTask(task.id)}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 ${
                        task.completed ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    <span
                      className={
                        task.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }
                    >
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

export default CalendarView
