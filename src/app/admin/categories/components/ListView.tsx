"use client";
import { useState, useEffect, useCallback } from "react";
import { Spinner } from "@nextui-org/react";
import { useCategories } from "@/hooks/categories/useCategories";
import ImageModal from "@/components/features/ImageModal";
import Image from 'next/image';

interface ListViewProps {
  handleEdit: (category: Category) => void;
}

export default function ListView({ handleEdit }: ListViewProps) {
  const {
    categories,
    loading,
    error,
    message,
    fetchCategories,
    deleteExistingCategory,
  } = useCategories();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle delete category
  const handleDelete = useCallback(async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteExistingCategory(id);
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  }, [deleteExistingCategory]);

  // Open Image Modal
  const openModal = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  }, []);

  // Close Image Modal
  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setModalOpen(false);
  }, []);

  return (
    <main className="bg-white p-6 rounded-xl flex flex-col gap-6 shadow-lg flex-1">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">List Categories</h1>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center text-blue-500">
          <Spinner size="lg" /> Fetching categories...
        </div>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Success or Info Message */}
      {message && <div className="text-green-500 text-center">{message}</div>}

      {/* Categories Table */}
      {!loading && categories.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4">
                    <Image
                      src={category.image || "/default-image.jpg"}
                      alt={category.name || "Category"}
                      width={40} // 10 * 4 (h-10 w-10)
                      height={40} // 10 * 4 (h-10 w-10)
                      className="h-10 w-10 rounded-md object-cover cursor-pointer"
                      onClick={() => openModal(category.image)}
                      onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
                    />

                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <div className="text-center text-gray-500">No categories found.</div>
        )
      )}

      {/* Render Image Modal with selected image */}
      <ImageModal
        imageUrl={selectedImage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}