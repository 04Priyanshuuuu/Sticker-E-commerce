"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/app/store/useCartStore";
import { useAuth } from "../context/AuthContext";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { user, logout } = useAuth();
  const totalItems = useCartStore((state) =>
    state.cart.reduce((acc, i) => acc + i.quantity, 0)
  );

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white flex justify-between items-center px-5 py-3 z-50 md:hidden">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        Sticke
      </Link>

      {/* Right icons */}
      <div className="flex items-center space-x-4">
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-black/95 backdrop-blur-md text-white flex flex-col p-6 space-y-6 shadow-xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Menu</span>
              <X
                className="w-7 h-7 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            {/* Links */}
            <nav className="flex flex-col space-y-5 text-lg">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              {/* Categories dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <span>Categories</span>
                  {categoriesOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                <AnimatePresence>
                  {categoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col pl-4 mt-2 space-y-3 text-base text-gray-300"
                    >
                      <Link
                        href="/categories/anime"
                        onClick={() => setMenuOpen(false)}
                      >
                        Anime
                      </Link>
                      <Link
                        href="/categories/cars"
                        onClick={() => setMenuOpen(false)}
                      >
                        Cars
                      </Link>
                      <Link
                        href="/categories/cricketers"
                        onClick={() => setMenuOpen(false)}
                      >
                        Cricketers
                      </Link>
                      <Link
                        href="/categories/nature"
                        onClick={() => setMenuOpen(false)}
                      >
                        Nature
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/contactus" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </nav>

            {/* Divider + Account Section */}
            <div className="border-t border-gray-700 pt-5">
              {user ? (
                <div className="flex flex-col space-y-3 text-lg">
                  <p className="text-sm text-gray-400">{user.username}</p>
                  <Link href="/profile" onClick={() => setMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link href="/orders" onClick={() => setMenuOpen(false)}>
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 text-lg">
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/auth/signUp" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
