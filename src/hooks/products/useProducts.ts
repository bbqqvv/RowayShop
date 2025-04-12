'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
  searchProductsByName,
} from '@/services/productService';
import { ProductResponse } from 'types/product/product-response.types';
import { ApiResponse, PaginatedResponse } from 'types/api-response.type';

export const useProducts = (
  slug?: string,
  initialPage = 1,
  initialPageSize = 10
) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [searchQuery] = useState<string>('');

  const handleResponsePagination = (
    response: ApiResponse<PaginatedResponse<ProductResponse>>
  ) => {
    setProducts(response.data.items);
    setTotalItems(response.data.totalElements);
    setTotalPages(Math.ceil(response.data.totalElements / pageSize));
    setError(null);
  };

  const handleError = (err: unknown, message: string) => {
    setError(err instanceof Error ? err.message : message);
    setProducts([]);
    setTotalItems(0);
    setTotalPages(1);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = slug
        ? await getProductsByCategory(slug, page - 1, pageSize)
        : await getProducts(page - 1, pageSize);

      handleResponsePagination(response);
    } catch (err) {
      handleError(err, 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [slug, page, pageSize]);

  const searchProducts = useCallback(
    async (query: string) => {
      setLoading(true);
      try {
        const response = await searchProductsByName(query, page - 1, pageSize);
        handleResponsePagination(response);
      } catch (err) {
        handleError(err, 'Failed to search products');
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize]
  );

  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery);
    } else {
      fetchProducts();
    }
  }, [searchQuery, fetchProducts, searchProducts]);

  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await getProductById(id);
      setSelectedProduct(response.data);
      setError(null);
    } catch (err) {
      handleError(err, 'Failed to fetch product by ID');
      setSelectedProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const response = await getProductBySlug(slug);
      setSelectedProduct(response.data);
      setError(null);
    } catch (err) {
      handleError(err, 'Failed to fetch product by slug');
      setSelectedProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewProduct = useCallback(
    async (productData: FormData) => {
      setLoading(true);
      try {
        const response = await createProduct(productData);
        setProducts((prev) => [response.data, ...prev]);
        const newTotal = totalItems + 1;
        setTotalItems(newTotal);
        setTotalPages(Math.ceil(newTotal / pageSize));
        setError(null);
        return response.data;
      } catch (err) {
        handleError(err, 'Error adding product');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [totalItems, pageSize]
  );

  const updateExistingProduct = useCallback(
    async (id: number, productData: FormData) => {
      setLoading(true);
      try {
        const response = await updateProduct(id, productData);
        setProducts((prev) =>
          prev.map((product) => (product.id === id ? response.data : product))
        );
        setSelectedProduct((prev) => (prev?.id === id ? response.data : prev));
        setError(null);
        return response.data;
      } catch (err) {
        handleError(err, 'Error updating product');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteExistingProduct = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await deleteProduct(id);
        const updatedProducts = products.filter((p) => p.id !== id);
        const newTotal = totalItems - 1;
        setProducts(updatedProducts);
        setTotalItems(newTotal);
        setTotalPages(Math.ceil(newTotal / pageSize));
        if (updatedProducts.length === 0 && page > 1) {
          setPage(page - 1);
        }
        setError(null);
      } catch (err) {
        handleError(err, 'Error deleting product');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [products, totalItems, page, pageSize]
  );

  const filterProductsList = useCallback(
    async (filters: Record<string, string>) => {
      setLoading(true);
      try {
        const response = await filterProducts(filters, page - 1, pageSize);
        handleResponsePagination(response);
      } catch (err) {
        handleError(err, 'Failed to filter products');
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
    searchProducts,
    fetchProducts,
    fetchProductById,
    fetchProductBySlug,
    filterProducts: filterProductsList,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  };
};
