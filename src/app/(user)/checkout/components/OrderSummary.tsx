"use client"
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { orderService } from "@/services/orderService";
import { toast } from "react-toastify";
import Image from "next/image";
import { motion } from "framer-motion";
import VoucherList from "./VoucherList";
import { ShoppingBagIcon, Loader2Icon, CreditCardIcon } from "lucide-react";
import { clearCart } from "@/redux/slices/cartSlice";
import { clearAddress } from "@/redux/slices/addressSlice";
import { clearVoucher } from "@/redux/slices/voucherSlice";
import { clearPaymentMethod } from "@/redux/slices/paymentSlice";
import ConfirmationModal from "@/components/features/ConfirmationModal";
import SuccessModal from "@/components/features/SuccessModal";

const OrderSummary = () => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const selectedAddress = useSelector((state: RootState) => state.address.selectedAddress);
  const selectedVoucher = useSelector((state: RootState) => state.voucher.selectedVoucher);
  const selectedPaymentMethod = useSelector((state: RootState) => state.payment.selectedMethod);

  const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

  const shippingFee = useMemo(() => {
    if (subtotal >= 499000) return 0;
    const cityShippingFees: { [key: string]: number } = {
      "thành phố hồ chí minh": 50000,
      "thành phố hà nội": 50000,
      "thành phố đà nẵng": 20000,
    };
    const userCity = selectedAddress?.province?.trim().toLowerCase();
    return userCity && cityShippingFees[userCity] !== undefined ? cityShippingFees[userCity] : 50000;
  }, [subtotal, selectedAddress]);

  const discountAmount = selectedVoucher
    ? selectedVoucher.discountType === "PERCENTAGE"
      ? Math.min((subtotal * selectedVoucher.discountAmount) / 100, selectedVoucher.maxDiscountAmount ?? 0)
      : selectedVoucher.discountAmount
    : 0;

  const total = subtotal - discountAmount + shippingFee;

  const handlePaymentConfirmation = () => {
    if (!selectedAddress) {
      toast.error("Vui lòng chọn địa chỉ giao hàng!");
      return;
    }
    if (!cart.length) {
      toast.error("Giỏ hàng của bạn đang trống!");
      return;
    }
    if (!selectedPaymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    
    setShowConfirmationModal(true);
  };

  const handlePayment = async () => {
    setShowConfirmationModal(false);
    setProcessingPayment(true);

    try {
      await orderService.createOrder({
        addressId: selectedAddress?.id,
        cartId: cart[0].id,
        discountCode: selectedVoucher?.code || "", // Xử lý trường hợp không có voucher
        paymentMethod: selectedPaymentMethod,
      });

      setShowSuccessModal(true);

      // Reset Redux state
      dispatch(clearCart());
      dispatch(clearAddress());
      dispatch(clearVoucher());
      dispatch(clearPaymentMethod());

      toast.success("Thanh toán thành công! 🎉");

      // Tự động chuyển hướng sau 3 giây
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch  {
      toast.error("Thanh toán thất bại. Vui lòng thử lại!");
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <ShoppingBagIcon size={20} className="mr-2 text-gray-600" />
          Đơn hàng của bạn
        </h2>

        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-3 mb-3">
            <div className="flex items-center space-x-4">
              <Image
                src={item.mainImageUrl}
                alt={item.productName}
                width={60}
                height={60}
                className="rounded-lg border border-gray-200"
              />
              <div>
                <p className="font-medium text-gray-800">{item.productName} - {item.color}</p>
                <p className="text-gray-500 text-sm">
                  <span>Kích cỡ: <b className="text-gray-700">{item.sizeName}</b></span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{(item.price * item.quantity).toLocaleString()}₫</p>
              <p className="text-gray-500 text-sm">Số lượng: <b>{item.quantity}</b></p>
            </div>
          </div>
        ))}

        <h3 className="text-md font-semibold text-gray-700 mt-4">Mã giảm giá của bạn</h3>
        <VoucherList />

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Giảm giá</span>
            <span>-{discountAmount.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between">
            <span>Phí giao hàng</span>
            <span>{shippingFee > 0 ? `${shippingFee.toLocaleString()}₫` : "Miễn phí"}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Tổng thanh toán</span>
            <span>{total.toLocaleString()}₫</span>
          </div>
        </div>

        <button
          onClick={handlePaymentConfirmation}
          disabled={processingPayment}
          className={`mt-4 w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center 
          ${processingPayment ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"} transition`}
        >
          {processingPayment ? (
            <>
              <Loader2Icon className="animate-spin mr-2" size={20} />
              Đang xử lý...
            </>
          ) : (
            <>
              <CreditCardIcon className="mr-2" size={20} />
              Thanh toán ngay
            </>
          )}
        </button>
      </motion.div>

     <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handlePayment}
        address={selectedAddress?.addressLine}
        paymentMethod={selectedPaymentMethod}
        total={total}
      />

      <SuccessModal isOpen={showSuccessModal} />
    </>
  );
};

export default OrderSummary;