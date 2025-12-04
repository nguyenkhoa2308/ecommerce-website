"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Skip check on login page
    if (pathname === "/admin/login") {
      setIsChecking(false);
      return;
    }

    // Check if logged in
    if (!isLoggedIn) {
      console.log("❌ Chưa đăng nhập, redirect to login");
      window.location.href = "/admin/login";
    } else {
      setIsChecking(false);
    }
  }, [pathname, isLoggedIn]);

  // Don't show layout while checking auth
  if (pathname !== "/admin/login" && isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Đang kiểm tra...</div>
      </div>
    );
  }

  return <>{children}</>;
}
