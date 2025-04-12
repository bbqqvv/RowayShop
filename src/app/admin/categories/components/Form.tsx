"use client";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineUpload } from "react-icons/ai";
import { useCategories } from "@/hooks/categories/useCategories";
import ImageModal from "@/components/features/ImageModal";
import SizeModal from "@/components/features/SizeModal";
import Image from 'next/image';
import type { CategoryResponse } from "types/category/category-response.type";

interface CategoryFormProps {
  selectedCategory: CategoryResponse | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CategoryForm({
  selectedCategory,
  onSuccess,
  onCancel
}: CategoryFormProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sizes: [] as string[],
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [modals, setModals] = useState({
    size: false,
    image: false,
  });

  const {
    createNewCategory,
    updateExistingCategory,
    loading,
  } = useCategories();

  // Initialize form when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        name: selectedCategory.name,
        slug: selectedCategory.slug,
        sizes: selectedCategory.sizes?.map(size => size.name) || [],
        image: null,
      });
      setImagePreview(selectedCategory.image || null);
    } else {
      resetForm();
    }
  }, [selectedCategory]);

  // Handle form input changes
  const handleInputChange = (field: keyof typeof formData) =>
    (value: string | string[] | File | null) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear status when user makes changes
      if (status) setStatus(null);
    };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      handleInputChange('image')(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle size updates from modal
  const handleSizeUpdate = (sizes: string[]) => {
    handleInputChange('sizes')(sizes);
    toggleModal('size')();
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.slug) {
      setStatus({ message: "Name and slug are required", type: 'error' });
      return;
    }

    // Prepare form data
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("slug", formData.slug);
    formData.sizes.forEach(size => payload.append("sizes[]", size));
    if (formData.image) payload.append("image", formData.image);

    try {
      if (selectedCategory) {
        await updateExistingCategory(selectedCategory.id, payload);
        setStatus({ message: "Category updated successfully", type: 'success' });
      } else {
        await createNewCategory(payload);
        setStatus({ message: "Category created successfully", type: 'success' });
        resetForm();
      }
      onSuccess?.();
    } catch {
      setStatus({
        message: "An error occurred",
        type: 'error'
      });
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      sizes: [],
      image: null
    });
    setImagePreview(null);
    setStatus(null);
  };

  // Toggle modal visibility
  const toggleModal = (modal: keyof typeof modals) => () => {
    setModals(prev => ({
      ...prev,
      [modal]: !prev[modal]
    }));
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full md:w-[400px] shadow-lg">
      <h1 className="font-semibold text-lg text-gray-800 mb-4">
        {selectedCategory ? "Update Category" : "Create Category"}
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Image {!selectedCategory && <span className="text-red-500">*</span>}
          </label>
          <div
            className="border px-4 py-2 rounded-lg w-full text-center cursor-pointer bg-gray-100 hover:bg-gray-200 flex justify-center items-center"
            onClick={() => document.getElementById("category-image")?.click()}
          >
            <AiOutlineUpload className="mr-2 text-xl text-blue-500" />
            <span className="text-gray-600">
              {formData.image || imagePreview ? "Change Image" : "Click to select an image"}
            </span>
          </div>
          <input
            id="category-image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {(imagePreview || selectedCategory?.image) && (
            <div className="mt-3 flex justify-center">
              <Image
                src={imagePreview || selectedCategory?.image || ""}
                alt="Category preview"
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer"
                onClick={toggleModal('image')}
                onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
              />
            </div>
          )}
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(e) => handleInputChange('name')(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Slug Input */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter URL-friendly slug"
            value={formData.slug}
            onChange={(e) => handleInputChange('slug')(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Size Management */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">Sizes</label>
          <button
            type="button"
            onClick={toggleModal('size')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {formData.sizes.length > 0
              ? `Manage Sizes (${formData.sizes.length})`
              : "Add Sizes"}
          </button>
          {formData.sizes.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {formData.sizes.map((size) => (
                <span
                  key={size}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 mt-4">
          {onCancel && (
            <Button
              type="button"
              className="flex-1"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            color="primary"
            className="flex-1"
            disabled={loading}
            isLoading={loading}
          >
            {selectedCategory ? "Update" : "Create"}
          </Button>
        </div>
      </form>

      {/* Status Message */}
      {status && (
        <div className={`mt-4 text-sm font-medium ${status.type === 'error' ? 'text-red-500' : 'text-green-500'
          }`}>
          {status.message}
        </div>
      )}

      {/* Modals */}
      <SizeModal
        isOpen={modals.size}
        onClose={toggleModal('size')}
        onSave={handleSizeUpdate}
        initialSizes={formData.sizes}
      />

      <ImageModal
        imageUrl={imagePreview || selectedCategory?.image || ""}
        isOpen={modals.image}
        onClose={toggleModal('image')}
      />
    </div>
  );
}