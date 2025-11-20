import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { ProductReviewRequest } from "types/product/product-review-request.type";
import { ProductReviewResponse } from "types/product/product-review-response.type";
import { mockReviews } from "@/data/mockData";

// Helper để tạo delay giả lập mạng
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productReviewService = {
  // Thêm hoặc cập nhật đánh giá sản phẩm
  async addOrUpdateReview(reviewData: ProductReviewRequest): Promise<ProductReviewResponse> {
    await delay(800); // Giả lập delay

    const newReview: ProductReviewResponse = {
      id: Math.floor(Math.random() * 10000) + 1000,
      productId: reviewData.productId,
      orderItemId: Math.floor(Math.random() * 1000),
      productName: "Sản phẩm mẫu", // Trong thực tế sẽ lấy từ DB
      userId: 999, // Giả lập user hiện tại
      userName: "Bạn",
      rating: reviewData.rating,
      reviewText: reviewData.reviewText,
      imageUrl: reviewData.imageFiles && reviewData.imageFiles.length > 0
        ? URL.createObjectURL(reviewData.imageFiles[0])
        : "",
      reviewCount: 0,
      createdAt: new Date().toISOString()
    };

    // Trong thực tế, server sẽ lưu vào DB. Ở đây ta chỉ trả về object mới.
    // Nếu muốn persist trong phiên làm việc, có thể push vào mockReviews (nhưng sẽ mất khi reload)
    // mockReviews.unshift(newReview); 

    return newReview;
  },

  // Lấy danh sách đánh giá của sản phẩm theo phân trang
  async getReviewsByProduct(
    productId: number,
    page: number = 0,
    size: number = 10,
    rating?: number // Thêm tham số lọc theo sao
  ): Promise<ApiResponse<PaginatedResponse<ProductReviewResponse>>> {
    await delay(500);

    let filteredReviews = mockReviews.filter(r => r.productId === Number(productId));

    if (rating) {
      filteredReviews = filteredReviews.filter(r => r.rating === rating);
    }

    // Sắp xếp mới nhất trước
    filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const totalElements = filteredReviews.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = page * size;
    const end = start + size;
    const items = filteredReviews.slice(start, end);

    return {
      code: 200,
      success: true,
      message: "Success",
      data: {
        items,
        totalElements,
        totalPages,
        pageSize: size,
        currentPage: page
      }
    };
  },

  // Lấy danh sách đánh giá của người dùng
  async getReviewsByUser(): Promise<ApiResponse<PaginatedResponse<ProductReviewResponse>>> {
    await delay(500);
    // Giả lập lấy review của user ID 101
    const userId = 101;
    const filteredReviews = mockReviews.filter(r => r.userId === userId);

    return {
      code: 200,
      success: true,
      message: "Success",
      data: {
        items: filteredReviews,
        totalElements: filteredReviews.length,
        totalPages: 1,
        pageSize: 10,
        currentPage: 0
      }
    };
  },

  // Xóa đánh giá sản phẩm
  async deleteReview(reviewId: number): Promise<ProductReviewResponse> {
    await delay(500);
    const review = mockReviews.find(r => r.id === reviewId);
    if (!review) throw new Error("Review not found");
    return review;
  },

  // Đặt đánh giá mặc định
  async setDefaultReview(reviewId: number): Promise<ProductReviewResponse> {
    await delay(300);
    const review = mockReviews.find(r => r.id === reviewId);
    if (!review) throw new Error("Review not found");
    return review;
  }
};
