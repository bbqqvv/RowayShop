import axios from "axios";
import Cookies from "js-cookie"; // 🆕 Dùng để lấy token từ cookie

// ✅ Khởi tạo axios client
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/favourites",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 🔥 Quan trọng: Cho phép gửi cookie theo request
});

// ✅ Thêm Interceptor để tự động chèn token vào header
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ API lấy danh sách sản phẩm yêu thích
export const getFavourites = async () => {
  const response = await apiClient.get("");
  return response.data?.data || []; 
};

// ✅ API thêm sản phẩm vào danh sách yêu thích
export const addFavourite = async (productId: number) => {
  const response = await apiClient.post("", { productId });
  return response.data;
};

// ✅ API xóa sản phẩm khỏi danh sách yêu thích
export const removeFavourite = async (productId: number) => {
  const response = await apiClient.delete(`/${productId}`);
  return response.data;
};
