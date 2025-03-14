import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/cart",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Để gửi cookie khi request (nếu backend yêu cầu)
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ Không tìm thấy token trong Cookies");
  }
  return config;
});

export default apiClient;
