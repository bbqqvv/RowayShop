"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/products/useProducts";
import FavouriteButton from "./shared/FavouriteButton";
import Image from "next/image";

const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [selectedImages, setSelectedImages] = useState<Record<number, string>>({});
  const defaultImageUrl = "/default-product.jpg"; // Đặt ảnh mặc định vào thư mục `/public`

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleImageChange = (productId: number, imageUrl: string) => {
    setSelectedImages((prev) => ({ ...prev, [productId]: imageUrl }));
  };

  if (loading) return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!Array.isArray(products) || products.length === 0)
    return <p className="text-center text-gray-500">No products available.</p>;

  return (
    <section className="py-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-900">Sản Phẩm Nổi Bật</h2>
        <p className="text-gray-500 mt-2 text-sm">Những sản phẩm được khách hàng yêu thích nhất</p>
      </div>

      <div className="max-w-screen-lg mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(({ id, name, salePercentage = 0, mainImageUrl = "", slug = "", variants = [] }) => {
          const productImage = selectedImages[id] || mainImageUrl || defaultImageUrl;
          const price = variants[0]?.sizes[0]?.price ?? 0;
          const salePrice = salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;

          return (
            <div
              key={id}
              className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow relative overflow-hidden"
            >
              {/* Nút Yêu Thích */}
              <div className="absolute top-2 right-2 z-10">
                <FavouriteButton productId={id} />
              </div>

              {/* Ảnh Sản Phẩm */}
              <div className="relative aspect-square group overflow-hidden">
                <Link href={`/products/${slug}`} className="block w-full h-full">
                  <div className="relative w-full h-64">
                    <Image
                      src={productImage || "/default-image.jpg"}
                      alt={name || "Product Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                      onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
                    />
                  </div>

                </Link>
              </div>

              {/* Thông Tin Sản Phẩm */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  <Link href={`/products/${slug}`} className="hover:text-blue-600 transition-colors">
                    {name}
                  </Link>
                </h3>

                {/* Giá Sản Phẩm */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-medium text-black">{salePrice.toLocaleString()}đ</span>
                  {salePercentage > 0 && (
                    <>
                      <span className="text-sm text-gray-500 line-through">{price.toLocaleString()}đ</span>
                      <span className="text-sm text-red-500 font-semibold">-{salePercentage}%</span>
                    </>
                  )}
                </div>

                {/* Màu Sắc */}
                {variants.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    {variants.map(({ color, imageUrl }, index) => (
                      <button
                        key={index}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform ${productImage === imageUrl ? "border-black scale-110 shadow-md" : "border-gray-300"
                          }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        onClick={() => handleImageChange(id, imageUrl)}
                        title={color}
                      ></button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductList;
