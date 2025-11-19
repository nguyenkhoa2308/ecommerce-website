import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Eye,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Home,
} from "lucide-react";
import NewsCard from "@/components/news/NewsCard";
import { NEWS_ARTICLES, getRelatedNews } from "@/lib/news.mock";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedNews = getRelatedNews(article.id, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Tin tức": "bg-blue-100 text-blue-700",
      "Kiến thức": "bg-green-100 text-green-700",
      "Khuyến mãi": "bg-red-100 text-red-700",
      "Dự án": "bg-purple-100 text-purple-700",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 flex items-center gap-2 text-gray-600">
          <Link href="/" className="hover:text-red-600 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <span>›</span>
          <Link href="/news" className="hover:text-red-600">
            Tin tức
          </Link>
          <span>›</span>
          <span className="text-gray-800 line-clamp-1">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Featured Image */}
              <div className="relative h-96">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>
                      {article.views.toLocaleString("vi-VN")} lượt xem
                    </span>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                  <p className="text-gray-700 italic">{article.excerpt}</p>
                </div>

                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      Tags:
                    </span>
                    {article.tags.map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/news?tag=${tag}`}
                        className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    Chia sẻ:
                  </span>
                  <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                </div>
              </div>
            </article>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Bài viết liên quan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedNews.map((news) => (
                    <NewsCard key={news.id} article={news} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-5 shadow-lg">
                <h3 className="text-lg font-bold mb-2">Cần hỗ trợ?</h3>
                <p className="text-sm mb-4 text-white/90">
                  Liên hệ ngay để được tư vấn miễn phí
                </p>
                <Link
                  href="tel:0799886666"
                  className="block w-full bg-white text-red-600 font-semibold text-center py-2.5 rounded-lg hover:bg-red-50 transition-colors text-sm"
                >
                  📞 0799.88.66.66
                </Link>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-600 rounded-full"></span>
                  Danh mục tin tức
                </h3>
                <div className="space-y-1">
                  {["Tin tức", "Kiến thức", "Khuyến mãi", "Dự án"].map(
                    (cat) => {
                      const count = NEWS_ARTICLES.filter(
                        (a) => a.category === cat
                      ).length;
                      return (
                        <Link
                          key={cat}
                          href={`/news?category=${cat}`}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-red-50 transition-colors group"
                        >
                          <span className="text-sm text-gray-700 group-hover:text-red-600 font-medium">
                            {cat}
                          </span>
                          <span className="text-xs bg-gray-100 group-hover:bg-red-100 text-gray-600 group-hover:text-red-600 px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-600 rounded-full"></span>
                  Tags phổ biến
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Tôn nhựa",
                    "Eurolines",
                    "Lấy sáng",
                    "Kiến thức",
                    "Dự án",
                    "Nhà xưởng",
                  ].map((tag) => (
                    <Link
                      key={tag}
                      href={`/news?tag=${tag}`}
                      className="inline-block bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-700 hover:text-red-600 text-xs px-3 py-1.5 rounded-lg transition-all font-medium"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to News */}
        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg border-2 border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại tin tức
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all news articles
export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}
