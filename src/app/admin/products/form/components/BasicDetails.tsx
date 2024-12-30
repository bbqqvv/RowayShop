"use client";

import { useCategories } from "@/hooks/categories/useCategories";

interface BasicDetailsProps {
  data: Record<string, any> | null;
  handleData: (key: string, value: any) => void;
  handleCategoryChange: (value: string) => void;
}

export default function BasicDetails({
  data,
  handleData,
  handleCategoryChange,
}: BasicDetailsProps) {
  const { categories, loading, error } = useCategories();

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
          onChange={(e) => {
            handleData("name", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
      {/* Short Description */}
      <div className="flex flex-col gap-1">
        <label
          className="text-gray-500 text-xs"
          htmlFor="product-short-description"
        >
          Short Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Short Description"
          id="product-short-description"
          name="product-short-description"
          value={data?.shortDescription ?? ""}
          onChange={(e) => {
            handleData("shortDescription", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
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
          onChange={(e) => {
            handleData("productCode", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
      {/* Category */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-category">
          Product Category <span className="text-red-500">*</span>
        </label>
        <select
          id="product-category"
          name="product-category"
          value={data?.categoryId ?? ""}
          onChange={(e) => {
            // Gửi ID category thay vì slug
            handleData("categoryId", e.target.value);
            handleCategoryChange(e.target.value); // Lưu slug cho các xử lý khác nếu cần
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="">Select Category</option>
          {loading && <option value="">Loading categories...</option>}
          {error && <option value="">{error}</option>}
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      {/* Stock */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-stock">
          Stock <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="number"
          placeholder="Enter Stock"
          id="product-stock"
          name="product-stock"
          value={data?.stock ?? ""}
          onChange={(e) => {
            handleData("stock", e.target.valueAsNumber);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
      {/* Price */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-price">
          Price <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="number"
          placeholder="Enter Price"
          id="product-price"
          name="product-price"
          value={data?.price ?? ""}
          onChange={(e) => {
            handleData("price", e.target.valueAsNumber);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      {/* Sale Price */}
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
          onChange={(e) => {
            handleData("salePercentage", e.target.valueAsNumber);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
      {/* Featured */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-featured">
          Featured <span className="text-red-500">*</span>
        </label>
        <select
          id="product-featured"
          name="product-featured"
          value={data?.featured ?? "no"}
          onChange={(e) => {
            handleData("featured", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      {/* Sale */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-sale">
          Sale <span className="text-red-500">*</span>
        </label>
        <select
          id="product-sale"
          name="product-sale"
          value={data?.sale ?? "no"}
          onChange={(e) => {
            handleData("sale", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </section>
  );
}
