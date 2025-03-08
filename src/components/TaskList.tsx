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
import { Pencil, Trash2, SlidersHorizontal, Check } from 'lucide-react';
import AddandEditDialogue from './AddandEditDialogue';
import { deleteTaskApi, getTasksApi } from '@/api/task.api';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10; // Number of tasks per page

  useEffect(() => {
    fetchTasks();
  }, [sortOrder, priorityFilter, statusFilter, currentPage]);

  const fetchTasks = async () => {
    try {
      let data = await getTasksApi(
        currentPage,
        limit,
        sortOrder ? sortOrder.split('-')[0] : undefined,
        sortOrder ? sortOrder.split('-')[1] : undefined,
        priorityFilter || undefined,
        statusFilter || undefined
      );

      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSortSelection = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleStatusSelection = (status: string | null) => {
    setStatusFilter(status);
  };
  const openDialog = (task: any = null) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedTasks.length === 0) return;

    try {
      await Promise.all(selectedTasks.map((taskId) => deleteTaskApi(taskId.toString())));
      setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
    } catch (error) {
      console.error('Failed to delete tasks:', error);
    }
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
            <Button
              variant="destructive"
              disabled={selectedTasks.length === 0}
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete Selected
            </Button>
          </div>

          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Sort{' '}
                  {sortOrder ? `(${sortOrder})` : ''}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {[
                  { label: 'Start time: ASC', value: 'startTime-asc' },
                  { label: 'Start time: DESC', value: 'startTime-desc' },
                  { label: 'End time: ASC', value: 'endTime-asc' },
                  { label: 'End time: DESC', value: 'endTime-desc' },
                ].map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleSortSelection(option.value)}
                  >
                    {option.label}{' '}
                    {sortOrder === option.value && (
                      <Check className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="text-red-500" onClick={() => handleSortSelection('')}>
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
                <Button variant="outline">Status {statusFilter ? `: ${statusFilter}` : ''}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {['Pending', 'Finished'].map((status) => (
                  <DropdownMenuItem key={status} onClick={() => handleStatusSelection(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => handleStatusSelection(null)}
                >
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
            <TableHead>Total time to Finish</TableHead>
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
                {task.endTime
                  ? (
                      (new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) /
                      (1000 * 60 * 60)
                    ).toFixed(2) + ' hrs'
                  : 'Not finished'}
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
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            ) : (
              <span className="px-4 py-2 text-gray-400 cursor-not-allowed">Previous</span>
            )}
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 py-2 border rounded-md text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            ) : (
              <span className="px-4 py-2 text-gray-400 cursor-not-allowed">Next</span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
