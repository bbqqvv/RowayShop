import axios from "axios";

// 🔹 Cấu hình Axios
const API_BASE_URL = "http://localhost:8080"; // Thay đổi thành API của bạn
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Lấy danh sách sản phẩm (có phân trang)
export const getProducts = async (page = 0, pageSize = 10): Promise<PaginatedResponse<Product>> => {
  const response = await api.get(`/api/products?page=${page}&size=${pageSize}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo Slug
export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await api.get(`/api/products/slug/${slug}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo danh mục
export const getProductsByCategory = async (categorySlug: string, page = 0, pageSize = 10): Promise<PaginatedResponse<Product>> => {
  const response = await api.get(`/api/products/category/${categorySlug}?page=${page}&size=${pageSize}`);
  return response.data;
};

// 🔵 Thêm sản phẩm mới
export const createProduct = async (productData: FormData): Promise<Product> => {
  const response = await api.post("/api/products", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 🟡 Cập nhật sản phẩm
export const updateProduct = async (id: number, productData: FormData): Promise<Product> => {
  const response = await api.put(`/api/products/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 🔴 Xóa sản phẩm
export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data === "Deleted";
};
