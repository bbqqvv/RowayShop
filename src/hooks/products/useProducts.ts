import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";

export const useProducts = (initialPage = 1, initialPageSize = 10) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 🟢 Lấy danh sách sản phẩm
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProducts(page - 1, pageSize); // API sử dụng page index bắt đầu từ 0
      setProducts(response.data.items);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🟢 Lấy sản phẩm theo ID
  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await getProductById(id);
      setSelectedProduct(response);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch product by ID");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 Lấy sản phẩm theo Slug
  const fetchProductBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const response = await getProductBySlug(slug);
      console.log("🔎 Sản phẩm với slug:", response);
      setSelectedProduct(response);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch product by slug");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 Lấy sản phẩm theo danh mục
  const fetchProductsByCategory = useCallback(async (categorySlug: string) => {
    setLoading(true);
    try {
      const response = await getProductsByCategory(categorySlug, page - 1, pageSize);
      setProducts(response.data.items);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products by category");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  // 🔵 Thêm sản phẩm mới
  const createNewProduct = useCallback(async (productData: FormData) => {
    setLoading(true);
    try {
      const response = await createProduct(productData);
      setProducts((prev) => [response, ...prev]); // Thêm sản phẩm mới vào đầu danh sách
      setError(null);
      return response;
    } catch (err: any) {
      setError(err.message || "Error adding product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟡 Cập nhật sản phẩm
  const updateExistingProduct = useCallback(async (id: number, productData: FormData) => {
    setLoading(true);
    try {
      const response = await updateProduct(id, productData);
      setProducts((prev) => prev.map((product) => (product.id === id ? response : product)));
      setError(null);
      return response;
    } catch (err: any) {
      setError(err.message || "Error updating product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔴 Xóa sản phẩm
  const deleteExistingProduct = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error deleting product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    selectedProduct,
    loading,
    error,
    page,
    pageSize,
    setPage,
    setPageSize,
    fetchProducts,
    fetchProductById,
    fetchProductBySlug,
    fetchProductsByCategory,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  };
};
