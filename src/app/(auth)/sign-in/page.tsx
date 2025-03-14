"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { CircularProgress } from "@nextui-org/react"; // For loading spinner
import useAuth from "@/hooks/auth/useAuth"; // Import custom hook useAuth

// Định nghĩa interface cho response từ API khi đăng nhập
interface LoginResponse {
  token: string;
}

// Định nghĩa các lỗi có thể xảy ra trong quá trình login
interface LoginPageProps {
  username: string;
  password: string;
  localError: string;
}

export default function LoginPage() {
  const { handleLogin, loading, error } = useAuth(); // Sử dụng hook custom useAuth
  const [username, setUsername] = useState<string>(""); // State cho username
  const [password, setPassword] = useState<string>(""); // State cho password
  const router = useRouter(); // useRouter để chuyển hướng
  const [localError, setLocalError] = useState<string>(""); // State để chứa lỗi local (nếu có)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Kiểm tra xem đã nhập đủ username và password chưa
    if (!username || !password) {
      setLocalError("Please enter both username and password.");
      return;
    }
    setLocalError("");
    try {
      const response: LoginResponse | void = await handleLogin(
        username,
        password
      );
      // Kiểm tra nếu có token trong phản hồi
      if (response?.token) {
        router.push("/"); // Sau khi đăng nhập thành công, chuyển hướng tới trang Dashboard
      } else {
        setLocalError("Invalid username or password."); // Hiển thị lỗi nếu không có token
      }
    } catch (err) {
      console.error("Login failed", err);
      setLocalError("Login failed. Please try again.");
    }
  };

  return (
    <main className="w-full flex justify-center items-center bg-gray-100 p-10 min-h-screen">
      <section className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-lg px-4 py-2`}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size="md" color="primary" /> // Corrected size and color
            ) : (
              "Login"
            )}
          </button>

          {/* Hiển thị thông báo lỗi nếu có */}
          {localError && (
            <p className="text-red-500 text-sm mt-2">{localError}</p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </section>
    </main>
  );
}
