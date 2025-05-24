import apiClient from "@/apiClient";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { FavouriteResponse } from "types/favourite/favourite-response.type";

const BASE_URL = "/api/favourites";

export const favouriteService = {
  // 🟢 Lấy danh sách yêu thích (có phân trang)
  async getFavourites(page: number = 0, size: number = 10): Promise<ApiResponse<PaginatedResponse<FavouriteResponse>>> {
    const response = await apiClient.get(`${BASE_URL}`, {
      params: { page, size },
    });
    return response.data;
  },

  // ✅ Thêm sản phẩm vào danh sách yêu thích
  async addFavourite(productId: number): Promise<FavouriteResponse> {
    const response = await apiClient.post<FavouriteResponse>(`${BASE_URL}`, { productId });
    return response.data;
  },

  // ✅ Xóa sản phẩm khỏi danh sách yêu thích
  async removeFavourite(productId: number): Promise<any> {
    const response = await apiClient.delete(`${BASE_URL}/${productId}`);
    return response.data;
  },
};
