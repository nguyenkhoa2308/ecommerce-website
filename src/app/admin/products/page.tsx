"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Eye, Package, TrendingUp, AlertTriangle, Filter, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sold: number;
  isActive: boolean;
  image: string;
  createdAt: string;
}

// Mock products data
const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Xi măng Holcim PCB40",
    slug: "xi-mang-holcim-pcb40",
    category: "Xi măng",
    price: 95000,
    originalPrice: 105000,
    stock: 500,
    sold: 1250,
    isActive: true,
    image: "/products/xi-mang-holcim.jpg",
    createdAt: "2024-01-15",
  },
  {
    _id: "2",
    name: "Gạch ống Đồng Nai 8x8x18",
    slug: "gach-ong-dong-nai",
    category: "Gạch xây dựng",
    price: 1200,
    stock: 10000,
    sold: 5600,
    isActive: true,
    image: "/products/gach-ong.jpg",
    createdAt: "2024-01-10",
  },
  {
    _id: "3",
    name: "Thép Hòa Phát D10",
    slug: "thep-hoa-phat-d10",
    category: "Sắt thép",
    price: 15500,
    originalPrice: 16000,
    stock: 2000,
    sold: 890,
    isActive: true,
    image: "/products/thep-hoa-phat.jpg",
    createdAt: "2024-01-08",
  },
  {
    _id: "4",
    name: "Cát xây dựng loại 1",
    slug: "cat-xay-dung-loai-1",
    category: "Cát đá",
    price: 350000,
    stock: 50,
    sold: 320,
    isActive: true,
    image: "/products/cat-xay-dung.jpg",
    createdAt: "2024-01-05",
  },
  {
    _id: "5",
    name: "Sơn Dulux ngoại thất",
    slug: "son-dulux-ngoai-that",
    category: "Sơn",
    price: 850000,
    originalPrice: 950000,
    stock: 0,
    sold: 156,
    isActive: false,
    image: "/products/son-dulux.jpg",
    createdAt: "2024-01-01",
  },
];

const categories = [
  { value: "all", label: "Tất cả danh mục" },
  { value: "xi-mang", label: "Xi măng" },
  { value: "gach-xay-dung", label: "Gạch xây dựng" },
  { value: "sat-thep", label: "Sắt thép" },
  { value: "cat-da", label: "Cát đá" },
  { value: "son", label: "Sơn" },
];

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "active", label: "Đang bán" },
  { value: "inactive", label: "Ngừng bán" },
  { value: "out_of_stock", label: "Hết hàng" },
];

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category.toLowerCase().includes(categoryFilter.replace("-", " "));
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && p.isActive && p.stock > 0) ||
      (statusFilter === "inactive" && !p.isActive) ||
      (statusFilter === "out_of_stock" && p.stock === 0);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive && p.stock > 0).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    totalSold: products.reduce((acc, p) => acc + p.sold, 0),
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      toast.success("Xóa sản phẩm thành công!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-500 mt-1">Quản lý danh sách sản phẩm của cửa hàng</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={18} />
          <span>Thêm sản phẩm</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng sản phẩm</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-sm text-gray-500">Đang bán</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
              <p className="text-sm text-gray-500">Hết hàng</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSold.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Đã bán</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                showFilters ? "border-blue-500 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Filter size={16} />
              Bộ lọc
            </button>
            <div className={`${showFilters ? "flex" : "hidden"} lg:flex flex-col lg:flex-row gap-3 w-full lg:w-auto`}>
              <CustomSelect
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categories}
                variant="blue"
                className="w-full lg:w-44"
              />
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                variant="blue"
                className="w-full lg:w-40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sản phẩm</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Danh mục</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Giá</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Tồn kho</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">Đã bán</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Trạng thái</th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Không tìm thấy sản phẩm</p>
                    <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                  <tr key={product._id} className={`hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">SKU: {product._id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{product.price.toLocaleString()}đ</p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString()}đ</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className={`text-sm font-medium ${product.stock === 0 ? "text-red-600" : product.stock < 100 ? "text-yellow-600" : "text-gray-900"}`}>
                        {product.stock.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden xl:table-cell">
                      <span className="text-sm text-gray-600">{product.sold.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {product.stock === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                          Hết hàng
                        </span>
                      ) : product.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                          Đang bán
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          Ngừng bán
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Xem"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Hiển thị <span className="font-medium text-gray-900">1-{filteredProducts.length}</span> trong số{" "}
              <span className="font-medium text-gray-900">{products.length}</span> sản phẩm
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="px-3 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed"
              >
                Trước
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg"
              >
                1
              </button>
              <button
                type="button"
                disabled
                className="px-3 py-1.5 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
