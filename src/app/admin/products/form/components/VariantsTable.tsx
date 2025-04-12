import React, { useCallback } from "react";
import Image from 'next/image';
import { VariantsTableProps } from "types/type";

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
    if (!image) return "/default-product.png"; // Default placeholder image
    return typeof image === "string" ? image : URL.createObjectURL(image);
  };

  return (
    <section className="flex-1 flex flex-col gap-4 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-xl text-gray-800">Biến thể sản phẩm</h2>
          <p className="text-sm text-gray-500">Quản lý các tùy chọn màu sắc và kích thước khác nhau</p>
        </div>
        <button
          type="button"
          onClick={addVariant}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Variant
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh & Màu sắc</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Có sẵn kích thước</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá cả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hàng tồn kho              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variants.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center py-8">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="mt-2 text-sm font-medium">No variants added yet</p>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add your first variant
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              variants.map((variant, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {/* Image & Color Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                          {variant.imageUrl ? (
                            <>
                              <Image
                                src={getImageUrl(variant.imageUrl)}
                                alt="Variant Image"
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleFileChange(index, null)}
                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200 opacity-0 group-hover:opacity-100 transform translate-x-1/2 -translate-y-1/2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <label className="cursor-pointer flex items-center justify-center w-full h-full">
                              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Color name"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Sizes Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {categorySizes.length > 0 ? (
                        categorySizes.map((size) => {
                          const isSelected = variant.sizes.some(
                            (selectedSize) => selectedSize.sizeName === size.id.toString()
                          );
                          return (
                            <div key={size.id} className="relative">
                              <button
                                type="button"
                                onClick={() => handleSizeChange(index, size.id)}
                                className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${isSelected
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                                  } transition duration-150 ease-in-out`}
                              >
                                {size.name}
                                {isSelected && (
                                  <span className="ml-1 text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                )}
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-sm text-gray-500 italic">Không có kích thước có sẵn</span>
                      )}
                    </div>
                  </td>

                  {/* Pricing Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {variant.sizes.length > 0 ? (
                        variant.sizes.map((size, sizeIndex) => (
                          <div key={sizeIndex} className="flex items-center">
                            <span className="mr-2 text-xs text-gray-500 w-8">
                              {categorySizes.find(s => s.id.toString() === size.sizeName)?.name || 'Size'}:
                            </span>
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 text-xs">$</span>
                              </div>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={size.price}
                                onChange={(e) => handlePriceChange(index, sizeIndex, parseFloat(e.target.value) || 0)}
                                className="pl-7 w-full text-sm border border-gray-300 rounded-md py-1.5 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 italic">Chọn size đầu tiên</span>
                      )}
                    </div>
                  </td>

                  {/* Inventory Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {variant.sizes.length > 0 ? (
                        variant.sizes.map((size, sizeIndex) => (
                          <div key={sizeIndex} className="flex items-center">
                            <span className="mr-2 text-xs text-gray-500 w-8">
                              {categorySizes.find(s => s.id.toString() === size.sizeName)?.name || 'Size'}:
                            </span>
                            <input
                              type="number"
                              min="0"
                              value={size.stock}
                              onChange={(e) => handleQuantityChange(index, sizeIndex, parseInt(e.target.value) || 0)}
                              className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0"
                            />
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 italic">Chọn sai đầu tiên</span>
                      )}
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => removeVariant(index)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Xóa
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