// ProductList.tsx
import React from "react";
import { useProducts } from "@/hooks/products/useProducts";
import ProductCard from "@/components/shared/ProductCard";

interface ProductListProps {
  slug: string;
}
const ProductList: React.FC<ProductListProps> = ({ slug }) => {
  console.log("Slug received in ProductList: ", slug);

  const { products, loading, error } = useProducts(slug);

  const handleAddToCart = (productId: string) => {
    console.log(`Product with ID: ${productId} added to cart`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

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
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
