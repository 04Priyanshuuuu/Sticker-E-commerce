"use client";
import React, { useState, useEffect, useRef } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../utils/utils";
import Link from "next/link";
import { ShoppingCart, UserCircle } from "lucide-react";
import { useCartStore } from "@/app/store/useCartStore";
import { useAuth } from "../context/AuthContext";

function NavbarDesktop({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalItems = useCartStore((state) =>
    state.cart.reduce((acc, i) => acc + i.quantity, 0)
  );

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  // ✅ Dropdown close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-5xl mx-auto z-50 flex items-center justify-between px-4",
        className
      )}
    >
      {/* Center Menu */}
      <Menu setActive={setActive}>
        {/* Leftmost Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl md:text-2xl font-bold mr-10 sm:mr-40 md:mr-60"
        >
          Sticke
        </Link>

        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>

        <MenuItem setActive={setActive} active={active} item="Categories">
          <div className="flex flex-col space-y-3 sm:space-y-4 text-xs sm:text-sm">
            <HoveredLink href="/categories/anime">Anime</HoveredLink>
            <HoveredLink href="/categories/cars">Cars</HoveredLink>
            <HoveredLink href="/categories/cricketers">Cricketers</HoveredLink>
            <HoveredLink href="/categories/nature">Nature</HoveredLink>
          </div>
        </MenuItem>

        <Link href="/contactus">
          <MenuItem setActive={setActive} active={active} item="Contact Us" />
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6 ml-8 sm:ml-40 md:ml-60 relative">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <UserCircle
              className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-black shadow-lg rounded-lg p-2 text-xs sm:text-sm">
                {user ? (
                  <>
                    <p className="block px-2 py-1 text-gray-400 truncate">
                      {user.username}
                    </p>
                    <Link
                      href="/profile"
                      className="block px-2 py-1 hover:bg-black-900"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-2 py-1 hover:bg-black-900"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-2 py-1 hover:bg-black-900"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block px-2 py-1 hover:bg-black-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signUp"
                      className="block px-2 py-1 hover:bg-black-900"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default NavbarDesktop;
