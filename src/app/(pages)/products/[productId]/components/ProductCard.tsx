"use client";
import React, { useState } from "react";

interface ProductCardProps {
  product: Product; // Directly receive product prop
}

const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found.</p>;
  }
  const {
    variants = [],
    price,
    mainImageUrl,
    secondaryImageUrls = [],
    shortDescription,
    salePercentage,
    name,
  } = product.data;

  const defaultVariant = variants[0] || {
    color: "Default Color",
    size: "Default Size",
    price: price,
  };

  const [selectedColor, setSelectedColor] = useState<string>(
    defaultVariant.color
  );
  const [selectedSize, setSelectedSize] = useState<string>(defaultVariant.size);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(mainImageUrl);
  const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);

  const secondaryImagePerPage = 4;

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Reset size when color changes to avoid invalid size
    const availableSizesForColor = variants
      .filter((variant) => variant.color === color)
      .map((variant) => variant.size);
    if (!availableSizesForColor.includes(selectedSize)) {
      setSelectedSize(availableSizesForColor[0]); // Automatically select first available size
    }
  };

  const handleSizeChange = (size: string) => setSelectedSize(size);
  const handleQuantityChange = (delta: number) =>
    setQuantity((prev) => Math.max(1, prev + delta)); // Prevent quantity from going below 1

  const handleThumbnailClick = (image: string) => setMainImage(image);

  const handleNextThumbnails = () =>
    setCurrentStartIndex((prev) =>
      Math.min(
        prev + secondaryImagePerPage,
        secondaryImageUrls.length - secondaryImagePerPage
      )
    );

  const handlePreviousThumbnails = () =>
    setCurrentStartIndex((prev) => Math.max(prev - secondaryImagePerPage, 0));

  const visibleThumbnails = secondaryImageUrls.slice(
    currentStartIndex,
    currentStartIndex + secondaryImagePerPage
  );

  const salePrice = (price * (1 - salePercentage / 100)).toFixed(0);

  // Group variants by color and size
  const colors = Array.from(
    new Set(variants.map((v) => v.color || "Default Color"))
  );

  return (
    <main className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex">
          {/* Thumbnails Section */}
          <div className="flex flex-col items-center gap-3 overflow-y-auto mt-4">
            {currentStartIndex > 0 && (
              <button
                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={handlePreviousThumbnails}
              >
                &uarr;
              </button>
            )}
            {visibleThumbnails.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Secondary Image ${index + 1}`}
                className="w-20 h-20 rounded-md border cursor-pointer hover:opacity-80"
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
            {currentStartIndex + secondaryImagePerPage <
              secondaryImageUrls.length && (
              <button
                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleNextThumbnails}
              >
                &darr;
              </button>
            )}
          </div>

          {/* Main Product Image */}
          <div className="w-[39rem] p-2">
            <img
              src={mainImage}
              alt="Main product"
              className="w-full rounded-md mb-4 object-cover"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 text-xl">★★★★★</span>
            <span className="text-gray-500 text-sm">4.5/5</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-black ">{salePrice}đ</span>
            <span className="text-xl text-gray-500 line-through">
              {product.data.price}đ
            </span>
            {salePercentage > 0 && (
              <span className="text-red-500 font-semibold ">
                -{salePercentage}%
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-600 mb-4">{shortDescription}</p>

          {/* Color Selection */}
          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-2">Select Color</h2>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 border rounded-md ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => handleColorChange(color)}
                >
                  {color || "Default Color"}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-2">Choose Size</h2>
            <div className="flex gap-2">
              {/* Lọc các variant theo màu sắc đã chọn và tách kích thước thành mảng */}
              {variants
                .filter((variant) => variant.color === selectedColor) // Lọc theo màu sắc đã chọn
                .map((variant) => {
                  // Tách chuỗi kích thước thành mảng
                  const sizes = variant.size.split(",");

                  return sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ));
                })}
            </div>
          </div>

          {/* Quantity Selector and Add to Cart Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <button
                className="px-4 py-2 border-r"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="px-4 py-2 border-l"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductCard;
