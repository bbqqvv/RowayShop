import React, { useCallback } from "react";
import Image from 'next/image';

const VariantsTable: React.FC<VariantsTableProps> = ({
  variants,
  handleVariantChange,
  addVariant,
  removeVariant,
  categorySizes,
}) => {
  const handleFileChange = useCallback(
    (index: number, file: File | null) => {
      handleVariantChange(index, "imageUrl", file || "");
    },
    [handleVariantChange]
  );

  const handleSizeChange = useCallback(
    (index: number, sizeId: number) => {
      const currentSizes = variants[index].sizes;
      const isSizeSelected = currentSizes.some(
        (size) => size.sizeName === sizeId.toString()
      );
      const updatedSizes = isSizeSelected
        ? currentSizes.filter((size) => size.sizeName !== sizeId.toString())
        : [...currentSizes, { sizeName: sizeId.toString(), stock: 0, price: 0 }];
      handleVariantChange(index, "sizes", updatedSizes);
    },
    [handleVariantChange, variants]
  );

  const handleQuantityChange = useCallback(
    (index: number, sizeIndex: number, stock: number) => {
      const updatedVariant = [...variants];
      if (updatedVariant[index].sizes && updatedVariant[index].sizes[sizeIndex]) {
        updatedVariant[index].sizes[sizeIndex].stock = stock;
        handleVariantChange(index, "sizes", updatedVariant[index].sizes);
      }
    },
    [handleVariantChange, variants]
  );

  const handlePriceChange = useCallback(
    (index: number, sizeIndex: number, price: number) => {
      const updatedVariant = [...variants];
      if (updatedVariant[index].sizes && updatedVariant[index].sizes[sizeIndex]) {
        updatedVariant[index].sizes[sizeIndex].price = price;
        handleVariantChange(index, "sizes", updatedVariant[index].sizes);
      }
    },
    [handleVariantChange, variants]
  );

  const getImageUrl = (image: string | File | null): string => {
    if (!image) return ""; // Trả về chuỗi rỗng nếu image là null
    return typeof image === "string" ? image : URL.createObjectURL(image);
  };

  return (
    <section className="flex-1 flex flex-col gap-4 bg-white rounded-xl p-6 border shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-xl text-gray-800">Product Variants</h2>
        <button
          type="button"
          onClick={addVariant}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Add Variant
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-inner">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-center text-sm font-medium text-gray-600 border border-gray-200">Image</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-600 border border-gray-200">Size</th>
              <th className="px-6 py-3 bg-gray-100 text-center text-sm font-medium text-gray-600 border border-gray-200">Price</th>
              <th className="px-6 py-3 bg-gray-100 text-center text-sm font-medium text-gray-600 border border-gray-200">Stock</th>
              <th className="px-6 py-3 bg-gray-100 text-center text-sm font-medium text-gray-600 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500 border border-gray-200">
                  No variants added yet.
                </td>
              </tr>
            ) : (
              variants.map((variant, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center border border-gray-200">
                    <div className="flex flex-col items-center gap-4">
                      {!variant.imageUrl ? (
                        <label className="cursor-pointer flex items-center justify-center">
                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 transition duration-200">
                            <span className="text-gray-500 text-sm text-center">Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(index, e.target.files?.[0] || null)
                              }
                              className="hidden"
                            />
                          </div>
                        </label>
                      ) : (
                        <div className="relative group mx-auto w-24 h-24">
                          <Image
                            src={variant?.imageUrl ? getImageUrl(variant.imageUrl) : "/default-image.jpg"}
                            alt="Variant Image"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover rounded-lg shadow-md border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleFileChange(index, null)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200 opacity-0 group-hover:opacity-100"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      <div className="mt-2">
                        <input
                          type="text"
                          value={variant.color}
                          onChange={(e) =>
                            handleVariantChange(index, "color", e.target.value)
                          }
                          className="border px-4 py-2 rounded-lg w-40 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Enter Color"
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 border border-gray-200">
                    <div className="flex flex-wrap gap-2 flex-col">
                      {categorySizes.length > 0 ? (
                        categorySizes.map((size) => {
                          const isSelected = variant.sizes.some(
                            (selectedSize) =>
                              selectedSize.sizeName === size.id.toString()
                          );
                          return (
                            <button
                              key={size.id}
                              type="button"
                              onClick={() => handleSizeChange(index, size.id)}
                              className={`px-4 py-2 rounded-lg border ${isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700"
                                } hover:bg-blue-500 hover:text-white transition duration-200`}
                            >
                              {size.name}
                            </button>
                          );
                        })
                      ) : (
                        <span className="text-gray-400 text-sm italic">
                          No sizes available
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 border border-gray-200">
                    {variant.sizes.map((size, sizeIndex) => (
                      <div key={sizeIndex} className="mb-2">
                        <input
                          type="number"
                          min="0"
                          value={size.price}
                          onChange={(e) =>
                            handlePriceChange(
                              index,
                              sizeIndex,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="border px-4 py-2 rounded-lg w-40 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Enter Price"
                        />
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 border border-gray-200">
                    {variant.sizes.map((size, sizeIndex) => (
                      <div key={sizeIndex} className="mb-2">
                        <input
                          type="number"
                          min="0"
                          value={size.stock}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              sizeIndex,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="border px-4 py-2 rounded-lg w-40 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Enter Stock"
                        />
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-center border border-gray-200">
                    <button
                      onClick={() => removeVariant(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VariantsTable;