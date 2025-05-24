"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { googleLogin, loginUser, registerUser, getUserProfile } from "@/services/authService";
import { LoginResponse } from "@/hooks/auth/apiTypes";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { UserResponse } from "types/user/user-creation-response.type";

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  login: (username: string, password: string) => Promise<LoginResponse>;
  googleSignIn: (googleToken: string) => Promise<LoginResponse>;
  register: (username: string, password: string, email: string) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getCookie("token") as string | undefined;
      if (storedToken) {
        setToken(storedToken);
        try {
          const userProfile = await getUserProfile(storedToken); // You need to implement this in your service
          setUser(userProfile);
        } catch (error) {
          console.error("Invalid token or failed to fetch user profile", error);
          logout(); // Clear invalid token
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const setAuthData = (data: LoginResponse) => {
    setToken(data.token);
    setCookie("token", data.token, {
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
    });
  };

  const googleSignIn = async (googleToken: string): Promise<LoginResponse> => {
    const data = await googleLogin(googleToken);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    const data = await loginUser(username, password);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };

  const register = async (username: string, password: string, email: string): Promise<LoginResponse> => {
    const data = await registerUser(username, password, email);
    if (!data?.token) throw new Error("Token not found in response");
    setAuthData(data);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    deleteCookie("token", { path: "/" });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, googleSignIn, login, register, logout, loading, setUser, setToken }}
    >
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
