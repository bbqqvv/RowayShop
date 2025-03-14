"use client";
import Image from 'next/image';

import { useMemo } from "react";
import { useCart } from "@/hooks/cart/useCart";
import { Trash2, Minus, Plus, XCircle, Banknote } from "lucide-react";

const CartPage = () => {
    const {
        cart,
        error,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
        clearCartItems
    } = useCart();

    const cartItems = useMemo(() => {
        return [...(cart?.cartItems || [])].sort((a, b) => a.id - b.id);
    }, [cart]);

    const totalAmount = useMemo(() => cart?.totalPrice || 0, [cart]);

    const handleClearCart = () => {
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
            clearCartItems();
        }
    };



    const ref = (path: string) => () => {
        window.location.href = path;
    };

    return (
        <div className="min-h-screen bg-[#f8f5f2] flex flex-col items-center py-10">
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-[#9c7a41] mb-6">
                    🛍️ Giỏ hàng của bạn
                </h1>

                {error ? (
                    <p className="text-center text-red-500 font-semibold">{error}</p>
                ) : cartItems.length === 0 ? (
                    <p className="text-center text-lg">Giỏ hàng trống.</p>
                ) : (
                    <>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#efe4d3] text-[#7a5e3a] text-lg">
                                    <th className="py-4 px-6 text-left">Sản phẩm</th>
                                    <th className="py-4 px-6 text-center">Đơn giá</th>
                                    <th className="py-4 px-6 text-center">Số lượng</th>
                                    <th className="py-4 px-6 text-right">Tổng</th>
                                    <th className="py-4 px-6 text-center">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-b border-[#e0d2bf]">
                                        <td className="py-6 px-6 flex items-center gap-4">
                                            <Image
                                                src={item.mainImageUrl}
                                                alt={item.productName}
                                                width={64} // Định nghĩa chiều rộng cụ thể (16 * 4)
                                                height={64} // Định nghĩa chiều cao cụ thể (16 * 4)
                                                className="object-cover rounded-lg shadow-md"
                                            />

                                            <span className="text-lg font-semibold">
                                                {item.productName} - {item.color} - {item.sizeName}
                                            </span>
                                        </td>
                                        <td className="py-6 px-6 text-center font-semibold text-[#7a5e3a]">
                                            {item.price.toLocaleString("vi-VN")}₫
                                        </td>
                                        <td className="py-6 px-6 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => decreaseItemQuantity(item)}
                                                    className={`p-2 bg-gray-200 rounded-full transition 
                                                        ${item.quantity > 1 ? "hover:bg-gray-300" : "opacity-50 cursor-not-allowed"}`}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={16} />
                                                </button>

                                                <span className="text-lg font-bold">{item.quantity}</span>

                                                <button
                                                    onClick={() => increaseItemQuantity(item)}
                                                    className={`p-2 bg-gray-200 rounded-full transition 
                                                        ${item.inStock ? "hover:bg-gray-300" : "opacity-50 cursor-not-allowed"}`}
                                                    disabled={!item.inStock}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-right font-bold text-[#9c7a41]">
                                            {item.subtotal.toLocaleString("vi-VN")}₫
                                        </td>
                                        <td className="py-6 px-6 text-center">
                                            <button
                                                onClick={() => removeItemFromCart(item)}
                                                className="p-2 text-red-500 hover:text-red-600 transition"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Tổng giá và hành động */}
                        <div className="flex justify-between items-center mt-8 px-6">
                            <span className="text-2xl font-bold text-[#7a5e3a]">
                                Tổng cộng: {totalAmount.toLocaleString("vi-VN")}₫
                            </span>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleClearCart}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg 
                                        hover:bg-red-600 transition shadow-md"
                                >
                                    <XCircle size={20} />
                                    Xóa toàn bộ
                                </button>

                                <button
                                    onClick={ref("/checkout")}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg 
                                        hover:bg-green-600 transition shadow-md"
                                >
                                    <Banknote size={20} />
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;
