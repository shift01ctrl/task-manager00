
import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Image as ImageIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TaskForm = ({ newTask, setNewTask, addTask, users }) => {
  const [priority, setPriority] = useState("medium")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("todo")
  const [taskImage, setTaskImage] = useState(null)
  const [assignedTo, setAssignedTo] = useState("")
  const [taskType, setTaskType] = useState("feature")
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTaskImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(e, {
      priority,
      description,
      startDate,
      endDate,
      dueDate: dueDate || new Date().toISOString(),
      status,
      image: taskImage,
      assignedTo,
      taskType
    })
    setDescription("")
    setStartDate("")
    setEndDate("")
    setDueDate("")
    setPriority("medium")
    setStatus("todo")
    setTaskImage(null)
    setAssignedTo("")
    setTaskType("feature")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="task">Task Title ✍️</Label>
          <Input
            id="task"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
          />
        </div>
        <div>
          <Label htmlFor="description">Description 📝</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description..."
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="startDate">Start Date 📅</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date 📅</Label>
          <Input
            id="endDate"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date 📅</Label>
          <Input
            id="dueDate"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <Label htmlFor="priority">Priority ⚡</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High 🔴</SelectItem>
              <SelectItem value="medium">Medium 🟡</SelectItem>
              <SelectItem value="low">Low 🟢</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status 📊</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do 📋</SelectItem>
              <SelectItem value="in-progress">In Progress 🔄</SelectItem>
              <SelectItem value="completed">Completed ✅</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="assignedTo">Assigned To 👤</Label>
          <Select value={assignedTo} onValueChange={setAssignedTo}>
            <SelectTrigger id="assignedTo">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} 👤
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="taskType">Task Type 🏷️</Label>
          <Select value={taskType} onValueChange={setTaskType}>
            <SelectTrigger id="taskType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feature">Feature ⭐</SelectItem>
              <SelectItem value="bug">Bug 🐛</SelectItem>
              <SelectItem value="epic">Epic 🚀</SelectItem>
              <SelectItem value="story">Story 📖</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="image">Task Image 🖼️</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="cursor-pointer"
        />
      </div>
      {taskImage && (
        <div className="relative mt-4 h-40 w-full overflow-hidden rounded-lg">
          <img
            src={taskImage}
            alt="Task preview"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => setTaskImage(null)}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            ❌
          </button>
        </div>
      )}
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Task ✨
      </Button>
    </form>
  )
}

export default TaskForm
