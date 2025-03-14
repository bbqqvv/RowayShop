import React, { useState } from "react";

interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
}

interface AddReviewProps {
  onAddReview: (review: Review) => void;
}

const AddReview: React.FC<AddReviewProps> = ({ onAddReview }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now(),
      author,
      content,
      rating,
    };
    onAddReview(newReview);
    setAuthor("");
    setContent("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="add-review-form">
      <h2>Add a Review</h2>
      <div className="form-group">
        <label htmlFor="author">Name</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Review</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        >
          <option value={0}>Select rating</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button type="submit">Submit Review</button>
      <style jsx>{`
        .add-review-form {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-size: 16px;
          color: #333;
        }
        input,
        textarea,
        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </form>
  );
};

export default AddReview;
