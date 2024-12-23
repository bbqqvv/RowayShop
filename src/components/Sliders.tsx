"use client";

import { Slider } from "@nextui-org/react";
import Link from "next/link";

// Định nghĩa kiểu cho sản phẩm
interface Product {
  id: string;
  title: string;
  shortDescription: string;
  featureImageURL: string;
}

// Định nghĩa kiểu cho props của FeaturedProductSlider
interface FeaturedProductSliderProps {
  featuredProducts: Product[];
}

export default function FeaturedProductSlider({
  featuredProducts,
}: FeaturedProductSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {featuredProducts?.map((product) => (
          <div key={product.id}>
            <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-24 md:py-20 w-full">
              <div className="flex-1 flex flex-col md:gap-10 gap-4">
                <h2 className="text-gray-500 text-xs md:text-base">
                  NEW FASHION
                </h2>
                <div className="flex flex-col gap-4">
                  <Link href={`/products/${product?.id}`}>
                    <h1 className="md:text-4xl text-xl font-semibold">
                      {product?.title}
                    </h1>
                  </Link>
                  <h1 className="text-gray-600 md:text-sm text-xs max-w-96 line-clamp-2">
                    {product?.shortDescription}
                  </h1>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Link href={`/products/${product?.id}`}>
                  <img
                    className="h-[14rem] md:h-[23rem]"
                    src={product?.featureImageURL}
                    alt={product?.title}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
