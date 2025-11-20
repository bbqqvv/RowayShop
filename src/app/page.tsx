// app/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Category from "@/components/Categories";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductList from "@/components/ProductList";
import ProductHighlight from "@/components/ProductHighlight";

// Lazy-load heavy, non-critical components to improve TTI
const Banner = dynamic(() => import("@/components/Banner"), { ssr: false });
const BannerSlider = dynamic(() => import("@/components/Sliders"), { ssr: false });
const Features = dynamic(() => import("@/components/Features").then(m => m.Features), { ssr: false });
const BackToTopButton = dynamic(() => import("@/components/shared/BackToTopButton"), { ssr: false });

export default function HomePage() {
  const [filterType, setFilterType] = useState<"product" | "featured" | null>("product");

  return (
    <main className="bg-white">
      {/* Hero Slider */}
      <section aria-label="Promotions">
        <BannerSlider />
      </section>

      {/* Categories */}
      <section aria-label="Categories" className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-4">Danh mục nổi bật</h2>
          <Category />
        </div>
      </section>

      {/* Product highlight / filters */}
      <section aria-label="Highlights" className="py-6 border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductHighlight filterType={filterType} setFilterType={setFilterType} />
        </div>
      </section>

      {/* Product list */}
      <section aria-label="Products" className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filterType === "product" && <ProductList />}
          {filterType === "featured" && <FeaturedProduct />}
          {!filterType && (
            <div className="space-y-12">
              <ProductList />
              <FeaturedProduct />
            </div>
          )}
        </div>
      </section>

      {/* Mid-page banner CTA */}
      <section aria-label="Brand banner" className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Banner />
        </div>
      </section>

      {/* Feature list */}
      <section aria-label="Why choose us" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Features />
        </div>
      </section>

      <BackToTopButton />
    </main>
  );
}
