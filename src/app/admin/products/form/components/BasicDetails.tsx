import { useCallback, useState } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { BasicDetailsProps } from "types/type";
import { ProductRequest } from "types/product/product-request.type";

export default function BasicDetails({
  data,
  handleData,
  handleCategoryChange,
}: BasicDetailsProps) {
  const { categories, loading, error } = useCategories();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(data?.tags || []);

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
    handleData("categoryId", parseInt(categoryId));
    handleCategoryChange(parseInt(categoryId), sizes);
  };

  const handleInputChange = useCallback(
    (key: keyof ProductRequest) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      handleData(key, value);
    },
    [handleData]
  );

  const handleBooleanInputChange = useCallback(
    (key: keyof ProductRequest) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value === "true";
      handleData(key, value);
    },
    [handleData]
  );

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      handleData("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    handleData("tags", newTags);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error loading categories: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col gap-6 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 border-b pb-2">Chi tiết cơ bản</h1>

      {/* Product Name */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="product-name">
          Tên sản phẩm <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter product name"
          id="product-name"
          name="product-name"
          value={data?.name ?? ""}
          onChange={handleInputChange("name")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
          required
        />
      </div>

      {/* Short Description */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="product-short-description">
          Mô tả ngắn <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter short description"
          id="product-short-description"
          name="product-short-description"
          value={data?.shortDescription ?? ""}
          onChange={handleInputChange("shortDescription")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
          required
        />
      </div>

      {/* Product Code */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="product-code">
          Mã sản phẩm <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter product code"
          id="product-code"
          name="product-code"
          value={data?.productCode ?? ""}
          onChange={handleInputChange("productCode")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="product-category">
          Danh mục sản phẩm <span className="text-red-500">*</span>
        </label>
        <select
          id="product-category"
          name="product-category"
          value={data?.categoryId ?? ""}
          onChange={handleCategorySelect}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
          required
        >
          <option value="">Chọn danh mục</option>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <option key={`${category.id}-${category.name}`} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {/* Product Tags */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="product-tags">
          Tags sản phẩm
        </label>
        <div className="flex flex-wrap gap-2 items-center p-2 border border-gray-300 rounded-md min-h-[42px]">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
              >
                <span className="sr-only">Remove tag</span>
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Nhập tag và ấn Enter hoặc ,"
            id="product-tags"
            name="product-tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            className="flex-1 border-0 focus:ring-0 p-0 text-sm"
          />
        </div>
        <p className="text-xs text-gray-500">Nhập từ khóa liên quan đến sản phẩm để dễ tìm kiếm</p>
      </div>

      {/* Sale Percentage */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="product-sale-percentage">
          Tỷ lệ phần trăm bán hàng <span className="text-red-500">*</span>
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="number"
            placeholder="0"
            id="product-sale-percentage"
            name="product-sale-percentage"
            value={data?.salePercentage ?? ""}
            onChange={handleInputChange("salePercentage")}
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
      </div>

      {/* Toggle Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="product-featured">
            Đặc trưng
            <span className="text-red-500">*</span>
          </label>
          <select
            id="product-featured"
            name="product-featured"
            value={data?.featured ? "true" : "false"}
            onChange={handleBooleanInputChange("featured")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
            required
          >
            <option value="true">Phải</option>
            <option value="false">Không</option>
          </select>
        </div>

        {/* Sale */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="product-sale">
            Sale <span className="text-red-500">*</span>
          </label>
          <select
            id="product-sale"
            name="product-sale"
            value={data?.sale ? "true" : "false"}
            onChange={handleBooleanInputChange("sale")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
            required
          >
            <option value="true">Phải</option>
            <option value="false">Không</option>
          </select>
        </div>

        {/* Active */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700" htmlFor="product-active">
            Hoạt động <span className="text-red-500">*</span>
          </label>
          <select
            id="product-active"
            name="product-active"
            value={data?.active ? "true" : "false"}
            onChange={handleBooleanInputChange("active")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
            required
          >
            <option value="true">Phải</option>
            <option value="false">Không</option>
          </select>
        </div>
      </div>
    </section>
  );
}