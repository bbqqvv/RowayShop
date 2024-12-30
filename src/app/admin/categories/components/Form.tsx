"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { AiOutlineUpload } from "react-icons/ai";
import { useCategories } from "@/hooks/categories/useCategories";
import ImageModal from "@/components/features/ImageModal";
import { Category } from "../../../../types/Category";
import SizeModal from "@/components/features/SizeModal";

interface FormData {
  name: string;
  slug: string;
  sizes?: string[]; // Update to array type
}

interface FormProps {
  selectedCategory: Category | null; // Category to edit
}

export default function Form({ selectedCategory }: FormProps) {
  const [data, setData] = useState<FormData>({ name: "", slug: "", sizes: [] });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const { createNewCategory, updateExistingCategory, loading, error } =
    useCategories();

  useEffect(() => {
    if (selectedCategory) {
      setData({
        name: selectedCategory.name,
        slug: selectedCategory.slug,
        sizes: selectedCategory.sizes || [],
      });
      setImageUrl(selectedCategory.image || null);
    }
  }, [selectedCategory]);

  const handleDataChange = (key: keyof FormData, value: string | string[]) => {
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
      setMessage(null);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!data.name || !data.slug) {
      setMessage("Name and slug are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    if (image) formData.append("image", image);
    if (data.sizes?.length) formData.append("sizes", JSON.stringify(data.sizes));

    try {
      if (selectedCategory) {
        await updateExistingCategory(selectedCategory.id, formData);
        setMessage("Category updated successfully!");
      } else {
        await createNewCategory(formData);
        setMessage("Category created successfully!");
      }
      setData({ name: "", slug: "", sizes: [] });
      setImage(null);
      setImageUrl(null);
    } catch {
      setMessage(error || "An error occurred.");
    }
  };

  const openSizeModal = () => setIsSizeModalOpen(true);
  const closeSizeModal = () => setIsSizeModalOpen(false);
  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

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
        {/* Image Upload */}
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
                onClick={openImageModal}
              />
            </div>
          )}
        </div>

        {/* Name Input */}
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

        {/* Slug Input */}
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

        {/* Size Input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-sizes"
            className="text-gray-600 text-sm font-medium"
          >
            Sizes
          </label>
          <button
            type="button"
            onClick={openSizeModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {data.sizes?.length
              ? `Manage Sizes (${data.sizes.length})`
              : "Add Sizes"}
          </button>
          <div className="mt-2 flex gap-2 flex-wrap">
            {data.sizes?.map((size) => (
              <span
                key={size}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
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

      {/* Size Modal */}
      <SizeModal
        isOpen={isSizeModalOpen}
        onClose={closeSizeModal}
        onSave={(sizes) => handleDataChange("sizes", sizes)}
        initialSizes={data.sizes || []}
      />

      {/* Image Modal */}
      {imageUrl && (
        <ImageModal
          imageUrl={imageUrl}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
        />
      )}
    </div>
  );
}
