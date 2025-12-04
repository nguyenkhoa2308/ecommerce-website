"use client";

import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";

export default function HydrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const _hasHydrated = useCartStore((state) => state._hasHydrated);

  useEffect(() => {
    // Wait for both client mount and zustand hydration
    if (_hasHydrated) {
      // Add small delay before showing content for smooth transition
      setTimeout(() => {
        setIsHydrated(true);
        // Fade in content
        setTimeout(() => setShowContent(true), 50);
      }, 500);
    }
  }, [_hasHydrated]);

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-300 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
