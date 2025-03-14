import { useCallback } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { BasicDetailsProps, Product } from "../../../../../../types/type";

export default function BasicDetails({
  data,
  handleData,
  handleCategoryChange,
}: BasicDetailsProps) {
  const { categories, loading, error } = useCategories();

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;

    if (!categoryId || !categories || categories.length === 0) {
      console.error("Categories are not available or categoryId is invalid.");
      return;
    }

    const selectedCategory = categories.find((cat) => cat.id === parseInt(categoryId));

    if (!selectedCategory) {
      console.error("Selected category not found.");
      return;
    }

    const sizes = selectedCategory.sizes || [];
    handleData("categoryId", categoryId);
    handleCategoryChange(categoryId, sizes);

    console.log("data", data);
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Category Sizes:", sizes);
  };

  const handleInputChange = useCallback(
    (key: keyof Product) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      handleData(key, value);
    },
    [handleData]
  );

  const handleBooleanInputChange = useCallback(
    (key: keyof Product) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value === "true"; 
      handleData(key, value);
    },
    [handleData]
  );

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories: {error}</div>;
  }

  return (
    <section className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
      <h1 className="font-semibold">Basic Details</h1>
      {/* Product Name */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-name">
          Product Name <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="text"
          placeholder="Enter name"
          id="product-name"
          name="product-name"
          value={data?.name ?? ""}
          onChange={handleInputChange("name")}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* Short Description */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-short-description">
          Short Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Short Description"
          id="product-short-description"
          name="product-short-description"
          value={data?.shortDescription ?? ""}
          onChange={handleInputChange("shortDescription")}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* Product Code */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-code">
          Product Code <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="text"
          placeholder="Enter Product Code"
          id="product-code"
          name="product-code"
          value={data?.productCode ?? ""}
          onChange={handleInputChange("productCode")}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* Category */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-category">
          Product Category <span className="text-red-500">*</span>
        </label>
        {loading ? (
          <div>Loading categories...</div>
        ) : error ? (
          <div>Failed to load categories. Please try again later.</div>
        ) : (
          <select
            id="product-category"
            name="product-category"
            value={data?.categoryId ?? ""}
            onChange={handleCategorySelect}
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-colors"
            required
          >
            <option value="">Select Category</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={`${category.id}-${category.name}`} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        )}
      </div>
      {/* Sale Percentage */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-sale-percentage">
          Sale Percentage <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="number"
          placeholder="Enter Sale Percentage"
          id="product-sale-percentage"
          name="product-sale-percentage"
          value={data?.salePercentage ?? ""}
          onChange={handleInputChange("salePercentage")}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-between gap-2">
        {/* Featured */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-gray-500 text-xs" htmlFor="product-featured">
            Featured <span className="text-red-500">*</span>
          </label>
          <select
            id="product-featured"
            name="product-featured"
            value={data?.featured ? "true" : "false"} // Sử dụng giá trị boolean
            onChange={handleBooleanInputChange("featured")} // Sử dụng hàm xử lý boolean
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {/* Sale */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-gray-500 text-xs" htmlFor="product-sale">
            Sale <span className="text-red-500">*</span>
          </label>
          <select
            id="product-sale"
            name="product-sale"
            value={data?.sale ? "true" : "false"} // Sử dụng giá trị boolean
            onChange={handleBooleanInputChange("sale")} // Sử dụng hàm xử lý boolean
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {/* Active */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-gray-500 text-xs" htmlFor="product-active">
            Active <span className="text-red-500">*</span>{" "}
          </label>
          <select
            id="product-active"
            name="product-active"
            value={data?.active ? "true" : "false"} // Sử dụng giá trị boolean
            onChange={handleBooleanInputChange("active")} // Sử dụng hàm xử lý boolean
            className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </section>
  );
}