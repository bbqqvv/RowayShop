import { useState, useEffect, useMemo } from "react";
import { FiStar, FiEdit2, FiTrash2, FiUser, FiThumbsUp, FiCamera } from "react-icons/fi";
import { format, differenceInDays } from 'date-fns';
import { useProductReviews } from "@/hooks/products/useProductReview";
import Image from 'next/image';
import { mockReviews } from "@/data/mockData";

interface ProductReviewsProps {
  productId: number;
  isOrderDelivered: boolean;
}

const ReviewsProduct = ({ productId, isOrderDelivered }: ProductReviewsProps) => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    images: [] as File[],
  });

  const {
    reviews,
    loading,
    fetchReviewsByProduct,
    addOrUpdateReview,
    removeReview,
  } = useProductReviews();

  // Lấy danh sách đánh giá khi component mount hoặc filter thay đổi
  useEffect(() => {
    fetchReviewsByProduct(productId, 0, activeFilter || undefined);
  }, [productId, activeFilter, fetchReviewsByProduct]);

  // Tính toán thống kê (Giả lập dựa trên mock data toàn cục vì API mock trả về đã filter)
  // Trong thực tế, API nên trả về thống kê riêng
  const stats = useMemo(() => {
    const allProductReviews = mockReviews.filter(r => r.productId === Number(productId));
    const total = allProductReviews.length;
    const sum = allProductReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = total > 0 ? (sum / total).toFixed(1) : "0.0";

    const distribution = [5, 4, 3, 2, 1].map(star => ({
      star,
      count: allProductReviews.filter(r => r.rating === star).length,
      percent: total > 0 ? (allProductReviews.filter(r => r.rating === star).length / total) * 100 : 0
    }));

    return { total, avg, distribution };
  }, [productId]);

  const canEditReview = (createdAt: string) => {
    return differenceInDays(new Date(), new Date(createdAt)) <= 30;
  };

  const StarRating = ({ rating, size = 'md' }: { rating: number, size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
    const starSize = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-8 h-8'
    }[size];

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${starSize} ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = async () => {
    await addOrUpdateReview({
      productId,
      rating: newReview.rating,
      reviewText: newReview.content,
      imageFiles: newReview.images,
    });
    setIsWritingReview(false);
    setNewReview({ rating: 5, content: "", images: [] });
    // Refresh list
    fetchReviewsByProduct(productId, 0, activeFilter || undefined);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Đánh giá từ khách hàng</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Stats & Filter */}
        <div className="lg:col-span-4 space-y-8">
          {/* Rating Summary Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-end gap-4 mb-6">
              <div className="text-5xl font-bold text-gray-900">{stats.avg}</div>
              <div className="mb-1">
                <StarRating rating={Math.round(parseFloat(stats.avg))} size="lg" />
                <p className="text-sm text-gray-500 mt-1">{stats.total} đánh giá</p>
              </div>
            </div>

            <div className="space-y-3">
              {stats.distribution.map((item) => (
                <button
                  key={item.star}
                  onClick={() => setActiveFilter(activeFilter === item.star ? null : item.star)}
                  className={`w-full flex items-center gap-3 group ${activeFilter === item.star ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-1 w-12 text-sm font-medium text-gray-700">
                    {item.star} <FiStar className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${activeFilter === item.star ? 'bg-black' : 'bg-yellow-400'}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="w-8 text-xs text-gray-400 text-right">{item.count}</div>
                </button>
              ))}
            </div>

            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="mt-6 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-white transition-colors"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>

          {/* Write Review CTA */}
          {isOrderDelivered && !isWritingReview && (
            <div className="bg-black text-white rounded-2xl p-6 text-center">
              <h3 className="font-bold text-lg mb-2">Bạn đã mua sản phẩm này?</h3>
              <p className="text-gray-400 text-sm mb-4">Chia sẻ cảm nhận của bạn để giúp người khác mua sắm tốt hơn.</p>
              <button
                onClick={() => setIsWritingReview(true)}
                className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <FiEdit2 /> Viết đánh giá
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Reviews List & Form */}
        <div className="lg:col-span-8">
          {/* Review Form */}
          {isWritingReview && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Viết đánh giá</h3>
                <button onClick={() => setIsWritingReview(false)} className="text-gray-400 hover:text-gray-600">
                  Hủy
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bạn cảm thấy thế nào?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FiStar
                          className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung chi tiết</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none min-h-[120px] resize-none"
                    placeholder="Sản phẩm có đúng như mô tả không? Chất lượng thế nào?"
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thêm hình ảnh</label>
                  <div className="flex gap-3">
                    {newReview.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => setNewReview({
                            ...newReview,
                            images: newReview.images.filter((_, i) => i !== index)
                          })}
                          className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}

                    {newReview.images.length < 3 && (
                      <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black cursor-pointer transition-colors">
                        <FiCamera size={20} />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            if (newReview.images.length + files.length > 3) return;
                            setNewReview(prev => ({ ...prev, images: [...prev.images, ...files] }));
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmitReview}
                  disabled={!newReview.content.trim() || loading}
                  className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                </button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-sm">
                      {review.userName ? review.userName.charAt(0).toUpperCase() : <FiUser />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.userName || "Khách hàng"}</h4>
                        <span className="text-xs text-gray-400">{format(new Date(review.createdAt), 'dd/MM/yyyy')}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Đã mua hàng</span>
                      </div>

                      <p className="text-gray-600 leading-relaxed text-sm mb-4">{review.reviewText}</p>

                      {review.imageUrl && (
                        <div className="mb-4">
                          <Image
                            src={review.imageUrl}
                            alt="Review"
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-100 cursor-pointer hover:opacity-90"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors">
                          <FiThumbsUp /> Hữu ích
                        </button>
                        {canEditReview(review.createdAt) && (
                          <button
                            onClick={() => removeReview(review.id)}
                            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors ml-auto"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FiStar className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-gray-900 font-medium mb-1">Chưa có đánh giá nào</h3>
                <p className="text-gray-500 text-sm">Hãy là người đầu tiên chia sẻ cảm nhận về sản phẩm này.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsProduct;