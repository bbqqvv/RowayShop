import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { useCategories } from "@/hooks/categories/useCategories";
import { Category } from "../../../../types/Category";
import ImageModal from "@/components/features/ImageModal";

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

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteExistingCategory(id);
    }
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <main className="bg-white p-6 rounded-xl flex flex-col gap-6 shadow-lg flex-1">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">List Categories</h1>
      </div>

      {loading && (
        <div className="text-center text-blue-500">
          <Spinner size="lg" /> Fetching categories...
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {message && <div className="text-green-500 text-center">{message}</div>}

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
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-10 w-10 rounded-md object-cover cursor-pointer"
                      onClick={() => openModal(category.image)} // Open modal on click
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

      {/* Render ImageModal with selected image */}
      <ImageModal
        imageUrl={selectedImage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}
