import apiClient from './interceptors';
import { handleApiError } from './handleApiErrors';

export const getSortedTasksApi = async (sortBy: string, order: string) => {
  try {
    const response = await apiClient.get(`/sort/sortByTime?sortBy=${sortBy}&order=${order}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getTasksByPriorityApi = async (priority: number) => {
  try {
    const response = await apiClient.get(`/sort/filter/priority?priority=${priority}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getTaskByStatus = async (status: string) => {
  try {
    const response = await apiClient.get(`/sort/filter/status?status=${status}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
