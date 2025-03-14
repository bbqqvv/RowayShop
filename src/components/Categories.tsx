"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/categories/useCategories";
import Link from "next/link";
import Image from 'next/image';

export default function Categories() {
  const { categories, loading, error, fetchCategories } = useCategories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    fetchCategories();
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const updateVisibleItems = () => {
    if (window.innerWidth >= 1024) {
      setVisibleItems(5);
    } else if (window.innerWidth >= 768) {
      setVisibleItems(3);
    } else {
      setVisibleItems(1); // Nếu có 1 danh mục, hiển thị toàn bộ
    }
  };

  const maxIndex = Math.max(0, categories.length - visibleItems);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mua sắm theo danh mục</h1>
        <p className="text-sm text-gray-500">Khám phá các danh mục cao cấp của chúng tôi</p>
      </div>

      {/* Kiểm tra nếu chỉ có 1 danh mục */}
      {categories.length === 1 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={categories[0]?.image || "/default-category.jpg"}
                  alt={categories[0]?.name || "Danh mục"}
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                />
              </div>
              {/* Category Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{categories[0].name}</h2>
                <Link
                  href={`/categories/${categories[0].slug}`}
                  className="mt-auto bg-gray-900 text-white px-4 py-2 rounded-full text-center hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                >
                  Xem thêm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Slider */
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              width: `${categories.length * (100 / visibleItems)}%`,
            }}
          >
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0 p-2" style={{ width: `${100 / visibleItems}%` }}>
                <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full border border-gray-200">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={category.image || "/default-category.jpg"}
                      alt={category.name || "Category"}
                      width={400} // Tuỳ chỉnh kích thước phù hợp
                      height={192} // Tương ứng với h-48 (48 * 4 = 192)
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      priority
                      onError={(e) => (e.currentTarget.src = "/default-category.jpg")}
                    />

                  </div>

                  {/* Category Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h2>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="mt-auto bg-gray-900 text-white px-4 py-2 rounded-full text-center hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      Xem thêm
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {categories.length > visibleItems && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
