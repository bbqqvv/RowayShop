"use client";

import { ChangeEvent } from "react";
import Image from "next/image";

export default function Images({
  data,
  setMainImageUrl,
  setSecondaryImageUrls,
  handleData,
}: ImagesProps) {
  if (!data) return null; // Kiểm tra nếu data là null thì không render component

  const { mainImageUrl, secondaryImageUrls } = data; // Tránh truy cập trực tiếp vào data null

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setMainImageUrl(file);
      handleData("mainImageUrl", file);
    }
  };

  const handleSecondaryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const updatedSecondaryImages = [...secondaryImageUrls, ...files];
      setSecondaryImageUrls(updatedSecondaryImages);
      handleData("secondaryImageUrls", updatedSecondaryImages);
    }
  };

  const removeMainImage = () => {
    setMainImageUrl(null);
    handleData("mainImageUrl", "");
  };

  const removeSecondaryImage = (index: number) => {
    const updatedSecondaryImages = secondaryImageUrls.filter((_, i) => i !== index);
    setSecondaryImageUrls(updatedSecondaryImages);
    handleData("secondaryImageUrls", updatedSecondaryImages);
  };

  return (
    <section className="flex-1 flex flex-col gap-6 bg-white border p-6 rounded-xl shadow-md">
      <h2 className="font-semibold text-xl text-gray-800">Images</h2>

      {/* Main Image Section */}
      <div className="flex flex-col gap-3">
        <label className="text-gray-700 text-sm font-medium">Main Image</label>
        <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" id="main-image" />
        <button
          type="button"
          onClick={() => document.getElementById("main-image")?.click()}
          className="bg-gray-300 p-2 rounded-md text-sm"
        >
          Upload Main Image
        </button>

        {mainImageUrl && (
          <div className="relative w-32 h-32">
            <Image
              src={mainImageUrl instanceof File ? URL.createObjectURL(mainImageUrl) : mainImageUrl}
              alt="Main Image"
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-md shadow-sm border"
              priority
            />
            <button
              onClick={removeMainImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Additional Images Section */}
      <div className="flex flex-col gap-3">
        <label className="text-gray-700 text-sm font-medium">Additional Images</label>
        <input type="file" accept="image/*" multiple onChange={handleSecondaryImagesChange} className="hidden" id="additional-images" />
        <button
          type="button"
          onClick={() => document.getElementById("additional-images")?.click()}
          className="bg-gray-300 p-2 rounded-md text-sm"
        >
          Upload Additional Images
        </button>

        <div className="grid grid-cols-3 gap-4">
          {secondaryImageUrls.map((img, index) => (
            <div key={index} className="relative w-32 h-32">
              <Image
                src={img instanceof File ? URL.createObjectURL(img) : img}
                alt={`Secondary Image ${index}`}
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-md border border-gray-300"
              />
              <button
                onClick={() => removeSecondaryImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
