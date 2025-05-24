import apiClient from "@/apiClient";

import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { ProductReviewRequest } from "types/product/product-review-request.type";
import { ProductReviewResponse } from "types/product/product-review-response.type";

const BASE_URL = "/api/product-reviews";

export const productReviewService = {
  // Thêm hoặc cập nhật đánh giá sản phẩm
  async addOrUpdateReview(reviewData: ProductReviewRequest): Promise<any> {
    const response = await apiClient.post(`${BASE_URL}/add-or-update`, reviewData);
    return response.data?.data;
  },

  // Lấy danh sách đánh giá của sản phẩm theo phân trang
  async getReviewsByProduct(
    productId: number,
    page: number = 0,
    size: number = 10
  ): Promise<ApiResponse<PaginatedResponse<ProductReviewResponse>>> {
    const response = await apiClient.get(`${BASE_URL}/product/${productId}`, {
      params: { page, size },
    });
    return response.data;
  },

  // Lấy danh sách đánh giá của người dùng
  async getReviewsByUser(page: number = 0): Promise<ApiResponse<PaginatedResponse<ProductReviewResponse>>> {
    const response = await apiClient.get(`${BASE_URL}/user`, {
      params: { page },
    });
    return response.data;
  },

  // Xóa đánh giá sản phẩm
  async deleteReview(reviewId: number): Promise<any> {
    const response = await apiClient.delete(`${BASE_URL}/remove/${reviewId}`);
    return response.data?.data;
  },

  // Đặt đánh giá mặc định
  async setDefaultReview(reviewId: number): Promise<any> {
    const response = await apiClient.put(`${BASE_URL}/set-default/${reviewId}`);
    return response.data?.data;
  }
};
