import axios from 'axios';
import { storage } from '../utils/storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Dispatch logout or clear token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
