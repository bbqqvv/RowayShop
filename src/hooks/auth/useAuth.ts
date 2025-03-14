"use client"
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoginResponse } from "@/hooks/auth/apiTypes";

const useAuth = () => {
  const {
    user,
    token,
    login,
    register,
    logout,
    setUser,
    setToken,
    loading: contextLoading,
  } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<LoginResponse | void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      if (response && response.token) {
        return response;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    username: string,
    password: string,
    email: string
  ): Promise<LoginResponse | void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await register(username, password, email);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    loading: loading || contextLoading,
    error,
    handleLogin,
    handleRegister,
    logout,
    setUser,
    setToken,
  };
};

export default useAuth;
