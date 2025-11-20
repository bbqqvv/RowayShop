import apiClient from "@/apiClient";
import { ProductResponse } from "types/product/product-response.types";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { mockProducts } from "@/data/mockData";

const BASE_URL = "/api/products";

export const productService = {
  // 📦 Lấy danh sách sản phẩm (có phân trang)
  async getProducts(page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    // const response = await apiClient.get(BASE_URL, {
    //   params: { page, size: pageSize },
    // });
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = page * pageSize;
        const end = start + pageSize;
        const items = mockProducts.slice(start, end);
        resolve({
          code: 200,
          success: true,
          message: "Success",
          data: {
            currentPage: page,
            totalPages: Math.ceil(mockProducts.length / pageSize),
            pageSize: pageSize,
            totalElements: mockProducts.length,
            items: items,
          },
        });
      }, 500);
    });
  },

  // 🔍 Lấy sản phẩm theo ID
  async getProductById(id: number): Promise<ApiResponse<ProductResponse>> {
    // const response = await apiClient.get(`${BASE_URL}/${id}`);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === id);
        resolve({
          code: 200,
          success: true,
          message: "Success",
          data: product!,
        });
      }, 500);
    });
  },

  // 🔍 Lấy sản phẩm theo Slug
  async getProductBySlug(slug: string): Promise<ApiResponse<ProductResponse>> {
    // const response = await apiClient.get(`${BASE_URL}/slug/${slug}`);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.slug === slug);
        resolve({
          code: 200,
          success: true,
          message: "Success",
          data: product!,
        });
      }, 500);
    });
  },

  // 🗂️ Lấy sản phẩm theo danh mục (slug)
  async getProductsByCategory(categorySlug: string, page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    // const response = await apiClient.get(`${BASE_URL}/find-by-category-slug/${categorySlug}`, {
    //   params: { page, size: pageSize },
    // });
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockProducts.filter(p => {
          // Simple mapping based on slug or categoryName
          if (categorySlug === 'ao-nam') return p.categoryName === 'Áo Nam';
          if (categorySlug === 'quan-nam') return p.categoryName === 'Quần Nam';
          if (categorySlug === 'phu-kien') return p.categoryName === 'Phụ Kiện';
          if (categorySlug === 'giay-dep') return p.categoryName === 'Giày Dép';
          return true;
        });
        const start = page * pageSize;
        const end = start + pageSize;
        const items = filtered.slice(start, end);
        resolve({
          code: 200,
          success: true,
          message: "Success",
          data: {
            currentPage: page,
            totalPages: Math.ceil(filtered.length / pageSize),
            pageSize: pageSize,
            totalElements: filtered.length,
            items: items,
          },
        });
      }, 500);
    });
  },

  // 🔎 Tìm kiếm theo tên
  async searchProductsByName(name: string, page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    // const response = await apiClient.get(`${BASE_URL}/search`, {
    //   params: { name, page, size: pageSize },
    // });
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        const start = page * pageSize;
        const end = start + pageSize;
        const items = filtered.slice(start, end);
        resolve({
          code: 200,
          success: true,
          message: "Success",
          data: {
            currentPage: page,
            totalPages: Math.ceil(filtered.length / pageSize),
            pageSize: pageSize,
            totalElements: filtered.length,
            items: items,
          },
        });
      }, 500);
    });
  },

  // 🔧 Filter sản phẩm nhiều điều kiện
  async filterProducts(filters: Record<string, string>, page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    // const response = await apiClient.get(`${BASE_URL}/filter`, {
    //   params: { ...filters, page, size: pageSize },
    // });
    // return response.data;
    return this.getProducts(page, pageSize); // Return all for now
  },

  // 🟢 Tạo sản phẩm mới
  async createProduct(productData: FormData): Promise<ApiResponse<ProductResponse>> {
    const response = await apiClient.post(BASE_URL, productData);
    return response.data;
  },

  // 🟡 Cập nhật sản phẩm
  async updateProduct(id: number, productData: FormData): Promise<ApiResponse<ProductResponse>> {
    const response = await apiClient.put(`${BASE_URL}/${id}`, productData);
    return response.data;
  },

  // 🔴 Xóa sản phẩm
  async deleteProduct(id: number): Promise<boolean> {
    const response = await apiClient.delete(`${BASE_URL}/${id}`);
    return response.data === "Deleted";
  },

  // 🌟 Lấy danh sách sản phẩm nổi bật
  async getFeaturedProduct(page = 0, pageSize = 8): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> {
    // const response = await apiClient.get(`${BASE_URL}/featured`, {
    //   params: { page, size: pageSize },
    // });
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockProducts.filter(p => p.featured);
        const start = page * pageSize;
        const end = start + pageSize;
        const items = filtered.slice(start, end);
        resolve({
          code: 200,
          success: true,
          message: "Success",
          data: {
            currentPage: page,
            totalPages: Math.ceil(filtered.length / pageSize),
            pageSize: pageSize,
            totalElements: filtered.length,
            items: items,
          },
        });
      }, 500);
    });
  },

  // 👁️ Đánh dấu sản phẩm đã xem
  async markProductAsViewed(productId: number): Promise<void> {
    await apiClient.post(`${BASE_URL}/mark`, { productId });
  },

  // 👁️ Lấy danh sách sản phẩm đã xem
  async getRecentlyViewedProducts(page = 0, pageSize = 10): Promise<PaginatedResponse<ProductResponse>> {
    const response = await apiClient.get(`${BASE_URL}/recently-viewed`, {
      params: { page, size: pageSize },
    });
    return response.data.data;
  },

  // 🔁 Đồng bộ danh sách đã xem từ client lên server
  async syncViewedProducts(productIds: number[]): Promise<void> {
    await apiClient.post(`${BASE_URL}/viewed-sync`, productIds);
  },
};
