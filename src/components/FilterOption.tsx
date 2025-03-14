import React, { useState, useCallback } from "react";
import Link from "next/link";

interface FilterOption {
  value: string;
  label: string;
  priceRange: string;
}

const Filters = () => {
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const handleChooseSizeColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSelectedPrices((prevState) => {
        if (e.target.checked) {
          return [...prevState, value];
        } else {
          return prevState.filter((price) => price !== value);
        }
      });
    },
    []
  );

  const priceOptions: FilterOption[] = [
    { value: "Dưới 500.000đ", label: "Dưới 500.000đ", priceRange: "0-499000" },
    {
      value: "500.000 ~ 1.000.000",
      label: "Từ 500.000 - 1.000.000",
      priceRange: "500000-1000000",
    },
    {
      value: "1.000.000 ~ 1.500.000",
      label: "Từ 1.000.000 - 1.500.000",
      priceRange: "1000000-1500000",
    },
    {
      value: "Trên 1.500.000đ",
      label: "Trên 1.500.000",
      priceRange: "1500000-20000000",
    },
  ];

  return (
    <div className="category-left hidden-md" id="filters">
      <div className="container pd-14">
        <div className="options-block pdtb-12 bor-b">
          <div className="fw-400 uppercase mgb-10">Kích cỡ</div>
          <ul className="options row size-pancake"></ul>
        </div>
        <div className="options-block pdtb-12 bor-b">
          <div className="fw-400 uppercase mgb-10">Màu sắc</div>
          <ul className="options row color-pancake"></ul>
        </div>

        <div className="pancake-ui-filter">
          <p>
            <label htmlFor="amount">KHOẢNG GIÁ:</label>
          </p>
          <ul className="options row price-pancake" id="price-pc">
            {priceOptions.map((option) => (
              <li key={option.value} className="col">
                <Link
                  href={`/categories/giay-andamp-dep?filter={tag:'',price:'${option.priceRange}'}&amp;sort_by=`}
                  title={option.priceRange}
                >
                  <a>
                    <label>
                      <input
                        type="checkbox"
                        value={option.value}
                        data-price={option.priceRange}
                        className="filled-in choosePrice"
                        onChange={handleChooseSizeColor}
                        checked={selectedPrices.includes(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;
