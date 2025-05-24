"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import { useRecentlyViewedProducts } from "@/hooks/products/useRecentlyViewedProducts";

import ProductSkeleton from "./products/ProductSkeleton";
import LoadMoreButton from "./products/LoadMoreButton";
import ProductCard from "./products/ProductCard";

const ITEMS_PER_PAGE = 8;

type FilterType = "all" | "featured" | "discount";

const ProductList = () => {
  const {
    products,
    page,
    totalPages,
    fetchProducts,
    setPage,
    loading: isProductsLoading,
  } = useProducts(undefined, 1, ITEMS_PER_PAGE);

  const { markAsViewed } = useRecentlyViewedProducts();

  const [filterType, setFilterType] = useState<FilterType>("all");
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

  const filteredProducts = useMemo(() => {
    return products.filter(({ salePercentage, featured }) => {
      if (filterType === "featured") return featured;
      if (filterType === "discount") return salePercentage > 0;
      return true;
    });
  }, [products, filterType]);

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
    <section className="container py-8">

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          filteredProducts.map((product) => (
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
  );
};

export default ProductList;
