"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, X, Image as ImageIcon, Layout, MapPin, Link2, ToggleLeft, ToggleRight, ExternalLink } from "lucide-react";
import { mockBanners } from "@/lib/admin.mock";
import type { Banner } from "@/types/admin";
import toast from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    linkUrl: string;
    linkText: string;
    position: Banner["position"];
    order: number;
    isActive: boolean;
  }>({
    title: "",
    description: "",
    image: "",
    imageAlt: "",
    linkUrl: "",
    linkText: "",
    position: "home_hero",
    order: 0,
    isActive: true,
  });

  const stats = {
    total: banners.length,
    active: banners.filter(b => b.isActive).length,
    inactive: banners.filter(b => !b.isActive).length,
  };

  const handleOpenModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        description: banner.description || "",
        image: banner.image,
        imageAlt: banner.imageAlt || "",
        linkUrl: banner.linkUrl || "",
        linkText: banner.linkText || "",
        position: banner.position,
        order: banner.order,
        isActive: banner.isActive,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        imageAlt: "",
        linkUrl: "",
        linkText: "",
        position: "home_hero",
        order: banners.length + 1,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBanner) {
      setBanners(
        banners.map((banner) =>
          banner._id === editingBanner._id
            ? { ...banner, ...formData, updatedAt: new Date().toISOString() }
            : banner
        )
      );
      toast.success("Cập nhật banner thành công!");
    } else {
      const newBanner: Banner = {
        _id: String(Date.now()),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBanners([...banners, newBanner]);
      toast.success("Thêm banner thành công!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa banner này?")) {
      setBanners(banners.filter((banner) => banner._id !== id));
      toast.success("Xóa banner thành công!");
    }
  };

  const toggleActive = (id: string) => {
    setBanners(
      banners.map((banner) =>
        banner._id === id ? { ...banner, isActive: !banner.isActive } : banner
      )
    );
    toast.success("Cập nhật trạng thái thành công!");
  };

  const getPositionConfig = (position: Banner["position"]) => {
    const configs = {
      home_hero: { label: "Trang chủ - Hero", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      home_middle: { label: "Trang chủ - Giữa", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
      category_top: { label: "Danh mục - Đầu", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
      product_sidebar: { label: "Sản phẩm - Sidebar", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    };
    return configs[position];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Banner</h1>
          <p className="text-gray-500 mt-1">Quản lý banner quảng cáo trên website</p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={18} />
          <span>Thêm banner</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Layout className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng banner</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-sm text-gray-500">Đang hiển thị</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gray-100 rounded-lg">
              <EyeOff className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
              <p className="text-sm text-gray-500">Đã ẩn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <Layout className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Chưa có banner nào</p>
            <p className="text-gray-400 text-sm mt-1">Bắt đầu bằng cách thêm banner đầu tiên</p>
          </div>
        ) : (
          banners.map((banner) => {
            const positionConfig = getPositionConfig(banner.position);
            return (
              <div
                key={banner._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Banner Image */}
                <div className="aspect-[16/7] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Banner Preview</p>
                  </div>
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(banner._id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        banner.isActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                          banner.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Banner Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{banner.title}</h3>
                      {banner.description && (
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{banner.description}</p>
                      )}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${positionConfig.bg} ${positionConfig.text} border ${positionConfig.border} whitespace-nowrap`}>
                      {positionConfig.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gray-400" />
                      <span>Thứ tự: {banner.order}</span>
                    </div>
                    {banner.linkUrl && (
                      <a
                        href={banner.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700"
                      >
                        <Link2 size={14} />
                        <span className="truncate max-w-[150px]">{banner.linkText || "Xem link"}</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(banner)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={14} />
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(banner._id)}
                      className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingBanner ? "Chỉnh sửa banner" : "Thêm banner mới"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingBanner ? "Cập nhật thông tin banner" : "Tạo banner quảng cáo mới"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                  placeholder="Nhập tiêu đề banner"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm resize-none"
                  rows={2}
                  placeholder="Nhập mô tả ngắn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Hình ảnh <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                  placeholder="/banners/example.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL liên kết</label>
                  <input
                    type="text"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                    placeholder="/products"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text nút</label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                    placeholder="Xem ngay"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí hiển thị</label>
                  <CustomSelect
                    value={formData.position}
                    onChange={(value) => setFormData({ ...formData, position: value as Banner["position"] })}
                    variant="blue"
                    options={[
                      { value: "home_hero", label: "Trang chủ - Hero" },
                      { value: "home_middle", label: "Trang chủ - Giữa" },
                      { value: "category_top", label: "Danh mục - Đầu trang" },
                      { value: "product_sidebar", label: "Sản phẩm - Sidebar" },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thứ tự</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    formData.isActive
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {formData.isActive ? (
                    <>
                      <ToggleRight size={18} />
                      Đang hiển thị
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={18} />
                      Đã ẩn
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingBanner ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
