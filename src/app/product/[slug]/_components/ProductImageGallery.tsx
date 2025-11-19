"use client";

import Image from "next/image";
import { useState } from "react";

interface MaterialImageGalleryProps {
  images: string[];
  materialName: string;
  colors: Array<{ id: number; name: string; code: string; pricePerM2: number }>;
}

export default function MaterialImageGallery({
  images,
  materialName,
  colors,
}: MaterialImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="relative aspect-square bg-white p-8">
          <Image
            src={images[selectedImage]}
            alt={`${materialName} - Image ${selectedImage + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Color Variants */}
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color, index) => (
          <button
            key={color.id}
            onClick={() => setSelectedColor(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedColor === index
                ? "border-red-500"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {color.code === "transparent" ? (
              <div className="w-full h-full bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-gray-400 rounded bg-white/50 backdrop-blur-sm"></div>
              </div>
            ) : (
              <div
                className="w-full h-full"
                style={{ backgroundColor: color.code }}
              ></div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
              <p className="text-[9px] text-white text-center leading-tight truncate">
                {color.name}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Material Info Features */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">
          Thông tin sản phẩm
        </h3>
        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 leading-tight">
                Bảo hành <span className="text-red-600">15 năm</span> chính hãng từ nhà sản xuất.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 leading-tight">
                Giao hàng toàn quốc, hỗ trợ lắp đặt tận nơi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 leading-tight">
                Chiết khấu cao cho đơn hàng số lượng lớn
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-orange-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 leading-tight">
                Đổi trả trong <span className="text-red-600">30 ngày</span> nếu có lỗi từ nhà sản xuất
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
