import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const data = error.response?.data;
    const firstValidationMsg = Array.isArray(data?.errors) && data.errors.length > 0 ? data.errors[0].msg : null;
    const message = data?.message || firstValidationMsg || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
