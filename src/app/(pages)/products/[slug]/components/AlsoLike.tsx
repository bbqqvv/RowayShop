"use client";
import { useEffect } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/shared/AddToCartButton";
import { useProducts } from "@/hooks/products/useProducts";
import Image from 'next/image';



const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
    console.log("Products:", products); // Debugging
  }, [fetchProducts]);

  // Hàm xử lý khi thêm sản phẩm vào giỏ
  const handleAddToCart = (productId: string) => {
    console.log(`Product with ID: ${productId} added to cart`);
  };

  // Tính giá khuyến mãi
  const calculateSalePrice = (price: number, salePercentage: number = 0) => {
    if (typeof price !== "number" || typeof salePercentage !== "number") {
      return 0; // Default value if price or salePercentage is invalid
    }
    return salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;
  };

  // Nếu đang tải sản phẩm
  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  // Nếu có lỗi
  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  // Nếu không có sản phẩm
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p className="text-center py-10">No products found.</p>;
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
          if (!product || typeof product.price !== "number") {
            return null; // Skip invalid products
          }

          const {
            id,
            name = "Unnamed Product",
            price = 0,
            salePercentage = 0,
            mainImageUrl = "/default-image.jpg",
            slug = "",
          } = product;

          const salePrice = calculateSalePrice(price, salePercentage);
          const displayPrice = salePrice?.toLocaleString() || "N/A";
          const originalPrice = price?.toLocaleString() || "N/A";

          return (
            <div
              key={id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative aspect-w-1 aspect-h-1">
                <Link href={`/products/${slug}`}>
                  <Image
                    src={mainImageUrl}
                    alt={name}
                    fill
                    className="object-cover rounded-t-lg"
                    priority
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
                    {displayPrice}đ
                  </span>
                  {salePercentage > 0 && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        {originalPrice}đ
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
                    onClick={() => handleAddToCart(id)}
                  >
                    Mua ngay
                  </button>
                  <AddToCartButton
                    productId={id}
                    onAddToCart={() => handleAddToCart(id)}
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