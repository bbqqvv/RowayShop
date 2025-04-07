import { ProductResponse } from "types/product/product-response.types";
import api from "@/axios";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";


// 🟢 Lấy danh sách sản phẩm (có phân trang)
export const getProducts = async (page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await api.get(`/api/products?page=${page}&size=${pageSize}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo ID
export const getProductById = async (id: number): Promise<ApiResponse<ProductResponse>> => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo Slug
export const getProductBySlug = async (slug: string): Promise<ApiResponse<ProductResponse>> => {
  const response = await api.get(`/api/products/slug/${slug}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo danh mục
export const getProductsByCategory = async (categorySlug: string, page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await api.get(`/api/products/find-by-category-slug/${categorySlug}?page=${page}&size=${pageSize}`);
  return response.data;
};

// 🔵 Thêm sản phẩm mới
export const createProduct = async (productData: FormData): Promise<ApiResponse<ProductResponse>> => {
  const response = await api.post("/api/products", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 🟡 Cập nhật sản phẩm
export const updateProduct = async (id: number, productData: FormData): Promise<ApiResponse<ProductResponse>> => {
  const response = await api.put(`/api/products/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const searchProductsByName = async (name: string, page = 0, pageSize = 9): Promise<PaginatedResponse<ProductResponse>> => {
  const response = await api.get(`/api/products/search`, {
    params: { name, page, size: pageSize },
  });
  return response.data;
};
// 🔴 Xóa sản phẩm
export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data === "Deleted";
};
// 🟢 Filter products with multiple parameters
export const filterProducts = async (filters: Record<string, string>,page = 0,pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await api.get("/api/products/filter", {params: {...filters,page,size: pageSize},
  });
  return response.data;
};