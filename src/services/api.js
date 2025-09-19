import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Sua URL base
  timeout: 10000, // Timeout de 10 segundos
});

export const setupAxiosInterceptors = (logout, navigate) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        logout();
        navigate('/login');
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
};

export default api;