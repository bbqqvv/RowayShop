"use client";

import { Button } from "@nextui-org/react";
import { useState, ChangeEvent, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai"; // Import icon từ react-icons
import ImageModal from "@/components/features/ImageModal";
import Image from 'next/image';


// Định nghĩa kiểu dữ liệu cho state
interface FormData {
  name: string;
  slug: string;
  email: string;
}

export default function Form() {
  // Khởi tạo state cho dữ liệu và hình ảnh
  const [data, setData] = useState<FormData>({ name: "", slug: "", email: "" });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State để lưu URL của Blob hình ảnh
  const [isModalOpen, setIsModalOpen] = useState(false); // State để kiểm tra modal có mở hay không
  const [errors, setErrors] = useState({ name: false, email: false }); // Trạng thái lỗi cho các trường bắt buộc

  // Hàm xử lý dữ liệu khi người dùng nhập vào form
  const handleData = (key: keyof FormData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Hàm xử lý thay đổi tệp hình ảnh
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
    }
  };

  // Hàm để tạo URL Blob từ file hình ảnh
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImageUrl(objectUrl);

      // Clean up URL khi hình ảnh bị thay đổi hoặc component bị unmount
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  // Hàm xử lý kiểm tra dữ liệu hợp lệ trước khi gửi
  const validateForm = () => {
    const newErrors = {
      name: !data.name.trim(),
      email: !data.email.trim(),
    };
    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return !Object.values(newErrors).includes(true);
  };

  // Hàm xử lý logic khi nhấn nút "Create"
  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    // Xử lý logic gửi dữ liệu
    console.log("Form submitted", data, image);
  };

  // Hàm mở modal khi click vào hình ảnh
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full md:w-[400px] shadow-lg">
      <h1 className="font-semibold text-lg text-gray-800 mb-4">
        Create Category
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        {/* Input for Image */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-image"
            className="text-gray-600 text-sm font-medium"
          >
            Image <span className="text-red-500">*</span>
          </label>

          {/* Nút chọn ảnh */}
          <div
            className="border px-4 py-2 rounded-lg w-full text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex justify-center items-center"
            onClick={() => document.getElementById("category-image")?.click()}
          >
            <AiOutlineUpload className="mr-2 text-xl text-blue-500" />
            <span className="text-gray-600">Click to select an image</span>
          </div>

          {/* Thực tế là input file ẩn đi */}
          <input
            id="category-image"
            name="category-image"
            type="file"
            onChange={handleImageChange}
            className="hidden" // Ẩn input file
          />

          {/* Hiển thị ảnh thumbnail */}
          {imageUrl && (
            <div className="mt-3 flex justify-center">
              <Image
                src={imageUrl}
                alt="Selected"
                className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer"
                onClick={openModal} // Mở modal khi click vào ảnh
              />
            </div>
          )}
        </div>

        {/* Input for Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-name"
            className="text-gray-600 text-sm font-medium"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="category-name"
            name="category-name"
            type="text"
            placeholder="Enter Name"
            value={data.name}
            onChange={(e) => handleData("name", e.target.value)}
            className={`border px-4 py-2 rounded-lg w-full focus:outline-none ${
              errors.name
                ? "border-red-500"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">Name is required.</p>
          )}
        </div>

        {/* Input for Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-email"
            className="text-gray-600 text-sm font-medium"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="category-email"
            name="category-email"
            type="email"
            value={data.email}
            onChange={(e) => handleData("email", e.target.value)}
            placeholder="Enter email"
            className={`border px-4 py-2 rounded-lg w-full focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">Email is required.</p>
          )}
        </div>

        {/* Submit Button */}
        <Button color="primary" type="submit" className="mt-4 w-full">
          Create
        </Button>
      </form>

      {/* Modal for viewing larger image */}
      <ImageModal
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        onClose={closeModal} // Sử dụng hàm đóng modal
      />
    </div>
  );
}
