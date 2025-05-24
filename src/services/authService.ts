import axios from "axios";
import { LoginResponse } from "@/hooks/auth/apiTypes";
import { UserResponse } from "types/user/user-creation-response.type";

// Cấu hình axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/auth",
  withCredentials: true,
});

// Login function
export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Login failed. Please check your credentials.");
  }
};

// Google OAuth2 login function
export const googleLogin = async (googleToken: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/oauth2/google", {
      token: googleToken,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Google login failed. Please try again.");
  }
};

// Register function
export const registerUser = async (
  username: string,
  password: string,
  email: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/register", {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Registration failed. Please try again.");
  }
};

// Get current user profile by token
export const getUserProfile = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>("http://localhost:8080/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to fetch user profile.");
  }
};

// Error handler helper
function handleAxiosError(error: unknown, fallbackMessage: string): never {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  console.error(fallbackMessage, error);
  throw new Error(fallbackMessage);
}
