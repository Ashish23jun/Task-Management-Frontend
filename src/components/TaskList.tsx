import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash2, SlidersHorizontal } from 'lucide-react';
import AddandEditDialogue from './AddandEditDialogue';

const TaskTable: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const tasks = [
    {
      id: 1,
      title: 'Buy clothes',
      priority: 5,
      status: 'Pending',
      startTime: '26-Nov-24 11:00 AM',
      endTime: '30-Nov-24 11:00 AM',
      totalTime: 96,
    },
    {
      id: 2,
      title: 'Finish code',
      priority: 2,
      status: 'Finished',
      startTime: '25-Nov-24 09:05 AM',
      endTime: '25-Nov-24 03:15 PM',
      totalTime: 6.17,
    },
    {
      id: 3,
      title: 'Book travel tickets',
      priority: 4,
      status: 'Pending',
      startTime: '19-Nov-24 10:00 PM',
      endTime: '20-Nov-24 11:00 PM',
      totalTime: 25,
    },
    {
      id: 4,
      title: 'Order groceries',
      priority: 3,
      status: 'Finished',
      startTime: '14-Oct-24 10:30 AM',
      endTime: '16-Oct-24 10:30 PM',
      totalTime: 60,
    },
    {
      id: 5,
      title: 'Medical checkup',
      priority: 1,
      status: 'Pending',
      startTime: '19-Nov-24 01:15 PM',
      endTime: '21-Dec-24 05:00 PM',
      totalTime: 51.75,
    },
  ];

  // Handle selecting tasks
  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  // Open dialog for adding or editing
  const openDialog = (task: any = null) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* 🔹 Header Section */}
      <div className="mb-4">
        {/* 🔹 Header Section */}
        <h2 className="text-2xl font-semibold text-gray-800">Task List</h2>

        {/* 🔹 Buttons (Left) & Filters (Right) */}
        <div className="flex justify-between items-center mt-2">
          {/* Left Section - Add & Delete Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => openDialog(null)}>
              + Add Task
            </Button>
            <Button variant="destructive" disabled={selectedTasks.length === 0}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete Selected
            </Button>
          </div>

          {/* Right Section - Sorting & Filtering */}
          <div className="flex gap-4">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setSortOrder('start-asc')}>
                  Start time: ASC
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('start-desc')}>
                  Start time: DESC
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('end-asc')}>
                  End time: ASC
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('end-desc')}>
                  End time: DESC
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={() => setSortOrder(null)}>
                  Remove sort
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Priority Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Priority {priorityFilter ? `: ${priorityFilter}` : ''}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {[1, 2, 3, 4, 5].map((num) => (
                  <DropdownMenuItem key={num} onClick={() => setPriorityFilter(num.toString())}>
                    {num}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="text-red-500" onClick={() => setPriorityFilter(null)}>
                  Remove filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={statusFilter === 'Finished' ? 'text-purple-600' : ''}
                >
                  Status {statusFilter ? `: ${statusFilter}` : ''}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Finished')}>
                  Finished ✅
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={() => setStatusFilter(null)}>
                  Remove filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 🔹 Add/Edit Task Dialog */}

      {/* 🔹 Task Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedTasks.length === tasks.length}
                onCheckedChange={() =>
                  setSelectedTasks(
                    selectedTasks.length === tasks.length ? [] : tasks.map((t) => t.id)
                  )
                }
              />
            </TableHead>
            <TableHead>Task ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Total Time (hrs)</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={() => handleTaskSelection(task.id)}
                />
              </TableCell>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell
                className={`font-semibold ${task.status === 'Finished' ? 'text-green-600' : 'text-red-600'}`}
              >
                {task.status}
              </TableCell>
              <TableCell>{task.startTime}</TableCell>
              <TableCell>{task.endTime}</TableCell>
              <TableCell>{task.totalTime}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => openDialog(task)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 🔹 Task Dialog (Add/Edit) */}
      {isDialogOpen && (
        <AddandEditDialogue
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          initialTask={editingTask}
        />
      )}
    </div>
  );
};

export default TaskTable;
