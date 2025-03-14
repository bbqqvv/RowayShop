"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
interface ImagesProps {
  data: Record<string, any> | null; // Dữ liệu sản phẩm
  featureImage: string | null; // Hình ảnh nổi bật
  setFeatureImage: (value: string | null) => void; // Hàm cập nhật featureImage
  imageList: string[]; // Danh sách hình ảnh bổ sung
  setImageList: (value: string[]) => void; // Hàm cập nhật imageList
  handleData: (key: string, value: any) => void; // Hàm xử lý dữ liệu
}

export default function Images({
  data,
  featureImage,
  setFeatureImage,
  imageList,
  setImageList,
  handleData,
}: ImagesProps) {
  // Xử lý khi chọn ảnh
  const handleFeatureImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setFeatureImage(base64Image); // Lưu hình ảnh dạng base64
        handleData("featureImage", base64Image); // Cập nhật vào dữ liệu sản phẩm
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex-1 flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1 className="font-semibold">Images</h1>

      {/* Input cho Feature Image */}
      <div className="flex flex-col gap-1">
        <label
          className="text-gray-500 text-xs"
          htmlFor="product-feature-image"
        >
          Feature Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="product-feature-image"
          name="product-feature-image"
          accept="image/*"
          onChange={handleFeatureImageChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      {/* Hiển thị ảnh đã chọn */}
      {featureImage && (
        <div className="mt-2">
          <Image
            src={featureImage || "/default-image.jpg"}
            alt="Feature"
            width={600} // Điều chỉnh tùy vào layout
            height={160} // Tương ứng với h-40 (40 * 4 = 160px)
            className="w-full h-40 object-cover rounded-md border"
            priority
            onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
          />

        </div>
      )}
    </section>
  );
}
