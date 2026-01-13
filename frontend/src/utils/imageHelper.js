// src/utils/imageHelper.js
export const getImageUrl = (path) => {
  if (!path) return '';

  // 1. If it's already a full URL (Cloudinary or External), return it as is.
  if (path.startsWith('http') || path.startsWith('https') || path.startsWith('blob')) {
    return path;
  }

  // 2. Fallback for any old local images (only useful for local dev)
  const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
  return `${SERVER_URL}${path}`;
};