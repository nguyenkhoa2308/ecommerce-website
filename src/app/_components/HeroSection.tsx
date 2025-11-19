"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

// Dữ liệu danh mục
const categories = [
  {
    id: 1,
    name: "Tôn nhựa - Ngói nhựa PVC/ASA",
    slug: "ton-ngoi-nhua",
    brands: [
      "Eurolines",
      "OneDeck",
      "Nippon",
      "Gạch Đỏ",
      "Bình Minh",
      "Tiền Phong",
    ],
    hotProducts: [
      {
        name: "Tôn Nhựa Eurolines PVC/ASA 5 Sóng",
        price: 85000,
        originalPrice: 120000,
        image: "/images/ton-eurolines-1.jpg",
      },
      {
        name: "Ngói Nhựa OneDeck Premium",
        price: 95000,
        originalPrice: 135000,
        image: "/images/ton-eurolines-2.jpg",
      },
    ],
    bestSellers: [
      "Tôn Eurolines 7 Sóng",
      "Ngói PVC Màu Xanh",
      "Tôn 11 Sóng Cao Cấp",
    ],
  },
  {
    id: 2,
    name: "Tấm nhựa PVC/PP/PE",
    slug: "tam-nhua-ky-thuat",
    brands: ["Palram", "Makrolon", "Danpla", "Sunlite", "Lexan", "Tuflite"],
    hotProducts: [
      {
        name: "Tấm Nhựa PVC Trong Suốt",
        price: 75000,
        originalPrice: 95000,
        image: "/images/ton-eurolines-1.jpg",
      },
      {
        name: "Tấm PP Danpla Chống Tĩnh Điện",
        price: 65000,
        originalPrice: 85000,
        image: "/images/ton-eurolines-2.jpg",
      },
    ],
    bestSellers: [
      "Tấm PVC Trắng Sữa",
      "Tấm PP Carton Plastic",
      "Tấm PE Foam Board",
    ],
  },
  {
    id: 3,
    name: "Tấm lợp lấy sáng PC",
    slug: "tam-lop-lay-sang-pc",
    brands: [
      "Polycarbonate",
      "Makrolon",
      "Lexan",
      "Sunlite",
      "Tuflite",
      "Palram",
    ],
    hotProducts: [
      {
        name: "Tấm Lợp PC Polycarbonate",
        price: 125000,
        originalPrice: 165000,
        image: "/images/ton-eurolines-1.jpg",
      },
      {
        name: "Tấm PC Rỗng Ruột Ong",
        price: 110000,
        originalPrice: 145000,
        image: "/images/ton-eurolines-2.jpg",
      },
    ],
    bestSellers: ["Tấm PC Đặc 3mm", "Tấm PC Rỗng 6mm", "Tấm PC Chống UV"],
  },
  {
    id: 4,
    name: "Tấm ốp tường PVC",
    slug: "tam-pvc-phat-loc",
    brands: ["Phát Lộc", "Bình Minh", "Tiền Phong", "Hoa Sen", "Nam Hoa"],
    hotProducts: [
      {
        name: "Tấm PVC Vân Gỗ Cao Cấp",
        price: 85000,
        originalPrice: 110000,
        image: "/images/ton-eurolines-1.jpg",
      },
      {
        name: "Tấm PVC Vân Đá Marble",
        price: 90000,
        originalPrice: 115000,
        image: "/images/ton-eurolines-2.jpg",
      },
    ],
    bestSellers: ["Tấm PVC Vân Gỗ Sồi", "Tấm PVC Vân Đá", "Tấm PVC Trơn"],
  },
  {
    id: 5,
    name: "Sản phẩm khác",
    slug: "products",
    brands: ["Phát Lộc", "Đa Dạng"],
    hotProducts: [
      {
        name: "Giấy Bạc Phủ Tôn Xốp PU",
        price: 45000,
        originalPrice: 60000,
        image: "/images/ton-eurolines-1.jpg",
      },
      {
        name: "Thảm Sàn Vân Cao Su PVC",
        price: 55000,
        originalPrice: 75000,
        image: "/images/ton-eurolines-2.jpg",
      },
    ],
    bestSellers: ["Pallet Gạch", "Thảm Sàn PVC", "Giấy Bạc Cách Nhiệt"],
  },
];

// Dữ liệu carousel
const carouselImages = [
  {
    id: 1,
    image: "/images/banner1.webp",
    title: "Nhiệt phát lộc",
  },
  {
    id: 2,
    image: "/images/banner2.webp",
    title: "iPhone 17 Pro Max",
  },
  {
    id: 3,
    image: "/images/banner3.webp",
    title: "MacBook Pro M4",
  },
];

export default function HeroSection() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const activeCategory = hoveredCategory
    ? categories.find((c) => c.id === hoveredCategory) ?? null
    : null;

  return (
    <div className="container mx-auto px-4 py-4 mt-4">
      {/* Bọc toàn bộ hero để làm mốc cho submenu absolute */}
      <div className="relative">
        {/* GRID CHÍNH */}
        <div className="grid grid-cols-16 gap-4">
          {/* Sidebar - 3 cột */}
          <div className="col-span-3 relative z-20">
            <div
              className="bg-white rounded-lg shadow-md overflow-visible"
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                >
                  <Link
                    href={category.slug === "products" ? "/products" : `/category/${category.slug}`}
                    className={`flex items-center justify-between px-4 py-3 transition-colors border-b border-gray-100 group ${
                      hoveredCategory === category.id
                        ? "bg-red-50"
                        : "hover:bg-red-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium ${
                          hoveredCategory === category.id
                            ? "text-[#ed1c24]"
                            : "text-gray-700 group-hover:text-[#ed1c24]"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        hoveredCategory === category.id
                          ? "text-[#ed1c24]"
                          : "text-gray-400 group-hover:text-[#ed1c24]"
                      }`}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* SUBMENU: chiếm toàn bộ phần còn lại (13 cột) */}
            {activeCategory && (
              <div
                className="absolute top-0 left-full -ml-2 pl-6 h-[440px] z-30"
                style={{
                  width: "calc((14 / 3) * 100% + 16px)",
                }}
                onMouseEnter={() => setHoveredCategory(activeCategory.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="bg-white shadow-2xl rounded-lg border border-gray-200 p-6 h-full overflow-y-auto">
                  <div className="grid grid-cols-3 gap-6 h-full">
                    {/* Column 1: Hãng sản phẩm */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4 text-base">
                        Hãng sản phẩm
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {activeCategory.brands.map((brand, idx) => (
                          <Link
                            key={idx}
                            href={`/brand/${brand.toLowerCase()}`}
                            className="text-sm text-gray-600 hover:text-[#ed1c24] transition-colors py-1"
                          >
                            {brand}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Dòng sản phẩm HOT */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4 text-base">
                        Dòng sản phẩm HOT
                      </h3>
                      <div className="space-y-3">
                        {activeCategory.hotProducts.map((product, idx) => (
                          <Link
                            key={idx}
                            href={`/product/${idx}`}
                            className="flex items-center gap-3 group"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 group-hover:text-[#ed1c24] transition-colors truncate">
                                {product.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-semibold text-red-600">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    product.price
                                  )}
                                  đ
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    product.originalPrice
                                  )}
                                  đ
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Bán chạy nhất */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4 text-base">
                        Bán chạy nhất
                      </h3>
                      <ul className="space-y-2">
                        {activeCategory.bestSellers.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              href={`/product/${item.toLowerCase()}`}
                              className="text-sm text-gray-600 hover:text-[#ed1c24] transition-colors block py-1"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Carousel - 13 cột */}
          <div className="col-span-13 relative h-full" id="carousel-section">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md h-[440px] relative">
              {carouselImages.map((slide, index) => (
                <span
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </span>
              ))}

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
