"use client";

import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, itemCount, totalAmount, updateQuantity, removeFromCart } =
    useCartStore();

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Giỏ hàng trống
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản
                phẩm của chúng tôi!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Tiếp tục mua hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 flex items-center gap-2 text-gray-600">
          <Link href="/" className="hover:text-red-600 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <span>›</span>
          <span className="text-gray-800">Giỏ hàng</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Giỏ hàng của bạn
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sản phẩm ({itemCount} sản phẩm)
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.name}
                        </h3>

                        {/* Specifications */}
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Màu sắc:</span>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border border-gray-300"
                                style={{ backgroundColor: item.colorCode }}
                              />
                              <span>{item.color}</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Độ dày:</span>{" "}
                            {item.thickness}
                          </div>
                          <div>
                            <span className="font-medium">Kích thước:</span>{" "}
                            {item.size}
                          </div>
                          <div>
                            <span className="font-medium">Diện tích:</span>{" "}
                            {item.area}m² x {item.quantity} tấm ={" "}
                            {(item.area * item.quantity).toFixed(2)}m²
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">
                              {item.totalPrice.toLocaleString("vi-VN")}đ
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.pricePerM2.toLocaleString("vi-VN")}đ/m²
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold mt-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Tiếp tục mua hàng
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Tạm tính ({itemCount} sản phẩm):</span>
                  <span className="font-semibold">
                    {totalAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Phí vận chuyển:</span>
                  <span className="text-gray-500">Tính khi thanh toán</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">
                  Tổng cộng:
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {totalAmount.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3"
              >
                Tiến hành thanh toán
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Cần tư vấn?</span>
                </p>
                <p className="text-xs text-gray-600 mb-3">
                  Gọi ngay hotline để được hỗ trợ báo giá tốt nhất
                </p>
                <a
                  href="tel:+84799886666"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
                >
                  Gọi: 0799.88.66.66
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
