import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Về công ty */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              Về Chúng Tôi
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Chuyên cung cấp vật liệu xây dựng chất lượng cao với giá cả hợp
              lý. Cam kết sản phẩm chính hãng, giao hàng nhanh chóng toàn quốc.
            </p>

            {/* Social Icons */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                Kết nối với chúng tôi
              </h4>
              <div className="flex gap-3">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
                >
                  <Image
                    src="/icons/facebook.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </Link>
                <Link
                  href="https://zalo.me"
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 group"
                >
                  <Image
                    src="/icons/zalo.svg"
                    alt="Zalo"
                    width={20}
                    height={20}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 group"
                >
                  <Image
                    src="/icons/youtube.svg"
                    alt="YouTube"
                    width={20}
                    height={20}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 group"
                >
                  <Image
                    src="/icons/tiktok.svg"
                    alt="TikTok"
                    width={20}
                    height={20}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Chính sách */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              Chính Sách
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/huong-dan-thanh-toan"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Hướng dẫn thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="/huong-dan-dat-hang"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Hướng dẫn đặt hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/huong-dan-mua-tra-gop"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Hướng dẫn mua trả góp
                </Link>
              </li>
              <li>
                <Link
                  href="/quy-dinh-bao-hanh"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Quy định bảo hành - đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/quy-dinh-giao-hang"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Quy định giao hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/bao-mat-thong-tin"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Bảo mật thông tin
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              Hỗ Trợ Khách Hàng
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/gioi-thieu"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Giới thiệu công ty
                </Link>
              </li>
              <li>
                <Link
                  href="/tuyen-dung"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/dieu-khoan-su-dung"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-chat-luong"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Chính sách chất lượng
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Liên hệ */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 relative inline-block">
              Liên Hệ
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 leading-relaxed">
                    123 Đường ABC, Phường XYZ
                    <br />
                    Quận 1, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">
                    Hotline Bán Hàng
                  </p>
                  <a
                    href="tel:0799886666"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    0799.88.66.66
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>
                  <a
                    href="mailto:support@example.com"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    support@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Giờ làm việc</p>
                  <p className="text-gray-400">
                    T2 - T7: 8:00 - 21:00
                    <br />
                    Chủ Nhật: 9:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Địa Chỉ Của Chúng Tôi
          </h3>
          <div className="w-full h-80 rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.899255391922!2d105.78257067608789!3d20.996675130644643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb49b94ab1b%3A0x58570ca03e970d9a!2zQ2h1bmcgY8awIFZPViBN4buFIFRyw6w!5e0!3m2!1sen!2s!4v1739454201386!5m2!1sen!2s"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location"
            ></iframe>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Hỗ trợ thanh toán
              </h4>
              <div className="flex gap-3 flex-wrap">
                <div className="px-4 py-2 bg-white rounded-lg shadow-md">
                  <span className="text-sm font-semibold text-gray-700">
                    ATM
                  </span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-md">
                  <span className="text-sm font-bold text-blue-600">VISA</span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-md flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-orange-500 -ml-2"></div>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-md">
                  <span className="text-sm font-semibold text-green-600">
                    Momo
                  </span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-md">
                  <span className="text-sm font-semibold text-blue-500">
                    ZaloPay
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Chứng nhận
              </h4>
              <div className="flex gap-3">
                <div className="px-4 py-3 bg-white rounded-lg shadow-md">
                  <span className="text-xs font-semibold text-gray-600">
                    DMCA
                  </span>
                </div>
                <div className="px-4 py-3 bg-white rounded-lg shadow-md">
                  <span className="text-xs font-semibold text-blue-600">
                    Đã thông báo BCT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black bg-opacity-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Công ty TNHH Truyền thông và
              Công nghệ số Hagency.
              <span className="hidden md:inline"> | </span>
              <span className="block md:inline">All rights reserved.</span>
            </p>
            <div className="flex gap-6 text-xs">
              <Link
                href="/chinh-sach-bao-mat"
                className="hover:text-red-500 transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/dieu-khoan-dich-vu"
                className="hover:text-red-500 transition-colors"
              >
                Điều khoản dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
