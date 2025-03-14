"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FavouriteButton from "@/components/shared/FavouriteButton";
import { AuthProvider } from "@/contexts/AuthContext";
import Image from "next/image";

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { id, name, salePercentage = 0, mainImageUrl, slug, variants = [] } = product;
  
  // Trạng thái để quản lý ảnh được chọn
  const [selectedImage, setSelectedImage] = useState<string>(mainImageUrl);

  // ✅ Tính toán giá sản phẩm tối ưu
  const price = useMemo(() => {
    return variants.length > 0 && variants[0].sizes.length > 0
      ? variants[0].sizes[0].price
      : 0;
  }, [variants]);

  const salePrice = useMemo(() => {
    return salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;
  }, [price, salePercentage]);

  const handleImageChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow relative overflow-hidden">
      {/* Nút Yêu Thích */}
      <div className="absolute top-2 right-2 z-10">
        <FavouriteButton productId={id} />
      </div>

      {/* Ảnh Sản Phẩm */}
      <AuthProvider>
        <div className="relative aspect-square group overflow-hidden">
          <Link href={`/products/${slug}`} className="block w-full h-full">
            <Image
              src={selectedImage || "/default-image.jpg"}
              alt={name || "Product"}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => ((e.currentTarget.src = "/default-image.jpg"))}
              placeholder="blur"
              blurDataURL="/default-image.jpg"
            />
          </Link>
        </div>
      </AuthProvider>

      {/* Thông Tin Sản Phẩm */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">
          <Link href={`/products/${slug}`} className="hover:text-blue-600 transition-colors">
            {name || "Unnamed Product"}
          </Link>
        </h3>

        {/* Giá Sản Phẩm */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-medium text-black">
            {salePrice.toLocaleString()}đ
          </span>
          {salePercentage > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {price.toLocaleString()}đ
              </span>
              <span className="text-sm text-red-500 font-semibold">
                -{salePercentage}%
              </span>
            </>
          )}
        </div>

        {/* Màu Sắc */}
        {variants.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {variants.map(({ color, imageUrl }, index) => (
              <button
                key={index}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform ${
                  selectedImage === imageUrl ? "border-black scale-110 shadow-md" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleImageChange(imageUrl)}
                title={color}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
