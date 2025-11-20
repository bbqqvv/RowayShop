"use client";

import React, { useMemo } from "react";
import { mockProducts } from "@/data/mockData";
import ProductCard from "@/app/(pages)/categories/[slug]/components/ProductCard";

interface RelatedProductsProps {
    categoryName: string;
    currentProductId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryName, currentProductId }) => {
    const relatedProducts = useMemo(() => {
        return mockProducts
            .filter(
                (product) =>
                    product.categoryName === categoryName && product.id !== currentProductId
            )
            .slice(0, 4); // Limit to 4 products
    }, [categoryName, currentProductId]);

    if (relatedProducts.length === 0) return null;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-100">
            <h2 className="text-2xl sm:text-3xl text-center font-bold mb-8">
                Sản phẩm liên quan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
                {relatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
