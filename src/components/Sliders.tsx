"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

// Import CSS của slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSlider() {
  // Cấu hình cho react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  // Danh sách ảnh banner
  const banners = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
  ];

  return (
    <div className="slider-container w-full mx-auto">
      <Slider {...settings}>
        {banners.map((src, index) => (
          <div key={index} className="relative w-full h-[400px]">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
