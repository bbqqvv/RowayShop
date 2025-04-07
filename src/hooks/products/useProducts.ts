import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
} from "@/services/productService";
import { ProductResponse } from "types/product/product-response.types";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";

export const useProducts = (slug?: string, initialPage = 1, initialPageSize = 10) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);

  // 🟢 Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let response: ApiResponse<PaginatedResponse<ProductResponse>>;
      if (slug) {
        response = await getProductsByCategory(slug, page - 1, pageSize);
      } else {
        response = await getProducts(page - 1, pageSize);
      }

      setProducts(response.data.items);
      setTotalItems(response.data.totalElements);
      setTotalPages(Math.ceil(response.data.totalElements / pageSize));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      setProducts([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [slug, page, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🟢 Get product by ID
  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await getProductById(id);
      setSelectedProduct(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product by ID");
      setSelectedProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 Get product by slug
  const fetchProductBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const response = await getProductBySlug(slug);
      setSelectedProduct(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product by slug");
      setSelectedProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 Get products by category
  const fetchProductsByCategory = useCallback(async (categorySlug: string) => {
    setLoading(true);
    try {
      const response = await getProductsByCategory(categorySlug, page - 1, pageSize);
      setProducts(response.data.items);
      setTotalItems(response.data.totalElements);
      setTotalPages(Math.ceil(response.data.totalElements / pageSize));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products by category");
      setProducts([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  // 🔵 Create new product
  const createNewProduct = useCallback(async (productData: FormData) => {
    setLoading(true);
    try {
      const response = await createProduct(productData);
      setProducts((prev) => [response.data, ...prev]);
      setTotalItems((prev) => prev + 1);
      setTotalPages(Math.ceil((totalItems + 1) / pageSize));
      setError(null);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error adding product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [totalItems, pageSize]);

  // 🟡 Update existing product
  const updateExistingProduct = useCallback(async (id: number, productData: FormData) => {
    setLoading(true);
    try {
      const response = await updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? response.data : product))
      );
      setSelectedProduct((prev) =>
        prev?.id === id ? response.data : prev
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔴 Delete product
  const deleteExistingProduct = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setTotalItems((prev) => prev - 1);
      setTotalPages(Math.ceil((totalItems - 1) / pageSize));

      // Adjust current page if we deleted the last item on the page
      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [products.length, page, totalItems, pageSize]);

  // 🟢 Filter products with multiple parameters
  const filterProductsList = useCallback(
    async (filters: Record<string, string>) => {
      setLoading(true);
      try {
        const response = await filterProducts(filters, page - 1, pageSize);
        setProducts(response.data.items);
        setTotalItems(response.data.totalElements);
        setTotalPages(Math.ceil(response.data.totalElements / pageSize));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to filter products");
        setProducts([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize]
  );

  return {
    products,
    selectedProduct,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    filterProducts: filterProductsList,
    fetchProducts,
    fetchProductById,
    fetchProductBySlug,
    fetchProductsByCategory,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  };
};
