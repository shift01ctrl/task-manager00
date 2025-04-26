
import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { format } from "date-fns"

const TimelineView = ({ tasks, toggleTask }) => {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  )

  return (
    <div className="relative pl-8">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
      {sortedTasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-4"
        >
          <div className="absolute left-2.5 h-3 w-3 rounded-full bg-primary"></div>
          <Card className="overflow-hidden">
            <div className="p-4">
              <div className="mb-2 text-sm text-gray-500">
                {format(new Date(task.dueDate), "PPP")}
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
                  {task.text}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default TimelineView
