"use client";

import { useEffect } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import ProductDescription from "./components/ProductDescription";
import ProductCard from "./components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import RelatedProduct from "./components/RelatedProduct";
import BackToTopButton from "@/components/shared/BackToTopButton";
import LoadingScreen from "@/components/shared/LoadingScreen";

const ProductPage: React.FC = () => {
  const { slug } = useParams();
  const { selectedProduct, loading, error, fetchProductBySlug } = useProducts();

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug as string);
    }
  }, [slug, fetchProductBySlug]);

  if (loading) return <p className="text-center mt-10"><LoadingScreen /></p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const productData = selectedProduct;

  return (

    <main className="bg-white mx-auto ">

      {productData ? (
        <>
          <div className="border-b border-gray-200">
            <Breadcrumb />
          </div>
          <div className=" ">
            <ProductCard product={productData} onAddToCart={function (productId: number): void {
              throw new Error("Function not implemented.");
            }} />
            <ProductDescription product={productData} />
          </div>
          <div className="">
            <RelatedProduct />
          </div>
        </>
      ) : (
        <p className="text-center text-red-500 mt-10">Không tìm thấy sản phẩm.</p>
      )}

      <BackToTopButton />
    </main>
  );
};

export default ProductPage;
