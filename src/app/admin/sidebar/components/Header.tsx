"use client";

import { cn } from "@nextui-org/react";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  title?: string;
  className?: string;
}

export default function Header({ 
  toggleSidebar, 
  title = "Dashboard",
  className 
}: HeaderProps) {
  return (
    <header 
      className={cn(
        "sticky top-0 flex items-center gap-4 bg-white border-b px-6 py-3 z-30 shadow-sm",
        className
      )}
    >
      <button 
        onClick={toggleSidebar}
        className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
    </header>
  );
}