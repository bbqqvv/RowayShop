"use client";

import { useState } from "react";

export default function HeaderMenu() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý tìm kiếm, có thể redirect hoặc gọi API
    if (searchQuery.trim()) {
      console.log("Tìm kiếm với từ khóa:", searchQuery);
    }
  };

  return (
    <div className="flex gap-4 items-center font-semibold">
      <form onSubmit={handleSearchSubmit} className="flex items-center border rounded-full overflow-hidden w-full max-w-4xl">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm..."
          className="px-6 py-2 w-full sm:w-[300px] md:w-[500px] lg:w-[600px] outline-none" // Responsive width
        />
      </form>
    </div>
  );
}
