"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Home, ChevronRight, MessageCircle, Calendar, BookOpen, Newspaper, Gift, Building2, List } from "lucide-react";
import Image from "next/image";
import { NEWS_ARTICLES } from "@/lib/news.mock";

// Category data
const CATEGORIES = [
  { slug: "knowledge", name: "Kiến thức", icon: BookOpen },
  { slug: "news", name: "Tin tức", icon: Newspaper },
  { slug: "promotion", name: "Khuyến mãi", icon: Gift },
  { slug: "project", name: "Dự án", icon: Building2 },
];

// Map slug to category name
const CATEGORY_MAP: Record<string, string> = {
  knowledge: "Kiến thức",
  news: "Tin tức",
  promotion: "Khuyến mãi",
  project: "Dự án",
};

function getTimeAgo(dateString: string): string {
  const published = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - published.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Hôm nay";
  if (diffInDays === 1) return "Hôm qua";
  if (diffInDays < 7) return `${diffInDays} ngày trước`;
  return published.toLocaleDateString("vi-VN");
}

// Category descriptions
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Kiến thức": "Khám phá các kiến thức bổ ích về vật liệu xây dựng, kỹ thuật thi công và xu hướng ngành",
  "Tin tức": "Cập nhật những tin tức mới nhất về thị trường vật liệu xây dựng và ngành công nghiệp",
  "Khuyến mãi": "Các chương trình ưu đãi và khuyến mãi hấp dẫn dành cho khách hàng",
  "Dự án": "Tham khảo các dự án tiêu biểu đã triển khai với sản phẩm của chúng tôi",
};

export default function NewsCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const categoryName = CATEGORY_MAP[slug] || "Tin tức";
  const [displayCount, setDisplayCount] = useState(12);

  // Get category info
  const categoryInfo = CATEGORIES.find(cat => cat.slug === slug);
  const CategoryIcon = categoryInfo?.icon || Newspaper;

  // Filter articles by category
  const categoryArticles = NEWS_ARTICLES.filter(
    (article) => article.category === categoryName
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const displayedArticles = categoryArticles.slice(0, displayCount);
  const hasMore = displayCount < categoryArticles.length;

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 12, categoryArticles.length));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/news" className="text-gray-600 hover:text-red-600 transition-colors">
            Tin tức
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{categoryName}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-8 py-12 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '32px 32px'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative flex items-center gap-6">
                <div className="hidden sm:flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <CategoryIcon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-4xl font-bold text-white">
                      {categoryName}
                    </h1>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                      {categoryArticles.length} bài viết
                    </span>
                  </div>
                  <p className="text-white/90 text-lg max-w-3xl">
                    {CATEGORY_DESCRIPTIONS[categoryName] || "Tổng hợp các bài viết trong danh mục này"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {categoryArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-500 text-lg mb-4">Chưa có bài viết nào trong danh mục này.</p>
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Quay lại trang tin tức
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content - Articles Grid */}
            <main className="lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {displayedArticles.map((article, index) => (
                <article
                  key={article.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/news/${article.slug}`}>
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading={index < 6 ? "eager" : "lazy"}
                      />
                      {article.featured && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Nổi bật
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight min-h-[3.5rem]">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={article.publishedAt}>
                            {getTimeAgo(article.publishedAt)}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{article.views}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={loadMore}
                    className="px-10 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Xem thêm {categoryArticles.length - displayCount} bài viết
                  </button>
                </div>
              )}
            </main>

            {/* Sidebar - Category Filter */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                {/* Category Navigation */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">
                      Danh mục
                    </h2>
                  </div>
                  <nav className="p-3">
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) => {
                        const count = NEWS_ARTICLES.filter(a => a.category === cat.name).length;
                        const IconComponent = cat.icon;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/news/category/${cat.slug}`}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-all ${
                              cat.slug === slug
                                ? "bg-red-600 text-white"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <IconComponent className="w-4 h-4" />
                              <span className="font-medium text-sm">{cat.name}</span>
                            </div>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                              cat.slug === slug
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {count}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/news"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 mt-3"
                    >
                      <List className="w-4 h-4" />
                      <span className="font-medium text-sm">Tất cả tin tức</span>
                    </Link>
                  </nav>
                </div>

                {/* Popular Posts */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">
                      Đọc nhiều nhất
                    </h2>
                  </div>
                  <div className="p-3">
                    <div className="space-y-3">
                      {NEWS_ARTICLES
                        .sort((a, b) => {
                          const viewsA = typeof a.views === 'string' ? parseInt(a.views) : a.views;
                          const viewsB = typeof b.views === 'string' ? parseInt(b.views) : b.views;
                          return viewsB - viewsA;
                        })
                        .slice(0, 5)
                        .map((article) => (
                          <Link
                            key={article.id}
                            href={`/news/${article.slug}`}
                            className="group flex gap-3 p-2 rounded-md hover:bg-gray-50 transition-all"
                          >
                            <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                                {article.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <MessageCircle className="w-3 h-3" />
                                <span>{article.views}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Latest Posts from Other Categories */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">
                      Bài viết mới
                    </h2>
                  </div>
                  <div className="p-3">
                    <div className="space-y-3">
                      {NEWS_ARTICLES
                        .filter((article) => article.category !== categoryName)
                        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                        .slice(0, 5)
                        .map((article) => (
                          <Link
                            key={article.id}
                            href={`/news/${article.slug}`}
                            className="group flex gap-3 p-2 rounded-md hover:bg-gray-50 transition-all"
                          >
                            <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                                {article.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <time dateTime={article.publishedAt}>
                                  {getTimeAgo(article.publishedAt)}
                                </time>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
