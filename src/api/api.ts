import axios from 'axios';
import { clearCache, getCachedData, storeCachedData } from './cache';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  
  const cachedResponse = getCachedData(config);
  if (cachedResponse) {
    config.adapter = () => Promise.resolve({ ...cachedResponse, config });
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => {
    storeCachedData(response);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      clearCache(false);
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export { api };
