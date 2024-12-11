"use client";

import { useCategories } from "@/hooks/categories/useCategories";

interface BasicDetailsProps {
  data: Record<string, any> | null;
  handleData: (key: string, value: any) => void;
  handleCategoryChange: (value: string) => void; // Prop cho handleCategoryChange
}
export default function BasicDetails({
  data,
  handleData,
  handleCategoryChange,
}: BasicDetailsProps) {
  const { categories, loading, error } = useCategories(); // Sử dụng hook để lấy danh sách category từ API
  console.log("Danh sách category:", categories);
  return (
    <section className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
      <h1 className="font-semibold">Basic Details</h1>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-title">
          Product Name <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          id="product-title"
          name="product-title"
          value={data?.title ?? ""}
          onChange={(e) => {
            handleData("title", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
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
          value={data?.shortDesciption ?? ""}
          onChange={(e) => {
            handleData("shortDesciption", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-category">
          Product Category <span className="text-red-500">*</span>
        </label>
        <select
          id="product-category"
          name="product-category"
          value={data?.categoryId ?? ""}
          onChange={(e) => {
            handleData("categoryId", e.target.value); // Cập nhật dữ liệu categoryId
            handleCategoryChange(e.target.value); // Truyền giá trị category xuống component cha
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="">Select Category</option>
          {loading && <option value="">Loading categories...</option>}
          {error && <option value="">{error}</option>}
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
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

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-sale-price">
          Sale Price <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="number"
          placeholder="Enter Sale Price"
          id="product-sale-price"
          name="product-sale-price"
          value={data?.salePrice ?? ""}
          onChange={(e) => {
            handleData("salePrice", e.target.valueAsNumber);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-sale-price">
          Featured <span className="text-red-500">*</span>
        </label>
        <select
          id="featured"
          name="featured"
          className="border px-4 py-2 rounded-lg outline-none"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </section>
  );
}
