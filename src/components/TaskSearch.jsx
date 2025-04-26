
import React from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const TaskSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}

export default TaskSearch
