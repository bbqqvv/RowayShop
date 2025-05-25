'use client';
import React, { useEffect } from 'react';
import { useFeaturedProducts } from '@/hooks/products/useFeaturedProducts';
import ProductCard from './products/ProductCard';

const FeaturedProduct: React.FC = () => {
  const {
    products,
    loading,
    error,
    fetchFeaturedProducts,
  } = useFeaturedProducts();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (loading) return <p className="text-center py-10">Đang tải sản phẩm nổi bật...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Lỗi: {error}</p>;

  // ✅ Lọc sản phẩm có featured = true
  const featuredProducts = products.filter((product) => product.featured === true);

  return (
    <>
      <h2 className="text-xl sm:text-3xl text-center font-semibold mb-6">
        Sản phẩm nổi bật
      </h2>
      <div className="w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl justify-center items-center mx-auto">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              markAsViewed={() => { }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
