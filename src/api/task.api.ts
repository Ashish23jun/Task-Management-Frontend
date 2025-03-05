import { handleApiError } from './handleApiErrors';
import apiClient from './interceptors';

export const getTasksApi = async () => {
  try {
    const response = await apiClient.get('/tasks'); // Fetch tasks
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
