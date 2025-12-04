"use client";

import { Truck, Clock, Wrench } from "lucide-react";

export default function SuppliersPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        {/* Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <Truck className="w-12 h-12 text-blue-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center border-4 border-white">
            <Wrench className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Quản lý Nhà cung cấp
        </h1>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-4">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700">Đang phát triển</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Tính năng quản lý nhà cung cấp đang được phát triển.
          Bạn sẽ có thể quản lý danh sách nhà cung cấp, theo dõi đơn hàng nhập
          và đánh giá hiệu suất nhà cung cấp tại đây.
        </p>

        {/* Features Coming */}
        <div className="bg-gray-50 rounded-xl p-4 text-left">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-semibold">
            Tính năng sắp có
          </div>
          <ul className="space-y-2">
            {[
              "Danh sách nhà cung cấp",
              "Thêm/sửa/xóa nhà cung cấp",
              "Quản lý đơn hàng nhập",
              "Đánh giá & xếp hạng",
              "Báo cáo hiệu suất",
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
