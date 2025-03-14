"use client";

import { Menu } from "lucide-react";

// Khai báo kiểu dữ liệu cho props Header
interface HeaderProps {
  toggleSidebar: () => void; // Khai báo kiểu của prop
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3 z-50">
      <div className="flex justify-center items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </section>
  );
}
