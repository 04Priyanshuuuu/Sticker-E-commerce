"use client";
import { motion } from "framer-motion";
import { Palette, Droplets, Leaf, Laptop } from "lucide-react";

const features = [
  { icon: <Palette size={40} />, title: "Premium Vinyl Finish" },
  { icon: <Droplets size={40} />, title: "Waterproof & Fadeproof" },
  { icon: <Leaf size={40} />, title: "Eco-friendly Printing" },
  { icon: <Laptop size={40} />, title: "Perfect for Laptop & Bottle" },
];

export default function WhyStickers() {
  return (
    <section className="py-20 px-6 bg-white/5 backdrop-blur-xl text-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Our Stickers? ✨
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg text-center border border-white/10"
          >
            <div className="flex justify-center mb-3 text-blue-400">{f.icon}</div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
