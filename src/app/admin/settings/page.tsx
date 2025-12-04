"use client";

import { useState } from "react";
import {
  Settings,
  Store,
  Mail,
  CreditCard,
  Truck,
  Bell,
  Globe,
  Save,
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const settingSections: SettingSection[] = [
  {
    id: "store",
    title: "Thông tin cửa hàng",
    description: "Tên, địa chỉ, logo và thông tin liên hệ",
    icon: Store,
    color: "bg-blue-500",
  },
  {
    id: "email",
    title: "Cấu hình Email",
    description: "SMTP, mẫu email thông báo",
    icon: Mail,
    color: "bg-purple-500",
  },
  {
    id: "payment",
    title: "Thanh toán",
    description: "Phương thức thanh toán, tài khoản ngân hàng",
    icon: CreditCard,
    color: "bg-emerald-500",
  },
  {
    id: "shipping",
    title: "Vận chuyển",
    description: "Phí ship, khu vực giao hàng",
    icon: Truck,
    color: "bg-orange-500",
  },
  {
    id: "notifications",
    title: "Thông báo",
    description: "Cài đặt thông báo hệ thống",
    icon: Bell,
    color: "bg-pink-500",
  },
  {
    id: "seo",
    title: "SEO & Website",
    description: "Meta tags, sitemap, analytics",
    icon: Globe,
    color: "bg-cyan-500",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("store");
  const [isSaving, setIsSaving] = useState(false);

  // Store settings
  const [storeSettings, setStoreSettings] = useState({
    name: "Vật Liệu Xây Dựng ABC",
    phone: "0901234567",
    email: "contact@vlxd-abc.vn",
    address: "123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM",
    taxCode: "0123456789",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Đã lưu cài đặt thành công");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cài đặt</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý cấu hình hệ thống
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Settings size={16} />
                Danh mục cài đặt
              </div>
            </div>
            <nav className="p-2">
              {settingSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors mb-1 ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${isActive ? "text-blue-700" : "text-gray-800"}`}>
                        {section.title}
                      </div>
                    </div>
                    <ChevronRight size={16} className={isActive ? "text-blue-500" : "text-gray-300"} />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            {activeSection === "store" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Thông tin cửa hàng</h2>
                  <p className="text-sm text-gray-500">Cập nhật thông tin cơ bản của cửa hàng</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên cửa hàng
                    </label>
                    <input
                      type="text"
                      value={storeSettings.name}
                      onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      value={storeSettings.phone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={storeSettings.address}
                      onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mã số thuế
                    </label>
                    <input
                      type="text"
                      value={storeSettings.taxCode}
                      onChange={(e) => setStoreSettings({ ...storeSettings, taxCode: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "email" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Cấu hình Email</h2>
                  <p className="text-sm text-gray-500">Thiết lập SMTP và mẫu email</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      placeholder="smtp.gmail.com"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Port
                    </label>
                    <input
                      type="text"
                      placeholder="587"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email gửi đi
                    </label>
                    <input
                      type="email"
                      placeholder="noreply@vlxd-abc.vn"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu ứng dụng
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "payment" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Thanh toán</h2>
                  <p className="text-sm text-gray-500">Cấu hình phương thức thanh toán</p>
                </div>

                <div className="space-y-4">
                  {/* COD */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Truck size={20} className="text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Thanh toán khi nhận hàng (COD)</div>
                        <div className="text-sm text-gray-500">Khách hàng thanh toán khi nhận được hàng</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Bank Transfer */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-gray-500">Thanh toán qua tài khoản ngân hàng</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Bank Account Info */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <div className="text-sm font-medium text-gray-700">Thông tin tài khoản ngân hàng</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Tên ngân hàng"
                        defaultValue="Vietcombank"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Số tài khoản"
                        defaultValue="0123456789"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Tên chủ tài khoản"
                        defaultValue="CONG TY TNHH VLXD ABC"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm md:col-span-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Vận chuyển</h2>
                  <p className="text-sm text-gray-500">Cấu hình phí vận chuyển và khu vực</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phí ship nội thành
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="30000"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">VNĐ</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phí ship ngoại thành
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="50000"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">VNĐ</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Miễn phí ship từ
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="500000"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">VNĐ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Thông báo</h2>
                  <p className="text-sm text-gray-500">Cài đặt thông báo email và hệ thống</p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Gửi email khi có đơn hàng mới", defaultChecked: true },
                    { label: "Gửi email xác nhận đơn hàng cho khách", defaultChecked: true },
                    { label: "Thông báo khi sản phẩm sắp hết hàng", defaultChecked: true },
                    { label: "Thông báo khi có đánh giá mới", defaultChecked: false },
                    { label: "Báo cáo doanh thu hàng ngày", defaultChecked: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "seo" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">SEO & Website</h2>
                  <p className="text-sm text-gray-500">Tối ưu công cụ tìm kiếm</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề website (Title)
                    </label>
                    <input
                      type="text"
                      defaultValue="Vật Liệu Xây Dựng ABC - Chất lượng hàng đầu"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả website (Meta Description)
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Cung cấp vật liệu xây dựng chính hãng: xi măng, gạch, sắt thép, cát sỏi. Giá tốt nhất thị trường, giao hàng tận nơi."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
