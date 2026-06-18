import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Origin without the trailing /api, used to resolve uploaded image paths.
export const API_ORIGIN = baseURL.replace(/\/api\/?$/, '');

const api = axios.create({ baseURL });

// Attach the admin JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Turn relative upload paths (/uploads/x.png) into absolute URLs.
export function resolveImage(url) {
  if (!url) return '';
  if (/^https?:\/\//.test(url) || url.startsWith('data:')) return url;
  return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default api;
