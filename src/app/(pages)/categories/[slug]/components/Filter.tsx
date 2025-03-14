"use client";

import { useState } from "react";

const Filter = () => {
  const [price, setPrice] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizes = ["XX-Small", "X-Small", "Small", "Large"];
  const priceRanges = [
    { label: "Giá dưới 100,000₫", value: 100000 },
    { label: "100,000₫ - 200,000₫", value: 200000 },
    { label: "200,000₫ - 300,000₫", value: 300000 },
    { label: "300,000₫ - 400,000₫", value: 400000 },
    { label: "Giá trên 400,000₫", value: 1000000 },
  ];

  const handlePriceChange = (value: number) => {
    setPrice((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleResetFilters = () => {
    setPrice([]);
    setSelectedSizes([]);
  };

  return (
    <div className="w-full sm:w-[18rem] p-6 bg-white border rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Categories</h3>
        {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((category) => (
          <div
            key={category}
            className="flex justify-between items-center py-2"
          >
            <span className="text-gray-600">{category}</span>
            <span className="text-gray-400">{">"}</span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Price</h3>
        <div className="flex flex-col gap-3">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={price.includes(range.value)}
                onChange={() => handlePriceChange(range.value)}
                className="h-5 w-5 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-gray-600">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Size</h3>
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="h-5 w-5 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-gray-600">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex gap-3 justify-between items-center">
        <button className="w-1/2 py-3 text-white bg-black rounded-md hover:bg-gray-800 transition-all duration-300">
          Apply Filter
        </button>

        {/* Reset Button */}
        <button
          onClick={handleResetFilters}
          className="w-1/2 py-3 text-white bg-gray-400 rounded-md hover:bg-gray-500 transition-all duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
