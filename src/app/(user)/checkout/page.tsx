"use client";
import { useAddresses } from "@/hooks/address/useAddress";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaMoneyBillWave, FaUniversity, FaQrcode, FaPlus } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import Image from 'next/image';

const mockCart = [
  { id: 1, name: "Áo phao Jile nam May 10", size: "L", material: "100% POLY", price: 800000, quantity: 1, image: "https://via.placeholder.com/50" },
  { id: 2, name: "Quần Jean Slimfit", size: "M", material: "Denim", price: 600000, quantity: 2, image: "https://via.placeholder.com/50" },
];

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null); // State để theo dõi địa chỉ được chọn
  const {
    addresses,
    loading,
    error,
    // addAddress,
    // updateAddress,
    // removeAddress,
    // setDefaultAddress,
  } = useAddresses();

  // Tính toán tổng tiền từ mockCart
  const subtotal = mockCart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal - discountAmount; // Tổng tiền không bao gồm phí ship

  // const applyDiscount = () => {
  //   setDiscountAmount(discountCode === "SALE50" ? 50000 : 0);
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg grid md:grid-cols-3 gap-6 animate-fade-in">
      {/* Địa chỉ giao hàng */}
      <div className="col-span-2 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Chọn địa chỉ giao hàng</h2>
        {addresses?.map((address) => (
          <div
            key={address.id}
            className={`flex justify-between p-4 border rounded-lg cursor-pointer ${selectedAddress === address.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-100"}`}
            onClick={() => setSelectedAddress(address.id)}
          >
            <div>
              <p className="text-gray-700">
                <strong>Tên người nhận:</strong> <span className="font-bold text-red-700">{address.recipientName}</span>
              </p>
              <p className="text-gray-700">
                <strong>Địa chỉ:</strong> {address.commune}, {address.district}, {address.province}, {address.country}
              </p>
              <p className="text-gray-700">
                <strong>Địa chỉ chi tiết:</strong> {address.addressLine}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {address.email}
              </p>
              <p className="text-gray-700">
                <strong>SĐT:</strong> {address.phoneNumber}
              </p>
            </div>
            <Link className="text-red-500" href={`/account`}>
              <Pencil className="w-4 h-4" />
            </Link>
          </div>
        ))}

        <Link className="flex items-center p-3 border rounded-lg text-blue-500 hover:bg-blue-100 w-full" href={`/account`}>
          <FaPlus /> <span className="ml-2">Thêm địa chỉ mới</span>
        </Link>

        {/* Phương thức thanh toán */}
        <h3 className="text-lg font-semibold mt-6 text-gray-700">Phương thức thanh toán</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
            <FaMoneyBillWave className="text-green-500 text-xl" />
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            <span>Thanh toán khi giao hàng (COD)</span>
          </label>
          <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
            <FaQrcode className="text-indigo-500 text-xl" />
            <input
              type="radio"
              name="paymentMethod"
              value="VietQR"
              checked={paymentMethod === "VietQR"}
              onChange={() => setPaymentMethod("VietQR")}
            />
            <span>Thanh toán qua VietQR</span>
          </label>

          <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
            <MdPayment className="text-indigo-500 text-xl" />
            <input
              type="radio"
              name="paymentMethod"
              value="VNPay"
              checked={paymentMethod === "VNPay"}
              onChange={() => setPaymentMethod("VNPay")}
            />
            <span>Thanh toán qua VNPay</span>
          </label>
          <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
            <FaUniversity className="text-blue-500 text-xl" />
            <input
              type="radio"
              name="paymentMethod"
              value="BankTransfer"
              checked={paymentMethod === "BankTransfer"}
              onChange={() => setPaymentMethod("BankTransfer")}
            />
            <span>Chuyển khoản qua ngân hàng</span>
          </label>

          {paymentMethod === "BankTransfer" && (
            <div className="mt-4 p-4 bg-gray-50 border rounded-lg shadow-md">
              <h4 className="text-md font-semibold text-gray-700">Thông tin chuyển khoản</h4>
              <p className="text-gray-600">Tên tài khoản: <strong>Tổng Công ty May 10 – CTCP</strong></p>
              <p className="text-gray-600">Số tài khoản: <strong>0541000302828</strong></p>
              <p className="text-gray-600">Ngân hàng: <strong>Vietcombank – CN Chương Dương</strong></p>
              <p className="text-gray-600">Nội dung chuyển khoản: <strong>Tên - SĐT - Online</strong></p>
              <Image src="/your-qr-image-url.png" alt="QR Code" width={192} height={192} className="mt-2 mx-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Đơn hàng */}
      <div className="bg-gray-50 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Đơn hàng của bạn</h2>
        {mockCart.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 mb-4">
            <Image
              src={item.image}
              alt={item.name}
              width={48}
              height={48}
              className="rounded object-cover"
              onError={(e) => (e.currentTarget.src = "default-product.png")}
            />                <div>
              <p className="text-sm">{item.name}</p>
              <p className="text-gray-500 text-xs">{item.size} / {item.material}</p>
            </div>
            <p className="font-semibold">{(item.price * item.quantity).toLocaleString()}₫</p>
          </div>
        ))}

        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Giảm giá</span>
            <span>-{discountAmount.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString()}₫</span>
          </div>
        </div>

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600 transition duration-300">
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Payment;