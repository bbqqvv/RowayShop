"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  ShoppingCart,
  Settings,
  User,
  LogOut,
  PackageOpen,
  MessageCircleHeart,
  ClipboardList,
  SquarePlus,
  Bolt,
  TicketCheck,
  UsersRound,
  Barcode,
  LayoutGrid,
  BringToFront,
  HandCoins,
  ChartBarStacked,
  ScanLine,
  Puzzle,
  ReceiptText,
  MessageSquareText,
  Mail,
  Calendar,
  CheckCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { useMemo } from "react";
import { MenuGroup, SidebarProps } from "./components/types";
import MenuGroupComponent from "./components/MenuGroup";

export default function Sidebar({ closeSidebar, isMobile = false }: SidebarProps) {
  const { logout } = useAuthContext();
  const router = useRouter();

  const menuGroups = useMemo<MenuGroup[]>(() => [
    {
      title: "CHUNG",
      items: [
        {
          name: "Trang chủ",
          link: "/admin",
          icon: <LayoutDashboard className="size-5" />,
        },
        {
          name: "Sản phẩm",
          icon: <PackageOpen className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/products/list-products", icon: <ClipboardList className="size-4" /> },
            { name: "Lưới sản phẩm", link: "/admin/products/grid-products", icon: <LayoutGrid className="size-4" /> },
            { name: "Chi tiết", link: "/admin/products/detail-products", icon: <Barcode className="size-4" /> },
            { name: "Chỉnh sửa", link: "/admin/products/edit-products", icon: <Bolt className="size-4" /> },
            { name: "Tạo mới", link: "/admin/products/create-products", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Danh mục",
          icon: <ChartBarStacked className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/categories/list-categories", icon: <ClipboardList className="size-4" /> },
            { name: "Chỉnh sửa", link: "/admin/categories/edit-categories", icon: <Bolt className="size-4" /> },
            { name: "Tạo mới", link: "/admin/categories/create-categories", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Đặt hàng",
          icon: <ShoppingCart className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/orders", icon: <ClipboardList className="size-4" /> },
            { name: "Chi tiết", link: "/admin/orders/detail-orders", icon: <Barcode className="size-4" /> },
          ],
        },
        {
          name: "Mua sắm",
          icon: <ScanLine className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/purchase-list", icon: <ClipboardList className="size-4" /> },
            { name: "Đơn hàng", link: "/admin/shopping/purchase-order", icon: <BringToFront className="size-4" /> },
            { name: "Hoàn tiền", link: "/admin/shopping/purchase-returns", icon: <HandCoins className="size-4" /> },
          ],
        },
        {
          name: "Thuộc tính",
          icon: <Puzzle className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/attributes", icon: <ClipboardList className="size-4" /> },
            { name: "Chỉnh sửa", link: "/admin/attributes/edit-attributes", icon: <Bolt className="size-4" /> },
            { name: "Tạo mới", link: "/admin/attributes/create-attributes", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Hóa đơn",
          icon: <ReceiptText className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/invoices", icon: <ClipboardList className="size-4" /> },
            { name: "Chi tiết", link: "/admin/invoices/detail-invoices", icon: <Barcode className="size-4" /> },
            { name: "Tạo mới", link: "/admin/invoices/create-invoices", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Cài đặt",
          link: "/admin/settings",
          icon: <Settings className="size-5" />,
        },
      ],
    },
    {
      title: "NGƯỜI DÙNG",
      items: [
        {
          name: "Vai trò",
          icon: <User className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/roles", icon: <ClipboardList className="size-4" /> },
            { name: "Chỉnh sửa", link: "/admin/roles/edit-roles", icon: <Bolt className="size-4" /> },
            { name: "Tạo mới", link: "/admin/roles/create-roles", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Khách hàng",
          icon: <UsersRound className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/customer", icon: <ClipboardList className="size-4" /> },
            { name: "Chi tiết", link: "/admin/roles/customer-detail", icon: <Barcode className="size-4" /> },
          ],
        },
      ],
    },
    {
      title: "KHÁC",
      items: [

        {
          name: "Phiếu giảm giá",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Danh sách", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Tạo mới", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        { name: "Đánh giá", link: "/admin/reviews", icon: <MessageCircleHeart className="size-5" /> },

      ],
    },
    {
      title: "ỨNG DỤNG KHÁC",
      items: [
        { name: "Trò chuyện", link: "/admin/chat", icon: <MessageSquareText className="size-5" /> },
        { name: "Email", link: "/admin/email", icon: <Mail className="size-5" /> },
        { name: "Lịch", link: "/admin/calendar", icon: <Calendar className="size-5" /> },
        { name: "Cần làm", link: "/admin/todo", icon: <CheckCheck className="size-5" /> },
      ],
    },
    {
      title: "ỨNG DỤNG KHÁC",
      items: [
        { name: "Trò chuyện", link: "/admin/chat", icon: <MessageSquareText className="size-5" /> },
        { name: "Email", link: "/admin/email", icon: <Mail className="size-5" /> },
        { name: "Lịch", link: "/admin/calendar", icon: <Calendar className="size-5" /> },
        { name: "Cần làm", link: "/admin/todo", icon: <CheckCheck className="size-5" /> },
      ],
    },
    {
      title: "CUSTOM",
      items: [
        {
          name: "Trang",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Chào mừng", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Coming soon", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Mốc thời gian", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Bảo trì", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Lỗi 404", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Lỗi 404 (alt)", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Xác thực",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Đăng nhập", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Đăng ký", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Đặt lại mật khẩu", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Khóa màn hình", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
      ],
    },
    {
      title: "CÁC THÀNH PHẦN",
      items: [
        {
          name: "UI Cơ bản",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Chào mừng", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Coming soon", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Mốc thời gian", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Bảo trì", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Lỗi 404", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Lỗi 404 (alt)", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "UI nâng cao",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Đăng nhập", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Đăng ký", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Đặt lại mật khẩu", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Khóa màn hình", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Biểu đồ",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Đăng nhập", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Đăng ký", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Đặt lại mật khẩu", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Khóa màn hình", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Forms",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Đăng nhập", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Đăng ký", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Đặt lại mật khẩu", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
            { name: "Khóa màn hình", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Bảng",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Bảng cơ bản", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Grid Js", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Icons",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Boxicons", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Solar Icons", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
        {
          name: "Bản đồ",
          icon: <TicketCheck className="size-5" />,
          subItems: [
            { name: "Bản đồ google", link: "/admin/coupons", icon: <ClipboardList className="size-4" /> },
            { name: "Bản đồ vector", link: "/admin/coupons/create-coupons", icon: <SquarePlus className="size-4" /> },
          ],
        },
      ],
    },
  ], []);

  return (
    <aside className={`flex flex-col bg-white border-r h-screen w-[260px] shadow-md ${isMobile ? "fixed z-40" : "sticky top-0"}`}>
      {/* Logo */}
      <div className="px-5 pt-4 pb-2">
        <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded block" aria-label="Trang chủ">
          <Image
            height={40}
            width={160}
            src="/logo.png"
            alt="Company Logo"
            className="hover:opacity-90 transition-opacity mx-auto"
            priority
          />
        </Link>
      </div>

      {/* Menu Groups */}
      <div className="flex-1 overflow-y-auto py-2 px-3">
        {menuGroups.map((group) => (
          <MenuGroupComponent
            key={group.title}
            group={group}
            closeSidebar={closeSidebar}
          />
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-5 py-4 border-t">
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 font-medium transition-all duration-300 w-full"
          onClick={async () => {
            try {
              await logout();
              router.push("/login");
              toast.success("Logged out successfully!");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Logout failed. Please try again.");
            }
          }}
          aria-label="Logout"
        >
          <LogOut className="size-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}