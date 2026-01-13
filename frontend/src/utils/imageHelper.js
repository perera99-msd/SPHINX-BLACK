// src/utils/imageHelper.js
export const getImageUrl = (path) => {
  if (!path) return '';

  // 1. Cloudinary or External URLs (Already complete)
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }

  // 2. Fallback for old local images (Optional, mainly for dev)
  if (path.startsWith('/uploads')) {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
    return `${SERVER_URL}${path}`;
  }

  return path;
};