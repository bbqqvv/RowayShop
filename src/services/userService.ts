import apiClient from "@/apiClient";
import { PaginatedResponse } from "types/api-response.type";
import { ChangePasswordRequest } from "types/user/change-password-request.type";
import { UserCreateRequest } from "types/user/user-creation-request.type";
import { UserResponse } from "types/user/user-creation-response.type";
import { UserUpdateRequest } from "types/user/user-update-request.type";

const BASE_URL = "/api/users";

export const userService = {
  async getUser(id: number): Promise<UserResponse> {
    const response = await apiClient.get<{ data: UserResponse }>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  async getCurrentUser(): Promise<UserResponse> {
    const response = await apiClient.get<{ data: UserResponse }>(`${BASE_URL}/me`);
    return response.data.data;
  },

  async getAllUsers(page = 0, pageSize = 10): Promise<PaginatedResponse<UserResponse>> {
    const response = await apiClient.get<PaginatedResponse<UserResponse>>(`${BASE_URL}`, {
      params: { page, size: pageSize },
    });
    return response.data;
  },

  async createUser(user: UserCreateRequest): Promise<UserResponse> {
    const response = await apiClient.post<{ data: UserResponse }>(`${BASE_URL}`, user);
    return response.data.data;
  },

  async updateUser(id: number, user: UserUpdateRequest): Promise<UserResponse> {
    const response = await apiClient.put<{ data: UserResponse }>(`${BASE_URL}/${id}`, user);
    return response.data.data;
  },

  async updateUserInfo(user: UserUpdateRequest): Promise<UserResponse> {
    const response = await apiClient.put<{ data: UserResponse }>(`${BASE_URL}/me/update-info`, user);
    return response.data.data;
  },

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },

  async changePassword(passwordData: ChangePasswordRequest): Promise<{ success: boolean; message?: string }> {
    const response = await apiClient.put<{ success: boolean; message?: string }>(`${BASE_URL}/change-password`, passwordData);
    return response.data;
  },

  async getUserProfile(token: string): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
};
