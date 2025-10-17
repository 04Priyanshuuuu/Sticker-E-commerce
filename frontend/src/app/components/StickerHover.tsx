"use client";
import React from "react";
import { Plus, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  name: string;
  price: number;
  img: string;
};

const StickerHover: React.FC<Props> = ({ id, name, price, img }) => {
  const router = useRouter();

  const handleBuyClick = () => {
    router.push(`/stickers/${id}`); // goes to sticker detail page
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", id);
    // later: call API /cart/
  };

  return (
    <div className="relative group w-64 h-80 rounded-xl overflow-hidden shadow-lg bg-gray-50">
      {/* image zoom on hover */}
      <motion.img
        src={img}
        alt={name}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.25 }}
        className="object-cover w-full h-full transition-transform duration-300"
      />

      {/* top-right icon buttons */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          aria-label="add-to-cart"
          onClick={handleAddToCart}
          className="w-9 h-9 rounded bg-white bg-opacity-90 flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4 text-gray-800" />
        </button>
        <button
          aria-label="share"
          className="w-9 h-9 rounded bg-white bg-opacity-90 flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: name,
                  text: `Check out this sticker! ₹${price}`,
                  url: window.location.href,
                })
              : alert("Sharing not supported on this device.")
          }
        >
          <Share2 className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* bottom info + Buy button */}
      <div className="absolute left-3 right-3 bottom-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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

      {/* overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-colors duration-200 rounded-xl pointer-events-none" />
    </div>
  );
};

export default StickerHover;
