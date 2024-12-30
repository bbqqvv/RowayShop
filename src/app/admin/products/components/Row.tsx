"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Delete, Edit2 } from "lucide-react";
import ImageModal from "@/components/features/ImageModal";

// Define the product type
interface Product {
  id: number;
  name: string;
  mainImageUrl: string;
  price: number;
  salePrice: number;
  stock: number;
  orders: number | null;
  isFeatured: boolean;
}

interface RowProps {
  item: Product;
  index: number;
  onUpdate: (id: number) => void; // Hàm cập nhật
  onDelete: (id: number) => void; // Hàm xóa
}

export default function Row({ item, index, onUpdate, onDelete }: RowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý trạng thái modal

  const handleUpdate = () => {
    onUpdate(item.id); // Gọi hàm cập nhật khi người dùng nhấn nút sửa
  };

  const handleDelete = () => {
    onDelete(item.id); // Gọi hàm xóa khi người dùng nhấn nút xóa
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Mở modal khi người dùng nhấn vào ảnh
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal khi người dùng nhấn nút đóng
  };

  return (
    <>
      <tr>
        <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
          {index}
        </td>
        <td className="border-y bg-white px-3 py-2 text-center">
          <div className="flex justify-center">
            <img
              className="h-10 w-10 object-cover cursor-pointer"
              src={item.mainImageUrl}
              alt={item.name}
              onClick={handleImageClick} // Khi nhấn vào ảnh sẽ mở modal
            />
          </div>
        </td>
        <td className="border-y bg-white px-3 py-2">{item.name}</td>
        <td className="border-y bg-white px-3 py-2">
          <span className="text-xs text-gray-500 line-through">
            VND {item.price}
          </span>
          VND {item.salePrice}
        </td>
        <td className="border-y bg-white px-3 py-2">{item.stock}</td>
        <td className="border-y bg-white px-3 py-2">{item.orders ?? 0}</td>
        <td className="border-y bg-white px-3 py-2">
          <div className="flex">
            {item.stock - (item.orders ?? 0) > 0 ? (
              <div className="px-2 py-1 text-xs text-green-500 bg-green-100 font-bold rounded-md">
                Available
              </div>
            ) : (
              <div className="px-2 py-1 text-xs text-red-500 bg-red-100 rounded-md">
                Out Of Stock
              </div>
            )}
          </div>
        </td>
        <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
          <div className="flex gap-2 items-center">
            <Button onClick={handleUpdate} isIconOnly size="sm">
              <Edit2 size={13} />
            </Button>
            <Button onClick={handleDelete} isIconOnly size="sm">
              <Delete size={13} />
            </Button>
          </div>
        </td>
      </tr>

      {/* Hiển thị modal nếu isModalOpen là true */}
      <ImageModal
        imageUrl={item.mainImageUrl}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
