import axios, { AxiosError } from 'axios';
import type { ApiError } from '../types/user';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An error occurred',
      statusCode: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  }
);