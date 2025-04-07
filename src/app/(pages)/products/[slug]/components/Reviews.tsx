import React, { useState } from "react";

interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
  date: string;
  productName: string;
  productVariant: string;
}

const reviews: Review[] = [
  { id: 1, author: "Nguyễn Văn A", content: "Chất lượng rất tốt.", rating: 4, date: "28/05/2023", productName: "Áo sơ mi nam công sở", productVariant: "Màu xanh | Size L" },
  { id: 2, author: "Trần Hoàng B", content: "Áo đẹp, giao nhanh.", rating: 5, date: "15/05/2023",  productName: "Áo thun nam cổ tròn", productVariant: "Màu đen | Size M" },
  { id: 3, author: "Lê Thị C", content: "Tạm ổn, giao hàng hơi chậm.", rating: 3, date: "10/06/2023", productName: "Đầm nữ dáng xòe", productVariant: "Màu hồng | Size S" },
  { id: 4, author: "Hoàng Minh D", content: "Màu đẹp, chất liệu khá ổn.", rating: 4, date: "05/07/2023",  productName: "Quần jeans nam", productVariant: "Màu xanh đậm | Size 32" },
];

const Reviews: React.FC = () => {
  const [filter, setFilter] = useState<number | null>(null);

  // Lọc đánh giá theo số sao
  const filteredReviews = filter ? reviews.filter((review) => review.rating === filter) : reviews;

  return (
    <div>
      {/* Bộ lọc đánh giá (Dropdown) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Lọc theo số sao:</label>
        <select
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Tất cả</option>
          <option value="5">5 Sao</option>
          <option value="4">4 Sao</option>
          <option value="3">3 Sao</option>
          <option value="2">2 Sao</option>
          <option value="1">1 Sao</option>
        </select>
      </div>

      {/* Danh sách đánh giá */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="">
              <div className="flex items-start">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="font-medium text-gray-700">{review.author.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{review.author}</h4>
                  {/* Thông tin sản phẩm */}
                  <p className="text-sm font-semibold text-gray-700 mt-1">{review.productName}</p>
                  <p className="text-xs text-gray-500">{review.productVariant}</p>

                  {/* Hiển thị số sao */}
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>

                  <p className="mt-2 text-sm text-gray-600">{review.content}</p>
                  <p className="mt-1 text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có đánh giá nào.</p>
        )}
      </div>

      {/* Nút xem thêm (giả lập) */}
      <div className="text-center mt-6">
        <button className="text-sm font-medium text-red-500 hover:text-red-600">Xem thêm đánh giá</button>
      </div>
    </div>
  );
};

export default Reviews;
