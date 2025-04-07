import React from "react";

// 🔹 Danh sách trạng thái đơn hàng (giống backend)
const statusTabs = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ xác nhận" },
  { id: "confirmed", label: "Đã xác nhận" },
  { id: "shipping", label: "Đang vận chuyển" },
  { id: "delivered", label: "Đã giao hàng" },
  { id: "cancelled", label: "Đã huỷ" },
];

interface StatusTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-4 overflow-x-auto">
      <div className="flex space-x-3 pb-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              activeTab === tab.id
                ? "bg-black text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusTabs;
