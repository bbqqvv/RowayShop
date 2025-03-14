import { ChangeEvent } from "react";
import Image from 'next/image';

export default function Images({
  data,
  setMainImageUrl,
  setSecondaryImageUrls,
  handleData,
}: ImagesProps) {
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMainImageUrl(file);
    handleData("mainImageUrl", file);
  };

  // Handle change for the additional images (secondaryImageUrls)
  const handleSecondaryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const updatedSecondaryImageUrls = [...data.secondaryImageUrls, ...files];
    setSecondaryImageUrls(updatedSecondaryImageUrls);
    handleData("secondaryImageUrls", updatedSecondaryImageUrls);
  };

  return (
    <section className="flex-1 flex flex-col gap-6 bg-white border p-6 rounded-xl shadow-md">
      <h2 className="font-semibold text-xl text-gray-800 mb-4">Images</h2>
      {/* Main Image (Feature Image) Section */}
      <div className="flex flex-col gap-4">
        <label className="text-gray-700 text-sm font-medium">Main Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          className="hidden"
          id="main-image"
        />
        <button
          type="button"
          onClick={() => document.getElementById("main-image")?.click()}
          className="bg-gray-300 p-2 rounded"
        >
          Upload Main Image
        </button>
        {data.mainImageUrl && (
          <div>
            <Image
              src={
                data.mainImageUrl instanceof File
                  ? URL.createObjectURL(data.mainImageUrl)
                  : data.mainImageUrl || "/default-image.jpg"
              }
              alt="Main Image"
              width={128} // Tương ứng với w-32 (32 * 4 = 128px)
              height={128} // Tương ứng với h-32 (32 * 4 = 128px)
              className="w-32 h-32 object-cover rounded-md shadow-sm"
              priority
              onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
            />

            <button onClick={() => setMainImageUrl(null)}>Remove</button>
          </div>
        )}
      </div>

      {/* Additional Images (Secondary Image URLs) Section */}
      <div className="flex flex-col gap-4">
        <label className="text-gray-700 text-sm font-medium">
          Additional Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleSecondaryImagesChange}
          className="hidden"
          id="additional-images"
        />
        <button
          type="button"
          onClick={() => document.getElementById("additional-images")?.click()}
          className="bg-gray-300 p-2 rounded"
        >
          Upload Additional Images
        </button>
        <div className="grid grid-cols-3 gap-4">
          {data.secondaryImageUrls.map((img, index) => (
            <div key={index}>
              <Image
                src={img instanceof File ? URL.createObjectURL(img) : img || "/default-image.jpg"}
                alt={`Secondary Image ${index}`}
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-md border border-gray-300"
              />
              <button
                onClick={() =>
                  setSecondaryImageUrls(
                    data.secondaryImageUrls.filter((_, i) => i !== index)
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
