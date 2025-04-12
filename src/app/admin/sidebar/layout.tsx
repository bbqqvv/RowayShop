"use client";
// src/app/admin/sidebar/layout.tsx
import { ReactNode, useState } from "react";
import Sidebar from "./page";
import Header from "./components/Header";
import { LayoutProps } from "./components/types";



// Define the component and use the LayoutProps for typing
const AdminLayout = ({ children, title }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 z-20">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={toggleSidebar} />
          <div className="fixed inset-y-0 z-40 lg:hidden">
            <Sidebar closeSidebar={() => setIsSidebarOpen(false)} isMobile />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:pl-[260px]">
        <Header
          toggleSidebar={toggleSidebar}
          title={title}
          className="lg:pl-6"
        />

        <main className="p-4 md:p-6">
          <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Export the component as default
export default AdminLayout;
