import { ArrowRightIcon } from "lucide-react";
import React from "react";

interface ProductHighlightProps {
  setFilterType: (filter: string) => void;
}

const ProductHighlight: React.FC<ProductHighlightProps> = ({ setFilterType }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center rounded-lg p-5 gap-y-4">
      {/* Left Section */}
      <div className="text-center md:text-left">
        {/* Button */}
        <button className="bg-black text-red-500 px-4 py-2 rounded-full font-semibold">
          Kiểm tra sản phẩm
        </button>
        {/* Title */}
        <h2 className="text-2xl font-bold mt-2">
          Được chế tạo bằng vật liệu tuyệt vời
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 gap-y-2">
        {/* Best Seller Badge */}
        <button
          onClick={() => setFilterType("featured")}
          className="border border-gray-500 rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-200 transition"
        >
          Sản phẩm nổi bật
        </button>

        {/* Discount Section */}
        <button
          onClick={() => setFilterType("discount")}
          className="text-gray-500 text-sm hover:text-gray-800 transition"
        >
          Giảm giá
        </button>
      </div>
    </div>
  );
};

export default ProductHighlight;
