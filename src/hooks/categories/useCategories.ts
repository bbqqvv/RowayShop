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
  const { token } = useAuthContext(); 
  const [categories, setCategories] = useState<any[]>([]); // Khởi tạo categories là mảng
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // Hàm xử lý lỗi từ API
  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "An error occurred.";
    }
    return "An unexpected error occurred.";
  };

  // Fetch danh sách danh mục
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const categoriesData = await getAllCategories(); 
      console.log(categoriesData); 

      if (categoriesData?.data && Array.isArray(categoriesData.data)) {
        setCategories(categoriesData.data); 
      } else {
        setError("No categories found.");
      }
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setLoading(false);
    }
  }, []);
  // Tạo mới một danh mục
  const createNewCategory = useCallback(
    async (formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const newCategory = await createCategory(token, formData);
      
        setCategories((prevCategories) => {
          // Nếu prevCategories không phải mảng, khởi tạo mảng mới
          if (!Array.isArray(prevCategories)) {
            return [newCategory];
          }
          return [...prevCategories, newCategory]; // Nếu là mảng, thêm newCategory vào
        });
        setMessage("Category created successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Cập nhật một danh mục
  const updateExistingCategory = useCallback(
    async (id: number, formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const updatedCategory = await updateCategory(token, id, formData); // Pass FormData
        setCategories((prevCategories) =>
          // Kiểm tra và đảm bảo prevCategories là mảng
          Array.isArray(prevCategories)
            ? prevCategories.map((category) =>
                category.id === id ? updatedCategory : category
              )
            : [updatedCategory] // Nếu không phải mảng, tạo một mảng mới chứa updatedCategory
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
          // Kiểm tra và đảm bảo prevCategories là mảng
          Array.isArray(prevCategories)
            ? prevCategories.filter((category) => category.id !== id)
            : [] // Nếu không phải mảng, trả về mảng rỗng
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
