"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface MaterialSpecificationsProps {
  specifications: {
    material: string;
    thickness: string;
    width: string;
    length: string;
    waveType: string;
    weight: string;
    loadCapacity: string;
    uvResistance: string;
    warranty: string;
    fireRating: string;
  };
  features: string[];
  description: string;
}

export default function MaterialSpecifications({
  specifications,
  features,
  description,
}: MaterialSpecificationsProps) {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const images = [
    "/images/materials/ton-nhua-specs.jpg",
    "/images/materials/ton-nhua-specs-2.jpg",
  ];

  // Mock long content - thực tế sẽ lấy từ API
  const fullContent = `
Tôn nhựa PVC/ASA Eurolines 5 sóng là giải pháp lợp mái hiện đại, được ưa chuộng trong xây dựng nhà xưởng, kho bãi, mái hiên và các công trình dân dụng.

Sản phẩm được sản xuất từ nhựa PVC/ASA cao cấp 3 lớp với công nghệ Châu Âu, đảm bảo độ bền vượt trội và khả năng chống chịu thời tiết tốt nhất. Lớp ASA bên ngoài giúp chống tia UV lên đến 99%, bảo vệ màu sắc không phai trong suốt 15 năm.

Với độ dày 1.5mm và cấu trúc 5 sóng vuông, tôn nhựa Eurolines có khả năng chịu lực tốt (150kg/m²), chống thấm nước tuyệt đối và cách nhiệt hiệu quả. Trọng lượng nhẹ (2.8kg/m²) giúp tiết kiệm chi phí kết cấu và dễ dàng thi công.

Sản phẩm đạt chuẩn chống cháy B1, an toàn cho mọi công trình. Đa dạng màu sắc từ trong suốt đến các màu sắc cơ bản, phù hợp với nhiều phong cách kiến trúc.
  `.trim();

  const previewContent = fullContent.split('\n\n')[0]; // Chỉ hiển thị đoạn đầu

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-8">
      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Thông tin sản phẩm (2 columns) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="border-b border-gray-200 p-3">
              <h2 className="text-lg font-bold text-gray-800">
                Thông tin Tôn Nhựa PVC/ASA Eurolines 5 Sóng
              </h2>
            </div>

            <div className="p-6">
              {/* Image Carousel */}
              <div className="mb-6">
                <div className="relative aspect-video bg-gray-50 rounded overflow-hidden">
                  <img
                    src={images[currentImageIndex]}
                    alt="Material Specifications"
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-red-600"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line mb-4">
                {isExpanded ? fullContent : previewContent}
              </div>

              {/* Features Accordion - chỉ hiển thị khi expanded */}
              {isExpanded && (
                <div className="space-y-2 mb-4">
                  <button
                    onClick={() => setOpenFeature(openFeature === 0 ? null : 0)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="font-semibold text-sm text-gray-800">
                      Mục lục
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        openFeature === 0 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFeature === 0 && (
                    <div className="px-4 py-3 bg-gray-50 rounded space-y-1.5">
                      {features.map((feature, index) => (
                        <a
                          key={index}
                          href={`#feature-${index}`}
                          className="block text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                        >
                          • {feature}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Expand/Collapse button */}
              {fullContent.length > previewContent.length && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Ẩn bớt
                      <ChevronDown className="w-4 h-4 rotate-180" />
                    </>
                  ) : (
                    <>
                      Xem thêm
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Thông số sản phẩm + Tin tức */}
        <div className="lg:col-span-1 space-y-6">
          {/* Thông số sản phẩm */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="border-b border-gray-200 p-3">
              <h2 className="text-lg font-bold text-gray-800">
                Thông số kỹ thuật
              </h2>
            </div>

            <div className="p-4">
              <div className="space-y-3 text-sm">
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">
                    Chất liệu:
                  </span>
                  <span className="text-gray-900">{specifications.material}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Độ dày:</span>
                  <span className="text-gray-900">{specifications.thickness}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Bề rộng:</span>
                  <span className="text-gray-900">{specifications.width}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Chiều dài:</span>
                  <span className="text-gray-900">{specifications.length}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Kiểu sóng:</span>
                  <span className="text-gray-900">{specifications.waveType}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Trọng lượng:</span>
                  <span className="text-gray-900">{specifications.weight}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Khả năng chịu lực:</span>
                  <span className="text-gray-900">{specifications.loadCapacity}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Chống UV:</span>
                  <span className="text-gray-900">{specifications.uvResistance}</span>
                </div>

                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600 block mb-1">Chống cháy:</span>
                  <span className="text-gray-900">{specifications.fireRating}</span>
                </div>

                <div className="pb-2">
                  <span className="text-gray-600 block mb-1">Bảo hành:</span>
                  <span className="text-gray-900">{specifications.warranty}</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded transition-colors">
                Tải catalog sản phẩm
              </button>
            </div>
          </div>

          {/* Tin tức về sản phẩm */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="border-b border-gray-200 p-3">
              <h2 className="text-lg font-bold text-gray-800">
                Tin tức về Tôn Nhựa PVC/ASA
              </h2>
            </div>

            <div className="p-4 space-y-3">
              {features.map((feature, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <div className="relative w-20 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={`/images/news/ton-nhua-${index + 1}.jpg`}
                      alt={feature}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-medium text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-relaxed">
                      {feature}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Ngày: 11/15/2025
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
