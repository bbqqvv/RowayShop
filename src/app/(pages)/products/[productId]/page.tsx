"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductDescription from "./components/ProductDescription";
import AlsoLikeProducts from "./components/AlsoLike";
import { getProductBySlug } from "@/services/productService";


interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage: React.FC<PageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use React.use to resolve the Promise and get the actual params
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string;
  } | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolved = await params; // Await the Promise to get the params
      setResolvedParams(resolved); // Set the resolved params to state
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    const fetchProduct = async () => {

      if (!resolvedParams?.productId) return;
      console.log("Resolved params:", resolvedParams); // Log giá trị của resolvedParams

      try {
        setLoading(true);
        const productData = await getProductBySlug(resolvedParams.productId);
        setProduct(productData);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams]);

  if (loading) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <main className="container mx-auto px-4">
      {product && (
        <>
          <ProductCard product={product} />
          <ProductDescription product={product} />
          <AlsoLikeProducts categoryId={product.categoryId} />
        </>
      )}
    </main>
  );
};

export default ProductPage;
