"use client";
import { useState, useEffect, useCallback } from "react";
import { userService } from "@/services/userService";

export const useUser = (id?: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Lấy danh sách người dùng
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error? err.message: "Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 Lấy thông tin 1 user theo ID
  const fetchUserById = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const data = await userService.getUser(userId);
      setUser(data);
    } catch (err) {
      setError(err instanceof Error? err.message:"Không thể tải thông tin người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Khi `id` thay đổi, tự động fetch dữ liệu
  useEffect(() => {
    if (id) {
      fetchUserById(id);
    } else {
      fetchUsers();
    }
  }, [id, fetchUserById, fetchUsers]);

  // 🔵 Thêm người dùng
  const createUser = useCallback(async (newUser: User) => {
    setLoading(true);
    try {
      const createdUser = await userService.createUser(newUser);
      setUsers((prev) => [...prev, createdUser]);
      return createdUser;
    } catch (err) {
      setError(err instanceof Error? err.message: "Không thể tạo người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟡 Cập nhật người dùng
  const updateUser = useCallback(async (id: number, updatedUser: User) => {
    setLoading(true);
    try {
      const updated = await userService.updateUser(id, updatedUser);
      setUsers((prev) => prev.map((user) => (user.id === id ? updated : user)));
      setUser(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error? err.message: "Không thể cập nhật thông tin người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔴 Xóa người dùng
  const deleteUser = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(err instanceof Error? err.message: "Không thể xóa người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔒 Đổi mật khẩu
  const changePassword = useCallback(async (passwordData: ChangePasswordRequest) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await userService.changePassword(passwordData);
      console.log("Phản hồi từ API:", response); // 👉 Debug phản hồi từ API
  
      if (response?.success) {
        return true;
      } else {
        setError(response?.message || "Đổi mật khẩu thất bại.");
        return false;
      }
    } catch (err) {
      setError(err instanceof Error? err.message: "Mật khẩu cũ không đúng hoặc có lỗi xảy ra.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);
  

  return {
    user,
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
  };
};
