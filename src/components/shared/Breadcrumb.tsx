"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      const slug = pathname.split("/").filter(Boolean).pop(); 
      try {
        const res = await fetch(`http://localhost:8080/api/products/slug/${slug}`);

        if (!res.ok) {
          throw new Error(`Lỗi API: ${res.status} ${res.statusText}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API không trả về JSON hợp lệ!");
        }
        const data = await res.json();
        if (!data || !data.data || !data.data.name) {
          throw new Error("Dữ liệu sản phẩm không hợp lệ!");
        }
        setProduct(data.data); // Sử dụng `data.data`
      } catch (err) {
        console.error(err instanceof Error? err.message:"❌ Lỗi khi tải sản phẩm:");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [pathname]);

  if (loading) {
    return <p className="text-gray-500">Đang tải...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  if (!product) return null;

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ul className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline">Trang chủ</Link>
          <span className="mx-2">/</span>
        </li>
        <li className="text-gray-500">{product.name}</li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
