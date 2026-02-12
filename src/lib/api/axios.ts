import axios from 'axios';
import { useBoundStore } from '@/store';
import type { TypedAxiosInstance } from './types';

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (e.g., add auth tokens)
baseAxios.interceptors.request.use(
  (config) => {
    // Get token from store (which syncs with localStorage)
    const token = useBoundStore.getState().user.token;
    console.log('token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Response interceptor (e.g., handle errors globally)
baseAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    // Handle global error cases
    if (err.response?.status === 401) {
      // Handle unauthorized
      useBoundStore.getState().logout();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    // console.error('API Error:', error);
    return Promise.reject(err);
  }
);

const axiosInstance = baseAxios as TypedAxiosInstance;

export { axiosInstance };
