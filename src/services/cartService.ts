// services/cartService.ts

import apiClient from '@/apiClient';
import { CartRequest, CartItemRequest } from 'types/cart/cart-request.type';
import { CartResponse } from 'types/cart/cart-response.type';

const BASE_URL = '/api/cart';

const cartService = {
  // Lấy giỏ hàng của người dùng
  async getCart(): Promise<CartResponse> {
    const response = await apiClient.get(`${BASE_URL}`);
    return response.data.data;
  },

  // Thêm hoặc cập nhật sản phẩm trong giỏ hàng
  async addOrUpdateProduct(cartRequest: CartRequest): Promise<CartResponse> {
    const response = await apiClient.post(`${BASE_URL}/add-or-update`, cartRequest);
    return response.data.data;
  },

  // Xóa sản phẩm khỏi giỏ hàng
  async removeProduct(item: CartItemRequest): Promise<CartResponse> {
    const response = await apiClient.delete(`${BASE_URL}/remove`, {
      params: {
        productId: item.productId,
        sizeName: item.sizeName,
        color: item.color,
      },
    });
    return response.data.data;
  },

  // Tăng số lượng sản phẩm trong giỏ hàng
  async increaseProductQuantity(cartRequest: CartRequest): Promise<CartResponse> {
    const response = await apiClient.post(`${BASE_URL}/increase`, cartRequest);
    return response.data.data;
  },

  // Giảm số lượng sản phẩm trong giỏ hàng
  async decreaseProductQuantity(cartRequest: CartRequest): Promise<CartResponse> {
    const response = await apiClient.post(`${BASE_URL}/decrease`, cartRequest);
    return response.data.data;
  },

  // Xóa toàn bộ giỏ hàng
  async clearCart(): Promise<void> {
    const response = await apiClient.delete(`${BASE_URL}/clear`);
    return response.data.data;
  },
};

export default cartService;
