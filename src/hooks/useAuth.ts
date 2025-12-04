import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const { isAuthenticated, checkAuth, user } = useAuthStore();

  useEffect(() => {
    const isValid = checkAuth();

    if (requireAuth && !isValid) {
      // Redirect to login if not authenticated
      router.push("/admin/login");
    }
  }, [requireAuth, checkAuth, router]);

  return { isAuthenticated, user };
}
