import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/contexts/AuthContext"; // Lấy token từ context
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsByCategory,
  getProductBySlug,
  getProductByCategorySlug,
} from "@/services/productService";
import axios from "axios";

// Custom hook for managing products
export const useProducts = (slug?: string, categoryId?: number) => {
  const { token } = useAuthContext();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Handle errors from Axios
  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "An error occurred.";
    }
    return "An unexpected error occurred.";
  };

  // Log FormData for debugging
  const logFormData = (formData: FormData) => {
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  };

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllProducts();
      if (response?.data && Array.isArray(response.data)) {
        setProducts(response.data); // Cập nhật state sản phẩm
      } else {
        setProducts([]); // Fallback về mảng rỗng nếu không có dữ liệu
        setError("No products found.");
      }
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setLoading(false);
    }
  }, []); // Dependency vào categoryId

  // Fetch product by ID
  const fetchProductById = useCallback(
    async (id: number) => {
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const response = await getProductById(id);
        return response;
      } catch (err) {
        setError(handleAxiosError(err));
        return null; // Trả về null nếu lỗi
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Fetch product by Slug
  const fetchProductBySlug = useCallback(
    async (slug: string) => {
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const response = await getProductBySlug(slug);
        return response;
      } catch (err) {
        setError(handleAxiosError(err));
        return null; // Trả về null nếu lỗi
      } finally {
        setLoading(false);
      }
    },
    [token]
  );
  // Fetch product by Category Slug
  const fetchProductByCategorySlug = useCallback(
    async (slug: string) => {
      setLoading(true);
      setError("");
      setMessage("");
      try {
        // Giả sử bạn gọi API với slug của category
        const response = await getProductByCategorySlug(slug);
        if (response && Array.isArray(response.data)) {
          setProducts(response.data); // Lưu sản phẩm vào state
        } else {
          setProducts([]); // Nếu không có sản phẩm, trả về mảng rỗng
          setError("No products found for this category.");
        }
      } catch (err) {
        setError(handleAxiosError(err)); // Xử lý lỗi nếu có
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Fetch product by Category
  const fetchProductByCategory = useCallback(
    async (categoryId: number) => {
      setLoading(true);
      setError("");
      try {
        const response = await getAllProductsByCategory(categoryId);
        if (response && Array.isArray(response.data)) {
          setProducts(response.data); // Lưu sản phẩm vào state
        } else {
          setProducts([]); // Trả về mảng rỗng nếu không có sản phẩm
          setError("No products found for this category.");
        }
      } catch (err) {
        setError(handleAxiosError(err)); // Xử lý lỗi
      } finally {
        setLoading(false); // Tắt loading
      }
    },
    [] // Chỉ cần gọi lại khi categoryId thay đổi
  );

  // Create a new product
  const createNewProduct = useCallback(
    async (formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      logFormData(formData); // Log the FormData for debugging

      try {
        const newProduct = await createProduct(token, formData);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setMessage("Product created successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Update an existing product
  const updateExistingProduct = useCallback(
    async (id: number, formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");

      try {
        const updatedProduct = await updateProduct(token, id, formData);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
        setMessage("Product updated successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Delete a product
  const deleteExistingProduct = useCallback(
    async (id: number) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");

      try {
        await deleteProduct(token, id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        setMessage("Product deleted successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    // Nếu có categoryId thì fetch theo categoryId
    if (categoryId) {
      fetchProductByCategory(categoryId);
    }
    // Nếu có slug (đối với categorySlug hoặc productSlug)
    else if (slug) {
      fetchProductByCategorySlug(slug); // Fetch theo categorySlug
    }
    // Nếu không có categoryId hay slug thì fetch tất cả sản phẩm
    else {
      fetchProducts();
    }
  }, [
    categoryId,
    slug,
    fetchProducts,
    fetchProductByCategory,
    fetchProductByCategorySlug,
    fetchProductBySlug,
  ]);

  return {
    products, // List of products
    loading, // Loading state
    error, // Error message
    message, // Success message
    fetchProducts, // Fetch all products
    fetchProductById, // Fetch product by ID
    fetchProductByCategorySlug,
    fetchProductBySlug, // Fetch product by Slug
    fetchProductByCategory, // Fetch product by Category
    createNewProduct, // Create new product
    updateExistingProduct, // Update product
    deleteExistingProduct, // Delete product
  };
};
