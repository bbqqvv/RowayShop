"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { loginUser, registerUser, logoutUser } from "@/services/authService";
import { LoginResponse } from "@/hooks/auth/apiTypes"; // Đảm bảo LoginResponse được nhập đúng

// Define the AuthContext type
interface AuthContextType {
  user: LoginResponse["user"] | null; // Sử dụng LoginResponse['user']
  token: string | null;
  setUser: Dispatch<SetStateAction<LoginResponse["user"] | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  login: (username: string, password: string) => Promise<LoginResponse>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
}

// Utility to get a cookie by name
const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return matches ? matches[2] : null;
};

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Hook to use AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null); // Lấy kiểu user từ LoginResponse
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore token from cookie on page load
  useEffect(() => {
    const storedToken = getCookie("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("Token loaded from cookie:", storedToken); // Log token when it's restored from cookie
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const data = await loginUser(username, password);
      if (data?.token) {
        setToken(data.token);
        setUser(data.user); // Lưu thông tin user vào state
        document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=Strict`;
        console.log("Login successful, token:", data.token);
        return data;
      }
      throw new Error("Token not found in response");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Register handler
  const register = async (
    username: string,
    password: string,
    email: string
  ): Promise<LoginResponse> => {
    try {
      const data = await registerUser(username, password, email);
      if (data?.token) {
        setToken(data.token);
        setUser(data.user); // Lưu thông tin user vào state
        document.cookie = `token=${data.token}; path=/; max-age=3600; Secure; SameSite=Strict`;
        console.log("Registration successful, token:", data.token);
        return data;
      }
      throw new Error("Token not found in response");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Logout handler
  const logout = (): void => {
    logoutUser();
    setToken(null);
    setUser(null);
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    console.log("Logged out, token cleared");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
