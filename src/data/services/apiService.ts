import axios from "axios";
import { LoginResponse, ProfileData } from "../../domain/entities/service";

// Criação da instância do axios
const apiService = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br",
  headers: {
    Accept: "application/json;version=v1_web",
    "Content-Type": "application/json",
  },
});

// Adiciona um interceptor para requests
apiService.interceptors.request.use(
  (config) => {
    // Você pode adicionar lógica antes da requisição ser enviada, como adicionar tokens
    const token = localStorage.getItem("token"); // ou outra lógica para recuperar o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Faça algo com o erro da requisição
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para responses
apiService.interceptors.response.use(
  (response) => {
    // Qualquer código de status dentro do intervalo de 2xx faz com que esta função seja acionada
    return response;
  },
  (error) => {
    // Qualquer código de status que está fora do intervalo de 2xx faz com que esta função seja acionada
    // Pode-se adicionar lógica de tratamento de erro aqui
    if (error.response && error.response.status === 401) {
      // Redirecionar para login ou qualquer outra ação de tratamento de erro
      console.error("Não autorizado, redirecionando para login...");
    }
    return Promise.reject(error);
  }
);

export const Login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiService.post<LoginResponse>("/auth/login/", {
    email,
    password,
  });
  return response.data;
};

export const getProfile = async (storedToken: string): Promise<ProfileData> => {
  const response = await apiService.get<ProfileData>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return response.data;
};
