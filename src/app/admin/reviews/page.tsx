"use client";

import { useState } from "react";
import { Search, Check, X, Star, MessageSquare, Clock, CheckCircle, XCircle, Trash2, User, Package, ShieldCheck, Mail, Phone, AlertCircle } from "lucide-react";
import { mockReviews } from "@/lib/admin.mock";
import type { Review } from "@/types/admin";
import toast from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import RejectReviewDialog from "@/components/ui/RejectReviewDialog";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === "pending").length,
    approved: reviews.filter(r => r.status === "approved").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
    avgRating: reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0",
  };

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

  const openRejectDialog = (review: Review) => {
    setSelectedReview(review);
    setRejectDialogOpen(true);
  };

  const handleReject = (reason: string) => {
    if (!selectedReview) return;
    setReviews(
      reviews.map((review) =>
        review._id === selectedReview._id
          ? {
              ...review,
              status: "rejected",
              rejectReason: reason,
              updatedAt: new Date().toISOString()
            }
          : review
      )
    );
    toast.success(`Từ chối đánh giá thành công! Email đã được gửi đến ${selectedReview.customerEmail}`);
    setSelectedReview(null);
  };

  const openDeleteDialog = (review: Review) => {
    setSelectedReview(review);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!selectedReview) return;
    setReviews(reviews.filter((review) => review._id !== selectedReview._id));
    toast.success("Xóa đánh giá thành công!");
    setSelectedReview(null);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; border: string; icon: typeof Clock; label: string }> = {
      pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: Clock, label: "Chờ duyệt" },
      approved: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle, label: "Đã duyệt" },
      rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: XCircle, label: "Từ chối" },
    };
    return configs[status] || configs.pending;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đánh giá</h1>
        <p className="text-gray-500 mt-1">Quản lý và duyệt đánh giá sản phẩm từ khách hàng</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng đánh giá</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Chờ duyệt</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              <p className="text-sm text-gray-500">Đã duyệt</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              <p className="text-sm text-gray-500">Từ chối</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-lg">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
              <p className="text-sm text-gray-500">Điểm TB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo sản phẩm hoặc tên khách hàng..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <CustomSelect
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full sm:w-48"
            variant="blue"
            options={[
              { value: "all", label: "Tất cả trạng thái" },
              { value: "pending", label: "Chờ duyệt" },
              { value: "approved", label: "Đã duyệt" },
              { value: "rejected", label: "Từ chối" },
            ]}
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Không tìm thấy đánh giá</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          filteredReviews.map((review) => {
            const statusConfig = getStatusConfig(review.status);
            const StatusIcon = statusConfig.icon;
            return (
              <div key={review._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Review Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                          {review.isVerifiedPurchase && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded-full border border-green-200">
                              <ShieldCheck size={10} />
                              Đã mua
                            </span>
                          )}
                        </div>
                        {/* Contact Info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                            <Mail size={12} className="text-gray-400" />
                            {review.customerEmail}
                          </span>
                          {review.customerPhone && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                              <Phone size={12} className="text-gray-400" />
                              {review.customerPhone}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          {renderStars(review.rating)}
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border} flex-shrink-0`}>
                      <StatusIcon size={12} />
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Package size={14} className="text-gray-400" />
                    <span>Sản phẩm:</span>
                    <span className="font-medium text-gray-900">{review.productName}</span>
                  </div>

                  {review.title && (
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>

                  {/* Reject Reason */}
                  {review.status === "rejected" && review.rejectReason && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-red-700 mb-1">Lý do từ chối:</p>
                          <p className="text-sm text-red-600">{review.rejectReason}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Review Actions */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    ID: {review._id}
                  </div>
                  <div className="flex items-center gap-2">
                    {review.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleApprove(review._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check size={14} />
                          Duyệt
                        </button>
                        <button
                          type="button"
                          onClick={() => openRejectDialog(review)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X size={14} />
                          Từ chối
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => openDeleteDialog(review)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedReview(null);
        }}
        onConfirm={handleDelete}
        title="Xóa đánh giá"
        message={`Bạn có chắc chắn muốn xóa đánh giá của "${selectedReview?.customerName}" không? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
      />

      {/* Reject Review Dialog */}
      {selectedReview && (
        <RejectReviewDialog
          isOpen={rejectDialogOpen}
          onClose={() => {
            setRejectDialogOpen(false);
            setSelectedReview(null);
          }}
          onConfirm={handleReject}
          customerName={selectedReview.customerName}
          customerEmail={selectedReview.customerEmail}
          productName={selectedReview.productName}
        />
      )}
    </div>
  );
}
