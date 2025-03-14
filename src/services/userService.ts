import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/users",
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

export const userService = {
  // 🟢 Lấy thông tin người dùng theo ID
  async getUser(id: number): Promise<User> {
    const response = await apiClient.get(`/${id}`);
    return response.data?.data;
  },

  // 🟢 Lấy danh sách tất cả người dùng
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get("");
    return response.data?.data || [];
  },

  // 🔵 Tạo người dùng mới
  async createUser(user: User): Promise<User> {
    const response = await apiClient.post("", user);
    return response.data?.data;
  },

  // 🟡 Cập nhật thông tin người dùng
  async updateUser(id: number, user: User): Promise<User> {
    const response = await apiClient.put(`/${id}`, user);
    return response.data?.data;
  },

  // 🔴 Xóa người dùng theo ID
  async deleteUser(id: number): Promise<string> {
    const response = await apiClient.delete(`/${id}`);
    return response.data?.data;
  },

  // 🔒 Đổi mật khẩu
  async changePassword(passwordData: ChangePasswordRequest): Promise<{ success: boolean; message?: string }> {
    const response = await apiClient.put("/change-password", passwordData);
    return response.data;
  },
};
