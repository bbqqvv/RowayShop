// components/ProductCard.tsx
import Link from "next/link";
import AddToCartButton from "@/components/shared/AddToCartButton";
import { AuthProvider } from "@/contexts/AuthContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    salePercentage?: number;
    mainImageUrl: string;
    slug: string;
  };
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { id, name, price, salePercentage = 0, mainImageUrl, slug } = product;

  // Tính giá khuyến mãi
  const salePrice =
    salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <AuthProvider children={undefined}>
        
      </AuthProvider>
      <div className="relative aspect-w-1 aspect-h-1">
        <Link href={`/products/${slug}`}>
          <img
            src={mainImageUrl}
            alt={name}
            className="object-cover w-full h-full"
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
            {salePrice.toLocaleString()}đ
          </span>
          {salePercentage > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {price.toLocaleString()}đ
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
            onClick={() => onAddToCart(id)}
          >
            Mua ngay
          </button>
          <AddToCartButton productId={id} onAddToCart={() => onAddToCart(id)} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
