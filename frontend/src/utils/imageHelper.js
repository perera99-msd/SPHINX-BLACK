// src/utils/imageHelper.js

// CHANGE THIS to your actual backend URL if different
const BASE_URL = 'http://localhost:5000'; 

export const getImageUrl = (path) => {
  if (!path) return '';
  
  // If it's already a full URL (like from Google or a CDN), return it
  if (path.startsWith('http') || path.startsWith('blob')) {
    return path; 
  }
  
  // If it's an uploaded file from our backend
  if (path.startsWith('/uploads')) {
    return `${BASE_URL}${path}`;
  }

  // Otherwise, it's a static local image in the 'public' folder
  return path;
};