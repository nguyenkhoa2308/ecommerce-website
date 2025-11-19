import ProductCard from "@/components/products/ProductCard";
import HeroSection from "./_components/HeroSection";
import StatsSection from "./_components/StatsSection";
import VideoNewsSection from "./_components/VideoNewsSection";
import PartnersSection from "./_components/PartnersSection";
import { FEATURED_PRODUCTS, CATEGORIES } from "@/lib/products.mock";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section className="container mx-auto px-8 py-8 bg-white rounded-2xl shadow-md my-16">
        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
            SẢN PHẨM NỔI BẬT
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-8 py-8 bg-white rounded-2xl shadow-md my-16">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">
            DANH SÁCH SẢN PHẨM
          </h2>
          {/* <p className="text-gray-600 text-sm md:text-base">
            Danh mục sản phẩm chính của Công ty Vật Liệu Nhiệt Phát Lóc
          </p> */}
        </div>

        {/* Categories Grid - Hiển thị 10 danh mục (2 hàng x 5 cột) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.slice(0, 10).map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Category Name */}
              <div className="p-4 text-center bg-white">
                <h3 className="text-sm md:text-base font-semibold text-red-500 group-hover:text-red-700 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Video & News Section */}
      <VideoNewsSection />

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
