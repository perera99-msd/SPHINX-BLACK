import axios from 'axios';

const instance = axios.create({
  // Automatically uses the environment variable or falls back to localhost for dev
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
});

// Interceptor: Add Token to every request
instance.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user');
  
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;