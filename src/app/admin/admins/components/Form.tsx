"use client";
import { Button } from "@nextui-org/react";
import { useState, ChangeEvent, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageModal from "@/components/features/ImageModal";

// 🎯 Danh sách role có thể chọn khi tạo user
const roles = ["admin", "manager", "staff", "user"];

// 🛠 Giả lập thông tin người dùng hiện tại (Lấy từ API hoặc Context)
const currentUser = {
  id: 1,
  name: "Admin User",
  role: "admin", // 👈 Chỉ "admin" hoặc "manager" mới có thể tạo user
};

// 🏗 Interface dữ liệu user
interface UserData {
  name: string;
  email: string;
  role: string;
}

export default function CreateUserForm() {
  const router = useRouter();

  // ❌ Chặn người không có quyền truy cập
  if (!["admin", "manager"].includes(currentUser.role)) {
    return (
      <div className="text-center text-red-500 text-lg py-10">
        ❌ Bạn không có quyền tạo người dùng!
      </div>
    );
  }

  // 🔹 State quản lý form nhập dữ liệu
  const [data, setData] = useState<UserData>({
    name: "",
    email: "",
    role: "staff", // Mặc định tạo nhân viên (staff)
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({ name: false, email: false });

  // 🛠 Xử lý nhập liệu form
  const handleDataChange = (key: keyof UserData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 📸 Xử lý chọn ảnh
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
    }
  };

  // 🔄 Hiển thị ảnh preview
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImageUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  // ✅ Kiểm tra dữ liệu hợp lệ
  const validateForm = () => {
    const newErrors = {
      name: !data.name.trim(),
      email: !data.email.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  // 🚀 Gửi dữ liệu lên server để tạo user
  const handleCreateUser = async () => {
    if (!validateForm()) return;

    try {
      // Tạo form data gửi lên API
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role", data.role);
      if (image) {
        formData.append("image", image);
      }

      // Giả lập gọi API
      console.log("Sending data:", Object.fromEntries(formData));

      // 👉 Điều hướng về danh sách user
      router.push("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full md:w-[400px] shadow-lg">
      <h1 className="font-semibold text-lg text-gray-800 mb-4">Create User</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateUser();
        }}
      >
        {/* 📸 Upload Avatar */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Avatar <span className="text-red-500">*</span>
          </label>
          <div
            className="border px-4 py-2 rounded-lg w-full text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex justify-center items-center"
            onClick={() => document.getElementById("user-avatar")?.click()}
          >
            <AiOutlineUpload className="mr-2 text-xl text-blue-500" />
            <span className="text-gray-600">Click to select an image</span>
          </div>
          <input
            id="user-avatar"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          {imageUrl && (
            <div className="mt-3 flex justify-center">
              <Image
                src={imageUrl}
                alt="Avatar Preview"
                className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          )}
        </div>

        {/* 📝 Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter name"
            value={data.name}
            onChange={(e) => handleDataChange("name", e.target.value)}
            className={`border px-4 py-2 rounded-lg ${
              errors.name ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* ✉️ Email Input */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => handleDataChange("email", e.target.value)}
            className={`border px-4 py-2 rounded-lg ${
              errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* 🏷 Role Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">Role</label>
          <select
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
          Create User
        </Button>
      </form>

      {/* 🖼 Modal Preview Image */}
      <ImageModal imageUrl={imageUrl} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
