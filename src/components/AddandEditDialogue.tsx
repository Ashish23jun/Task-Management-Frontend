import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: {
    title: string;
    priority: number;
    status: string;
    startTime: string;
    endTime: string;
  };
}

const AddandEditDialogue: React.FC<TaskDialogProps> = ({ isOpen, onClose, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [priority, setPriority] = useState(initialTask?.priority.toString() || '1');
  const [status, setStatus] = useState(initialTask?.status === 'Finished');
  const [startTime, setStartTime] = useState(initialTask?.startTime || '');
  const [endTime, setEndTime] = useState(initialTask?.endTime || '');

  const handleSubmit = () => {
    console.log({ title, priority, status: status ? 'Finished' : 'Pending', startTime, endTime });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-xl p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialTask ? 'Edit Task' : 'Add New Task'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-600">Pending</span>
                <Switch checked={status} onCheckedChange={setStatus} />
                <span className="text-gray-600">Finished</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Time</label>
              <Input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            {initialTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddandEditDialogue;
