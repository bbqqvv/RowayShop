"use client";

import { Button } from "@nextui-org/react";
import { useState, useEffect, ChangeEvent } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageModal from "@/components/features/ImageModal";

// 🎯 Danh sách role có thể chọn khi tạo user
const roles = ["admin", "manager", "staff", "user"];

// 🛠 Giả lập thông tin người dùng hiện tại (có thể thay bằng context hoặc props)
const currentUser = {
  id: 1,
  name: "Admin User",
  role: "admin",
};

interface UserData {
  name: string;
  email: string;
  role: string;
}

export default function CreateUserForm() {
  const router = useRouter();

  const [hasPermission, setHasPermission] = useState(false);
  const [data, setData] = useState<UserData>({
    name: "",
    email: "",
    role: "staff",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({ name: false, email: false });

  useEffect(() => {
    setHasPermission(["admin", "manager"].includes(currentUser.role));
  }, []);

  const handleDataChange = (key: keyof UserData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) setImage(file);
  };

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImageUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const validateForm = () => {
    const newErrors = {
      name: !data.name.trim(),
      email: !data.email.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role", data.role);
      if (image) formData.append("image", image);

      console.log("Sending data:", Object.fromEntries(formData));

      router.push("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (!hasPermission) {
    return (
      <div className="text-center text-red-500 text-lg py-10">
        ❌ Bạn không có quyền tạo người dùng!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full md:w-[400px] shadow-lg">
      <h1 className="font-semibold text-lg text-gray-800 mb-4">Tạo người dùng</h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateUser();
        }}
      >
        {/* 📸 Upload Avatar */}
        <div className="flex flex-col gap-2">
          <label htmlFor="user-avatar" className="text-gray-600 text-sm font-medium">
            Avatar <span className="text-red-500">*</span>
          </label>
          <div
            className="border px-4 py-2 rounded-lg w-full text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex justify-center items-center"
            onClick={() => document.getElementById("user-avatar")?.click()}
          >
            <AiOutlineUpload className="mr-2 text-xl text-blue-500" />
            <span className="text-gray-600">Click để chọn ảnh</span>
          </div>
          <input
            id="user-avatar"
            type="file"
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          {imageUrl && (
            <div className="mt-3 flex justify-center">
              <Image
                src={imageUrl}
                alt="Avatar Preview"
                width={96}
                height={96}
                className="rounded-lg object-cover shadow-md cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          )}
        </div>

        {/* 📝 Name Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-600 text-sm font-medium">
            Họ tên <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nhập họ tên"
            value={data.name}
            onChange={(e) => handleDataChange("name", e.target.value)}
            className={`border px-4 py-2 rounded-lg ${errors.name ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
          />
        </div>

        {/* ✉️ Email Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-600 text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Nhập email"
            value={data.email}
            onChange={(e) => handleDataChange("email", e.target.value)}
            className={`border px-4 py-2 rounded-lg ${errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
          />
        </div>

        {/* 🏷 Role Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-gray-600 text-sm font-medium">
            Vai trò
          </label>
          <select
            id="role"
            value={data.role}
            onChange={(e) => handleDataChange("role", e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* 🚀 Submit Button */}
        <Button color="primary" type="submit" className="mt-4 w-full">
          Tạo người dùng
        </Button>
      </form>

      {/* 🖼 Image Preview Modal */}
      <ImageModal
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
