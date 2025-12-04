"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  Image,
  Tag,
  List,
  Menu,
  Truck,
  Users,
  Settings,
} from "lucide-react";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useAuthStore } from "@/stores/authStore";
import { AuthGuard } from "@/components/AuthGuard";
import { MenuItem } from "@/types";

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    key: "categories",
    name: "Danh mục sản phẩm",
    path: "/admin/categories",
    icon: List,
  },
  {
    key: "attributes",
    name: "Thuộc tính",
    path: "/admin/attributes",
    icon: Tag,
  },
  {
    key: "products",
    name: "Sản phẩm",
    path: "/admin/products",
    icon: Package,
  },
  {
    key: "orders",
    name: "Đơn hàng",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    key: "reviews",
    name: "Đánh giá",
    path: "/admin/reviews",
    icon: Star,
  },
  {
    key: "banners",
    name: "Banners",
    path: "/admin/banners",
    icon: Image,
  },
  {
    key: "suppliers",
    name: "Nhà cung cấp",
    path: "/admin/suppliers",
    icon: Truck,
  },
  {
    key: "admins",
    name: "Quản trị viên",
    path: "/admin/admins",
    icon: Users,
  },
  {
    key: "settings",
    name: "Cài đặt",
    path: "/admin/settings",
    icon: Settings,
  },
];

interface HeaderProps {
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

function Header({
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
  sidebarOpen,
  setSidebarOpen,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = () => {
    router.push("/admin/login");
    setTimeout(() => {
      logout();
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full">
        {/* Left section - Hamburger + Logo */}
        <div className="flex items-center flex-shrink-0">
          {/* Hamburger button - aligned with sidebar icons */}
          <div className="w-20 flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                if (isMobile) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full touch-manipulation cursor-pointer"
              title="Mở sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <Link
            href="/admin"
            className="flex items-center space-x-2 select-none cursor-pointer ml-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <LayoutDashboard className="text-white" size={20} />
            </div>
            <span className="font-semibold text-xl text-gray-900 hidden sm:block">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Right section - User Menu */}
        <div className="flex items-center space-x-6 flex-shrink-0 pr-4">
          <div className="relative" ref={ref}>
            <button
              type="button"
              title="Mở menu người dùng"
              onClick={() => setOpen((v) => !v)}
              className="relative p-1 hover:bg-gray-100 rounded-full touch-manipulation focus:outline-none cursor-pointer"
            >
              <span className="sr-only">Mở menu người dùng</span>
              <div className="h-9 w-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user?.first_name?.charAt(0)}
                {user?.last_name?.charAt(0)}
              </div>
            </button>

            {open && (
              <div
                role="menu"
                aria-label="User menu"
                className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden z-50"
              >
                <div className="flex items-center justify-start gap-2 p-3">
                  <div className="h-8 w-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {user?.first_name?.charAt(0)}
                    {user?.last_name?.charAt(0)}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs leading-none text-gray-600">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <Link
                  href="/admin/change-password"
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.983 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    />
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1.5 0 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 000-1.5 1.65 1.65 0 000-1.5 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001.5 0 1.65 1.65 0 001.5 0 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 000 1.5 1.65 1.65 0 000 1.5z"
                    />
                  </svg>
                  <span>Đổi mật khẩu</span>
                </Link>

                <div className="h-px bg-gray-200" />

                <button
                  type="button"
                  role="menuitem"
                  className="touch-manipulation w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                  onClick={() => handleLogout()}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 3h4a2 2 0 012 2v3M21 16v3a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
                    />
                  </svg>
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

interface SideBarProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  menuItems: MenuItem[];
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

function getActiveKeyFromPath(menuItems: MenuItem[], pathname: string): string {
  const item = menuItems.find((i) => i.path === pathname);
  return item?.key || "dashboard";
}

function SideBar({
  isMobile,
  sidebarOpen,
  menuItems,
  mobileMenuOpen,
  setMobileMenuOpen,
}: SideBarProps) {
  const pathname = usePathname();
  const activeKey = getActiveKeyFromPath(menuItems, pathname);

  if (isMobile) {
    // Mobile: sliding sidebar
    return (
      <>
        <aside
          className={`fixed top-16 left-0 bottom-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <nav className="h-full overflow-y-auto p-2 py-2">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeKey === item.key;

                return (
                  <li key={item.key}>
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group w-full min-h-[3rem] relative transition-colors focus:outline-none text-[#0f0f0f] hover:text-slate-900 cursor-pointer block py-2"
                      aria-current={isActive ? "page" : undefined}
                    >
                      <div
                        className={[
                          "absolute inset-y-0 left-3 right-3 rounded-xl transition-colors",
                          isActive
                            ? "bg-slate-200 group-hover:bg-slate-300"
                            : "group-hover:bg-slate-200",
                        ].join(" ")}
                      />
                      <div className="absolute left-0 top-0 w-20 h-full flex items-center justify-center z-10">
                        <Icon className="w-6 h-6 shrink-0" />
                      </div>
                      <div className="ml-20 pr-4 h-full flex items-center z-10 relative">
                        <span className="text-sm leading-snug break-words">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </>
    );
  }

  // Desktop: Sidebar with fixed icon area
  return (
    <aside
      className="fixed top-16 left-0 bottom-0 z-40 bg-white border-r border-gray-200 transition-all duration-300"
      style={{ width: sidebarOpen ? "256px" : "80px" }}
      aria-label="Sidebar"
    >
      <nav className="h-full overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey === item.key;

            return (
              <li key={item.key}>
                <Link
                  href={item.path}
                  className="group relative block rounded-lg overflow-hidden"
                  aria-current={isActive ? "page" : undefined}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  {/* Background */}
                  <div
                    className={[
                      "absolute inset-0 transition-colors",
                      isActive
                        ? "bg-slate-200"
                        : "bg-transparent group-hover:bg-slate-100",
                    ].join(" ")}
                  />

                  {/* Content */}
                  <div className="relative flex items-center h-12">
                    {/* Icon - w-16 (64px) to stay centered at 40px from sidebar edge */}
                    <div className="flex items-center justify-center shrink-0 w-16">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Text - only when expanded */}
                    {sidebarOpen && (
                      <span className="text-sm font-medium truncate pr-4">
                        {item.name}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Calculate margin for main content
  const getMainMargin = () => {
    if (isMobile) return "ml-0";
    return sidebarOpen ? "ml-64" : "ml-20";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <SideBar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        mobileMenuOpen={mobileMenuOpen}
        menuItems={menuItems}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Overlay for mobile */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`${getMainMargin()} min-h-screen pt-16 transition-all duration-300`}
      >
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthGuard>
    <AdminLayoutContent>{children}</AdminLayoutContent>
    // </AuthGuard>
  );
}
