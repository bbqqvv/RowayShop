"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  UserIcon,
  SearchIcon,
  MenuIcon,
  HeartIcon,
  XIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/auth/useAuth";
import router from "next/router";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const favourites = useSelector((state: RootState) => state.favourites.favourites);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuthContext();
  const { token } = useAuth();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isSearchOpen ? "hidden" : "auto";
  }, [isMenuOpen, isSearchOpen]);

  const cartCount = cart?.length || 0;
  const favouriteCount = favourites?.length || 0;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeAll = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-sm py-2 text-center">
        Miễn phí vận chuyển cho đơn hàng từ 499K 🚀
      </div>

      {/* Header */}
      <header
        className={`bg-white border-b transition-all duration-300 z-50 ${isSticky ? "fixed top-0 left-0 w-full shadow-md" : "relative"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-1 text-center lg:text-left">
              <Link href="/" onClick={closeAll}>
                <Image
                  src="/logo.png"
                  alt="Trang chủ"
                  width={140}
                  height={40}
                  className="h-8 w-auto mx-auto lg:mx-0"
                />
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 justify-center">
              <SearchBar />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Mobile: Search + Menu */}
              <div className="flex md:hidden items-center space-x-2">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <SearchIcon size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  {isMenuOpen ? (
                    <XIcon size={24} className="text-gray-700" />
                  ) : (
                    <MenuIcon size={24} className="text-gray-700" />
                  )}
                </button>
              </div>

              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/favourites" className="relative p-2 hover:bg-gray-100 rounded-full">
                  <HeartIcon size={20} className="text-gray-700" />
                  {favouriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {favouriteCount}
                    </span>
                  )}
                </Link>
                <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
                  <ShoppingBagIcon size={20} className="text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full">
                  <UserIcon size={20} className="text-gray-700" />
                </Link>
                {token && (
                  <button
                    onClick={async () => {
                      if (!confirm("Bạn có chắc chắn muốn đăng xuất không?")) return;
                      try {
                        await logout();
                        toast.success("Đăng xuất thành công!");
                        router.replace("/login");
                      } catch {
                        toast.error("Lỗi đăng xuất. Vui lòng thử lại.");
                      }
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <LogOut size={20} className="text-gray-700" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] px-4 pt-6 overflow-y-auto transition-all duration-300">
          <div className="flex justify-end mb-4">
            <button onClick={closeAll} className="p-2">
              <XIcon size={28} className="text-gray-700" />
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-lg font-medium">
            <Link href="/favourites" onClick={closeAll} className="flex items-center justify-between py-2 border-b">
              <span>Yêu thích</span>
              {favouriteCount > 0 && (
                <span className="bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {favouriteCount}
                </span>
              )}
            </Link>
            <Link href="/cart" onClick={closeAll} className="flex items-center justify-between py-2 border-b">
              <span>Giỏ hàng</span>
              {cartCount > 0 && (
                <span className="bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/account" onClick={closeAll} className="py-2 border-b">Tài khoản</Link>
            {token && (
              <button
                onClick={async () => {
                  if (!confirm("Bạn có chắc chắn muốn đăng xuất không?")) return;
                  try {
                    await logout();
                    toast.success("Đăng xuất thành công!");
                    router.replace("/login");
                    closeAll();
                  } catch {
                    toast.error("Lỗi đăng xuất. Vui lòng thử lại.");
                  }
                }}
                className="py-2 border-b text-left"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-[60] px-4 py-6 flex flex-col transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-3 text-base border-b border-gray-300 focus:border-black outline-none"
                autoFocus
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2"
            >
              <XIcon size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
