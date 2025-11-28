"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { mockAttributes } from "@/lib/admin.mock";
import type { ProductAttribute, AttributeValue } from "@/types/admin";
import toast from "react-hot-toast";

export default function AttributesPage() {
  const [attributes, setAttributes] = useState<ProductAttribute[]>(mockAttributes);
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý thuộc tính</h1>
          <p className="text-gray-600 mt-2">Quản lý thuộc tính sản phẩm</p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Thêm thuộc tính
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên thuộc tính</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá trị</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bắt buộc</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attributes.map((attribute) => (
                <tr key={attribute._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{attribute.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">{attribute.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {attribute.values?.length || 0} giá trị
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${attribute.isRequired ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>
                      {attribute.isRequired ? "Có" : "Không"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => handleOpenModal(attribute)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Edit size={18} />
                      </button>
                      <button type="button" onClick={() => handleDelete(attribute._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAttribute ? "Chỉnh sửa thuộc tính" : "Thêm thuộc tính mới"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên thuộc tính <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({ ...formData, name, slug: generateSlug(name) });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại <span className="text-red-500">*</span></label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="select">Select</option>
                    <option value="color">Color</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                  </select>
                </div>
              </div>

              {(formData.type === "select" || formData.type === "color") && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Giá trị</label>
                    <button type="button" onClick={addValue} className="text-sm text-blue-600 hover:text-blue-700">+ Thêm giá trị</button>
                  </div>
                  <div className="space-y-2">
                    {formData.values.map((val, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type={formData.type === "color" ? "color" : "text"}
                          value={val.value}
                          onChange={(e) => updateValue(index, "value", e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Giá trị"
                        />
                        <input
                          type="text"
                          value={val.label}
                          onChange={(e) => updateValue(index, "label", e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Nhãn hiển thị"
                        />
                        <button type="button" onClick={() => removeValue(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isRequired"
                  checked={formData.isRequired}
                  onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isRequired" className="text-sm font-medium text-gray-700">Bắt buộc</label>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {editingAttribute ? "Cập nhật" : "Thêm mới"}
                </button>
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
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
