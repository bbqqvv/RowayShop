import { ChangeEvent } from "react";

interface ImagesProps {
  data: {
    mainImageUrl: File | null | undefined; // Allow undefined here
    secondaryImageUrls: File[];
  };
  setMainImageUrl: (value: File | null) => void;
  setSecondaryImageUrls: (value: File[]) => void;
  handleData: (key: string, value: any) => void;
}

export default function Images({
  data,
  setMainImageUrl,
  setSecondaryImageUrls,
  handleData,
}: ImagesProps) {
  // Handle change for the main image (feature image)
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMainImageUrl(file); // Update local state for mainImageUrl
    handleData("mainImageUrl", file); // Update parent state
  };

  // Handle change for the additional images (secondaryImageUrls)
  const handleSecondaryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const updatedSecondaryImageUrls = [...data.secondaryImageUrls, ...files];
    setSecondaryImageUrls(updatedSecondaryImageUrls); // Update local state for secondaryImageUrls
    handleData("secondaryImageUrls", updatedSecondaryImageUrls); // Update parent state
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
            <img
              src={URL.createObjectURL(data.mainImageUrl)}
              alt="Main Image"
              className="w-32 h-32 object-cover"
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
              <img
                src={URL.createObjectURL(img)}
                alt={`Secondary Image ${index}`}
                className="w-32 h-32 object-cover"
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
