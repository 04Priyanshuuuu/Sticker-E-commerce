"use client";
import React from "react";
import { Plus, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  name: string;
  price: number;
  img?: string; // optional when overlayOnly true
  overlayOnly?: boolean; // if true, only render overlay (no image tag)
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
    router.push(`/stickers/${id}`);
  };

  const handleAddToCart = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    console.log("Added to cart:", id);
    // later: call API /cart/
  };

  // 🔹 All hover overlay UI
  const OverlayControls = (
    <>
      {/* 🔸 semi-transparent dark layer */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 z-10 pointer-events-none"></div>

      {/* 🔸 top-right buttons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition duration-300">
        <button
          aria-label="add-to-cart"
          onClick={handleAddToCart}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:scale-110 transition"
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
                url: window.location.href,
              });
            } else {
              alert("Sharing not supported on this device.");
            }
          }}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:scale-110 transition"
        >
          <Share2 className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* 🔸 bottom price + Buy */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="text-white text-lg font-semibold bg-black/60 px-3 py-1.5 rounded-lg">
          ₹{Number(price) ? Number(price).toFixed(2) : price}

        </div>
        <button
          onClick={handleBuyClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Buy
        </button>
      </div>
    </>
  );

  // 🔹 If only overlay (used inside category grid where image already rendered)
  if (overlayOnly) {
    return (
      <div className="absolute inset-0 z-20 pointer-events-none">
        {OverlayControls}
      </div>
    );
  }

  // 🔹 Full card standalone view
  return (
    <div
      className={`relative group w-64 h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-lg bg-gray-50 ${className}`}
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
