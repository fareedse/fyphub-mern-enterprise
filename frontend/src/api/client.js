import axios from 'axios';

const envUrl = import.meta.env.VITE_API_URL;
const fallbackUrl = 'https://fyphub-mern-enterprise-backend-production.up.railway.app/api';
const baseURL = envUrl || fallbackUrl || 'http://localhost:5000/api';

if (!envUrl) {
  console.warn(
    'VITE_API_URL is not defined. Using fallback API base URL:',
    baseURL,
    '\nSet VITE_API_URL in Vercel and redeploy the frontend for correct production behavior.'
  );
}

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fyphub_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((res) => res, (err) => {
  if (err.response?.status === 401) {
    localStorage.removeItem('fyphub_token');
    localStorage.removeItem('fyphub_user');
  }
  return Promise.reject(err);
});

export default api;
export const getError = (err) => err.response?.data?.message || err.message || 'Something went wrong';
