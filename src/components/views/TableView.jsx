
import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Trash2 } from "lucide-react"
import { format } from "date-fns"

const TableView = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tasks.map((task) => (
            <motion.tr
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <td className="px-6 py-4">
                <CheckCircle2
                  className={`h-6 w-6 cursor-pointer ${
                    task.completed ? "text-green-500" : "text-gray-300"
                  }`}
                  onClick={() => toggleTask(task.id)}
                />
              </td>
              <td
                className={`px-6 py-4 ${
                  task.completed ? "text-gray-400 line-through" : "text-gray-900"
                }`}
              >
                {task.text}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {format(new Date(task.dueDate), "PPP")}
              </td>
              <td className="px-6 py-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableView
