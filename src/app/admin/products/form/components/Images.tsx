"use client";

import { ChangeEvent } from "react";
import { AiOutlineUpload } from "react-icons/ai";

interface ImagesProps {
  data: Record<string, any> | null;
  featureImage: string | null;
  setFeatureImage: (value: string | null) => void;
  imageList: string[];
  setImageList: (value: string[]) => void;
  handleData: (key: string, value: any) => void;
}

export default function Images({
  data,
  featureImage,
  setFeatureImage,
  imageList,
  setImageList,
  handleData,
}: ImagesProps) {
  // Handle feature image change
  const handleFeatureImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setFeatureImage(base64Image);
        handleData("featureImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle additional images change
  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          newImages.push(base64Image);

          if (newImages.length === files.length) {
            const updatedImageList = [...imageList, ...newImages];
            setImageList(updatedImageList);
            handleData("imageList", updatedImageList);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <section className="flex-1 flex flex-col gap-6 bg-white border p-6 rounded-xl shadow-md">
      <h2 className="font-semibold text-xl text-gray-800 mb-4">Images</h2>

      {/* Feature Image Section */}
      <div className="flex flex-col gap-4">
        <label
          className="text-gray-700 text-sm font-medium"
          htmlFor="product-feature-image"
        >
          Feature Image <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="file"
            id="product-feature-image"
            name="product-feature-image"
            accept="image/*"
            onChange={handleFeatureImageChange}
            className="hidden"
          />
          <button
            type="button"
            className="flex items-center justify-center bg-gray-300 text-gray-700 px-6 py-2 rounded-lg w-full transition duration-200"
            onClick={() =>
              document.getElementById("product-feature-image")?.click()
            }
          >
            <AiOutlineUpload className="mr-2 text-lg" />
            <span>Choose Feature Image</span>
          </button>
        </div>

        {/* Display selected feature image */}
        {featureImage && (
          <div className="relative mt-4">
            <img
              src={featureImage}
              alt="Feature Image"
              className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              onClick={() => setFeatureImage(null)}
              className="absolute top-0 right-0 bg-gray-600 text-white p-2 rounded-full text-xs hover:bg-gray-700 transition duration-200"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Additional Images Section */}
      <div className="flex flex-col gap-4">
        <label
          className="text-gray-700 text-sm font-medium"
          htmlFor="product-images"
        >
          Additional Images
        </label>
        <div className="relative">
          <input
            type="file"
            id="product-images"
            name="product-images"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="hidden"
          />
          <button
            type="button"
            className="flex items-center justify-center bg-gray-300 text-gray-700 px-6 py-2 rounded-lg w-full transition duration-200"
            onClick={() => document.getElementById("product-images")?.click()}
          >
            <AiOutlineUpload className="mr-2 text-lg" />
            <span>Choose Additional Images</span>
          </button>
        </div>

        {/* Display additional images */}
        {imageList.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imageList.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Additional Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  onClick={() =>
                    setImageList(imageList.filter((_, i) => i !== index))
                  }
                  className="absolute top-0 right-0 bg-gray-600 text-white p-2 rounded-full text-xs opacity-0 group-hover:opacity-100 transition duration-200"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
