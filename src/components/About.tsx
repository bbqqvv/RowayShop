"use client";

import React from "react";

const ComfortFeature: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center max-w-screen-xl mx-auto p-6 gap-8 bg-gray-200 rounded-xl">
      {/* Left Section - Video */}
      <div className="relative w-full lg:w-1/2">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4" // Thay bằng link video thời trang của bạn
          autoPlay
          muted
          loop
          playsInline
          className="w-full rounded-lg object-cover shadow-xl"
        />
      </div>
      {/* Right Section - Content */}
      <div className="w-full lg:w-1/2 space-y-5">
        <h2 className="text-4xl font-bold text-gray-800 leading-tight">
          Redefine Your Style with Trendsetting Fashion
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Your wardrobe reflects your identity. Explore our exclusive fashion
          collection to elevate your style and make a statement wherever you
          go. Embrace the trends and exude confidence with every outfit.
        </p>

        {/* Feature List */}
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              ✓
            </div>
            <span className="text-gray-700 font-medium">Premium Quality</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              ✓
            </div>
            <span className="text-gray-700 font-medium">Trendy Designs</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              ✓
            </div>
            <span className="text-gray-700 font-medium">Comfortable Fit</span>
          </li>
        </ul>

        {/* Shop Now Button */}
        <button className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default ComfortFeature;
