import ProductCard from "@/components/products/ProductCard";
import { FEATURED_PRODUCTS } from "@/lib/products.mock";

export default function RelatedMaterials() {
  // Tạm thời dùng FEATURED_PRODUCTS, sau này sẽ có data riêng cho vật liệu
  const relatedMaterials = FEATURED_PRODUCTS.slice(0, 5);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-800">Sản phẩm cùng loại</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedMaterials.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
