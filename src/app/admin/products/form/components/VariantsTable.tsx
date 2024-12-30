import React, { useCallback} from "react";

type Variant = {
  color: string;
  size: string[];
  stock: number;
  price: number;
};

interface VariantsTableProps {
  variants: Variant[];
  handleVariantChange: (index: number, key: keyof Variant, value: any) => void;
  addVariant: () => void;
  removeVariant: (index: number) => void;
  category: string;
}

const VariantsTable: React.FC<VariantsTableProps> = ({
  variants,
  handleVariantChange,
  addVariant,
  removeVariant,
  category,
}) => {
  // Handle size change for variants
  const handleSizeChange = (index: number, size: string, checked: boolean) => {
    const updatedSizes = checked
      ? [...(variants[index].size || []), size]
      : variants[index].size?.filter((s) => s !== size) || [];

    handleVariantChange(index, "size", updatedSizes); // Update sizes in the variant
  };
  // Handle price change for variants
  const handlePriceChange = (index: number, value: number) => {
    handleVariantChange(index, "price", value); // Update price in the variant
  };

  // Handle remove variant with confirmation for the last variant
  const handleRemoveClick = useCallback(
    (index: number) => {
      if (
        variants.length === 1 &&
        !confirm("Are you sure you want to delete the last variant?")
      ) {
        return;
      }
      removeVariant(index);
    },
    [variants, removeVariant]
  );

  return (
    <section className="flex-1 flex flex-col gap-4 bg-white rounded-xl p-6 border shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-xl text-gray-800">
          Product Variants
        </h2>
        <button
          type="button" // Ngăn hành động mặc định của nút
          onClick={addVariant}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Variant
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-inner">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-600">
                Color
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-600">
                Size
              </th>
              <th className="px-6 py-3 bg-gray-100 text-center text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="px-6 py-3 bg-gray-100 text-center text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {variants.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No variants added yet.
                </td>
              </tr>
            ) : (
              variants.map((variant, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) =>
                        handleVariantChange(index, "color", e.target.value)
                      }
                      className="border px-4 py-2 rounded-lg w-full outline-none"
                      placeholder="Enter Color"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2 flex-wrap">
                      {variant.size.length > 0 ? (
                        variant.size.map((size, sizeIndex) => (
                          <span
                            key={sizeIndex}
                            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                          >
                            {size}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No size selected</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handlePriceChange(index, parseFloat(e.target.value))
                      }
                      className="border px-4 py-2 rounded-lg w-full outline-none"
                      placeholder="Enter Price"
                    />
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleRemoveClick(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
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
