
import React from "react"
import { Button } from "@/components/ui/button"

const TaskFilters = ({ filter, setFilter }) => {
  return (
    <div className="mb-6 flex gap-2">
      <Button
        variant={filter === "all" ? "default" : "outline"}
        onClick={() => setFilter("all")}
      >
        All Tasks
      </Button>
      <Button
        variant={filter === "active" ? "default" : "outline"}
        onClick={() => setFilter("active")}
      >
        In Progress
      </Button>
      <Button
        variant={filter === "completed" ? "default" : "outline"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
    </div>
  )
}

export default TaskFilters
