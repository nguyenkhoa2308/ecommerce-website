"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Grid, Home, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import ProductsSidebar from "@/components/products/ProductsSidebar";
import CustomSelect from "@/components/ui/CustomSelect";
import { FEATURED_PRODUCTS } from "@/lib/products.mock";
import { useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá: Thấp đến cao" },
  { value: "price-desc", label: "Giá: Cao đến thấp" },
  { value: "name-asc", label: "Tên: A-Z" },
  { value: "discount-desc", label: "Giảm giá nhiều nhất" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";

  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(urlSearchQuery);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
    setSearchInput(urlSearchQuery);
  }, [urlSearchQuery]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...FEATURED_PRODUCTS];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "discount-desc":
        products.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Keep default order
        break;
    }

    return products;
  }, [sortBy, searchQuery]);

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
          <span className="text-gray-800">Tất cả sản phẩm</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Tất Cả Sản Phẩm
          </h1>
          <p className="text-gray-600">
            Khám phá toàn bộ sản phẩm vật liệu xây dựng chất lượng cao
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Bộ lọc</span>
            </button>

            {/* Filters */}
            <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                <ProductsSidebar />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Hiển thị{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredAndSortedProducts.length}
                  </span>{" "}
                  sản phẩm
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Sort */}
                  <CustomSelect
                    options={SORT_OPTIONS}
                    value={sortBy}
                    onChange={setSortBy}
                    className="flex-1 sm:flex-none sm:w-56"
                  />

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-red-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-red-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg">
                <p className="text-gray-500 text-lg mb-2">
                  Không tìm thấy sản phẩm nào
                </p>
                <p className="text-gray-400 text-sm">
                  Vui lòng thử thay đổi bộ lọc
                </p>
              </div>
            )}

            {/* Pagination - Placeholder */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Trước
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    2
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    3
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Sau
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
