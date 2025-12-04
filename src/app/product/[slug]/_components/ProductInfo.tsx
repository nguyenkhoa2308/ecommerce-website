"use client";

import { useState } from "react";
import { ShoppingCart, Calculator } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: {
    id: number;
    name: string;
    pricePerM2: number;
    originalPricePerM2: number;
    discount: number;
    rating: number;
    reviewCount: number;
    images?: string[];
    colors: Array<{
      id: number;
      name: string;
      code: string;
      pricePerM2: number;
    }>;
    thicknesses: Array<{ id: number; name: string; pricePerM2: number }>;
    sizes: Array<{ id: number; name: string; area: number; sheets: number }>;
    specifications: {
      material: string;
      thickness: string;
      width: string;
      length: string;
      waveType: string;
      weight: string;
      loadCapacity: string;
      uvResistance: string;
      warranty: string;
      fireRating: string;
    };
    features: string[];
    description: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedThickness, setSelectedThickness] = useState(
    product.thicknesses[1]
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const calculateTotalPrice = () => {
    const basePrice = selectedThickness.pricePerM2;
    if (selectedSize.area === 0) return basePrice; // Tùy chỉnh
    return basePrice * selectedSize.area * quantity;
  };

  const calculateTotalArea = () => {
    if (selectedSize.area === 0) return 0;
    return Number((selectedSize.area * quantity).toFixed(2));
  };

  const handleAddToCart = () => {
    if (selectedSize.area === 0) {
      toast.error("Vui lòng chọn kích thước cụ thể");
      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedColor.id}-${selectedThickness.id}-${selectedSize.id}`,
      productId: product.id,
      name: product.name,
      image: product.images?.[0] || "/images/materials/ton-nhua-1.jpg",
      pricePerM2: selectedThickness.pricePerM2,
      color: selectedColor.name,
      colorCode: selectedColor.code,
      thickness: selectedThickness.name,
      size: selectedSize.name,
      area: selectedSize.area,
      quantity: quantity,
      totalPrice: calculateTotalPrice(),
    };

    addToCart(cartItem);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Product Name */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700 ml-1">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {product.reviewCount} đánh giá
        </span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-end gap-3 mb-2">
          <div className="text-3xl font-bold text-red-600">
            {selectedThickness.pricePerM2.toLocaleString("vi-VN")}đ
            <span className="text-lg text-gray-600">/m²</span>
          </div>
          {product.discount > 0 && (
            <>
              <div className="text-lg text-gray-500 line-through">
                {product.originalPricePerM2.toLocaleString("vi-VN")}đ
              </div>
              <div className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded">
                -{product.discount}%
              </div>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Giá đã bao gồm VAT. Liên hệ để được báo giá tốt nhất cho số lượng lớn.
        </p>
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Màu sắc: <span className="text-red-600">{selectedColor.name}</span>
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {product.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedColor.id === color.id
                  ? "border-red-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {color.code === "transparent" ? (
                <div className="w-full h-full bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-2 border-gray-400 rounded bg-white/50"></div>
                </div>
              ) : (
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: color.code }}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thickness Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Độ dày: <span className="text-red-600">{selectedThickness.name}</span>
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {product.thicknesses.map((thickness) => (
            <button
              key={thickness.id}
              onClick={() => setSelectedThickness(thickness)}
              className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                selectedThickness.id === thickness.id
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {thickness.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Kích thước: <span className="text-red-600">{selectedSize.name}</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                selectedSize.id === size.id
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Số lượng tấm:
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-700 font-semibold"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-20 h-10 text-center border-2 border-gray-200 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="0"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-700 font-semibold"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Calculation */}
      {selectedSize.area > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-800">Tính toán:</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Diện tích/tấm:</span>
              <span className="font-semibold text-gray-900">
                {selectedSize.area}m²
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng diện tích:</span>
              <span className="font-semibold text-gray-900">
                {calculateTotalArea()}m²
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-200">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-bold text-red-600 text-lg">
                {calculateTotalPrice().toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Thêm vào giỏ hàng
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
          Mua ngay
        </button>
      </div>

      {/* Contact for Quote */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Cần tư vấn hoặc báo giá?</span>
        </p>
        <div className="flex gap-2">
          <button className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-2 rounded-lg transition-colors text-sm">
            Gọi: 0123.456.789
          </button>
          <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-lg transition-colors text-sm">
            Chat Zalo
          </button>
        </div>
      </div>
    </div>
  );
}
