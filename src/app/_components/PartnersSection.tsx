"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const PARTNERS: Partner[] = [
  { id: 1, name: "TrucThon JSC", logo: "/images/partners/tructhon.png" },
  { id: 2, name: "COSUTU", logo: "/images/partners/cosutu.png" },
  { id: 3, name: "Samsung", logo: "/images/partners/samsung.png" },
  { id: 4, name: "Phúc Hưng", logo: "/images/partners/phuc-hung.png" },
  { id: 5, name: "Trâu Vàng", logo: "/images/partners/trau-vang.png" },
  { id: 6, name: "NIFERCO", logo: "/images/partners/niferco.png" },
  { id: 7, name: "Minh Cường", logo: "/images/partners/minh-cuong.png" },
];

export default function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (isPaused || isDragging) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;

        // Reset to beginning when reached end
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Duplicate partners for infinite scroll effect
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="container mx-auto px-8 py-12 my-16 bg-white rounded-2xl shadow-md">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-2">
          KHÁCH HÀNG VÀ ĐỐI TÁC
        </h2>
      </div>

      {/* Partners Carousel */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto overflow-y-hidden select-none scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleMouseLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-8 items-center">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-[200px] h-[120px] bg-white rounded-lg border-2 border-gray-200 hover:border-[#0066cc] transition-all duration-300 hover:shadow-lg p-4 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain select-none"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
