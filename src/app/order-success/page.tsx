"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, MapPin, Phone, Mail, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderData {
  id: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    ward: string;
    district: string;
    city: string;
    note: string;
    paymentMethod: string;
  };
  items: Array<{
    id: string;
    name: string;
    image: string;
    color: string;
    thickness: string;
    size: string;
    quantity: number;
    totalPrice: number;
  }>;
  totalAmount: number;
  createdAt: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Get order data from localStorage
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrderData(JSON.parse(lastOrder));
    } else {
      // Redirect to home if no order found
      router.push("/");
    }
  }, [router]);

  if (!orderData) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Đang tải...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất để
              xác nhận đơn hàng.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">Mã đơn hàng:</span>
              <span className="font-mono">{orderData.id}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formatDate(orderData.createdAt)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Thông tin khách hàng
                </h2>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Họ tên:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {orderData.customer.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {orderData.customer.phone}
                  </span>
                </div>
                {orderData.customer.email && (
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {orderData.customer.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Địa chỉ giao hàng
                </h2>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {orderData.customer.address}, {orderData.customer.ward},{" "}
                {orderData.customer.district}, {orderData.customer.city}
              </p>
              {orderData.customer.note && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">Ghi chú:</p>
                  <p className="text-sm text-gray-700 mt-1">
                    {orderData.customer.note}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Chi tiết đơn hàng
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {orderData.items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          Màu sắc: {item.color} • Độ dày: {item.thickness}
                        </p>
                        <p>Kích thước: {item.size}</p>
                        <p>Số lượng: {item.quantity} tấm</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        {item.totalPrice.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">
                    {orderData.totalAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Phí vận chuyển:</span>
                  <span className="text-gray-500">Liên hệ</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Phương thức thanh toán:</span>
                  <span className="font-medium">
                    {orderData.customer.paymentMethod === "cod"
                      ? "Thanh toán khi nhận hàng"
                      : "Chuyển khoản ngân hàng"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">
                  Tổng cộng:
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {orderData.totalAmount.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Cần hỗ trợ thêm?
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về đơn hàng, vui lòng liên hệ với
              chúng tôi:
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+84799886666"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                0799.88.66.66
              </a>
              <a
                href="mailto:support@example.com"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                Email hỗ trợ
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
            <Link
              href="/product/ton-nhua-pvc-asa-eurolines-5-song-1-5mm"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg border-2 border-gray-300 transition-colors"
            >
              <Package className="w-5 h-5" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
