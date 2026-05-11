import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
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
