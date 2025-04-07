"use client";
import { useState, useEffect, useCallback } from "react";
import { userService } from "@/services/userService";
import { UserResponse } from "types/user/user-creation-response.type";
import { ChangePasswordRequest } from "types/user/change-password-request.type";
import { UserCreateRequest } from "types/user/user-creation-request.type";
import { UserUpdateRequest } from "types/user/user-update-request.type";
import { PaginatedResponse } from "types/api-response.type";

export const useUser = (id?: number) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Lấy danh sách người dùng với phân trang
  const fetchUsers = useCallback(async (page: number = 0, pageSize: number = 10) => {
    setLoading(true);
    try {
      const data: PaginatedResponse<UserResponse> = await userService.getAllUsers(page, pageSize);
      setUsers(data.data.items);
      setPagination({
        page: data.data.currentPage,
        pageSize: data.data.pageSize,
        totalPages: data.data.totalPages,
        totalItems: data.data.totalElements,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userService.getCurrentUser();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải thông tin người dùng hiện tại.");
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
      setError(err instanceof Error ? err.message : "Không thể tải thông tin người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Khi `id` thay đổi, tự động fetch dữ liệu
  useEffect(() => {
    if (id) {
      fetchUserById(id);
    } else {
      fetchUsers(pagination.page, pagination.pageSize);
    }
  }, [id, fetchUserById, fetchUsers, pagination.page, pagination.pageSize]);

  // 🔵 Thêm người dùng
  const createUser = useCallback(async (user: UserCreateRequest) => {
    setLoading(true);
    try {
      const createdUser = await userService.createUser(user);
      // Sau khi tạo mới, fetch lại danh sách với trang hiện tại
      await fetchUsers(pagination.page, pagination.pageSize);
      return createdUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tạo người dùng.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, pagination.page, pagination.pageSize]);

  // 🟡 Cập nhật người dùng
  const updateUser = useCallback(async (id: number, user: UserUpdateRequest) => {
    setLoading(true);
    try {
      const updated = await userService.updateUser(id, user);
      setUsers(prev => prev.map(u => (u.id === id ? updated : u)));
      setUser(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể cập nhật thông tin người dùng.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserInfo = useCallback(async (user: UserUpdateRequest) => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateUserInfo(user);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể cập nhật thông tin.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔴 Xóa người dùng
  const deleteUser = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await userService.deleteUser(id);
      // Sau khi xóa, fetch lại danh sách với trang hiện tại
      await fetchUsers(pagination.page, pagination.pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể xóa người dùng.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, pagination.page, pagination.pageSize]);

  // 🔒 Đổi mật khẩu
  const changePassword = useCallback(async (passwordData: ChangePasswordRequest) => {
    setLoading(true);
    try {
      const response = await userService.changePassword(passwordData);
      if (response?.success) {
        return true;
      } else {
        setError(response?.message || "Đổi mật khẩu thất bại.");
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mật khẩu cũ không đúng hoặc có lỗi xảy ra.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Thay đổi trang
  const setPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  // Thay đổi kích thước trang
  const setPageSize = useCallback((pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, page: 0 })); // Reset về trang đầu tiên khi thay đổi pageSize
  }, []);

  return {
    user,
    users,
    loading,
    error,
    pagination,
    createUser,
    updateUser,
    deleteUser,
    fetchCurrentUser,
    updateUserInfo,
    changePassword,
    fetchUsers,
    setPage,
    setPageSize,
  };
};