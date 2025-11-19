import { notFound } from "next/navigation";
import ProductImageGallery from "./_components/ProductImageGallery";
import ProductInfo from "./_components/ProductInfo";
import ProductSpecifications from "./_components/ProductSpecifications";
import RelatedProducts from "./_components/RelatedProducts";
import ProductReviews from "./_components/ProductReviews";
import Link from "next/link";
import { Home } from "lucide-react";

// Mock data - sau này sẽ lấy từ API
const getMaterialBySlug = (slug: string) => {
  return {
    id: 1,
    name: "Tôn Nhựa PVC/ASA Eurolines 5 Sóng Dày 1.5mm",
    slug: "ton-nhua-pvc-asa-eurolines-5-song-1-5mm",
    pricePerM2: 85000,
    originalPricePerM2: 95000,
    discount: 11,
    rating: 4.8,
    reviewCount: 127,
    images: [
      "/images/materials/ton-nhua-1.jpg",
      "/images/materials/ton-nhua-2.jpg",
      "/images/materials/ton-nhua-3.jpg",
      "/images/materials/ton-nhua-4.jpg",
    ],
    colors: [
      { id: 1, name: "Xanh da trời", code: "#4A90E2", pricePerM2: 85000 },
      { id: 2, name: "Đỏ gạch", code: "#C94A3C", pricePerM2: 85000 },
      { id: 3, name: "Xanh lá", code: "#7CB342", pricePerM2: 85000 },
      { id: 4, name: "Nâu", code: "#8B6F47", pricePerM2: 85000 },
      { id: 5, name: "Xám", code: "#9E9E9E", pricePerM2: 85000 },
      { id: 6, name: "Trong suốt", code: "transparent", pricePerM2: 90000 },
    ],
    thicknesses: [
      { id: 1, name: "1.2mm", pricePerM2: 75000 },
      { id: 2, name: "1.5mm", pricePerM2: 85000 },
      { id: 3, name: "2.0mm", pricePerM2: 95000 },
      { id: 4, name: "2.5mm", pricePerM2: 110000 },
    ],
    sizes: [
      { id: 1, name: "0.8m x 2.0m", area: 1.6, sheets: 1 },
      { id: 2, name: "0.8m x 3.0m", area: 2.4, sheets: 1 },
      { id: 3, name: "0.8m x 4.0m", area: 3.2, sheets: 1 },
      { id: 4, name: "Tùy chỉnh", area: 0, sheets: 0 },
    ],
    specifications: {
      material: "PVC/ASA 3 lớp",
      thickness: "1.5mm",
      width: "0.8m - 1.05m",
      length: "2.0m - 6.0m",
      waveType: "5 sóng vuông",
      weight: "2.8kg/m²",
      loadCapacity: "150kg/m²",
      uvResistance: "99% chống tia UV",
      warranty: "15 năm",
      fireRating: "B1 - Chống cháy lan",
    },
    features: [
      "Tôn nhựa PVC/ASA là gì?",
      "Ưu điểm của tôn nhựa Eurolines",
      "Cách lắp đặt tôn nhựa 5 sóng",
      "Bảng giá tôn nhựa mới nhất",
    ],
    description:
      "Tôn nhựa PVC/ASA Eurolines 5 sóng là sản phẩm lợp mái cao cấp, được sản xuất từ nhựa PVC/ASA 3 lớp với công nghệ hiện đại từ Châu Âu.",
  };
};

export default function MaterialDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const material = getMaterialBySlug(params.slug);

  if (!material) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-8 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4 flex items-center gap-2 text-gray-600">
          <Link href="/" className="hover:text-red-600 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <span>›</span>
          <Link
            href="/category/vat-lieu-xay-dung"
            className="hover:text-red-600"
          >
            Vật liệu xây dựng
          </Link>
          <span>›</span>
          <Link href="/categories/ton-nhua" className="hover:text-red-600">
            Tôn nhựa
          </Link>
          <span>›</span>
          <Link
            href="/category/ton-nhua-eurolines"
            className="hover:text-red-600"
          >
            Tôn nhựa Eurolines
          </Link>
          <span>›</span>
          <span className="text-gray-800">Tôn PVC/ASA 5 Sóng</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-2">
            <ProductImageGallery
              images={material.images}
              materialName={material.name}
              colors={material.colors}
            />
          </div>

          {/* Right: Material Info */}
          <div className="lg:col-span-3">
            <ProductInfo product={material} />
          </div>
        </div>

        {/* Material Specifications */}
        <ProductSpecifications
          specifications={material.specifications}
          features={material.features}
          description={material.description}
        />

        {/* Related Materials */}
        <RelatedProducts />

        {/* Reviews */}
        <ProductReviews
          productId={material.id}
          rating={material.rating}
          reviewCount={material.reviewCount}
        />
      </div>
    </div>
  );
}
