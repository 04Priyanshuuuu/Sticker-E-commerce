"use client";
import React from "react";
import { Plus, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  name: string;
  price: number;
  img?: string;
  overlayOnly?: boolean;
  className?: string;
};

const StickerHover: React.FC<Props> = ({
  id,
  name,
  price,
  img,
  overlayOnly = false,
  className = "",
}) => {
  const router = useRouter();

  const handleBuyClick = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    router.push(`/buy/${id}`);
  };

  const handleAddToCart = async (e?: React.SyntheticEvent) => {
    e?.stopPropagation();

    try {
      // ✅ Check if user is logged in
      const profileRes = await fetch(
        "http://localhost:8000/api/auth/profile/",
        {
          credentials: "include",
        }
      );

      if (!profileRes.ok) {
        alert("Please log in to add items to cart!");
        router.push("/auth/login");
        return;
      }

      // ✅ Add to cart API call
      const addRes = await fetch("http://localhost:8000/api/cart/add/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sticker_id: id,
          size: "M",
          quantity: 1,
        }),
      });

      const data = await addRes.json();

      if (addRes.ok) {
        alert("Sticker added to cart 🛒");
      } else {
        alert(data.detail || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Cart error:", error);
      alert("Error adding to cart");
    }
  };

  // Hover overlay
  const OverlayControls = (
    <>
      {/* semi-transparent layer */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 z-10"></div>

      {/* top-right buttons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-auto">
        <button
          aria-label="add-to-cart"
          onClick={handleAddToCart}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:scale-110 transition cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gray-800" />
        </button>
        <button
          aria-label="share"
          onClick={(e) => {
            e.stopPropagation();
            if (navigator.share) {
              navigator.share({
                title: name,
                text: `Check out this sticker! ₹${price}`,
                url: `${window.location.origin}/stickers/${id}`,
              });
            } else {
              alert("Sharing not supported on this device.");
            }
          }}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:scale-110 transition cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* bottom controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-auto">
        <div className="text-white text-lg font-semibold bg-black/60 px-3 py-1.5 rounded-lg">
          ₹{Number(price) ? Number(price).toFixed(2) : price}
        </div>
        <button
          onClick={handleBuyClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Buy
        </button>
      </div>
    </>
  );

  // If only overlay
  if (overlayOnly) {
    return (
      <div className="absolute inset-0 z-20 pointer-events-none group-hover:pointer-events-auto">
        {OverlayControls}
      </div>
    );
  }

  // Full card view
  return (
    <div
      className={`relative group w-64 h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-lg bg-gray-50 cursor-pointer ${className}`}
    >
      <motion.img
        src={img}
        alt={name}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.25 }}
        className="object-cover w-full h-full relative z-0"
      />
      {OverlayControls}
    </div>
  );
};

export default StickerHover;
