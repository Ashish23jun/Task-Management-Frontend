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
