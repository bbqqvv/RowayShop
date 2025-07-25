"use client";

import { useEffect, useState, useCallback } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import { useRecentlyViewedProducts } from "@/hooks/products/useRecentlyViewedProducts";

import ProductSkeleton from "./products/ProductSkeleton";
import LoadMoreButton from "./products/LoadMoreButton";
import ProductCard from "./products/ProductCard";

const ITEMS_PER_PAGE = 8;

const ProductList = () => {
  const {
    products,
    page,
    totalPages,
    fetchProducts,
    setPage,
  } = useProducts(undefined, 1, ITEMS_PER_PAGE);

  const { markAsViewed } = useRecentlyViewedProducts();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch products when page changes
  useEffect(() => {
    const loadProducts = async () => {
      if (page > 1) setIsLoadingMore(true);
      await fetchProducts();
      if (page > 1) setIsLoadingMore(false);
    };

    if ((page === 1 && products.length === 0) || page > 1) {
      loadProducts();
    }
  }, [page, fetchProducts, products.length]);

  const handleLoadMore = useCallback(async () => {
    if (page < totalPages) {
      setIsLoadingMore(true);
      try {
        await setPage(page + 1);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [page, totalPages, setPage]);

  return (
    <>
      <h2 className="text-xl sm:text-3xl text-center font-semibold mb-6">
        Sản phẩm của chúng tôi
      </h2>
      <section className="w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl justify-center items-center mx-auto">
          {products.length === 0 ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                markAsViewed={markAsViewed}
              />
            ))
          )}
        </div>

        <LoadMoreButton
          page={page}
          totalPages={totalPages}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
        />
      </section>
    </>
  );
};

export default ProductList;
