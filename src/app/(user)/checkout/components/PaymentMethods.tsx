"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaMoneyBillWave, FaQrcode } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { setPaymentMethod } from "@/redux/slices/paymentSlice";
import { PaymentMethod } from "types/shared/enums";

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector((state: RootState) => state.payment.selectedMethod);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mt-6 text-gray-700">Phương thức thanh toán</h3>
      <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
        <FaMoneyBillWave className="text-green-500 text-xl" />
        <input
          type="radio"
          name="paymentMethod"
          value={PaymentMethod.COD}  // Sử dụng enum
          checked={paymentMethod === PaymentMethod.COD}  // So sánh với enum
          onChange={() => dispatch(setPaymentMethod(PaymentMethod.COD))}  // Gửi enum
        />
        <span>Thanh toán khi giao hàng (COD)</span>
      </label>
      <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
        <FaQrcode className="text-indigo-500 text-xl" />
        <input
          type="radio"
          name="paymentMethod"
          value={PaymentMethod.VIETQR}  // Sử dụng enum
          checked={paymentMethod === PaymentMethod.VIETQR}  // So sánh với enum
          onChange={() => dispatch(setPaymentMethod(PaymentMethod.VIETQR))}  // Gửi enum
        />
        <span>Thanh toán qua VietQR</span>
      </label>
      <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
        <MdPayment className="text-indigo-500 text-xl" />
        <input
          type="radio"
          name="paymentMethod"
          value={PaymentMethod.VNPAY}  // Sử dụng enum
          checked={paymentMethod === PaymentMethod.VNPAY}  // So sánh với enum
          onChange={() => dispatch(setPaymentMethod(PaymentMethod.VNPAY))}  // Gửi enum
        />
        <span>Thanh toán qua VNPay</span>
      </label>
    </div>
  );
};

export default PaymentMethods;
