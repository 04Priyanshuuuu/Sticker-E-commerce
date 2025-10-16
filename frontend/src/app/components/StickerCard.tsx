"use client";
import React from "react";
import { Heart, ShoppingCart, Eye, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  name: string;
  price: number;
  img: string;
};

const StickerCard: React.FC<Props> = ({ name, price, img }) => (
  <div className="relative group w-64 h-80 rounded-xl overflow-hidden shadow-lg bg-gray-900">
    <motion.img
      src={img}
      alt={name}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.12 }}
      transition={{ duration: 0.3 }}
      className="object-cover w-full h-full transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="space-x-3 flex mb-3">
        <button className="bg-white bg-opacity-10 text-pink-500 p-2 rounded hover:bg-pink-500 hover:text-white transition">
          <Heart />
        </button>
        <button className="bg-white bg-opacity-10 text-purple-500 p-2 rounded hover:bg-purple-500 hover:text-white transition">
          <ShoppingCart />
        </button>
        <button className="bg-white bg-opacity-10 text-green-500 p-2 rounded hover:bg-green-500 hover:text-white transition">
          <CreditCard />
        </button>
        <button className="bg-white bg-opacity-10 text-blue-500 p-2 rounded hover:bg-blue-500 hover:text-white transition">
          <Eye />
        </button>
      </div>
      <div className="text-xl font-bold text-white mb-1">{name}</div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
        ₹{price}
      </div>
    </div>
  </div>
);

export default StickerCard;
