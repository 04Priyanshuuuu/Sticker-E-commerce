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
  overlayOnly?: boolean; // if true, only render the overlay controls (no image tag)
  className?: string; // optional extra classes for outer wrapper
};

const StickerHover: React.FC<Props> = ({ id, name, price, img, overlayOnly = false, className = "" }) => {
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

  // Buttons + price block as overlay
  const OverlayControls = (
    <>
      {/* top-right icon buttons */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <button
          aria-label="add-to-cart"
          onClick={handleAddToCart}
          className="w-9 h-9 rounded bg-white bg-opacity-90 flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4 text-gray-800" />
        </button>
        <button
          aria-label="share"
          onClick={(e) => {
            e.stopPropagation();
            navigator.share
              ? navigator.share({
                  title: name,
                  text: `Check out this sticker! ₹${price}`,
                  url: window.location.href,
                })
              : alert("Sharing not supported on this device.");
          }}
          className="w-9 h-9 rounded bg-white bg-opacity-90 flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
        >
          <Share2 className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* bottom info + Buy button */}
      <div className="absolute left-3 right-3 bottom-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <div className="text-white text-lg font-bold bg-black bg-opacity-60 px-3 py-2 rounded">
          ₹{price}
        </div>

        <button
          onClick={handleBuyClick}
          className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-700 transition"
        >
          Buy
        </button>
      </div>

      {/* subtle overlay darkening so overlay elements are readable */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-colors duration-200 rounded-xl pointer-events-none z-10" />
    </>
  );

  // If overlayOnly, return only controls (expected to be placed in same wrapper as image)
  if (overlayOnly) {
    return <>{OverlayControls}</>;
  }

  // Default: full standalone card (existing behavior) - uses motion.img zoom on hover
  return (
    <div className={`relative group w-64 h-80 rounded-xl overflow-hidden shadow-lg bg-gray-50 ${className}`}>
      <motion.img
        src={img}
        alt={name}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.25 }}
        className="object-cover w-full h-full transition-transform duration-300"
      />
      {OverlayControls}
    </div>
  );
};

export default StickerHover;
