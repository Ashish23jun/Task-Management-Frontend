import React, { useEffect, useState } from 'react';
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
import { getTasksApi } from '@/api/task.api';

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksApi();
        setTasks(data); // ✅ Set tasks from API
        console.log(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  console.log('I am called');
  // Handle selecting tasks
  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const openDialog = (task: any = null) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };
  if (loading) return <p className="text-center text-gray-600">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Task List</h2>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => openDialog(null)}>
              + Add Task
            </Button>
            <Button variant="destructive" disabled={selectedTasks.length === 0}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete Selected
            </Button>
          </div>

          <div className="flex gap-4">
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
              <TableCell>{new Date(task.startTime).toLocaleString()}</TableCell>
              <TableCell>
                {task.endTime ? new Date(task.endTime).toLocaleString() : 'Not finished'}
              </TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => openDialog(task)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
