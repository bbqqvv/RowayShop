// AddToCartButton.tsx
import React from "react";
import { PackagePlus } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  onAddToCart: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  onAddToCart,
}) => {
  return (
    <button
      onClick={onAddToCart} // Xử lý thêm vào giỏ hàng
      className="w-1/3  mt-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition flex items-center justify-center"
    >
      <PackagePlus />
    </button>
  );
};

export default AddToCartButton;
