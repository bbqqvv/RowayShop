"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/categories/useCategories";
import Link from "next/link";

export default function Categories() {
  const { categories, loading, error, fetchCategories } = useCategories(); // Lấy dữ liệu danh mục từ API
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  // Cập nhật số phần tử hiển thị dựa trên kích thước màn hình
  const updateVisibleItems = () => {
    if (window.innerWidth >= 1024) {
      setVisibleItems(5); // Desktop
    } else if (window.innerWidth >= 768) {
      setVisibleItems(3); // Tablet
    } else {
      setVisibleItems(2); // Mobile
    }
  };

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    fetchCategories(); // Fetch categories khi component mount
    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, [fetchCategories]);

  const maxIndex = Math.ceil(categories.length / visibleItems);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % maxIndex);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang fetch
  }

  if (error) {
    return <div>Error: {error}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mua sắm theo danh mục</h1>
        <p className="text-sm text-gray-500">Khám phá các danh mục cao cấp của chúng tôi</p>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        {/* Categories Container */}
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            width: `${categories.length * (100 / visibleItems)}%`,
            justifyContent:
              categories.length <= visibleItems ? "center" : "flex-start", // Căn giữa nếu số lượng danh mục ít
            gap: "16px", // Thêm khoảng cách giữa các phần tử
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="flex flex-col md:flex-row bg-[#F6F6F6] rounded-lg p-4 transition duration-200">
                {/* Tên và liên kết ở bên trái (dành cho màn hình lớn) */}
                <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
                  <h1 className="text-xl font-medium text-gray-800">
                    {category.name}
                  </h1>
                  <Link
                    href={`/categories/${category.slug}`}
                    passHref
                    className="bg-white rounded-full text-center font-bold mt-4 hover:bg-red-200"
                  >
                    See More
                    {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                  </Link>
                </div>

                {/* Ảnh ở bên phải (dành cho màn hình lớn) */}
                <div className="flex justify-center w-full md:w-1/2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều hướng */}
        {categories.length > visibleItems && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow hover:bg-gray-500 transition"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow hover:bg-gray-500 transition"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
