import React from "react";

const Orders: React.FC = () => {
  return (
    <main className="p-10 rounded-lg bg-white w-full h-full">
      <h2 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h2>
      <p className="mt-4 text-gray-700">
        Tra cứu đơn hàng của tôi
        <a href="#" className="text-red-500 font-medium hover:underline transition ml-1">
          tại đây
        </a>
      </p>
    </main>
  );
};

export default Orders;    
