import axios from "axios";
import { create } from "zustand";
import { AuthState } from "@/types";
import { authAPI } from "@/lib/api";
import { getCookie, setCookie, deleteCookie } from "@/lib/utils";

export const useAuthStore = create<AuthState>()((set, get) => ({
  access_token: null,
  user: null,
  isLoggedIn: false,

  login: async (username: string, password: string) => {
    try {
      // Call API login
      const { data } = await authAPI.login(username, password);
      const { token, user } = data;

      if (!token) {
        console.error("❌ Không nhận được token");
        return false;
      }

      // Set axios authorization header
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Save to cookies (1 day)
      setCookie("access_token", token, 1);
      setCookie("login_time", Date.now().toString(), 1);

      // Save user to localStorage for hydration
      localStorage.setItem("auth-user", JSON.stringify(user));

      // Update store
      set({
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name:
            user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.username,
          role: user.role || "admin",
          first_name: user.first_name,
          last_name: user.last_name,
        },
        isLoggedIn: true,
      });

      console.log("✅ Đăng nhập thành công");
      return true;
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      return false;
    }
  },

  logout: () => {
    // Clear cookies
    deleteCookie("access_token");
    deleteCookie("login_time");

    // Clear localStorage
    localStorage.removeItem("auth-user");

    // Clear store
    set({
      user: null,
      access_token: null,
      isLoggedIn: false,
    });

    // Clear axios header
    delete axios.defaults.headers.common.Authorization;

    console.log("✅ Đăng xuất thành công");
  },

  // Restore session from cookies
  hydrate: () => {
    const access_token = getCookie("access_token");
    const loginTime = getCookie("login_time");

    if (access_token && loginTime) {
      // Check if token expired (> 1 day)
      const elapsed = Date.now() - parseInt(loginTime);
      const oneDayInMs = 24 * 60 * 60 * 1000;

      if (elapsed > oneDayInMs) {
        console.log("❌ Token đã hết hạn");
        get().logout();
        return;
      }

      // Restore user from localStorage
      const storedUser = localStorage.getItem("auth-user");
      let user = null;

      if (storedUser) {
        try {
          user = JSON.parse(storedUser);
        } catch (e) {
          console.error("❌ Lỗi parse user data:", e);
        }
      }

      // Set axios header
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      // Restore state
      set({
        access_token,
        user,
        isLoggedIn: true,
      });

      console.log("✅ Khôi phục session thành công");
    }
  },
}));
