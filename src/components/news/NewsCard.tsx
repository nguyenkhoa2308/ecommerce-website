import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, Tag } from "lucide-react";
import type { NewsArticle } from "@/lib/news.mock";

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
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
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  if (featured) {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Image */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                  article.category
                )}`}
              >
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="space-y-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views.toLocaleString("vi-VN")} lượt xem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
              article.category
            )}`}
          >
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {article.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{article.views.toLocaleString("vi-VN")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
