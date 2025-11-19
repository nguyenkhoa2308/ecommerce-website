"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Newspaper, Play } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  image: string;
  slug: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "Tôn nhựa – ngói nhựa PVC/ASA Phát Lộc",
    image: "/images/news/news-1.jpg",
    slug: "ton-nhua-ngoi-nhua-pvc-asa-phat-loc",
  },
  {
    id: 2,
    title: "Tại Sao Tôn Lợp Mái Nhà Công Nghiệp Sử Dụng Tôn Nhựa Lấy Sáng",
    image: "/images/news/news-2.jpg",
    slug: "tai-sao-ton-lop-mai-nha-cong-nghiep-su-dung-ton-nhua-lay-sang",
  },
  {
    id: 3,
    title: "Tôn Nhựa ASA – Cấm Năng Toàn Tấp: Cấu Tạo, Loại, Ứng Dụng",
    image: "/images/news/news-3.jpg",
    slug: "ton-nhua-asa-cam-nang-toan-tap",
  },
  {
    id: 4,
    title: "Nhà Máy Sản Xuất Ván Nhựa PVC Mộng Cho Ngành Xây Dựng",
    image: "/images/news/news-4.jpg",
    slug: "nha-may-san-xuat-van-nhua-pvc-mong",
  },
];

export default function VideoNewsSection() {
  return (
    <section className="container mx-auto px-8 py-12 my-16 bg-white rounded-2xl shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Section */}
        <div>
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-6">
            <Play className="w-6 h-6 fill-red-600 text-red-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">
              VIDEO GIỚI THIỆU
            </h2>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video giới thiệu Công ty TNHH Vật liệu nhiệt Phát Lộc"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* News Section */}
        <div>
          {/* Section Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">
                TIN TỨC MỚI NHẤT
              </h2>
            </div>

            <Link
              href="/news"
              className="group flex items-center text-center gap-1"
            >
              <span className="inline-block group-hover:text-red-700 group-hover:underline text-red-600 font-semibold rounded-lg transition-colors duration-300">
                Xem thêm bài tin
              </span>
              <ChevronRight className="w-5 h-5 text-red-600 group-hover:text-red-700 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-4 gap-4">
            {NEWS_ITEMS.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <div className="p-3">
                  <h3 className="text-xs md:text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                    {news.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
