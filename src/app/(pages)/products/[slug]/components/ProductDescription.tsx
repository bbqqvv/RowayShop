"use client";
import { useState } from "react";
import Reviews from "./Reviews";
import { ProductResponse } from "types/product/product-response.types";

interface ProductDescriptionProps {
  product: ProductResponse; // Dữ liệu sản phẩm từ component cha
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [activeTab, setActiveTab] = useState<string>("description");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (!product.description) {
    return (
      <p className="text-center text-red-500 mt-10">Description not found.</p>
    );
  }

  // Loại bỏ các thẻ span có background color và chỉ giữ lại phần text
  const cleanDescription = product.description.replace(
    /<span[^>]*>|<\/span>/g,
    ""
  );

  return (
    <div className="wrapper-description font-barlo rounded-lg p-6">
      <div className="w-full max-w-5xl mx-auto">
        {/* Tabs chuyển đổi giữa Mô tả và Đánh giá */}
        <ul className="tabs flex justify-center space-x-10 border-b-2 border-gray-300 mb-4">
          <li
            className={`tab-link cursor-pointer pb-2 ${
              activeTab === "description"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => handleTabClick("description")}
          >
            <h3 className="text-lg font-medium transition duration-300">
              Mô tả
            </h3>
          </li>
          <li
            className={`tab-link cursor-pointer pb-2 ${
              activeTab === "reviews"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => handleTabClick("reviews")}
          >
            <h3 className="text-lg font-medium transition duration-300">
              Đánh giá
            </h3>
          </li>
        </ul>

        {/* Nội dung của từng tab */}
        {activeTab === "description" && (
          <div
            className="description-content text-gray-700 leading-7"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />
        )}
        {activeTab === "reviews" && <Reviews />}
      </div>
    </div>
  );
};

export default ProductDescription;
