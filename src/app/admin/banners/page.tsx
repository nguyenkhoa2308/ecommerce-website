"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { mockBanners } from "@/lib/admin.mock";
import type { Banner } from "@/types/admin";
import toast from "react-hot-toast";

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
            ? {
                ...banner,
                ...formData,
                updatedAt: new Date().toISOString(),
              }
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

  const getPositionLabel = (position: Banner["position"]) => {
    const labels = {
      home_hero: "Trang chủ - Hero",
      home_middle: "Trang chủ - Giữa",
      category_top: "Danh mục - Đầu trang",
      product_sidebar: "Sản phẩm - Sidebar",
    };
    return labels[position];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Banners</h1>
          <p className="text-gray-600 mt-2">Quản lý banner quảng cáo</p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Thêm banner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Banner Image Preview</span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{banner.title}</h3>
                  <p className="text-sm text-gray-600">{banner.description}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    banner.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {banner.isActive ? "Hoạt động" : "Tắt"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Vị trí:</span>
                  <span className="font-medium">{getPositionLabel(banner.position)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Thứ tự:</span>
                  <span className="font-medium">{banner.order}</span>
                </div>
                {banner.linkUrl && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Link:</span>
                    <a
                      href={banner.linkUrl}
                      className="text-blue-600 hover:underline truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {banner.linkUrl}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleActive(banner._id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  {banner.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                  {banner.isActive ? "Tắt" : "Bật"}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenModal(banner)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                  <Edit size={16} />
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(banner._id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <Trash2 size={16} />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBanner ? "Chỉnh sửa banner" : "Thêm banner mới"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows={2}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="/banners/example.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL liên kết</label>
                  <input
                    type="text"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text nút</label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as Banner["position"] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="home_hero">Trang chủ - Hero</option>
                    <option value="home_middle">Trang chủ - Giữa</option>
                    <option value="category_top">Danh mục - Đầu trang</option>
                    <option value="product_sidebar">Sản phẩm - Sidebar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thứ tự</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Kích hoạt banner
                </label>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editingBanner ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
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
