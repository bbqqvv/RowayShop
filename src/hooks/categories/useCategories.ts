import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/contexts/AuthContext"; // Import useAuthContext
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categoryService";
import axios from "axios";

export const useCategories = () => {
  const { token } = useAuthContext(); // Lấy token từ context
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "An error occurred.";
    }
    return "An unexpected error occurred.";
  };

  // Fetch danh sách tất cả các danh mục
  const fetchCategories = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const categoriesData = await getAllCategories(token);
      setCategories(categoriesData);
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Tạo mới một danh mục
  const createNewCategory = useCallback(
    async (formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        // Gọi API để tạo danh mục
        const newCategory = await createCategory(token, formData);
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setMessage("Category created successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateExistingCategory = useCallback(
    async (id: number, formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const updatedCategory = await updateCategory(token, id, formData); // Pass FormData
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === id ? updatedCategory : category
          )
        );
        setMessage("Category updated successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Xóa danh mục
  const deleteExistingCategory = useCallback(
    async (id: number) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        await deleteCategory(token, id); // Truyền token vào
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
        setMessage("Category deleted successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Fetch categories khi component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    message,
    fetchCategories,
    createNewCategory,
    updateExistingCategory,
    deleteExistingCategory,
  };
};
