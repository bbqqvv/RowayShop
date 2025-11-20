"use client";

import { useEffect, useRef, useState } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategorySkeleton from "./categories/CategorySkeleton";

export default function Categories() {
  const { categories, fetchCategories } = useCategories();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (categories.length === 0) {
        await fetchCategories();
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [categories]);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const showArrows = categories.length > 5;

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    setTimeout(checkScrollButtons, 300);
  };

  return (
    <section className="py-10 relative max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Danh Mục Sản Phẩm</h2>

      {/* Navigation Arrows - với indicator */}
      {showArrows && (
        <>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${canScrollLeft
                ? "bg-white hover:bg-gray-50 hover:scale-110"
                : "bg-gray-100 opacity-50 cursor-not-allowed"
              }`}
            aria-label="Scroll Left"
          >
            <ChevronLeft className={`w-6 h-6 ${canScrollLeft ? "text-gray-900" : "text-gray-400"}`} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${canScrollRight
                ? "bg-white hover:bg-gray-50 hover:scale-110"
                : "bg-gray-100 opacity-50 cursor-not-allowed"
              }`}
            aria-label="Scroll Right"
          >
            <ChevronRight className={`w-6 h-6 ${canScrollRight ? "text-gray-900" : "text-gray-400"}`} />
          </button>
        </>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex overflow-x-auto scroll-smooth px-4 gap-3 hide-scrollbar"
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => <CategorySkeleton key={index} />)
        ) : (
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex gap-4 flex-shrink-0 items-center justify-between bg-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-lg transition w-60 lg:w-[calc(20%-0.6rem)]"
            >
              {/* Text & Button - Left */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-3 truncate">{category.name}</h3>
                <button className="px-4 py-1.5 bg-white border border-gray-900 rounded-full text-xs text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition whitespace-nowrap">
                  Xem thêm
                </button>
              </div>

              {/* Image - Right */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <Image
                  src={category.image || "/default-category.jpg"}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}