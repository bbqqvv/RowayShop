import apiClient from "@/apiClient";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { ProductResponse } from "types/product/product-response.types";
import { FilterOptions } from "types/type";

const BASE_URL = "/api/products";

export const productFilterService = {
  // Lọc sản phẩm với nhiều điều kiện
  async filterProducts(
    filters: Record<string, string>,
    page = 0,
    pageSize = 9
  ): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    const res = await apiClient.get<ApiResponse<PaginatedResponse<ProductResponse>>>(`${BASE_URL}/filter`, {
      params: { ...filters, page, size: pageSize },
    });
    return res.data;
  },

  // Lấy tùy chọn lọc (Filter options)
  async getFilterOptions(): Promise<FilterOptions> {
    const { data } = await apiClient.get<{ data: FilterOptions }>(`${BASE_URL}/options`);
    return data.data;
  }
};
