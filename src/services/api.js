import axios from "axios";

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Altere se sua API estiver em produção
  timeout: 10000, // Timeout de 10 segundos
});

// Função para configurar os interceptadores
export const setupAxiosInterceptors = (logout, navigate) => {
  // Interceptor de requisições (adiciona token ao header)
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respostas (trata erros de resposta da API)
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Se a resposta do erro está disponível
      if (error.response) {
        // Trata erro 401 (não autorizado)
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          logout(); // chama o logout do contexto
          navigate("/401"); // redireciona para login
          return Promise.reject(error);
        }

        // Trata erro 404 (não encontado)
        if (error.response.status === 404 && !originalRequest._retry) {
          originalRequest._retry = true;
          navigate("404"); // redireciona para login
          return Promise.reject(error);
        }
      // Trata erro 500 (erro de sevidor)
        if (error.response.status === 500 && originalRequest._retry) {
          originalRequest._retry = true;
          navigate("/500"); // redireciona para login
          return Promise.reject(error);
        }

        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          navigate("/403"); // redireciona para login
          return Promise.reject(error);
        }

        // Aqui você pode tratar outros status, se quiser
        // Exemplo: 403, 404, 500 etc.
      } else {
        // Erro sem resposta (erro de rede, servidor offline, CORS, timeout etc.)
        console.error(
          "Erro de rede ou sem resposta do servidor:",
          error.message
        );

        // Você pode notificar o usuário aqui se quiser:
        // alert("Erro de rede. Verifique sua conexão e tente novamente.");
        navigate("/500");
      }

      // Rejeita o erro para ser tratado onde foi chamado
      return Promise.reject(error);
    }
  );
};

export default api;
