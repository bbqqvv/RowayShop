import React from "react";

interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  { id: 1, author: "John Doe", content: "Great product!", rating: 5 },
  { id: 2, author: "Jane Smith", content: "Good value for money.", rating: 4 },
  { id: 3, author: "Sam Johnson", content: "Average quality.", rating: 3 },
];

const Reviews: React.FC = () => {
  return (
    <div className="reviews-container max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Customer Reviews
      </h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="review-card flex items-start space-x-4 bg-white p-5 rounded-lg shadow-md mb-4"
        >
          {/* Avatar */}
          <div className="avatar w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
            {review.author.charAt(0).toUpperCase()}
          </div>

          {/* Review Content */}
          <div>
            <div className="review-header flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                {review.author}
              </h3>
              <div className="rating text-yellow-400 text-sm">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
