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
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { googleLogin, loginUser, registerUser } from "@/services/authService";
import { userService } from "@/services/userService"; // ✅ Import service lấy user
import { LoginResponse } from "@/hooks/auth/apiTypes";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { UserResponse } from "types/user/user-creation-response.type";

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  setUser: Dispatch<SetStateAction<UserResponse | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  login: (username: string, password: string) => Promise<LoginResponse>;
  googleSignIn: (googleToken: string) => Promise<LoginResponse>; 
  register: (username: string, password: string, email: string) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Hook
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Khi mở trang, kiểm tra token và lấy thông tin user
  useEffect(() => {
    const storedToken = getCookie("token") as string | undefined;
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken); // ✅ Gọi API lấy thông tin user
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Hàm gọi API lấy user
  const fetchUser = async (token: string) => {
    try {
      const userData = await userService.getCurrentUser(); // 🟢 Gọi API lấy user hiện tại
      setUser(userData);
    } catch (error) {
      console.error("Không thể lấy thông tin user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cập nhật token và user sau khi đăng nhập
  const setAuthData = (data: LoginResponse) => {
    setToken(data.token);
    setCookie("token", data.token, {
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
    });

    fetchUser(data.token); // 🟢 Gọi API để lấy thông tin user
  };

  // ✅ Google Login
  const googleSignIn = async (googleToken: string): Promise<LoginResponse> => {
    const data = await googleLogin(googleToken);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };
  // ✅ Hàm đăng nhập
  const login = async (username: string, password: string): Promise<LoginResponse> => {
    const data = await loginUser(username, password);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };

  // ✅ Hàm đăng ký
  const register = async (username: string, password: string, email: string): Promise<LoginResponse> => {
    const data = await registerUser(username, password, email);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };

  // ✅ Hàm đăng xuất
  const logout = (): void => {
    setToken(null);
    setUser(null);
    deleteCookie("token", { path: "/" });
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, googleSignIn,setToken, login, register, logout, loading }}>
      {loading ? <LoadingScreen /> : children}
      </AuthContext.Provider>
  );
};
