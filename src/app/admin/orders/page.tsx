"use client";

import { useState } from "react";
import { Search, Eye, X, ShoppingBag, Clock, Truck, CheckCircle, XCircle, Package, MapPin, Phone, Mail, CreditCard, Calendar } from "lucide-react";
import { mockOrders } from "@/lib/admin.mock";
import type { Order } from "@/types/admin";
import toast from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => ["confirmed", "processing", "shipping"].includes(o.status)).length,
    completed: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
    revenue: orders.filter(o => o.status === "delivered").reduce((acc, o) => acc + o.total, 0),
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    toast.success("Cập nhật trạng thái thành công!");
  };

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: Clock, label: "Chờ xử lý" },
      confirmed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: CheckCircle, label: "Đã xác nhận" },
      processing: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: Package, label: "Đang xử lý" },
      shipping: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", icon: Truck, label: "Đang giao" },
      delivered: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle, label: "Đã giao" },
      cancelled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: XCircle, label: "Đã hủy" },
    };
    return configs[status];
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cod: "Thanh toán khi nhận hàng",
      bank_transfer: "Chuyển khoản ngân hàng",
      credit_card: "Thẻ tín dụng",
    };
    return labels[method] || method;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <p className="text-gray-500 mt-1">Quản lý và theo dõi đơn hàng của cửa hàng</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng đơn hàng</p>
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
              <p className="text-sm text-gray-500">Chờ xử lý</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-sm text-gray-500">Hoàn thành</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{(stats.revenue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Doanh thu</p>
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
              placeholder="Tìm theo mã đơn hoặc tên khách hàng..."
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
              { value: "pending", label: "Chờ xử lý" },
              { value: "confirmed", label: "Đã xác nhận" },
              { value: "processing", label: "Đang xử lý" },
              { value: "shipping", label: "Đang giao" },
              { value: "delivered", label: "Đã giao" },
              { value: "cancelled", label: "Đã hủy" },
            ]}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Đơn hàng</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Khách hàng</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tổng tiền</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Ngày đặt</th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Không tìm thấy đơn hàng</p>
                    <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={order._id} className={`hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-blue-600 text-sm">{order.orderNumber}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{order.items.length} sản phẩm</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{order.customerInfo.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{order.customerInfo.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900 text-sm">{order.total.toLocaleString("vi-VN")}đ</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                          <StatusIcon size={12} />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye size={14} />
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Chi tiết đơn hàng</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selectedOrder.orderNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Update */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-1">Trạng thái đơn hàng</p>
                  <CustomSelect
                    value={selectedOrder.status}
                    onChange={(value) => handleUpdateStatus(selectedOrder._id, value as Order["status"])}
                    variant="blue"
                  options={[
                      { value: "pending", label: "Chờ xử lý" },
                      { value: "confirmed", label: "Đã xác nhận" },
                      { value: "processing", label: "Đang xử lý" },
                      { value: "shipping", label: "Đang giao" },
                      { value: "delivered", label: "Đã giao" },
                      { value: "cancelled", label: "Đã hủy" },
                    ]}
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ngày đặt</p>
                  <p className="font-medium text-gray-900">{new Date(selectedOrder.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-gray-100 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    Thông tin khách hàng
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-900 font-medium">{selectedOrder.customerInfo.name}</p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      {selectedOrder.customerInfo.email}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      {selectedOrder.customerInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    Địa chỉ giao hàng
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>{selectedOrder.shippingAddress.ward}, {selectedOrder.shippingAddress.district}</p>
                    <p className="font-medium text-gray-900">{selectedOrder.shippingAddress.city}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sản phẩm ({selectedOrder.items.length})</h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 ${idx !== selectedOrder.items.length - 1 ? "border-b border-gray-100" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package size={20} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500">Số lượng: {item.quantity} × {item.price.toLocaleString()}đ</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">{(item.price * item.quantity).toLocaleString()}đ</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Phương thức thanh toán</span>
                  <span className="font-medium text-gray-900">{getPaymentMethodLabel(selectedOrder.paymentMethod)}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="text-gray-900">{selectedOrder.subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-gray-900">{selectedOrder.shippingFee.toLocaleString()}đ</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{selectedOrder.discount.toLocaleString()}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900 text-base">Tổng cộng</span>
                    <span className="font-bold text-blue-600 text-lg">{selectedOrder.total.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
