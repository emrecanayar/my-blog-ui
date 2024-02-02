
import axios from "axios";

const BASE_URL = "https://localhost:7133/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      return Promise.reject(new Error("Sunucu hatası"));
    }
    return Promise.reject(error);
  }
);

const apiService = {
  get: (url: string) => apiClient.get(url).then((response) => response.data),

  post: (url: string, data: any) =>
    apiClient.post(url, data).then((response) => response.data),

  put: (url: string, data: any) =>
    apiClient.put(url, data).then((response) => response.data),

  delete: (url: string) =>
    apiClient.delete(url).then((response) => response.data),
};

export default apiService;
