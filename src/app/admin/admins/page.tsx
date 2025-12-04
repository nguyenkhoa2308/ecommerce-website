"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Shield,
  ShieldCheck,
  Mail,
  Calendar,
  Edit2,
  Trash2,
  Key
} from "lucide-react";
import toast from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";

interface Admin {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin";
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

// Mock data
const mockAdmins: Admin[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "System",
    role: "super_admin",
    isActive: true,
    lastLogin: "2024-01-15T10:30:00",
    createdAt: "2023-06-01",
  },
  {
    id: "2",
    username: "manager",
    email: "manager@example.com",
    firstName: "Nguyễn",
    lastName: "Văn A",
    role: "admin",
    isActive: true,
    lastLogin: "2024-01-14T15:45:00",
    createdAt: "2023-08-15",
  },
  {
    id: "3",
    username: "staff1",
    email: "staff1@example.com",
    firstName: "Trần",
    lastName: "Thị B",
    role: "admin",
    isActive: false,
    lastLogin: "2024-01-10T09:00:00",
    createdAt: "2023-10-20",
  },
];

export default function AdminsPage() {
  const [admins] = useState<Admin[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("admin");

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${admin.firstName} ${admin.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingAdmin(null);
    setSelectedRole("admin");
    setShowModal(true);
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setSelectedRole(admin.role);
    setShowModal(true);
    setOpenMenuId(null);
  };

  const handleResetPassword = (admin: Admin) => {
    toast.success(`Đã gửi link đặt lại mật khẩu đến ${admin.email}`);
    setOpenMenuId(null);
  };

  const handleDelete = (admin: Admin) => {
    if (admin.role === "super_admin") {
      toast.error("Không thể xóa tài khoản Super Admin");
      return;
    }
    toast.success(`Đã xóa tài khoản ${admin.username}`);
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản trị viên</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý tài khoản quản trị viên hệ thống
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Thêm quản trị viên
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAdmins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                  admin.role === "super_admin"
                    ? "bg-gradient-to-br from-purple-500 to-indigo-600"
                    : "bg-gradient-to-br from-blue-400 to-blue-600"
                }`}>
                  {admin.firstName.charAt(0)}{admin.lastName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {admin.firstName} {admin.lastName}
                  </div>
                  <div className="text-sm text-gray-500">@{admin.username}</div>
                </div>
              </div>

              {/* Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenuId(openMenuId === admin.id ? null : admin.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical size={18} className="text-gray-400" />
                </button>

                {openMenuId === admin.id && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(admin)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit2 size={14} />
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResetPassword(admin)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Key size={14} />
                      Đặt lại mật khẩu
                    </button>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button
                      type="button"
                      onClick={() => handleDelete(admin)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      disabled={admin.role === "super_admin"}
                    >
                      <Trash2 size={14} />
                      Xóa tài khoản
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex items-center gap-2 mb-3">
              {admin.role === "super_admin" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                  <ShieldCheck size={12} />
                  Super Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                  <Shield size={12} />
                  Admin
                </span>
              )}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                admin.isActive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}>
                {admin.isActive ? "Hoạt động" : "Vô hiệu"}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={14} className="text-gray-400" />
                {admin.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={14} className="text-gray-400" />
                Đăng nhập: {new Date(admin.lastLogin).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAdmins.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Không tìm thấy quản trị viên nào</p>
        </div>
      )}

      {/* Modal - Simple placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {editingAdmin ? "Chỉnh sửa quản trị viên" : "Thêm quản trị viên mới"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  defaultValue={editingAdmin?.username || ""}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="username"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ
                  </label>
                  <input
                    type="text"
                    defaultValue={editingAdmin?.firstName || ""}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Nguyễn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên
                  </label>
                  <input
                    type="text"
                    defaultValue={editingAdmin?.lastName || ""}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Văn A"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={editingAdmin?.email || ""}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <CustomSelect
                  value={selectedRole}
                  onChange={setSelectedRole}
                  variant="blue"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "super_admin", label: "Super Admin" },
                  ]}
                />
              </div>
              {!editingAdmin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success(editingAdmin ? "Đã cập nhật thành công" : "Đã thêm quản trị viên mới");
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {editingAdmin ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
