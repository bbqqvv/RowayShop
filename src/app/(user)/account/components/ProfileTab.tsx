"use client";
import { useUser } from "@/hooks/users/useUser";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfileTab() {
  const { user, loading, fetchCurrentUser, updateUserInfo } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  // 🟢 Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchCurrentUser().catch(() => {
      toast.error("Lỗi khi tải thông tin người dùng!");
    });
  }, []);

  // 🟢 Cập nhật form khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  // 🟡 Xử lý khi thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🟠 Xử lý cập nhật thông tin
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateUserInfo(formData);

    if (success) {
      toast.success("Cập nhật thông tin thành công!");
      fetchCurrentUser(); // ✅ Load lại dữ liệu mới
    } else {
      toast.error("Cập nhật thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold text-gray-800 mb-4">Thông tin cá nhân</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Họ & tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tên người dùng</label>
          <input
            type="text"
            value={user?.username || ""}
            className="w-full px-3 py-2 border rounded-md"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full px-3 py-2 border rounded-md"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tiểu sử</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md h-24 resize-none"
          />
        </div>
        <button
          type="submit"
          className="text-white px-6 py-2 rounded-md bg-black hover:bg-gray-800 transition-colors"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
