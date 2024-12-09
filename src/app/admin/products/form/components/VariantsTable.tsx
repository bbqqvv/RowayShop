import React, { useCallback } from "react";

// Define allowed categories
type Category =
  | "clothing"
  | "electronics"
  | "accessories"
  | "shoes"
  | "bags"
  | "hats";

interface Variant {
  color: string;
  size: string[];
  stock: number;
  price: number;
}

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
  // Define size options for each category
  const sizeOptions: Record<Category, string[]> = {
    clothing: ["S", "M", "L", "XL", "XXL"],
    electronics: [], // No size for electronics
    accessories: ["One Size"],
    shoes: ["36", "37", "38", "39", "40", "41"],
    bags: ["Small", "Medium", "Large"],
    hats: ["One Size", "M", "L"],
  };

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

  const handleSizeChange = (index: number, size: string, checked: boolean) => {
    const updatedSizes = checked
      ? [...(variants[index].size || []), size]
      : variants[index].size?.filter((s) => s !== size) || [];

    handleVariantChange(index, "size", updatedSizes);
  };

  return (
    <section className="flex-1 flex flex-col gap-4 bg-white rounded-xl p-6 border shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-xl text-gray-800">
          Product Variants
        </h2>
        <button
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
                    <div className="flex gap-3 flex-wrap">
                      {(sizeOptions[category as Category] || []).map((size) => (
                        <label
                          key={size}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={variant.size.includes(size)}
                            onChange={(e) =>
                              handleSizeChange(index, size, e.target.checked)
                            }
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
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
