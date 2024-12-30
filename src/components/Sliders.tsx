"use client";
import React from "react";
import Slider from "react-slick"; // import react-slick

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
    arrows: false, // Hiển thị các mũi tên điều hướng
  };

  return (
    <div className="slider-container w-full mx-auto">
      <Slider {...settings}>
        {/* Các slide banner */}
        <div className="w-full h-full">
          <img
            className="w-full h-full object-contain"
            src="banner1.jpg"
            alt="Banner 1"
          />
        </div>
        <div className="w-full h-full">
          <img
            className="w-full h-full object-contain"
            src="banner1.jpg"
            alt="Banner 2"
          />
        </div>
        <div className="w-full h-full">
          <img
            className="w-full h-full object-contain"
            src="banner1.jpg"
            alt="Banner 3"
          />
        </div>
        {/* Thêm nhiều slide nếu cần */}
      </Slider>
    </div>
  );
}
