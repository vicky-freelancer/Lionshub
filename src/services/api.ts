import axios from 'axios';

// Use /api by default which proxies to the Express backend
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message ||
      error.message ||
      'An error occurred while connecting to the directory server.';
    return Promise.reject(new Error(customMessage));
  }
);
