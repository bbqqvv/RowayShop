import React, { useState, useEffect } from 'react'
import {
  ShoppingBagIcon,
  UserIcon,
  SearchIcon,
  MenuIcon,
  HeartIcon,
  XIcon,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import useAuth from '@/hooks/auth/useAuth';
import router from "next/router";
import { toast } from "react-toastify";
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.cart); // Giỏ hàng từ Redux
  const favourites = useSelector((state: RootState) => state.favourites.favourites); // Yêu thích từ Redux
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { logout } = useAuthContext();
  const { token } = useAuth();

  // 💡 State để kiểm tra Header có nên cố định không
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100); // Nếu lăn xuống hơn 100px thì cố định Header
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart?.length || 0;  // Số lượng sản phẩm trong giỏ hàng
  const favouriteCount = favourites?.length || 0;  // Số lượng sản phẩm yêu thích

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-sm py-2 px-4 text-center">
        <p>Miễn phí vận chuyển cho đơn hàng từ 499K 🚀</p>
      </div>

      {/* Header */}
      <header className={`bg-white border-b z-50 transition-all ${isSticky ? "fixed top-0 left-0 w-full shadow-md" : "relative"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <MenuIcon size={24} className="text-gray-700" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Trang chủ - Logo Công ty"
                  width={150}
                  height={50}
                  className="h-6 md:h-8"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Search Toggle (Mobile) */}
              <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                <SearchIcon size={20} className="text-gray-700" />
              </button>

              {/* Wishlist */}
              <Link href="/favourites" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:flex items-center relative">
                <HeartIcon size={20} className="text-gray-700" />
                {favouriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {favouriteCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" href="/cart">
                <ShoppingBagIcon size={20} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link href={`/account`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <UserIcon size={20} className="text-gray-700" />
              </Link>

              {/* Logout */}
              {token && (
                <button
                  className="flex items-center gap-3 rounded-lg font-medium"
                  onClick={async () => {
                    if (!confirm("Bạn có chắc chắn muốn đăng xuất không?")) return;
                    try {
                      await logout();
                      await toast.success("Đăng xuất thành công!");
                      router.replace("/login");
                    } catch (error) {
                      toast.error("Lỗi đăng xuất. Vui lòng thử lại.");
                    }
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-12 pr-4 py-3 text-lg border-b-2 border-gray-200 focus:border-black transition-colors outline-none"
                  autoFocus
                />
                <SearchIcon className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="ml-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <XIcon size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header;
