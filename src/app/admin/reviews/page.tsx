"use client";

import { useState } from "react";
import { Search, Check, X, Star } from "lucide-react";
import { mockReviews } from "@/lib/admin.mock";
import type { Review } from "@/types/admin";
import toast from "react-hot-toast";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review._id === id
          ? { ...review, status: "approved", updatedAt: new Date().toISOString() }
          : review
      )
    );
    toast.success("Duyệt đánh giá thành công!");
  };

  const handleReject = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review._id === id
          ? { ...review, status: "rejected", updatedAt: new Date().toISOString() }
          : review
      )
    );
    toast.success("Từ chối đánh giá thành công!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      setReviews(reviews.filter((review) => review._id !== id));
      toast.success("Xóa đánh giá thành công!");
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý đánh giá</h1>
        <p className="text-gray-600 mt-2">Quản lý và duyệt đánh giá sản phẩm</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo sản phẩm hoặc tên khách hàng..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="approved">Đã duyệt</option>
          <option value="rejected">Từ chối</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                  {review.isVerifiedPurchase && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      Đã mua hàng
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      review.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : review.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {review.status === "pending"
                      ? "Chờ duyệt"
                      : review.status === "approved"
                      ? "Đã duyệt"
                      : "Từ chối"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Sản phẩm: {review.productName}</p>
                <div className="mt-2">{renderStars(review.rating)}</div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>

            {review.title && <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>}
            <p className="text-gray-700 mb-4">{review.comment}</p>

            {review.status === "pending" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleApprove(review._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Check size={18} />
                  Duyệt
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(review._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <X size={18} />
                  Từ chối
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Xóa
                </button>
              </div>
            )}

            {review.status !== "pending" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
