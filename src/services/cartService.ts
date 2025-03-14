import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/cart",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ✅ Tự động gắn Authorization token nếu có
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const cartService = {
  // 🟢 Lấy giỏ hàng
  async getCart() {
    const response = await apiClient.get("");
    return response.data.data || [];
  },

  // 🔵 Thêm hoặc cập nhật sản phẩm trong giỏ hàng
  async addOrUpdateProduct(cartItem: { productId: number; sizeName: string; color: string; quantity: number }) {
    const response = await apiClient.post("/add-or-update", { items: [cartItem] });
    return response.data.data;
  },

  // 🟡 Tăng số lượng sản phẩm
  async increaseQuantity(cartItem: { productId: number; sizeName: string; color: string }) {
    const response = await apiClient.post("/increase", { items: [cartItem] });
    return response.data.data;
  },

  // 🟡 Giảm số lượng sản phẩm
  async decreaseQuantity(cartItem: { productId: number; sizeName: string; color: string }) {
    const response = await apiClient.post("/decrease", { items: [cartItem] });
    return response.data.data;
  },

  // 🔴 Xóa sản phẩm khỏi giỏ hàng
  async removeProduct(productId: number, sizeName: string, color: string) {
    const response = await apiClient.delete(`/remove`, {
        params: { productId, sizeName, color }
    });
    return response.data.data;
},

  // 🔴 Xóa toàn bộ giỏ hàng
  async clearCart() {
    const response = await apiClient.delete("/clear");
    return response.data.data;
  },
};
