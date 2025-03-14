import React from "react";

const ProductHighlight: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-6">
      {/* Left Section */}
      <div>
        {/* Button */}
        <button className="bg-black  text-red-500 px-4 py-2 rounded-full font-semibold">
        Kiểm tra sản phẩm 
        </button>
        {/* Title */}
        <h2 className="text-2xl font-bold mt-2">Được chế tạo bằng vật liệu tuyệt vời</h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Best Seller Badge */}
        <div className="border border-gray-500 rounded-full px-4 py-1 text-sm font-medium">
          Best Seller
        </div>
        {/* Lorem Text */}
        <div className="flex space-x-4 text-gray-400 text-sm">
          <span>Lorem</span>
          <span>Lorem</span>
          <span>Lorem</span>
          <span>Lorem</span>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlight;
