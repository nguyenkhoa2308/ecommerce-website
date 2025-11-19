"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import Image from "next/image";
import { NEWS_ARTICLES, getFeaturedNews } from "@/lib/news.mock";

// Định nghĩa các section theo chủ đề vật liệu
const MATERIAL_SECTIONS = [
  {
    id: "ton-nhua",
    name: "Kiến thức",
    category: "Kiến thức",
    slug: "knowledge",
  },
  {
    id: "tam-lop",
    name: "Tin tức",
    category: "Tin tức",
    slug: "news",
  },
  {
    id: "khuyen-mai",
    name: "Khuyến mãi",
    category: "Khuyến mãi",
    slug: "promotion",
  },
  {
    id: "du-an",
    name: "Dự án",
    category: "Dự án",
    slug: "project",
  },
];

// Helper function để tính thời gian đã đăng
const getTimeAgo = (publishedAt: string) => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Vừa xong";
  if (diffInHours < 24) return `${diffInHours}h trước`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} ngày trước`;
  return published.toLocaleDateString("vi-VN");
};

export default function NewsPage() {
  const featuredNews = getFeaturedNews();
  const topNews = featuredNews[0];
  const secondaryNews = NEWS_ARTICLES.slice(1, 4);

  // State for infinite scroll
  const [displayedLatestCount, setDisplayedLatestCount] = useState(18);
  const [displayedSectionCounts, setDisplayedSectionCounts] = useState<Record<string, number>>({
    "Kiến thức": 6,
    "Tin tức": 6,
    "Khuyến mãi": 6,
    "Dự án": 6,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showBottomSections, setShowBottomSections] = useState(false);
  const [isLoadingBottomSections, setIsLoadingBottomSections] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const bottomSectionsObserver = useRef<HTMLDivElement>(null);

  // Tin mới nhất (không phân danh mục)
  const latestNews = [...NEWS_ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, displayedLatestCount);

  // Lấy tin theo từng section với số lượng động
  const getNewsBySection = (category: string) => {
    const limit = displayedSectionCounts[category] || 4;
    return NEWS_ARTICLES.filter((article) => article.category === category).slice(0, limit);
  };

  // Load more content function
  const loadMoreContent = useCallback(() => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      // Increase latest news count
      setDisplayedLatestCount((prev) => Math.min(prev + 4, NEWS_ARTICLES.length));

      // Increase section counts
      setDisplayedSectionCounts((prev) => {
        const newCounts = { ...prev };
        MATERIAL_SECTIONS.forEach((section) => {
          const totalInCategory = NEWS_ARTICLES.filter(
            (article) => article.category === section.category
          ).length;
          newCounts[section.category] = Math.min(
            (prev[section.category] || 4) + 2,
            totalInCategory
          );
        });
        return newCounts;
      });

      setIsLoading(false);
    }, 500);
  }, []);

  // Check if all content has been loaded
  const hasMoreContent = useCallback(() => {
    // Check if latest news can still load more
    if (displayedLatestCount < NEWS_ARTICLES.length) return true;

    // Check if any section can still load more
    return MATERIAL_SECTIONS.some((section) => {
      const totalInCategory = NEWS_ARTICLES.filter(
        (article) => article.category === section.category
      ).length;
      return (displayedSectionCounts[section.category] || 4) < totalInCategory;
    });
  }, [displayedLatestCount, displayedSectionCounts]);

  // Observer for bottom sections - show when user scrolls to middle section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !showBottomSections && !isLoadingBottomSections) {
          setIsLoadingBottomSections(true);
          // Simulate loading delay
          setTimeout(() => {
            setShowBottomSections(true);
            setIsLoadingBottomSections(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (bottomSectionsObserver.current) {
      observer.observe(bottomSectionsObserver.current);
    }

    return () => observer.disconnect();
  }, [showBottomSections, isLoadingBottomSections]);

  // Infinite scroll effect
  useEffect(() => {
    if (!hasMoreContent()) return; // Don't observe if no more content

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMoreContent()) {
          loadMoreContent();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMoreContent, loadMoreContent]);

  return (
    <>
      {/* SEO Meta Tags - Would be moved to metadata in app directory */}
      <title>Tin Tức Vật Liệu Xây Dựng - Kiến Thức & Xu Hướng Mới Nhất</title>

      <article className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Breadcrumb Schema - SEO friendly */}
          <nav
            className="text-xs mb-6 flex items-center gap-2 text-gray-600"
            aria-label="Breadcrumb"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                href="/"
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
                itemProp="item"
              >
                <Home className="w-3.5 h-3.5" />
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </span>
            <span className="text-gray-400">/</span>
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-900 font-medium" itemProp="name">Tin tức</span>
              <meta itemProp="position" content="2" />
            </span>
          </nav>

          {/* Page Header */}
          <header className="mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Tin Tức & Kiến Thức
            </h1>
          </header>

          {/* Top Featured Story - Horizontal Layout */}
          {topNews && (
            <section className="mb-6" itemScope itemType="https://schema.org/NewsArticle">
              <Link href={`/news/${topNews.slug}`} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Image Left */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={topNews.image}
                      alt={topNews.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      itemProp="image"
                    />
                  </div>
                  {/* Content Right */}
                  <div className="flex flex-col justify-center">
                    <h2
                      className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors leading-tight"
                      itemProp="headline"
                    >
                      {topNews.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">
                      {topNews.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <time dateTime={topNews.publishedAt}>
                        {getTimeAgo(topNews.publishedAt)}
                      </time>
                      <span>•</span>
                      <span>{topNews.category}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{topNews.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* 3 Secondary News - Horizontal Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
            {secondaryNews.map((article) => (
              <article
                key={article.id}
                className="group"
                itemScope
                itemType="https://schema.org/NewsArticle"
              >
                <Link href={`/news/${article.slug}`} className="flex gap-3">
                  {/* Small Image */}
                  <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      itemProp="image"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3 mb-1 leading-snug"
                      itemProp="headline"
                    >
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <time dateTime={article.publishedAt}>
                        {getTimeAgo(article.publishedAt)}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </section>

          {/* Main Layout: Left Sidebar (1/3) + Right Content (2/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Tin mới nhất (1/3) */}
            <aside className="lg:col-span-4">
              {/* Mới nhất */}
              <div className="border-b-2 border-blue-600 mb-4">
                <h2 className="text-xl font-bold text-gray-900 pb-2">
                  Mới nhất
                </h2>
              </div>
              <div className="space-y-4">
                {latestNews.slice(0, 18).map((article) => (
                  <article
                    key={article.id}
                    className="group pb-4 border-b border-gray-100 last:border-0"
                    itemScope
                    itemType="https://schema.org/NewsArticle"
                  >
                    <Link href={`/news/${article.slug}`} className="flex gap-3">
                      {/* Image */}
                      <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden bg-gray-100">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          itemProp="image"
                        />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3 mb-1 leading-snug"
                          itemProp="headline"
                        >
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <time dateTime={article.publishedAt}>
                            {getTimeAgo(article.publishedAt)}
                          </time>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </aside>

            {/* Right Content - Sections theo danh mục (2/3) */}
            <main className="lg:col-span-8">
              <div className="space-y-10">
                {MATERIAL_SECTIONS.map((section) => {
                  const sectionNews = getNewsBySection(section.category);
                  // Chỉ hiển thị section nếu có ít nhất 2 bài (1 bài chính + ít nhất 1 bài phụ)
                  if (sectionNews.length < 2) return null;

                  const mainArticle = sectionNews[0];
                  const sideArticles = sectionNews.slice(1, 6);

                  return (
                    <section
                      key={section.id}
                      className="pb-8 border-b border-gray-200 last:border-0"
                    >
                      {/* Section Header - Clickable */}
                      <div className="mb-5 flex items-center justify-between pb-3 border-b-2 border-blue-600">
                        <Link
                          href={`/news/category/${section.slug}`}
                          className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors"
                        >
                          {section.name}
                        </Link>
                        <Link
                          href={`/news/category/${section.slug}`}
                          className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                          Xem tất cả →
                        </Link>
                      </div>

                      {/* Content Grid: 2 Columns - Simple */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: Main Article with Image */}
                        <article itemScope itemType="https://schema.org/NewsArticle">
                          <Link href={`/news/${mainArticle.slug}`} className="group block">
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3">
                              <Image
                                src={mainArticle.image}
                                alt={mainArticle.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                itemProp="image"
                              />
                            </div>
                            <h3
                              className="text-base font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug"
                              itemProp="headline"
                            >
                              {mainArticle.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                              {mainArticle.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <time dateTime={mainArticle.publishedAt}>
                                {getTimeAgo(mainArticle.publishedAt)}
                              </time>
                            </div>
                          </Link>
                        </article>

                        {/* Right: Side Articles - Text Only */}
                        <div className="space-y-4">
                          {sideArticles.map((article) => (
                            <article
                              key={article.id}
                              className="pb-4 border-b border-gray-100 last:border-0"
                              itemScope
                              itemType="https://schema.org/NewsArticle"
                            >
                              <Link href={`/news/${article.slug}`} className="group block">
                                <h4
                                  className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1 leading-snug"
                                  itemProp="headline"
                                >
                                  {article.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <time dateTime={article.publishedAt}>
                                    {getTimeAgo(article.publishedAt)}
                                  </time>
                                </div>
                              </Link>
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            </main>
          </div>

          {/* Observer target for bottom sections */}
          <div ref={bottomSectionsObserver} className="h-1"></div>

          {/* Loading indicator for bottom sections */}
          {isLoadingBottomSections && (
            <div className="py-12 flex justify-center">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-base font-medium">Đang tải thêm nội dung...</span>
              </div>
            </div>
          )}

          {/* Bottom sections - lazy loaded when user scrolls to middle section */}
          {showBottomSections && (
            <>
              {/* Full Width Section - Có thể bạn quan tâm */}
              <section className="mt-8 pt-8 border-t border-gray-200">
            <div className="border-b-2 border-green-600 mb-6">
              <h2 className="text-xl font-bold text-gray-900 pb-3">
                Có thể bạn quan tâm
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {NEWS_ARTICLES.slice(0, 20).map((article) => (
                <article
                  key={article.id}
                  className="group"
                  itemScope
                  itemType="https://schema.org/NewsArticle"
                >
                  <Link href={`/news/${article.slug}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        itemProp="image"
                      />
                    </div>
                    <h3
                      className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3 mb-2 leading-snug"
                      itemProp="headline"
                    >
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <time dateTime={article.publishedAt}>
                        {getTimeAgo(article.publishedAt)}
                      </time>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Video & Hình ảnh Section */}
          <section className="mt-8 pt-8 border-t border-gray-200">
            <div className="border-b-2 border-purple-600 mb-6">
              <h2 className="text-xl font-bold text-gray-900 pb-3">
                Video & Hình ảnh
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {NEWS_ARTICLES.filter(a => a.category === "Dự án").slice(0, 6).map((article) => (
                <article
                  key={article.id}
                  className="group"
                  itemScope
                  itemType="https://schema.org/NewsArticle"
                >
                  <Link href={`/news/${article.slug}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        itemProp="image"
                      />
                    </div>
                    <h3
                      className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2 leading-snug"
                      itemProp="headline"
                    >
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <time dateTime={article.publishedAt}>
                        {getTimeAgo(article.publishedAt)}
                      </time>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Đọc nhiều trong tuần */}
          <section className="mt-8 pt-8 border-t border-gray-200">
            <div className="border-b-2 border-orange-600 mb-6">
              <h2 className="text-xl font-bold text-gray-900 pb-3">
                Đọc nhiều trong tuần
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...NEWS_ARTICLES]
                .sort((a, b) => b.views - a.views)
                .slice(0, 6)
                .map((article, index) => (
                  <article
                    key={article.id}
                    className="group flex gap-4 pb-6 border-b border-gray-100 last:border-0"
                    itemScope
                    itemType="https://schema.org/NewsArticle"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 flex items-center justify-center font-bold text-xl rounded ${
                        index === 0 ? 'bg-red-600 text-white' :
                        index === 1 ? 'bg-orange-500 text-white' :
                        index === 2 ? 'bg-yellow-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <Link href={`/news/${article.slug}`} className="flex-1 flex gap-4">
                      <div className="relative w-40 h-28 flex-shrink-0 overflow-hidden bg-gray-100">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          itemProp="image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2 leading-snug"
                          itemProp="headline"
                        >
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <time dateTime={article.publishedAt}>
                            {getTimeAgo(article.publishedAt)}
                          </time>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{article.views} lượt xem</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
            </div>
          </section>

              {/* Infinite Scroll Observer Target */}
              <div ref={observerTarget} className="py-8 flex justify-center">
                {isLoading && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Đang tải thêm tin tức...</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    </>
  );
}
