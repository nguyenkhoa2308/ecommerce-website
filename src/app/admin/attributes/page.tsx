"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Search, Tags, List, Palette, Type, Hash, CheckCircle, AlertCircle, GripVertical } from "lucide-react";
import { mockAttributes } from "@/lib/admin.mock";
import type { ProductAttribute, AttributeValue } from "@/types/admin";
import toast from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";

export default function AttributesPage() {
  const [attributes, setAttributes] = useState<ProductAttribute[]>(mockAttributes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<ProductAttribute | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    type: "select" | "color" | "text" | "number";
    values: AttributeValue[];
    isRequired: boolean;
    order: number;
  }>({
    name: "",
    slug: "",
    type: "select",
    values: [],
    isRequired: false,
    order: 0,
  });

  const filteredAttributes = attributes.filter((attr) =>
    attr.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: attributes.length,
    required: attributes.filter(a => a.isRequired).length,
    optional: attributes.filter(a => !a.isRequired).length,
    totalValues: attributes.reduce((acc, a) => acc + (a.values?.length || 0), 0),
  };

  const handleOpenModal = (attribute?: ProductAttribute) => {
    if (attribute) {
      setEditingAttribute(attribute);
      setFormData({
        name: attribute.name,
        slug: attribute.slug,
        type: attribute.type,
        values: attribute.values || [],
        isRequired: attribute.isRequired,
        order: attribute.order,
      });
    } else {
      setEditingAttribute(null);
      setFormData({
        name: "",
        slug: "",
        type: "select",
        values: [],
        isRequired: false,
        order: attributes.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAttribute(null);
    setFormData({
      name: "",
      slug: "",
      type: "select",
      values: [],
      isRequired: false,
      order: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAttribute) {
      setAttributes(
        attributes.map((attr) =>
          attr._id === editingAttribute._id
            ? {
                ...attr,
                ...formData,
                updatedAt: new Date().toISOString(),
              }
            : attr
        )
      );
      toast.success("Cập nhật thuộc tính thành công!");
    } else {
      const newAttribute: ProductAttribute = {
        _id: String(Date.now()),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAttributes([...attributes, newAttribute]);
      toast.success("Thêm thuộc tính thành công!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thuộc tính này?")) {
      setAttributes(attributes.filter((attr) => attr._id !== id));
      toast.success("Xóa thuộc tính thành công!");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [...formData.values, { value: "", label: "" }],
    });
  };

  const removeValue = (index: number) => {
    setFormData({
      ...formData,
      values: formData.values.filter((_, i) => i !== index),
    });
  };

  const updateValue = (index: number, field: "value" | "label", val: string) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: val };
    setFormData({ ...formData, values: newValues });
  };

  const getTypeConfig = (type: string) => {
    const configs: Record<string, { bg: string; text: string; border: string; icon: typeof List; label: string }> = {
      select: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: List, label: "Select" },
      color: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: Palette, label: "Color" },
      text: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: Type, label: "Text" },
      number: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", icon: Hash, label: "Number" },
    };
    return configs[type] || configs.select;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý thuộc tính</h1>
          <p className="text-gray-500 mt-1">Quản lý các thuộc tính sản phẩm như kích thước, màu sắc, chất liệu</p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={18} />
          <span>Thêm thuộc tính</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Tags className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng thuộc tính</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.required}</p>
              <p className="text-sm text-gray-500">Bắt buộc</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gray-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.optional}</p>
              <p className="text-sm text-gray-500">Tùy chọn</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <List className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalValues}</p>
              <p className="text-sm text-gray-500">Tổng giá trị</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm thuộc tính..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAttributes.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <Tags className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Không tìm thấy thuộc tính</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi từ khóa tìm kiếm</p>
          </div>
        ) : (
          filteredAttributes.map((attribute) => {
            const typeConfig = getTypeConfig(attribute.type);
            const TypeIcon = typeConfig.icon;
            return (
              <div
                key={attribute._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${typeConfig.bg}`}>
                        <TypeIcon className={`w-5 h-5 ${typeConfig.text}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{attribute.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{attribute.slug}</p>
                      </div>
                    </div>
                    {attribute.isRequired && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-red-50 text-red-700 rounded-full border border-red-200">
                        Bắt buộc
                      </span>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig.bg} ${typeConfig.text} border ${typeConfig.border}`}>
                      <TypeIcon size={12} />
                      {typeConfig.label}
                    </span>
                  </div>

                  {/* Values Preview */}
                  {attribute.values && attribute.values.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Giá trị ({attribute.values.length}):</p>
                      <div className="flex flex-wrap gap-1.5">
                        {attribute.values.slice(0, 4).map((val, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-700"
                          >
                            {attribute.type === "color" && (
                              <span
                                className="w-3 h-3 rounded-full border border-gray-300"
                                style={{ backgroundColor: val.value }}
                              />
                            )}
                            {val.label || val.value}
                          </span>
                        ))}
                        {attribute.values.length > 4 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{attribute.values.length - 4} khác
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GripVertical size={14} />
                      <span>Thứ tự: {attribute.order}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(attribute)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(attribute._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
                  {editingAttribute ? "Chỉnh sửa thuộc tính" : "Thêm thuộc tính mới"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingAttribute ? "Cập nhật thông tin thuộc tính" : "Tạo thuộc tính mới cho sản phẩm"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên thuộc tính <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({ ...formData, name, slug: generateSlug(name) });
                    }}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                    placeholder="Nhập tên thuộc tính"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">#</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                      placeholder="attribute-slug"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại thuộc tính <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    value={formData.type}
                    onChange={(value) => setFormData({ ...formData, type: value as "select" | "color" | "text" | "number" })}
                    variant="blue"
                    options={[
                      { value: "select", label: "Select - Danh sách chọn" },
                      { value: "color", label: "Color - Màu sắc" },
                      { value: "text", label: "Text - Văn bản" },
                      { value: "number", label: "Number - Số" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thứ tự hiển thị</label>
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

              {(formData.type === "select" || formData.type === "color") && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Danh sách giá trị</label>
                    <button
                      type="button"
                      onClick={addValue}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Plus size={14} />
                      Thêm giá trị
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.values.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">Chưa có giá trị nào</p>
                    ) : (
                      formData.values.map((val, index) => (
                        <div key={index} className="flex gap-2 items-center bg-white p-2 rounded-lg border border-gray-200">
                          <input
                            type={formData.type === "color" ? "color" : "text"}
                            value={val.value}
                            onChange={(e) => updateValue(index, "value", e.target.value)}
                            className={`border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none ${
                              formData.type === "color" ? "w-12 h-10 p-1 cursor-pointer" : "px-3 py-2 text-sm w-32"
                            }`}
                            placeholder="Giá trị"
                          />
                          <input
                            type="text"
                            value={val.label}
                            onChange={(e) => updateValue(index, "label", e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                            placeholder="Nhãn hiển thị"
                          />
                          <button
                            type="button"
                            onClick={() => removeValue(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tùy chọn</label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isRequired: !formData.isRequired })}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    formData.isRequired
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {formData.isRequired ? (
                    <>
                      <AlertCircle size={18} />
                      Thuộc tính bắt buộc
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Thuộc tính tùy chọn
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingAttribute ? "Cập nhật" : "Thêm mới"}
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
