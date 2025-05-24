import apiClient from "@/apiClient";
import { CategoryResponse } from "types/category/category-response.type";

const BASE_URL = "/api/categories";

const categoryService = {
  async getAllCategories(): Promise<CategoryResponse[]> {
    const response = await apiClient.get(`${BASE_URL}`);
    return response.data.data;
  },

  // Tạo mới một danh mục
  async createCategory(formData: FormData): Promise<CategoryResponse> {
    const response = await apiClient.post(`${BASE_URL}`, formData);
    return response.data.data;
  },

  // Cập nhật một danh mục
  async updateCategory(id: number, formData: FormData): Promise<CategoryResponse> {
    const response = await apiClient.put(`${BASE_URL}/${id}`, formData);
    return response.data.data;
  },

  // Xóa một danh mục
  // Nếu API không trả về dữ liệu sau khi xóa, bạn có thể dùng Promise<void>
  async deleteCategory(id: number): Promise<void> {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};

export default categoryService;
