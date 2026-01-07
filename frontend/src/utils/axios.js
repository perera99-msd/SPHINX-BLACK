import axios from 'axios';

const instance = axios.create({
  // Ensure this matches your backend URL (usually port 5000)
  baseURL: 'http://localhost:5000/api', 
});

// Interceptor: Add Token to every request
instance.interceptors.request.use((config) => {
  // 1. Check if user data exists in localStorage
  const userStr = localStorage.getItem('user');
  
  if (userStr) {
    const user = JSON.parse(userStr);
    // 2. If token exists, add it to headers
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;