"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/products.mock";

interface ProductsSidebarProps {
  currentCategorySlug?: string;
}

export default function ProductsSidebar({
  currentCategorySlug,
}: ProductsSidebarProps) {
  // Find current category and its parent if it's a child category
  const currentCategory = CATEGORIES.find((c) => c.slug === currentCategorySlug);

  // Determine which category should be initially expanded
  const initialExpandedId = useMemo(() => {
    if (!currentCategory) return null;

    // If current category is a child, expand its parent
    if (currentCategory.parentId) {
      return currentCategory.parentId;
    }

    // If current category is a parent with children, expand itself
    const hasChildren = CATEGORIES.some((c) => c.parentId === currentCategory.id);
    if (hasChildren) {
      return currentCategory.id;
    }

    return null;
  }, [currentCategory?.id, currentCategory?.parentId]);

  // Initialize expanded categories
  const [expandedCategories, setExpandedCategories] = useState<number[]>(() => {
    return initialExpandedId ? [initialExpandedId] : [];
  });

  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [discountFilters, setDiscountFilters] = useState<string[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const togglePriceRange = (range: string) => {
    setPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const toggleDiscountFilter = (filter: string) => {
    setDiscountFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Organize categories into parent-child structure
  const parentCategories = CATEGORIES.filter((cat) => !cat.parentId);
  const getChildCategories = (parentId: number) =>
    CATEGORIES.filter((cat) => cat.parentId === parentId);

  // Check if parent should be expanded
  const shouldBeExpanded = useMemo(() => {
    return (parentId: number) => {
      // Always expand if manually toggled
      if (expandedCategories.includes(parentId)) return true;

      // Auto-expand if this parent is the current category
      if (currentCategory?.id === parentId) return true;

      // Auto-expand if one of its children is the current category
      const children = getChildCategories(parentId);
      return children.some((child) => child.slug === currentCategorySlug);
    };
  }, [expandedCategories, currentCategorySlug, currentCategory?.id]);

  return (
    <div className="space-y-4">
      {/* Categories Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-600 rounded-full"></span>
          Danh mục sản phẩm
        </h3>
        <div className="space-y-1">
          {/* All Products */}
          <Link
            href="/products"
            className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${
              !currentCategorySlug
                ? "bg-red-50 text-red-600 font-medium"
                : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
            }`}
          >
            Tất cả sản phẩm
          </Link>

          {/* Parent Categories with Children */}
          {parentCategories.map((parent) => {
            const children = getChildCategories(parent.id);
            const hasChildren = children.length > 0;
            const isExpanded = shouldBeExpanded(parent.id);
            const isActive = currentCategorySlug === parent.slug;

            return (
              <div key={parent.id}>
                {/* Parent Category */}
                <div className="flex items-center gap-1">
                  {hasChildren && (
                    <button
                      onClick={() => toggleCategory(parent.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label={
                        isExpanded ? "Thu gọn" : "Mở rộng"
                      }
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  )}
                  <Link
                    href={`/category/${parent.slug}`}
                    className={`flex-1 block py-2 px-3 rounded-lg transition-colors text-sm ${
                      isActive
                        ? "bg-red-50 text-red-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    } ${!hasChildren ? "ml-6" : ""}`}
                  >
                    {parent.name}
                  </Link>
                </div>

                {/* Child Categories */}
                {hasChildren && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                    {children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${child.slug}`}
                        className={`block py-2 px-3 rounded-lg transition-colors text-sm ${
                          currentCategorySlug === child.slug
                            ? "bg-red-50 text-red-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-red-600"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-600 rounded-full"></span>
          Khoảng giá
        </h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={priceRanges.includes("under-50k")}
              onChange={() => togglePriceRange("under-50k")}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="text-gray-700">Dưới 50,000đ</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={priceRanges.includes("50k-100k")}
              onChange={() => togglePriceRange("50k-100k")}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="text-gray-700">50,000đ - 100,000đ</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={priceRanges.includes("over-100k")}
              onChange={() => togglePriceRange("over-100k")}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="text-gray-700">Trên 100,000đ</span>
          </label>
        </div>
      </div>

      {/* Discount Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-600 rounded-full"></span>
          Khuyến mãi
        </h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={discountFilters.includes("20+")}
              onChange={() => toggleDiscountFilter("20+")}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="text-gray-700">Giảm từ 20%</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={discountFilters.includes("30+")}
              onChange={() => toggleDiscountFilter("30+")}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="text-gray-700">Giảm từ 30%</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={discountFilters.includes("installment")}
              onChange={() => toggleDiscountFilter("installment")}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="text-gray-700">Trả góp 0%</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      {(priceRanges.length > 0 || discountFilters.length > 0) && (
        <button
          onClick={() => {
            setPriceRanges([]);
            setDiscountFilters([]);
          }}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Xóa bộ lọc
        </button>
      )}
    </div>
  );
}
