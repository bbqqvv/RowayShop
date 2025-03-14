"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/hooks/users/useUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword: React.FC = () => {
  const { changePassword, loading } = useUser();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Toggle hiển thị mật khẩu
  const toggleShowPassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss(); // Xóa tất cả thông báo trước đó
  
    // Kiểm tra dữ liệu nhập hợp lệ
    if (form.newPassword !== form.confirmPassword) {
      toast.error("❌ Mật khẩu mới và xác nhận không khớp!");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.warning("⚠️ Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }
  
    // Gửi yêu cầu đổi mật khẩu
    const success = await changePassword({
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });
    console.log("Kết quả đổi mật khẩu:", success); // 👉 Debug kết quả trả về

    if (success) {
      toast.success("✅ Đổi mật khẩu thành công!");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast.error("❌ Mật khẩu cũ không đúng hoặc có lỗi xảy ra!");
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        🔒 Đổi mật khẩu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            label: "Mật khẩu hiện tại",
            name: "oldPassword",
            value: form.oldPassword,
            showPassword: showPasswords.old,
            togglePassword: () => toggleShowPassword("old"),
          },
          {
            label: "Mật khẩu mới",
            name: "newPassword",
            value: form.newPassword,
            showPassword: showPasswords.new,
            togglePassword: () => toggleShowPassword("new"),
          },
          {
            label: "Xác nhận mật khẩu",
            name: "confirmPassword",
            value: form.confirmPassword,
            showPassword: showPasswords.confirm,
            togglePassword: () => toggleShowPassword("confirm"),
          },
        ].map((field, index) => (
          <div key={index} className="relative">
            <label className="block text-gray-600 mb-1">{field.label}</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 ring-blue-400 transition-all">
              <input
                type={field.showPassword ? "text" : "password"}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={field.togglePassword}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {field.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-md transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "🔄 Đang xử lý..." : "✅ Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
