"use client";

import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
} from "lucide-react";
import Link from "next/link";
import { mockOrders } from "@/lib/admin.mock";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const [timeFilter, setTimeFilter] = useState<"7d" | "30d" | "12m">("7d");

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  // Calculate stats
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const todayRevenue = totalRevenue * 0.15; // Mock today's revenue
  const yesterdayRevenue = totalRevenue * 0.12; // Mock yesterday
  const revenueChange = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;

  // Overview Cards Data - Simplified to 4 most important
  const overviewCards = [
    {
      label: "Doanh thu",
      value: `${(todayRevenue / 1000000).toFixed(1)}M`,
      subtext: "Hôm nay",
      change: revenueChange,
      icon: DollarSign,
    },
    {
      label: "Đơn hàng",
      value: totalOrders,
      subtext: `${pendingOrders} chờ xử lý`,
      change: 12.5,
      icon: ShoppingCart,
    },
    {
      label: "Khách hàng",
      value: 156,
      subtext: "Tháng này",
      change: 8.3,
      icon: Users,
    },
    {
      label: "Sản phẩm",
      value: 1234,
      subtext: "12 sắp hết",
      change: -2.1,
      icon: Package,
    },
  ];

  // Chart data based on time filter
  const getChartData = () => {
    if (timeFilter === "7d") {
      return [
        { label: "T2", value: 15.2 },
        { label: "T3", value: 24.5 },
        { label: "T4", value: 18.9 },
        { label: "T5", value: 32.1 },
        { label: "T6", value: 28.7 },
        { label: "T7", value: 38.5 },
        { label: "CN", value: 35.2 },
      ];
    } else if (timeFilter === "30d") {
      return [
        { label: "W1", value: 85.5 },
        { label: "W2", value: 92.3 },
        { label: "W3", value: 78.9 },
        { label: "W4", value: 105.2 },
      ];
    } else {
      return [
        { label: "T1", value: 280 },
        { label: "T2", value: 320 },
        { label: "T3", value: 295 },
        { label: "T4", value: 340 },
        { label: "T5", value: 365 },
        { label: "T6", value: 390 },
        { label: "T7", value: 410 },
        { label: "T8", value: 385 },
        { label: "T9", value: 425 },
        { label: "T10", value: 450 },
        { label: "T11", value: 480 },
        { label: "T12", value: 520 },
      ];
    }
  };

  const chartData = getChartData();
  const maxChartValue = Math.max(...chartData.map((d) => d.value));

  // Order status distribution
  const orderStatusData = [
    {
      status: "Đã giao",
      count: mockOrders.filter((o) => o.status === "delivered").length,
      color: "#22c55e",
    },
    {
      status: "Đang xử lý",
      count: mockOrders.filter(
        (o) =>
          o.status === "processing" ||
          o.status === "confirmed" ||
          o.status === "shipping"
      ).length,
      color: "#3b82f6",
    },
    {
      status: "Chờ xử lý",
      count: pendingOrders,
      color: "#f59e0b",
    },
    {
      status: "Đã hủy",
      count: mockOrders.filter((o) => o.status === "cancelled").length,
      color: "#9ca3af",
    },
  ];

  const totalOrdersForChart = orderStatusData.reduce(
    (sum, item) => sum + item.count,
    0
  );

  // Recent orders (10 orders)
  const recentOrders = mockOrders.slice(0, 10);

  // Low stock products - Construction Materials
  const lowStockProducts = [
    { name: "Xi măng Portland PCB40", stock: 5, supplier: "Xi măng Hoàng Thạch", image: "🏗️", unit: "tấn" },
    { name: "Gạch ốp lát 60x60 Viglacera", stock: 8, supplier: "Gạch Viglacera", image: "🧱", unit: "m²" },
    { name: "Sắt thép D16 Hòa Phát", stock: 3, supplier: "Thép Hòa Phát", image: "⚙️", unit: "tấn" },
    { name: "Ngói lợp Đồng Nai", stock: 12, supplier: "Vật liệu Đồng Nai", image: "🏠", unit: "viên" },
  ];

  // Pending reviews - Need approval
  const pendingReviews = [
    { id: 1, productName: "Xi măng Portland PCB40", customerName: "Nguyễn Văn A", phone: "0901234567", rating: 5, comment: "Chất lượng tốt, giao hàng nhanh", date: "2024-01-15" },
    { id: 2, productName: "Gạch ốp lát 60x60", customerName: "Trần Thị B", phone: "0912345678", rating: 4, comment: "Sản phẩm đẹp, đóng gói cẩn thận", date: "2024-01-14" },
    { id: 3, productName: "Sắt thép D16 Hòa Phát", customerName: "Lê Văn C", phone: "0923456789", rating: 5, comment: "Thép chất lượng, giá cả hợp lý", date: "2024-01-13" },
  ];

  return (
    <div className="space-y-8">
      {/* Header - Soft & Clean */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          {getGreeting()}, {user?.first_name}
        </h1>
        <p className="text-sm text-gray-600">
          Tổng quan hoạt động kinh doanh
        </p>
      </div>

      {/* 1. TỔNG QUAN - Overview Cards (Soft Colors) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          const isPositive = card.change >= 0;
          const colors = [
            { bg: "bg-emerald-50", icon: "bg-emerald-500", border: "border-emerald-100" },
            { bg: "bg-blue-50", icon: "bg-blue-500", border: "border-blue-100" },
            { bg: "bg-purple-50", icon: "bg-purple-500", border: "border-purple-100" },
            { bg: "bg-orange-50", icon: "bg-orange-500", border: "border-orange-100" },
          ];
          const color = colors[index];

          return (
            <div
              key={card.label}
              className={`${color.bg} ${color.border} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`w-11 h-11 ${color.icon} rounded-lg flex items-center justify-center shadow-sm`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div className={`text-xs font-medium ${isPositive ? "text-emerald-600" : "text-gray-500"}`}>
                  {isPositive ? "+" : ""}{card.change.toFixed(1)}%
                </div>
              </div>

              <div className="text-3xl font-semibold text-gray-800 mb-2">
                {card.value}
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                {card.label}
              </div>
              <div className="text-xs text-gray-500">{card.subtext}</div>
            </div>
          );
        })}
      </div>

      {/* 2. BIỂU ĐỒ DOANH THU - Full Width Area Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-sm text-gray-500 mb-1">Tổng doanh thu</div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {chartData.reduce((sum, d) => sum + d.value, 0).toFixed(1)}M
              </span>
              <span className="text-sm text-emerald-600 font-medium">+12.5% so với kỳ trước</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Kỳ này</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-600">Kỳ trước</span>
            </div>
            <div className="flex gap-1 border border-gray-200 rounded-lg overflow-hidden ml-4">
              {(["7d", "30d", "12m"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${
                    timeFilter === filter
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter === "7d" ? "7 ngày" : filter === "30d" ? "30 ngày" : "12 tháng"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-72">
          <svg className="w-full h-full" viewBox="0 0 800 250" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradientBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 62.5, 125, 187.5, 250].map((y) => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f3f4f6" strokeWidth="1" />
            ))}

            {/* Previous period line (dashed) */}
            <path
              d={`M 0 ${250 - (chartData[0].value * 0.85 / maxChartValue) * 220}
                  ${chartData.map((d, i) => `L ${(i * 800) / (chartData.length - 1)} ${250 - (d.value * 0.85 / maxChartValue) * 220}`).join(" ")}`}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Current period area */}
            <path
              d={`M 0 ${250 - (chartData[0].value / maxChartValue) * 220}
                  ${chartData.map((d, i) => `L ${(i * 800) / (chartData.length - 1)} ${250 - (d.value / maxChartValue) * 220}`).join(" ")}
                  L 800 250 L 0 250 Z`}
              fill="url(#areaGradientBlue)"
            />

            {/* Current period line */}
            <path
              d={`M 0 ${250 - (chartData[0].value / maxChartValue) * 220}
                  ${chartData.map((d, i) => `L ${(i * 800) / (chartData.length - 1)} ${250 - (d.value / maxChartValue) * 220}`).join(" ")}`}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {chartData.map((data, idx) => (
              <g key={idx}>
                <circle
                  cx={(idx * 800) / (chartData.length - 1)}
                  cy={250 - (data.value / maxChartValue) * 220}
                  r="6"
                  fill="white"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="3"
                />
              </g>
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-4 px-2">
            {chartData.map((data) => (
              <div key={data.label} className="text-xs text-gray-500 font-medium">
                {data.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CHARTS ROW - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category - Column Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Doanh thu theo danh mục</div>
              <div className="text-xl font-bold text-gray-900">2,025M VNĐ</div>
            </div>
            <Link href="/admin/products" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              Chi tiết
            </Link>
          </div>

          {/* Column Chart with Axes */}
          <div className="flex">
            {/* Y-axis */}
            <div className="flex flex-col justify-between h-48 pr-3 text-right">
              {[800, 600, 400, 200, 0].map((val) => (
                <span key={val} className="text-xs text-gray-400">{val}M</span>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex-1 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-b border-gray-100 w-full"></div>
                ))}
              </div>

              {/* Bars */}
              <div className="flex items-end justify-around gap-2 h-48 relative z-10">
                {[
                  { name: "Xi măng", value: 580, color: "#3b82f6" },
                  { name: "Gạch", value: 320, color: "#8b5cf6" },
                  { name: "Sắt thép", value: 850, color: "#10b981" },
                  { name: "Cát sỏi", value: 180, color: "#f59e0b" },
                  { name: "Sơn", value: 95, color: "#ef4444" },
                ].map((item) => {
                  const maxVal = 800;
                  const heightPercent = (item.value / maxVal) * 100;
                  return (
                    <div key={item.name} className="flex-1 flex flex-col items-center justify-end h-full max-w-[80px]">
                      <span className="text-xs font-semibold text-gray-700 mb-1">{item.value}M</span>
                      <div
                        className="w-full rounded-t-md transition-all duration-500 hover:opacity-80"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-around gap-2 mt-3 border-t border-gray-200 pt-3">
                {["Xi măng", "Gạch", "Sắt thép", "Cát sỏi", "Sơn"].map((name) => (
                  <span key={name} className="flex-1 max-w-[80px] text-xs text-gray-600 font-medium text-center">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Status - Donut Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="text-sm text-gray-500 mb-6">Đơn hàng theo trạng thái</div>

          <div className="flex items-center justify-center gap-10">
            {/* Donut */}
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="14" />
                {(() => {
                  let currentAngle = 0;
                  return orderStatusData.map((item) => {
                    const percentage = totalOrdersForChart > 0 ? (item.count / totalOrdersForChart) * 100 : 0;
                    const strokeDasharray = `${(percentage * 251.2) / 100} 251.2`;
                    const strokeDashoffset = (-currentAngle * 251.2) / 100;
                    currentAngle += percentage;
                    return (
                      <circle
                        key={item.status}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="14"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-900">{totalOrdersForChart}</div>
                <div className="text-xs text-gray-500">Tổng đơn</div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {orderStatusData.map((item) => {
                const percentage = totalOrdersForChart > 0 ? (item.count / totalOrdersForChart) * 100 : 0;
                return (
                  <div key={item.status} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.status}</div>
                      <div className="text-xs text-gray-500">{item.count} đơn • {percentage.toFixed(0)}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table (Soft) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
            Đơn hàng gần nhất
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left text-xs text-gray-600 uppercase tracking-wide font-semibold px-8 py-4">
                  Mã đơn
                </th>
                <th className="text-left text-xs text-gray-600 uppercase tracking-wide font-semibold px-8 py-4">
                  Khách hàng
                </th>
                <th className="text-left text-xs text-gray-600 uppercase tracking-wide font-semibold px-8 py-4">
                  Trạng thái
                </th>
                <th className="text-right text-xs text-gray-600 uppercase tracking-wide font-semibold px-8 py-4">
                  Tổng tiền
                </th>
                <th className="text-right text-xs text-gray-600 uppercase tracking-wide font-semibold px-8 py-4">
                  Ngày
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-8 py-4">
                    <span className="text-sm text-blue-600 font-semibold">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="text-sm text-gray-800 font-medium">
                      {order.customerInfo.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.customerInfo.phone}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                        order.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : order.status === "confirmed" ||
                            order.status === "processing" ||
                            order.status === "shipping"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : order.status === "delivered"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {order.status === "pending"
                        ? "Chờ xử lý"
                        : order.status === "confirmed"
                        ? "Đã xác nhận"
                        : order.status === "processing"
                        ? "Đang xử lý"
                        : order.status === "shipping"
                        ? "Đang giao"
                        : order.status === "delivered"
                        ? "Đã giao"
                        : "Đã hủy"}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="text-sm font-semibold text-gray-800">
                      {(order.total / 1000000).toFixed(2)}M
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock & New Suppliers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Products */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Sản phẩm sắp hết
            </div>
            <Link
              href="/admin/products"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center gap-4 p-3 rounded-lg border border-orange-100 bg-orange-50/30 hover:bg-orange-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-800 font-medium mb-1">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-600">{product.supplier}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    product.stock <= 5 ? "text-red-600" : "text-orange-600"
                  }`}>
                    {product.stock} {product.unit}
                  </div>
                  <div className="text-xs text-gray-500">Tồn kho</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Đánh giá chờ duyệt
            </div>
            <Link
              href="/admin/reviews"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-3">
            {pendingReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-amber-100 bg-amber-50/30 hover:bg-amber-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-800 font-medium mb-1">
                    {review.productName}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {review.customerName} • {review.phone}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1">
                    &quot;{review.comment}&quot;
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-0.5 justify-end mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-400" : "text-gray-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
