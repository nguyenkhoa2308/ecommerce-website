"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export function AuthInitializer() {
  useEffect(() => {
    // Hydrate auth state from cookies on app load
    useAuthStore.getState().hydrate();
  }, []);

  return null;
}
