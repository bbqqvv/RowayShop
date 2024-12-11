import React, { useCallback, useMemo } from "react";

// Define the Variant type here if not already defined
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
  category: string; // Ensure category is passed as a prop
}

// Define allowed categories
type Category =
  | "Shirt"
  | "T-shirt"
  | "Polo shirt"
  | "Pants"
  | "Shoes"
  | "Jacket";

// Chuyển đổi slug thành category chuẩn
const normalizeCategory = (category: string): Category => {
  switch (category.toLowerCase()) {
    case "so-mi":
    case "shirt":
      return "Shirt";
    case "ao-thun":
    case "t-shirt":
      return "T-shirt";
    case "ao-polo":
    case "polo-shirt":
      return "Polo shirt";
    case "quan":
    case "pants":
      return "Pants";
    case "giay-dep":
    case "shoes":
      return "Shoes";
    case "ao-khoac":
    case "jacket":
      return "Jacket";
    default:
      return "Shirt"; // Default category if no match
  }
};

const VariantsTable: React.FC<VariantsTableProps> = ({
  variants,
  handleVariantChange,
  addVariant,
  removeVariant,
  category,
}) => {
  // Chuyển đổi category thành giá trị chuẩn
  const normalizedCategory = useMemo(
    () => normalizeCategory(category),
    [category]
  );

  // Define size options for each category using useMemo
  const sizeOptions = useMemo(() => {
    switch (normalizedCategory) {
      case "Shirt":
        return ["S", "M", "L", "XL", "XXL"];
      case "T-shirt":
        return ["S", "M", "L", "XL"];
      case "Polo shirt":
        return ["S", "M", "L", "XL"];
      case "Pants":
        return ["28", "30", "32", "34", "36"];
      case "Shoes":
        return ["36", "37", "38", "39", "40", "41"];
      case "Jacket":
        return ["S", "M", "L", "XL"];
      default:
        return []; // Return empty array if no match found
    }
  }, [normalizedCategory]); // Recompute sizeOptions when normalizedCategory changes

  // Handle size change for variants
  const handleSizeChange = (index: number, size: string, checked: boolean) => {
    const updatedSizes = checked
      ? [...(variants[index].size || []), size]
      : variants[index].size?.filter((s) => s !== size) || [];

    handleVariantChange(index, "size", updatedSizes); // Update sizes in the variant
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
                      {sizeOptions.map((size) => (
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
