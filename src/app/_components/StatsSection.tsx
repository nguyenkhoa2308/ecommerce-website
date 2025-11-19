"use client";

import { useEffect, useState, useRef } from "react";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  // Format number with thousand separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      ref={counterRef}
      className="text-4xl md:text-5xl font-bold text-red-600"
    >
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  const stats: StatItem[] = [
    { value: 20, label: "Năm kinh nghiệm" },
    { value: 20000, label: "DT nhà máy (m²)" },
    { value: 1200, label: "Đại lý phân phối" },
    { value: 500, label: "Công nhân viên" },
  ];

  return (
    <section className="relative w-full h-[250px] overflow-hidden my-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/banner-gioi-thieu-scaled-1.webp')]"
        // style={{
        //   backgroundImage: "url('/images/banner-gioi-thieu-scaled-1.jpg')",
        // }}
      >
        {/* Overlay
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/70"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 h-full flex items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <Counter end={stat.value} duration={2500} suffix={stat.suffix} />
              <p className="mt-3 text-sm md:text-base font-medium text-gray-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
