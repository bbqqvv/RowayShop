'use client';
import { useState, useCallback } from "react";
import { productService } from "@/services/productService";
import { ProductResponse } from "types/product/product-response.types";

export const useRecentlyViewedProducts = (initialPage = 0, initialPageSize = 8) => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecentlyViewed = useCallback(async (page = initialPage, pageSize = initialPageSize) => {
        setLoading(true);
        try {
            const response = await productService.getRecentlyViewedProducts(page, pageSize);
            console.log("Viewed:", response);

            setProducts(response?.items || []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Lỗi khi tải sản phẩm đã xem");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [initialPage, initialPageSize]);
    const markAsViewed = useCallback(async (productId: number) => {
        try {
            await productService.markProductAsViewed(productId);
        } catch (err) {
            console.error("Failed to mark product as viewed", err);
        }
    }, []);
    const syncViewed = useCallback(async (productIds: number[]) => {
        try {
            await productService.syncViewedProducts(productIds);
        } catch (err) {
            console.error("Failed to sync viewed products", err);
        }
    }, []);

    return {
        products,
        loading,
        error,
        syncViewed,
        fetchRecentlyViewed,
        markAsViewed,
    };
};
