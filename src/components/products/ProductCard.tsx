import Image from "next/image";
import Link from "next/link";
import { ProductCardData } from "@/types/product";

interface ProductCardProps {
  product: ProductCardData;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group block"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Tags Container */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.tags?.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded ${
                tag.type === "hot"
                  ? "bg-orange-500 text-white"
                  : tag.type === "installment"
                  ? "bg-white text-red-600 border border-red-600"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            <span className="text-base">↓</span>
            {product.discount}%
          </div>
        )}

        {/* Status Badge */}
        {product.status && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {product.status}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-lg">
              {formatPrice(product.price)} ₫
            </span>
          </div>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-sm line-through">
              {formatPrice(product.originalPrice)} ₫
            </span>
          )}
        </div>

        {/* Installment */}
        {product.installmentPrice > 0 && (
          <div className="text-xs text-gray-600">
            Trả trước:{" "}
            <span className="text-green-600 font-semibold">
              {formatPrice(product.installmentPrice)} ₫
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
