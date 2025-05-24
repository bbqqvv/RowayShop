import { useState, useEffect, useCallback } from "react";
import categoryService from "@/services/categoryService";
import { CategoryResponse } from "types/category/category-response.type";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Hàm xử lý lỗi API
  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "An error occurred.";
    }
    return "An unexpected error occurred.";
  };

  // Lấy danh sách tất cả categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      // Giả sử có api get all categories (nếu chưa có thì cần thêm vào service)
      const response = await categoryService.getAllCategories();
      if (response && Array.isArray(response)) {
        setCategories(response);
      } else {
        setError("No categories found.");
      }
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo mới category
  const createNewCategory = useCallback(
    async (formData: FormData) => {
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const newCategory = await categoryService.createCategory(formData);
        setCategories((prev) => [...prev, newCategory]);
        setMessage("Category created successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Cập nhật category
  const updateExistingCategory = useCallback(
    async (id: number, formData: FormData) => {
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const updatedCategory = await categoryService.updateCategory(id, formData);
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? updatedCategory : cat))
        );
        setMessage("Category updated successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Xóa category
  const deleteExistingCategory = useCallback(
    async (id: number) => {
      setLoading(true);
      setError("");
      setMessage("");
      try {
        await categoryService.deleteCategory(id);
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        setMessage("Category deleted successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
