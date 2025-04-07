import Banner from "@/components/Banner";
import Category from "@/components/Categories";
import { Features } from "@/components/Features";
import ProductList from "@/components/ProductList";
import BackToTopButton from "@/components/shared/BackToTopButton";
import BannerSlider from "@/components/Sliders";

// app/page.tsx
export default function HomePage() {
  return (
    <main className="bg-white">

      {/* Slider */}
      <div >
        <BannerSlider />
      </div>

      {/* Danh mục sản phẩm */}
      <div className="py-8 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <Category />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <ProductList />
      </div>

      {/* Banner */}
      <div >
        <Banner />
      </div>

      {/* Tính năng nổi bật */}
      <div >
        <Features />
      </div>
      <BackToTopButton />
    </main>
  );
}
