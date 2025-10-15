"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../utils/utils";
import Link from "next/link";
import { ShoppingCart, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ import auth hook

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ get user & logout from context

  const handleLogout = async () => {
    await logout(); // logout function from AuthContext
    window.location.href = "/"; // redirect to home
  };

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
        <Link href="/" className="text-2xl font-bold mr-60">
          Sticke
        </Link>

        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>

        <MenuItem setActive={setActive} active={active} item="Categories">
          <div className="flex flex-col space-y-4 text-sm">
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
        <div className="flex items-center space-x-6 ml-60">
          {/* Cart */}
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
          </Link>

          {/* Profile Section */}
          <div className="relative">
            <UserCircle
              className="w-8 h-8 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black shadow-lg rounded-lg p-2 text-sm">
                {user ? (
                  <>
                    <p className="block px-2 py-1 text-gray-400">
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
                      className="w-full text-left px-2 py-1 hover:bg-black-900 hover:cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
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

export default Navbar;
