import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Sua URL base
  timeout: 10000, // Timeout de 10 segundos
});

export default api;