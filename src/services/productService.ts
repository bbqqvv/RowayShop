import axios, { AxiosResponse } from "axios";

// Tạo axios client với baseURL chung
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/products", // Base URL
  headers: {
    "Content-Type": "multipart/form-data", // Đảm bảo rằng content type là multipart/form-data khi gửi ảnh và dữ liệu
  },
});
// Lấy danh sách tất cả sản phẩm
export const getAllProducts = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.get("");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};
// Lấy danh sách sản phẩm theo danh mục
// Lấy danh sách sản phẩm theo danh mục và phân trang
export const getAllProductsByCategory = async (
  categoryId: number,
): Promise<any> => {
  try {
    // Gọi API và truyền cả categoryId và page vào URL
    const response: AxiosResponse = await apiClient.get(
      `/find-by-category/${categoryId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products by category"
    );
  }
};


// Lấy thông tin sản phẩm theo ID
export const getProductById = async (id: string | number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || `Failed to fetch product with ID ${id}`
    );
  }
};
// Lấy thông tin sản phẩm theo ID
export const getProductBySlug = async (slug: string | number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.get(`/slug/${slug}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || `Failed to fetch product with ID ${slug}`
    );
  }
};
// Lấy thông tin sản phẩm theo ID
export const getProductByCategorySlug = async (slug: string | number): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.get(`/find-by-category-slug/${slug}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || `Failed to fetch product with ID ${slug}`
    );
  }
};
// Tạo mới một sản phẩm
export const createProduct = async (
  token: string,
  formData: FormData
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.post("", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create product"
    );
  }
};

// Cập nhật một sản phẩm
export const updateProduct = async (
  token: string,
  id: string | number,
  formData: FormData
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.put(`/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || `Failed to update product with ID ${id}`
    );
  }
};

// Xóa một sản phẩm
export const deleteProduct = async (
  token: string,
  id: string | number
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || `Failed to delete product with ID ${id}`
    );
  }
};
