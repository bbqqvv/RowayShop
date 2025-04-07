"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { ImagesProps } from "types/type";

export default function Images({
  data,
  setMainImageUrl,
  setSecondaryImageUrls,
  handleData,
}: ImagesProps) {
  if (!data) return null;

  const { mainImageUrl, secondaryImageUrls } = data;

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setMainImageUrl(file);
      handleData("mainImageUrl", "");
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
    <section className="flex-1 flex flex-col gap-6 bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <h2 className="font-semibold text-xl text-gray-800 mb-2">Hình ảnh sản phẩm</h2>

      {/* Main Image Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh chính</label>
            <p className="text-xs text-gray-500">Đây sẽ là hình ảnh sản phẩm đặc trưng</p>
          </div>
          <div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleMainImageChange} 
              className="hidden" 
              id="main-image" 
            />
            <label
              htmlFor="main-image"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Tải lên
            </label>
          </div>
        </div>

        {mainImageUrl ? (
          <div className="relative w-full max-w-xs">
            <div className="aspect-square overflow-hidden rounded-lg border-2 border-dashed border-gray-200">
              <Image
                src={mainImageUrl instanceof File ? URL.createObjectURL(mainImageUrl) : mainImageUrl}
                alt="Main product image"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <button
              onClick={removeMainImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
              aria-label="Remove main image"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="main-image"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Tải lên một tập tin</span>
                  <input id="main-image" name="main-image" type="file" className="sr-only" />
                </label>
                <p className="pl-1">hoặc kéo và thả</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF lên tới 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Images Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh bổ sung</label>
            <p className="text-xs text-gray-500">Hình ảnh hỗ trợ cho sản phẩm của bạn</p>
          </div>
          <div>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleSecondaryImagesChange} 
              className="hidden" 
              id="additional-images" 
            />
            <label
              htmlFor="additional-images"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Upload
            </label>
          </div>
        </div>

        {secondaryImageUrls.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {secondaryImageUrls.map((img, index) => (
              <div key={index} className="relative aspect-square">
                <div className="w-full h-full overflow-hidden rounded-lg border border-gray-200">
                  <Image
                    src={img instanceof File ? URL.createObjectURL(img) : img}
                    alt={`Product image ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeSecondaryImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="additional-images"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Tải tệp lên</span>
                  <input id="additional-images" name="additional-images" type="file" className="sr-only" multiple />
                </label>
                <p className="pl-1">hoặc kéo và thả</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF lên tới 10MB</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}