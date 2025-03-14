"use client";

import { useEffect } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import AlsoLike from "./components/AlsoLike";
import ProductDescription from "./components/ProductDescription";
import ProductCard from "./components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";

const ProductPage: React.FC = () => {
  const { slug } = useParams();
  const { selectedProduct, loading, error, fetchProductBySlug } = useProducts();

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug as string);
    }
  }, [slug, fetchProductBySlug]);

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const productData = selectedProduct?.data;

  return (
    <main className="bg-white mx-auto ">
      {productData ? (
        <>
          <div className="border-b border-gray-200">
            <Breadcrumb />
          </div>
          <div className=" ">
            <ProductCard product={productData} />
            <ProductDescription product={productData} />
            <AlsoLike categoryId={productData.categoryId} />
          </div>
        </>
      ) : (
        <p className="text-center text-red-500 mt-10">Không tìm thấy sản phẩm.</p>
      )}
    </main>
  );
};

export default ProductPage;
