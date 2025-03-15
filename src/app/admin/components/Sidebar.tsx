"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import {
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import router from "next/router";
import toast from "react-hot-toast"; // Thêm toast để hiển thị thông báo
import Image from 'next/image';

// Khai báo kiểu dữ liệu cho menu item
interface MenuItem {
  name: string;
  link: string;
  icon: JSX.Element;
}

interface SidebarProps {
  closeSidebar?: () => void; // Thêm prop để đóng sidebar cho mobile
}

export default function Sidebar({ closeSidebar }: SidebarProps) {
  const { logout } = useAuthContext(); // Lấy hàm logout từ context

  const menuList: MenuItem[] = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 className="h-5 w-5" />,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Collections",
      link: "/admin/collections",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      name: "Admins",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="sticky top-0 flex flex-col gap-8 bg-white border-r px-5 py-4 h-screen w-[260px] shadow-md">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Link href="/">
          <Image height={180} width= {180} src="/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {menuList.map((item, index) => (
          <Tab item={item} key={index} />
        ))}
      </ul>

      {/* Logout Button */}
      <button
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 font-medium transition-all duration-300"
        onClick={async () => {
          try {
            // Gọi hàm logout từ context để thực hiện logout
            logout();
            // Có thể chuyển hướng người dùng về trang login hoặc trang chủ sau khi logout
            router.push("/login"); // Hoặc có thể dùng router.push("/login") nếu dùng next.js router
            toast.success("Successfully logged out!");
          } catch (error) {
            toast.error(error instanceof Error? error.message: "Error logging out. Please try again.");
          }
        }}
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}

// Component Tab
function Tab({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const isSelected = pathname === item.link;

  return (
    <li
      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-base transition-all duration-300
        ${
          isSelected
            ? "bg-blue-100 text-blue-600 shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
        }
      `}
    >
      <Link href={item.link} className="flex items-center gap-3 w-full">
        {item.icon}
        <span>{item.name}</span>
      </Link>
    </li>
  );
}
