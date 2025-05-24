import apiClient from "@/apiClient";
import { ApiResponse } from "types/api-response.type";
import { SupportItemRequest } from "types/support/support-request.type";
import { SupportItemResponse } from "types/support/support-response.type";

const BASE_URL = "/api/support-items";

export const supportItemService = {
  // 🟢 Lấy tất cả support items
  async getAllSupportItems(): Promise<ApiResponse<SupportItemResponse[]>> {
    const response = await apiClient.get(`${BASE_URL}`);
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🟢 Lấy thông tin 1 support item theo ID
  async getSupportItemById(id: number): Promise<ApiResponse<SupportItemResponse>> {
    const response = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🟡 Tạo mới support item
  async createSupportItem(data: SupportItemRequest): Promise<ApiResponse<SupportItemResponse>> {
    const response = await apiClient.post(`${BASE_URL}`, data);
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🟡 Cập nhật support item
  async updateSupportItem(id: number, data: SupportItemRequest): Promise<ApiResponse<SupportItemResponse>> {
    const response = await apiClient.put(`${BASE_URL}/${id}`, data);
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🔴 Xóa support item theo ID
  async deleteSupportItem(id: number): Promise<ApiResponse<string>> {
    const response = await apiClient.delete(`${BASE_URL}/${id}`);
    return response.data;  // Trả về dữ liệu đúng
  },
};
