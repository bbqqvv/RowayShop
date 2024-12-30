import About from "@/components/About";
import Category from "@/components/Categories";
import ProductHighlight from "@/components/ProductHighlight";
import ProductList from "@/components/ProductList";
import BannerSlider from "@/components/Sliders";
import { NextUIProvider } from "@nextui-org/react";

// app/page.tsx
export default function HomePage() {
  return (
    <main className="">
        {/* Slider */}
        <BannerSlider />

        {/* Thêm background và padding */}
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <Category />
          </div>
        </div>

        {/* Giới hạn vùng hiển thị */}
        <div className="container mx-auto px-4">
          <ProductHighlight />
          <ProductList />
        </div>
        {/* Giới hạn vùng hiển thị */}
        <div className="container mx-auto px-4 p-10">
          <About />
        </div>
    </main>
  );
}
