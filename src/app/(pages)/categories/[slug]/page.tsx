"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Importing Lucide icons
import Pagination from "@/components/shared/Pagination";
import Filter from "./components/Filter";
import ProductList from "./components/ProductList";

interface PageProps {
  params: Promise<{ slug: string }>; 
}

export default function Page({ params }: PageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      console.log("Resolved params:", resolvedParams); 
      setSlug(resolvedParams.slug);
    };
    fetchParams();
  }, [params]);

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập loading
    setCurrentPage(page);
    setLoading(false);
  };

  const toggleFilter = () => setShowFilter((prev) => !prev);

  return (
    <main className="">
      <div className="flex flex-col lg:flex-row container mx-auto px-4">
        {/* Sidebar Filter (Hidden on mobile and shown on large screens) */}
        <div
          className={`w-full lg:w-1/4 mt-2 lg:mt-0 ${
            showFilter ? "block" : "hidden"
          } lg:block`}
        >
          <Filter />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          ) : (
            slug && (
              <ProductList slug={slug} /> // Truyền slug vào ProductList
            )
          )}

          {/* Mobile Toggle Button (Sticky on mobile, Hidden on large screens) */}
          <button
            onClick={toggleFilter}
            className="lg:hidden fixed top-20 right-4 z-50 p-3 text-black hover:text-gray-700 bg-white rounded-full shadow-md"
          >
            {showFilter ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Pagination
            currentPage={currentPage}
            totalPages={10} // You can get totalPages from the API response
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
