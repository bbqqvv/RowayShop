"use client";
import { useState } from "react";
import WarrantyPolicy from "./WarrantyPolicy";
import Reviews from "./Reviews";

interface ProductDescriptionProps {
  product: Product; // Dữ liệu product từ component cha, chứa description
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [activeTab, setActiveTab] = useState<string>("description");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (!product.data.description) {
    return (
      <p className="text-center text-red-500 mt-10">Description not found.</p>
    );
  }

  // Loại bỏ các thẻ span có background color và chỉ giữ lại phần text
  const cleanDescription = product.data.description.replace(
    /<span[^>]*>|<\/span>/g,
    ""
  );

  return (
    <div className="wrapper-description font-barlo rounded-lg p-6">
      <div className="w-full max-w-5xl mx-auto">
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
              activeTab === "warranty"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => handleTabClick("warranty")}
          >
            <h3 className="text-lg font-medium transition duration-300">
              Chính sách bảo hành
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

        {activeTab === "description" && (
          <div
            className="description-content"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />
        )}
        {activeTab === "warranty" && <WarrantyPolicy />}
        {activeTab === "reviews" && <Reviews />}
      </div>
    </div>
  );
};

export default ProductDescription;
