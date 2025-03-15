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
    dots: true, // Hiển thị các dots (nút điều hướng)
    infinite: true, // Lặp lại khi đạt cuối
    speed: 500, // Thời gian chuyển động giữa các slide
    slidesToShow: 1, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số lượng slide di chuyển khi ấn nút
    autoplay: true, // Tự động chuyển slide
    autoplaySpeed: 4000, // Thời gian tự động chuyển slide (4s)
    arrows: false, // Ẩn mũi tên điều hướng
  };

  return (
    <div className="w-full ">
      <Slider {...settings}>
        {/* Các slide banner */}
        {["/banner1.jpg", "/banner1.jpg", "/banner1.jpg"].map((src, index) => (
          <div key={index} className="relative w-full h-[300px] sm:h-[500px]">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0} // Tải ảnh đầu tiên nhanh hơn
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
