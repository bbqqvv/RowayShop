import apiClient from "@/apiClient";
import { LoginResponse } from "@/hooks/auth/apiTypes";

const BASE_URL = "/api/auth";

const authService = {
  async loginUser(username: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(`${BASE_URL}/login`, { username, password });
    return response.data;
  },

  async googleLogin(googleToken: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(`${BASE_URL}/oauth2/google`, { token: googleToken });
    return response.data;
  },

  async registerUser(username: string, password: string, email: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(`${BASE_URL}/register`, { username, password, email });
    return response.data;
  },

};

export default authService;
