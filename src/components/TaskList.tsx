'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Pencil,
  Trash2,
  Check,
  Plus,
  Clock,
  CalendarClock,
  Filter,
  ArrowUpDown,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import AddandEditDialogue from './AddandEditDialogue';
import { deleteTaskApi, getTasksApi } from '@/api/task.api';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const limit = 10;

  useEffect(() => {
    fetchTasks();
  }, [sortOrder, priorityFilter, statusFilter, currentPage]);

  const fetchTasks = async () => {
    try {
      const data = await getTasksApi(
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

  const getPriorityBadge = (priority: number) => {
    const colors = {
      1: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      2: 'bg-green-100 text-green-800 hover:bg-green-200',
      3: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      4: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      5: 'bg-red-100 text-red-800 hover:bg-red-200',
    };

    return (
      <Badge variant="outline" className={`${colors[priority as keyof typeof colors]} font-medium`}>
        {priority}
      </Badge>
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold text-slate-800">Task Management</CardTitle>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => openDialog(null)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Task
            </Button>

            <Button
              variant="destructive"
              disabled={selectedTasks.length === 0}
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {selectedTasks.length > 0 ? `Delete (${selectedTasks.length})` : 'Delete Selected'}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white border-slate-200 hover:bg-slate-50"
                    >
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      {sortOrder ? `Sorted by ${sortOrder.split('-')[0]}` : 'Sort'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem className="font-medium text-slate-500" disabled>
                      Sort Options
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {[
                      { label: 'Start time (Earliest first)', value: 'startTime-asc' },
                      { label: 'Start time (Latest first)', value: 'startTime-desc' },
                      { label: 'End time (Earliest first)', value: 'endTime-asc' },
                      { label: 'End time (Latest first)', value: 'endTime-desc' },
                    ].map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleSortSelection(option.value)}
                        className="flex items-center justify-between"
                      >
                        {option.label}
                        {sortOrder === option.value && <Check className="h-4 w-4 text-primary" />}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-slate-500"
                      onClick={() => handleSortSelection('')}
                      disabled={!sortOrder}
                    >
                      Clear sorting
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sort tasks by time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white border-slate-200 hover:bg-slate-50"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {priorityFilter ? `Priority: ${priorityFilter}` : 'Priority'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem className="font-medium text-slate-500" disabled>
                      Filter by Priority
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {[1, 2, 3, 4, 5].map((num) => (
                      <DropdownMenuItem
                        key={num}
                        onClick={() => setPriorityFilter(num.toString())}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-3 w-3 rounded-full ${
                              num === 1
                                ? 'bg-blue-500'
                                : num === 2
                                  ? 'bg-green-500'
                                  : num === 3
                                    ? 'bg-yellow-500'
                                    : num === 4
                                      ? 'bg-orange-500'
                                      : 'bg-red-500'
                            }`}
                          ></span>
                          Priority {num}
                        </div>
                        {priorityFilter === num.toString() && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-slate-500"
                      onClick={() => setPriorityFilter(null)}
                      disabled={!priorityFilter}
                    >
                      Clear filter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by priority level</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white border-slate-200 hover:bg-slate-50"
                    >
                      {statusFilter === 'Finished' ? (
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      ) : statusFilter === 'Pending' ? (
                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                      ) : (
                        <CalendarClock className="h-4 w-4 mr-2" />
                      )}
                      {statusFilter || 'Status'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem className="font-medium text-slate-500" disabled>
                      Filter by Status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleStatusSelection('Pending')}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        Pending
                      </div>
                      {statusFilter === 'Pending' && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusSelection('Finished')}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Finished
                      </div>
                      {statusFilter === 'Finished' && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-slate-500"
                      onClick={() => handleStatusSelection(null)}
                      disabled={!statusFilter}
                    >
                      Clear filter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by task status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {(sortOrder || priorityFilter || statusFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSortOrder(null);
                setPriorityFilter(null);
                setStatusFilter(null);
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              Clear all filters
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-slate-100/80">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedTasks.length === tasks.length && tasks.length > 0}
                  onCheckedChange={() =>
                    setSelectedTasks(
                      selectedTasks.length === tasks.length ? [] : tasks.map((t) => t.id)
                    )
                  }
                />
              </TableHead>
              <TableHead className="w-[280px]">Task ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[180px]">Start Time</TableHead>
              <TableHead className="w-[180px]">End Time</TableHead>
              <TableHead className="w-[150px]">Duration</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-slate-500">
                  No tasks found. Try clearing filters or add a new task.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  className={`group ${selectedTasks.includes(task.id) ? 'bg-slate-50' : ''} hover:bg-slate-50`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => handleTaskSelection(task.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600 whitespace-normal break-all">
                    {task.id}
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        task.status === 'Finished'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {task.status === 'Finished' ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">
                    {new Date(task.startTime).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">
                    {task.endTime ? (
                      new Date(task.endTime).toLocaleString()
                    ) : (
                      <span className="text-slate-400 italic">Not finished</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {task.endTime ? (
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 font-mono">
                        {(
                          (new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) /
                          (1000 * 60 * 60)
                        ).toFixed(2)}
                        <span className="ml-1 text-slate-500">hrs</span>
                      </Badge>
                    ) : (
                      <span className="text-slate-400 italic">In progress</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDialog(task)}
                      className="opacity-70 group-hover:opacity-100 hover:bg-slate-200"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
          <div className="text-sm text-slate-500">
            Showing page {currentPage} of {totalPages}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Previous
                </Button>
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <Button
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 p-0 ${currentPage === pageNum ? 'pointer-events-none' : ''}`}
                    >
                      {pageNum}
                    </Button>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="gap-1"
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {isDialogOpen && (
        <AddandEditDialogue
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            fetchTasks();
          }}
          initialTask={editingTask}
        />
      )}
    </Card>
  );
};

export default TaskTable;
