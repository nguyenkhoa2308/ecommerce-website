"use client";

import { useState } from "react";
import { Star, User, Phone, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";

interface ProductReviewsProps {
  productId: number;
  rating: number;
  reviewCount: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  projectType: string;
  helpful: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Anh Tuấn",
    rating: 5,
    date: "10/20/2025",
    content:
      "Tôn nhựa chất lượng tốt, lắp đặt dễ dàng. Mái nhà xưởng của tôi dùng rất ổn, không nóng như tôn thường.",
    projectType: "Nhà xưởng",
    helpful: 12,
  },
  {
    id: 2,
    author: "Chị Hương",
    rating: 5,
    date: "11/05/2025",
    content:
      "Dùng lợp mái hiên rất đẹp, trong suốt nên vẫn sáng nhưng không bị nóng. Giá cả hợp lý.",
    projectType: "Mái hiên",
    helpful: 8,
  },
  {
    id: 3,
    author: "Anh Hải",
    rating: 4,
    date: "11/12/2025",
    content:
      "Sản phẩm tốt, nhưng cần lưu ý khi lắp đặt phải đúng kỹ thuật để tránh nứt vỡ.",
    projectType: "Nhà kho",
    helpful: 5,
  },
];

export default function ProductReviews({
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) {
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [commentText, setCommentText] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!displayName.trim()) {
      toast.error("Vui lòng nhập tên hiển thị");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    if (!commentText.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    // Validate phone number format (basic)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    // Show success toast
    toast.success("Bình luận của bạn đang chờ được phê duyệt", {
      duration: 4000,
      icon: "⏳",
    });

    // Clear form
    setDisplayName("");
    setPhoneNumber("");
    setCommentText("");
    setSelectedRating(5);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-800">
          Đánh giá từ khách hàng
        </h2>
      </div>

      <div className="p-6">
        {/* Rating Summary */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Đánh giá sản phẩm
          </h3>

          <div className="flex items-start gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {rating.toFixed(1)}
                <span className="text-lg text-gray-500">/5</span>
              </div>
              <div className="flex items-center justify-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">{reviewCount} đánh giá</p>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count =
                  stars === 5
                    ? Math.floor(reviewCount * 0.7)
                    : stars === 4
                    ? Math.floor(reviewCount * 0.2)
                    : stars === 3
                    ? Math.floor(reviewCount * 0.1)
                    : 0;
                const percentage =
                  reviewCount > 0 ? (count / reviewCount) * 100 : 0;

                return (
                  <div key={stars} className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 w-16">
                      {[...Array(stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-yellow-400 h-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-6 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Write Comment Form */}
        <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            Viết bình luận của bạn
          </h4>

          <form onSubmit={handleSubmitComment} className="space-y-4">
            {/* Star Rating Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Đánh giá:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= selectedRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                ({selectedRating}/5)
              </span>
            </div>

            {/* Display Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Tên hiển thị <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nhập tên của bạn..."
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại..."
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Comment Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung bình luận <span className="text-red-500">*</span>
              </label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Gửi bình luận
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-4 last:border-0"
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {review.author.split(" ")[1]?.charAt(0) ||
                    review.author.charAt(0)}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-gray-800">
                      {review.author}
                    </h4>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 px-2 py-0.5 bg-blue-50 rounded">
                      {review.projectType}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-1">{review.content}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{review.date}</span>
                    <button className="text-blue-600 hover:underline">
                      Hữu ích ({review.helpful})
                    </button>
                  </div>

                  {/* Reply from shop */}
                  {review.id === 1 && (
                    <div className="mt-3 ml-6 p-3 bg-gray-50 rounded border-l-2 border-blue-500">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded">
                          SHOP
                        </span>
                        <span className="text-xs font-semibold text-gray-800">
                          Vật Liệu Xây Dựng ABC
                        </span>
                      </div>
                      <p className="text-xs text-gray-700">
                        Cảm ơn anh đã tin tưởng sử dụng sản phẩm của shop. Chúng
                        tôi luôn cam kết cung cấp sản phẩm chất lượng cao và hỗ
                        trợ tư vấn kỹ thuật tận tình!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
