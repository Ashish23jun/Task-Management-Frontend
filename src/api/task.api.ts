import { handleApiError } from './handleApiErrors';
import apiClient from './interceptors';

export const addTaskApi = async (taskData: {
  title: string;
  startTime: string;
  endTime?: string;
  priority: number;
  status: string;
}) => {
  try {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateTaskApi = async (
  taskId: string,
  taskData: {
    title: string;
    startTime: string;
    endTime?: string;
    priority: number;
    status: string;
  }
) => {
  try {
    const formattedTaskData = {
      ...taskData,
      startTime: new Date(taskData.startTime).toISOString(),
      endTime: taskData.endTime ? new Date(taskData.endTime).toISOString() : undefined,
    };

    const response = await apiClient.patch(`/tasks/${taskId}`, formattedTaskData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteTaskApi = async (taskId: string) => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getTasksApi = async (
  page = 1,
  limit = 10,
  sortBy?: string,
  order?: string,
  priority?: string,
  status?: string
) => {
  try {
    const params: any = { page, limit };

    if (sortBy && order) {
      params.sortBy = sortBy;
      params.order = order;
    }

    if (priority) {
      params.priority = priority;
    }

    if (status) {
      params.status = status;
    }

    const response = await apiClient.get('/tasks', { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
