"use client";

import { useState } from "react";
import { XCircle, X, Mail, Send } from "lucide-react";

interface RejectReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  customerName: string;
  customerEmail: string;
  productName: string;
}

export default function RejectReviewDialog({
  isOpen,
  onClose,
  onConfirm,
  customerName,
  customerEmail,
  productName,
}: RejectReviewDialogProps) {
  const [reason, setReason] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason("");
    onClose();
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  const quickReasons = [
    "Nội dung không phù hợp",
    "Đánh giá không đúng sự thật",
    "Ngôn ngữ thô tục, xúc phạm",
    "Spam hoặc quảng cáo",
    "Không liên quan đến sản phẩm",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-100 rounded-full">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Từ chối đánh giá</h3>
                <p className="text-sm text-gray-500 mt-0.5">Vui lòng nhập lý do từ chối</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Review Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Khách hàng:</span> {customerName}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Sản phẩm:</span> {productName}
            </p>
          </div>

          {/* Quick Reasons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lý do nhanh</label>
            <div className="flex flex-wrap gap-2">
              {quickReasons.map((qr) => (
                <button
                  key={qr}
                  type="button"
                  onClick={() => setReason(qr)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    reason === qr
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {qr}
                </button>
              ))}
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lý do chi tiết <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none text-sm resize-none"
              placeholder="Nhập lý do từ chối đánh giá..."
            />
          </div>

          {/* Email Notification */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-900">Gửi email thông báo</p>
                  <button
                    type="button"
                    onClick={() => setSendEmail(!sendEmail)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      sendEmail ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow ${
                        sendEmail ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Lý do từ chối sẽ được gửi đến: <span className="font-medium">{customerEmail}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {sendEmail ? "Từ chối & Gửi email" : "Từ chối"}
          </button>
        </div>
      </div>
    </div>
  );
}
