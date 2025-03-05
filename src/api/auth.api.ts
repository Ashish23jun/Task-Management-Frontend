import { handleApiError } from './handleApiErrors';
import apiClient from './interceptors';

export const loginUser = async (data: { email: string; password: string }) => {
  console.log(data);
  return await apiClient.post('/auth/login', data);
};

export const registerUserApi = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await apiClient.post('/auth/signup', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
