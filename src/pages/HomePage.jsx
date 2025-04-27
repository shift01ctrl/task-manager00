
import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from "recharts"
import { motion } from "framer-motion"

const HomePage = ({ tasks }) => {
  // Task Statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const activeTasks = totalTasks - completedTasks
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length

  // Task Types Distribution
  const taskTypes = tasks.reduce((acc, task) => {
    acc[task.taskType] = (acc[task.taskType] || 0) + 1
    return acc
  }, {})

  // Epic Progress
  const epics = tasks.filter(task => task.taskType === "epic")
  const epicProgress = epics.map(epic => ({
    name: epic.title,
    completed: epic.completed ? 100 : Math.floor(Math.random() * 100),
  }))

  // Team Workload
  const teamWorkload = tasks.reduce((acc, task) => {
    if (task.assignedTo) {
      acc[task.assignedTo] = (acc[task.assignedTo] || 0) + 1
    }
    return acc
  }, {})

  // Activity Timeline
  const activityTimeline = tasks.map(task => ({
    date: new Date(task.createdAt).toLocaleDateString(),
    tasks: 1,
  })).reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.tasks
    return acc
  }, {})

  // Chart Data
  const taskStatusData = [
    { name: "Active", value: activeTasks, color: "#3B82F6" },
    { name: "In Progress", value: inProgressTasks, color: "#F59E0B" },
    { name: "Completed", value: completedTasks, color: "#10B981" },
  ]

  const taskTypeData = Object.entries(taskTypes).map(([type, count]) => ({
    name: type,
    value: count,
    color: {
      feature: "#6366F1",
      bug: "#EF4444",
      epic: "#8B5CF6",
      story: "#F59E0B"
    }[type] || "#CBD5E1"
  }))

  const workloadData = Object.entries(teamWorkload).map(([user, tasks]) => ({
    name: user,
    tasks,
  }))

  const activityData = Object.entries(activityTimeline).map(([date, count]) => ({
    date,
    tasks: count,
  })).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Task Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Total Tasks 📚</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalTasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks 🔄</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">{activeTasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>In Progress 🚀</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{inProgressTasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed ✅</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{completedTasks}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Task Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Task Status Distribution 📊</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart width={400} height={300}>
                <Pie
                  data={taskStatusData}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>

          {/* Task Types */}
          <Card>
            <CardHeader>
              <CardTitle>Task Types 🏷️</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={400} height={300} data={taskTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {taskTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Team Workload */}
          <Card>
            <CardHeader>
              <CardTitle>Team Workload 👥</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={400} height={300} data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#6366F1" />
              </BarChart>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline 📈</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart width={400} height={300} data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="tasks" fill="#8B5CF6" stroke="#6366F1" />
              </AreaChart>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities 📝</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2 rounded-lg border p-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{task.title}</p>
                        <div className="flex gap-2 text-sm text-gray-500">
                          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Type: {task.taskType}</span>
                          {task.assignedTo && (
                            <>
                              <span>•</span>
                              <span>Assigned to: {task.assignedTo}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          task.completed
                            ? "bg-green-100 text-green-700"
                            : task.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {task.completed ? "Completed ✅" : task.status === "in-progress" ? "In Progress 🔄" : "Active 📋"}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
