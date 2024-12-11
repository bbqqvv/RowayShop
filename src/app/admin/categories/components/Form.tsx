"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { AiOutlineUpload } from "react-icons/ai";
import { useCategories } from "@/hooks/categories/useCategories";
import ImageModal from "@/components/features/ImageModal";
import { Category } from "../../types/Category";

interface FormData {
  name: string;
  slug: string;
}

interface FormProps {
  selectedCategory: Category | null; // Nhận thông tin category cần chỉnh sửa
}

export default function Form({ selectedCategory }: FormProps) {
  const [data, setData] = useState<FormData>({ name: "", slug: "" });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { createNewCategory, updateExistingCategory, loading, error } =
    useCategories();

  useEffect(() => {
    if (selectedCategory) {
      setData({ name: selectedCategory.name, slug: selectedCategory.slug });
      setImageUrl(selectedCategory.image || null); // Hiển thị ảnh hiện tại nếu có
    }
  }, [selectedCategory]);

  const handleDataChange = (key: keyof FormData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setMessage(null); // Clear error message if any
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!data.name && !data.slug && !image) {
      setMessage("Please update at least one field.");
      return;
    }

    const formData = new FormData();
    if (data.name) formData.append("name", data.name); // Chỉ thêm khi có giá trị
    if (data.slug) formData.append("slug", data.slug); // Chỉ thêm khi có giá trị
    if (image) formData.append("image", image); // Chỉ thêm khi có giá trị

    try {
      if (selectedCategory) {
        // Nếu đang ở chế độ cập nhật
        await updateExistingCategory(selectedCategory.id, formData); // Gửi các trường đã thay đổi
        setMessage("Category updated successfully!");
      } else {
        // Nếu đang ở chế độ tạo mới
        await createNewCategory(formData);
        setMessage("Category created successfully!");
      }

      // Reset lại form sau khi hoàn tất
      setData({ name: "", slug: "" });
      setImage(null);
      setImageUrl(null);
    } catch {
      setMessage(
        error || "An error occurred while creating/updating the category."
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full md:w-[400px] shadow-lg">
      <h1 className="font-semibold text-lg text-gray-800 mb-4">
        {selectedCategory ? "Update Category" : "Create Category"}
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateOrUpdate();
        }}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-image"
            className="text-gray-600 text-sm font-medium"
          >
            Image <span className="text-red-500">*</span>
          </label>
          <div
            className="border px-4 py-2 rounded-lg w-full text-center cursor-pointer bg-gray-100 hover:bg-gray-200 flex justify-center items-center"
            onClick={() => document.getElementById("category-image")?.click()}
          >
            <AiOutlineUpload className="mr-2 text-xl text-blue-500" />
            <span className="text-gray-600">
              {image ? "Change Image" : "Click to select an image"}
            </span>
          </div>
          <input
            id="category-image"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          {imageUrl && (
            <div className="mt-3 flex justify-center">
              <img
                src={imageUrl}
                alt="Selected"
                className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer"
                onClick={openModal}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-name"
            className="text-gray-600 text-sm font-medium"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="category-name"
            type="text"
            placeholder="Enter the category name (e.g., Clothes)"
            value={data.name}
            onChange={(e) => handleDataChange("name", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-slug"
            className="text-gray-600 text-sm font-medium"
          >
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="category-slug"
            type="text"
            placeholder="Enter the category slug (e.g., clothes)"
            value={data.slug}
            onChange={(e) => handleDataChange("slug", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        <Button
          color="primary"
          type="submit"
          className="mt-4 w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Spinner size="sm" className="mr-2" /> : null}
          {loading ? "Saving..." : selectedCategory ? "Update" : "Create"}
        </Button>
      </form>

      {message && (
        <div
          className={`mt-4 text-sm font-medium ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </div>
      )}

      {isModalOpen && imageUrl && (
        <ImageModal
          imageUrl={imageUrl}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
