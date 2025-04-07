import { useState, useEffect, useCallback } from "react";
import { productReviewService } from "@/services/productReviewService";
import { ProductReviewResponse } from "types/product/product-review-response.type";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { ProductReviewRequest } from "types/product/product-review-request.type";

export const useProductReviews = () => {
  const [reviews, setReviews] = useState<ProductReviewResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Lấy danh sách đánh giá của sản phẩm từ API
  const fetchReviewsByProduct = useCallback(
    async (productId: number, page = 0) => {
      setLoading(true);
      try {
        const response: ApiResponse<PaginatedResponse<ProductReviewResponse>> = await productReviewService.getReviewsByProduct(productId, page);
        setReviews(response.data.items);  // Set danh sách đánh giá sản phẩm
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi khi lấy danh sách đánh giá");
        setReviews(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 🟢 Lấy danh sách đánh giá của người dùng
  const fetchReviewsByUser = useCallback(
    async (page = 0) => {
      setLoading(true);
      try {
        const response: ApiResponse<PaginatedResponse<ProductReviewResponse>> = await productReviewService.getReviewsByUser(page);
        setReviews(response.data.items);  // Set danh sách đánh giá của người dùng
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi khi lấy danh sách đánh giá của người dùng");
        setReviews(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 🔵 Thêm hoặc cập nhật đánh giá
  const addOrUpdateReview = async (reviewData: ProductReviewRequest) => {
    setLoading(true);
    try {
      const newReview: ProductReviewResponse = await productReviewService.addOrUpdateReview(reviewData);
      setReviews((prevReviews) => (prevReviews ? [newReview, ...prevReviews] : [newReview]));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi thêm/cập nhật đánh giá");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Xóa đánh giá
  const removeReview = async (id: number) => {
    setLoading(true);
    try {
      await productReviewService.deleteReview(id);
      setReviews((prevReviews) => prevReviews?.filter((review) => review.id !== id) || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi xóa đánh giá");
    } finally {
      setLoading(false);
    }
  };

  // Đặt đánh giá mặc định
  const setDefaultReview = async (id: number) => {
    setLoading(true);
    try {
      await productReviewService.setDefaultReview(id);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi đặt đánh giá mặc định");
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviewsByProduct,
    fetchReviewsByUser,
    addOrUpdateReview,
    removeReview,
    setDefaultReview,
  };
};
