import React, { memo } from "react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = memo(
  ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers: (string | number)[] = [];
    const maxVisiblePages = 2;

    // Generate the list of page numbers to display
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - maxVisiblePages &&
          i <= currentPage + maxVisiblePages)
      ) {
        pageNumbers.push(i);
      } else if (
        (i === currentPage - maxVisiblePages - 1 ||
          i === currentPage + maxVisiblePages + 1) &&
        !pageNumbers.includes("...")
      ) {
        pageNumbers.push("...");
      }
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between w-full py-4 border-t mt-4">
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(
            "px-4 py-2 border rounded-md transition",
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-700",
            "hidden sm:inline-block" // Hidden on mobile (small screens)
          )}
        >
          ← Previous
        </button>

        {/* Page Number List */}
        <div className="flex flex-wrap items-center justify-center space-x-2 mt-2 sm:mt-0">
          {pageNumbers.map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={clsx(
                  "px-4 py-2 border rounded-md transition",
                  page === currentPage
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 text-gray-500">
                {page}
              </span>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={clsx(
            "px-4 py-2 border rounded-md transition",
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-700",
            "hidden sm:inline-block" // Hidden on mobile (small screens)
          )}
        >
          Next →
        </button>
      </div>
    );
  }
);
Pagination.displayName = "Pagination"; // ✅ Thêm displayName
export default Pagination;
