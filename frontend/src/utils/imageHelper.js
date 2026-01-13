// src/utils/imageHelper.js

export const getImageUrl = (path) => {
  if (!path) return '';

  // 1. External URLs (Google, AWS, etc.) or Local Previews (Blob)
  if (path.startsWith('http') || path.startsWith('blob')) {
    return path;
  }

  // 2. Uploaded Images (Served from Backend Root)
  // We point this to the Server URL (http://localhost:5000), not the API URL.
  if (path.startsWith('/uploads')) {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
    return `${SERVER_URL}${path}`;
  }

  // 3. Static Images in the 'public' folder
  return path;
};