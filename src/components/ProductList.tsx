"use client";

import { useEffect } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/shared/AddToCartButton";
import { useProducts } from "@/hooks/products/useProducts";
import FavouriteButton from "./shared/FavouriteButton";
import { useAuthContext } from "@/contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  price: number;
  salePercentage: number;
  mainImageUrl: string;
  slug: string;
}

const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const { token } = useAuthContext(); // Lấy token từ context
  const handleFavouriteUpdate = (newCount: number) => {
    console.log("Updated favourite count:", newCount);
    // Bạn có thể gọi API hoặc cập nhật UI tại đây nếu cần
  };
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (productId: string) => {
    console.log(`Product with ID: ${productId} added to cart`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="py-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          Sản Phẩm Nổi Bật
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Những sản phẩm được khách hàng yêu thích nhất
        </p>
      </div>

      <div className="max-w-screen-lg mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => {
          const {
            id,
            name,
            price,
            salePercentage = 0,
            mainImageUrl,
            slug,
          } = product;

          // Tính giá khuyến mãi
          const salePrice =
            salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;

          return (
            <div
              key={id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
            >
              {/* Thêm FavouriteButton vào đây */}
              <div className="z-10 absolute top-2 right-2">
                <FavouriteButton productId={id} token={token} />
              </div>

              {/* Product Image */}
              <div className="relative aspect-w-1 aspect-h-1">
                <Link href={`/products/${slug}`}>
                  <img
                    src={mainImageUrl}
                    alt={name}
                    className="object-cover w-full h-full"
                  />
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  <Link href={`/products/${slug}`}>{name}</Link>
                </h3>

                {/* Pricing */}
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

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    className="w-2/3 mt-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                    onClick={() => handleAddToCart(id.toString())}
                  >
                    Mua ngay
                  </button>
                  <AddToCartButton
                    productId={id.toString()}
                    onAddToCart={() => handleAddToCart(id.toString())}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductList;
