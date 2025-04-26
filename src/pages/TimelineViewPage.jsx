
import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import TaskForm from "@/components/TaskForm"
import TimelineView from "@/components/views/TimelineView"
import NavigationMenu from "@/components/ui/navigation-menu"

const TimelineViewPage = ({ tasks, newTask, setNewTask, addTask, toggleTask }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <Card className="mx-auto max-w-6xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-primary">
            Task Manager - Timeline View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NavigationMenu />
          <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
          <TimelineView tasks={tasks} toggleTask={toggleTask} />
          {tasks.length === 0 && (
            <div className="text-center text-gray-500">
              No tasks yet. Add some tasks to get started!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TimelineViewPage
