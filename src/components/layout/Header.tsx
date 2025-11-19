"use client";

import { Phone, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const { itemCount, totalAmount } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(urlSearchQuery);

  // Update search input when URL changes
  useEffect(() => {
    setSearchInput(urlSearchQuery);
  }, [urlSearchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="w-full bg-[#ed1c24] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <Link href="/" className="text-white font-bold text-xl">
          <h1 className="text-xl font-bold text-white">My E-commerce Store</h1>
        </Link>

        <form onSubmit={handleSearch} className="relative flex-1 mx-auto max-w-lg">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Nhập từ khoá tìm kiếm..."
            className="ml-auto p-3 pl-4 pr-[50px] rounded-full focus:outline-none w-full bg-white placeholder-gray-400 placeholder:text-sm text-gray-800 shadow-md text-sm"
          />

          <button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-[#bf101736] hover:bg-[#bf1017]/30 p-2 rounded-full cursor-pointer transition duration-200"
          >
            <Search className="w-5 h-5 text-[#bf1017]" />
          </button>
        </form>

        <div className="ml-4 flex gap-4">
          <Link
            href="tel:+84799886666"
            className="flex flex-wrap text-white items-center cursor-pointer"
          >
            <Phone className="w-6 h-6 mr-2 rotate-27" strokeWidth={1} />
            <span className="text-sm flex flex-col">
              <span className="text-white">Gọi mua hàng</span>
              <span className="tracking-widest">0799.88.66.66</span>
            </span>
          </Link>
          <Link
            href="/cart"
            className="group flex items-center cursor-pointer w-[150px] text-white relative gap-1"
          >
            <div className="relative mr-2 shrink-0">
              <ShoppingBag className="w-6 h-6" strokeWidth={1} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#ed1c24] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#ed1c24] shadow-sm">
                  {itemCount}
                </span>
              )}
            </div>

            <span className="text-sm flex flex-col min-w-0">
              <span className="text-white">Giỏ hàng</span>
              <span className="relative block group/price">
                <span className="block truncate text-white tracking-widest">
                  {totalAmount.toLocaleString("vi-VN")}đ
                </span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
