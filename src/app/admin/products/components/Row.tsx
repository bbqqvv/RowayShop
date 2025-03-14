"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Delete, Edit2 } from "lucide-react";
import ImageModal from "@/components/features/ImageModal";
import Image from 'next/image';

export default function Row({ item, index, onUpdate, onDelete }: RowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mở modal khi nhấn vào ảnh
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Tính tổng số lượng tồn kho
  const totalStock = item.variants?.[0]?.sizes?.reduce(
    (total: number, size: { stock: number }) => total + size.stock,
    0
  ) || 0;

  // Lấy giá sau giảm giá (nếu có)
  const priceAfterDiscount = item.variants?.[0]?.sizes?.[0]?.priceAfterDiscount;

  // Kiểm tra trạng thái tồn kho
  const isAvailable = totalStock > 0;

  return (
    <>
      <tr>
        {/* STT */}
        <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
          {index + 1}
        </td>

        {/* Hình ảnh */}
        <td className="border-y bg-white px-3 py-2 text-center">
          <div className="flex justify-center">
            {item.mainImageUrl && typeof item.mainImageUrl === "string" ? (
              <Image
                className="h-10 w-10 object-cover cursor-pointer"
                src={item.mainImageUrl}
                alt={item.name || "Product Image"}
                width={40} // Thêm width và height để tránh lỗi
                height={40}
                onClick={handleImageClick}
              />
            ) : (
              <div className="h-10 w-10 bg-gray-200 flex items-center justify-center">
                ❌
              </div>
            )}

          </div>
        </td>

        {/* Tên sản phẩm */}
        <td className="border-y bg-white px-3 py-2">{item.name}</td>

        {/* Giá sau giảm giá */}
        <td className="border-y bg-white px-3 py-2">
          {priceAfterDiscount
            ? `VND ${priceAfterDiscount.toLocaleString()}`
            : "N/A"}
        </td>

        {/* Tổng số lượng tồn kho */}
        <td className="border-y bg-white px-3 py-2">{totalStock}</td>

        {/* Đơn hàng (tạm thời hiển thị 0) */}
        <td className="border-y bg-white px-3 py-2">0</td>

        {/* Trạng thái tồn kho */}
        <td className="border-y bg-white px-3 py-2">
          <div className="flex">
            {isAvailable ? (
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

        {/* Hành động (Chỉnh sửa và Xóa) */}
        <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
          <div className="flex gap-2 items-center">
            <Button onClick={() => onUpdate(item.id)} isIconOnly size="sm">
              <Edit2 size={13} />
            </Button>
            <Button onClick={() => onDelete(item.id)} isIconOnly size="sm">
              <Delete size={13} />
            </Button>
          </div>
        </td>
      </tr>

      {/* Modal hiển thị hình ảnh lớn */}
      <ImageModal
        imageUrl={typeof item.mainImageUrl === 'string' ? item.mainImageUrl : null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}