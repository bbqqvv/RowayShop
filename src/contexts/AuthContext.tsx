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
import { loginUser, registerUser } from "@/services/authService";
import { LoginResponse } from "@/hooks/auth/apiTypes";

interface AuthContextType {
  user: LoginResponse["user"] | null;
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
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore token and user from cookies
  useEffect(() => {
    const storedToken = getCookie("token") as string | undefined;
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Helper function to set token and user state
  const setAuthData = (data: LoginResponse) => {
    setToken(data.token);
    setUser(data.user);
    setCookie("token", data.token, {
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
    });
  };

  // Login handler
  const login = async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    const data = await loginUser(username, password);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };

  // Register handler
  const register = async (
    username: string,
    password: string,
    email: string
  ): Promise<LoginResponse> => {
    const data = await registerUser(username, password, email);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };

  // Logout handler
  const logout = (): void => {
    setToken(null);
    setUser(null);
    deleteCookie("token", { path: "/" });
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
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
