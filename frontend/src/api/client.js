import axios from 'axios';

const fallbackUrl = 'https://fyphub-mern-enterprise-backend-production.up.railway.app/api';

const normalizeBaseURL = (url) => {
  if (!url) return fallbackUrl;

  const trimmedUrl = url.trim();

  // If the URL is missing https://, add it automatically
  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return `https://${trimmedUrl}`.replace(/\/+$/, '');
  }

  // Remove trailing slash
  return trimmedUrl.replace(/\/+$/, '');
};

const baseURL = normalizeBaseURL(import.meta.env.VITE_API_URL);

console.log('API baseURL:', baseURL);

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fyphub_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('fyphub_token');
      localStorage.removeItem('fyphub_user');
    }

    return Promise.reject(err);
  }
);

export default api;

export const getError = (err) =>
  err.response?.data?.message || err.message || 'Something went wrong';