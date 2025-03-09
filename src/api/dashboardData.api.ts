import { handleApiError } from './handleApiErrors';
import apiClient from './interceptors';

export const getTaskCountsApi = async () => {
  try {
    const response = await apiClient.get('/dashboard/task-counts');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getTaskTimeMetricsApi = async () => {
  try {
    const response = await apiClient.get('/dashboard/task-metrics');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
