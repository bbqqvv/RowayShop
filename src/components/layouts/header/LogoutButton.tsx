"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/auth/useAuth";
import { LogOut } from "lucide-react";
import router from "next/router";
import { toast } from "react-toastify";
export default function LogoutButton() {
  const { logout } = useAuthContext();
  const { token } = useAuth();
  console.log("User in LogoutButton:", token);

  if (!token) {
    return <></>;
  }
  return (
    <button
      className="flex items-center gap-3 rounded-lgfont-medium "
      onClick={async () => {
        if (!confirm("Bạn có chắc chắn muốn đăng xuất không?")) return;
        try {
          logout();
          router.push("/login");
          toast.success("Đăng xuất thành công!");
        } catch (error) {
          toast.error("Lỗi đăng xuất. Vui lòng thử lại.");
        }
      }}
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
}
