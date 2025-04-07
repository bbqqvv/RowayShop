"use client";
import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Delete, Edit, Eye, Star } from "lucide-react";
import ImageModal from "@/components/features/ImageModal";
import Image from 'next/image';
import { RowProps } from "types/type";
import { useProductReviews } from "@/hooks/products/useProductReview";

export default function Row({ item, index, onDelete }: RowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { reviews, fetchReviewsByProduct } = useProductReviews();

  // Calculate average rating and count from reviews
  const calculateRatingStats = () => {
    if (!reviews || reviews.length === 0) return { average: 0, count: 0 };

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return {
      average: totalRating / reviews.length,
      count: reviews.length
    };
  };

  const { average, count } = calculateRatingStats();

  const handleImageClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const totalStock = item.variants?.[0]?.sizes?.reduce(
    (total: number, size: { stock: number }) => total + (size.stock || 0),
    0
  ) || 0;

  const priceAfterDiscount = item.variants?.[0]?.sizes?.[0]?.priceAfterDiscount;
  const originalPrice = item.variants?.[0]?.sizes?.[0]?.price;
  const isAvailable = totalStock > 0;
  const hasDiscount = priceAfterDiscount && priceAfterDiscount !== originalPrice;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(item.id);
    } finally {
      setIsDeleting(false);
    }
  };

  // Fetch reviews when component mounts or item.id changes
  useState(() => {
    if (item.id) {
      fetchReviewsByProduct(item.id);
    }
  });

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex justify-center">
            {item.mainImageUrl ? (
              <div className="relative h-10 w-10 rounded-md overflow-hidden cursor-pointer">
                <Image
                  src={typeof item.mainImageUrl === 'string' ? item.mainImageUrl : URL.createObjectURL(item.mainImageUrl)}
                  alt={item.name || "Product Image"}
                  fill
                  className="object-cover"
                  onClick={handleImageClick}
                  onError={(e) => {
                    e.currentTarget.src = '/default-product.png';
                  }}
                />
              </div>
            ) : (
              <div 
                className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer"
                onClick={handleImageClick}
              >
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{item.name || "N/A"}</span>
            <span className="text-xs text-gray-500">
              {item.variants?.[0]?.sizes?.map(size => size.sizeName).join(", ") || "No sizes"}
            </span>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-gray-500 line-through text-sm">
                  VND {originalPrice?.toLocaleString()}
                </span>
                <span className="text-red-500 font-medium">
                  VND {priceAfterDiscount.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-gray-900">
                VND {originalPrice?.toLocaleString() || "N/A"}
              </span>
            )}
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {totalStock.toLocaleString()}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.categoryName || "Uncategorized"}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{average.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({count})</span>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            isAvailable 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex justify-end gap-1">
            <Tooltip content="View details">
              <Button 
                isIconOnly 
                size="sm" 
                variant="light" 
                onClick={handleImageClick}
                aria-label="View product"
              >
                <Eye className="h-4 w-4 text-blue-500" />
              </Button>
            </Tooltip>
            
            <Tooltip content="Edit product">
              <Button 
                isIconOnly 
                size="sm" 
                variant="light"
                aria-label="Edit product"
              >
                <Edit className="h-4 w-4 text-yellow-500" />
              </Button>
            </Tooltip>
            
            <Tooltip content="Delete product">
              <Button 
                isIconOnly 
                size="sm" 
                variant="light" 
                onClick={handleDelete}
                isLoading={isDeleting}
                aria-label="Delete product"
              >
                <Delete className="h-4 w-4 text-red-500" />
              </Button>
            </Tooltip>
          </div>
        </td>
      </tr>

      <ImageModal
        imageUrl={item.mainImageUrl}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}