"use client";

import { useSession } from "next-auth/react";
import {
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { mockOrders, mockReviews } from "@/lib/admin.mock";

export default function AdminDashboard() {
  const { data: session } = useSession();

  // Calculate stats
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingReviews = mockReviews.filter(
    (r) => r.status === "pending"
  ).length;

  const stats = [
    {
      label: "Tổng đơn hàng",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      label: "Đơn chờ xử lý",
      value: pendingOrders,
      icon: Package,
      color: "bg-yellow-500",
    },
    {
      label: "Tổng doanh thu",
      value: `${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      label: "Đánh giá chờ duyệt",
      value: pendingReviews,
      icon: Star,
      color: "bg-purple-500",
    },
  ];

  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Chào mừng trở lại, {session?.user?.name}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Đơn hàng gần đây
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-blue-600">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {order.customerInfo.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customerInfo.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">
                      {order.total.toLocaleString("vi-VN")}đ
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
