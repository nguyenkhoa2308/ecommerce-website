import axios from "axios";
import { getCookie, deleteCookie } from "./utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://trading.operis.vn";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const rawAPI = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu 401 (Unauthorized), redirect về login
    if (error.response?.status === 401) {
      // Clear cookies
      deleteCookie("access_token");
      deleteCookie("login_time");

      // Redirect to login
      //   if (typeof window !== "undefined") {
      //     window.location.href = "/admin/login";
      //   }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string
  ) =>
    rawAPI.post("/auth/register", {
      username,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
      address,
    }),
  login: (username: string, password: string) =>
    rawAPI.post("/auth/login", { username, password }),
  getMe: () => api.get("/auth/me"),
  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) =>
    api.post("/auth/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }),
  logout: () => api.post("/auth/logout"),
};
