"use client";

import { ChangeEvent } from "react";
import Image from "next/image";


export default function Images({ data, setMainImageUrl, handleData }: ImagesProps) {
  // Xử lý khi chọn ảnh
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setMainImageUrl(base64Image); // Cập nhật ảnh chính
        handleData("mainImageUrl", base64Image); // Cập nhật dữ liệu sản phẩm
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex-1 flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1 className="font-semibold">Images</h1>

      {/* Input cho Main Image */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-main-image">
          Main Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="product-main-image"
          name="product-main-image"
          accept="image/*"
          onChange={handleMainImageChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      {/* Hiển thị ảnh đã chọn */}
      {data?.mainImageUrl && (
        <div className="mt-2">
          <Image
            src={typeof data.mainImageUrl === "string" ? data.mainImageUrl : "/default-image.jpg"}
            alt="Main Image"
            width={600}
            height={160}
            className="w-full h-40 object-cover rounded-md border"
            priority
            onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
          />
        </div>
      )}
    </section>
  );
}
