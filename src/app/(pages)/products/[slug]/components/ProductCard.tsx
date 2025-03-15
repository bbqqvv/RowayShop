"use client";

import { useState } from "react";
import ProductImageZoom from "@/components/features/ProductImageZoom";
import { useCart } from "@/hooks/cart/useCart";
import Image from 'next/image';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItemToCart, loading } = useCart(); 
  const defaultImage = "/default-image.jpg";
  const initialVariant = product.variants[0] || null;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    initialVariant
  );
  const [selectedSize, setSelectedSize] = useState<SizeProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(
    selectedVariant?.imageUrl || product.mainImageUrl || defaultImage
  );

  if (!product)
    return (
      <p className="text-center text-red-500">
        Dữ liệu sản phẩm không khả dụng.
      </p>
    );

  // Danh sách màu sắc
  const allColors = product.variants.map((variant) => variant.color);
  const availableSizes = selectedVariant?.sizes || [];

  // Giá thấp nhất và giá gốc thấp nhất
  const lowestPrice = availableSizes.length
    ? Math.min(
      ...availableSizes.map((size) => size.priceAfterDiscount ?? size.price)
    )
    : 0;
  const originalPrice = availableSizes.length
    ? Math.min(...availableSizes.map((size) => size.price))
    : 0;

  // Xử lý chọn màu
  const handleColorChange = (color: string) => {
    const variant = product.variants.find((v) => v.color === color);
    if (variant) {
      setSelectedVariant(variant);
      setSelectedSize(null);
      setSelectedImage(variant.imageUrl || product.mainImageUrl || defaultImage);
    }
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedSize) {
      alert("Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng.");
      return;
    }

    console.log("🛒 Size đã chọn:", selectedSize);

    await addItemToCart(
      product.id,
      selectedSize.sizeName,
      selectedVariant.color,
      1
    );
  };


  return (
    <div className="flex flex-col md:flex-row bg-white p-6 max-w-6xl mx-auto gap-x-2">
      {/* Ảnh phụ (Sidebar) */}
      <div className="flex flex-row md:flex-col gap-2 mb-4">
        {product.secondaryImageUrls?.length ? (
          product.secondaryImageUrls.map((thumb, index) => (
            <Image
              key={index}
              src={typeof thumb === "string" ? thumb : "/default-image.jpg"}
              alt={`Thumbnail ${index}`}
              width={80}
              height={80}
              className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${selectedImage === thumb ? "border-black scale-105" : "border-gray-300"
                } hover:border-black transition transform`}
              onClick={() => setSelectedImage(thumb)}
            />
          ))
        ) : (
          <Image
            src={defaultImage}
            alt="No Image"
            className="w-16 h-16 rounded-md border border-gray-300"
          />
        )}
      </div>

      {/* Ảnh chính */}
      <div className="w-full md:w-1/2">
        <ProductImageZoom imageUrl={typeof selectedImage === 'string' ? selectedImage : defaultImage} />
      </div>

      {/* Mô tả sản phẩm */}
      <div className="w-full md:w-2/5 md:ml-20">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600 text-sm">
          {product.shortDescription ?? "Mô tả đang cập nhật..."}
        </p>

        {/* Giá sản phẩm */}
        <div className="mt-2 text-lg font-semibold">
          {selectedSize ? (
            <>
              <span className="text-red-500 text-xl font-bold">
                {selectedSize.priceAfterDiscount?.toLocaleString("vi-VN")}₫
              </span>
              {selectedSize.priceAfterDiscount !== selectedSize.price && (
                <span className="line-through text-gray-500 ml-2">
                  {selectedSize.price.toLocaleString("vi-VN")}₫
                </span>
              )}
            </>
          ) : (
            <>
              <span className="text-red-500 text-xl font-bold">
                {lowestPrice.toLocaleString("vi-VN")}₫
              </span>
              {lowestPrice !== originalPrice && (
                <span className="line-through text-gray-500 ml-2">
                  {originalPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
            </>
          )}
        </div>

        {/* Chọn Màu */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Chọn màu sắc: {selectedVariant?.color}
          </label>
          <div className="flex gap-2 mt-2">
            {allColors.map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full border-2 ${selectedVariant?.color === color
                    ? "border-black scale-105"
                    : "border-gray-300"
                  } hover:border-black transition transform`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>

        {/* Chọn Size */}
        {availableSizes.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Chọn kích thước:
            </label>
            <div className="flex gap-2 mt-2">
              {availableSizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg transition ${selectedSize?.sizeName === size.sizeName
                      ? "bg-black text-white scale-105"
                      : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.sizeName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Số lượng tồn kho */}
        {selectedSize && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Số lượng còn lại:{" "}
              <span className="font-semibold">{selectedSize.stock} sản phẩm</span>
            </p>
          </div>
        )}

        {/* Nút thêm vào giỏ hàng + Mua ngay */}
        <div className="mt-6 flex flex-col gap-4">
          <button
            className="px-6 py-3 bg-gray-900 text-white rounded-lg w-full hover:bg-gray-800 active:scale-95 transition disabled:opacity-50"
            disabled={!selectedSize || loading}
            onClick={handleAddToCart}
          >
            {loading
              ? "Đang thêm..."
              : selectedSize
                ? "Thêm vào giỏ hàng"
                : "Chọn kích thước trước"}
          </button>

          <button
            className="px-6 py-3 bg-red-500 text-white rounded-lg w-full hover:bg-red-600 active:scale-95 transition disabled:opacity-50"
            disabled={!selectedSize}
          >
            {selectedSize ? "Mua ngay" : "Chọn kích thước trước"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
