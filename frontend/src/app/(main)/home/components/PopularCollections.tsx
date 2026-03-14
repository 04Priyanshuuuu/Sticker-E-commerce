"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PopularCollections() {
  const [stickers, setStickers] = useState<any[]>([]);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stickers/?limit=5`
        );
        const data = await res.json();

        const items = data.results ?? data ?? [];
        setStickers(items.slice(0, 5));
      } catch (err) {
        console.error("Failed to load collections", err);
      }
    };

    fetchStickers();
  }, []);

  return (
    <section className="py-20 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Popular Collections 💫
      </h2>

      <div className="flex overflow-x-auto gap-6 px-6 scrollbar-hide">
        {stickers.map((c, i) => (
          <motion.div
            key={c.id}
            whileHover={{ scale: 1.05 }}
            className="relative flex-none w-[250px] h-[300px] rounded-2xl overflow-hidden group"
          >
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-full object-cover group-hover:opacity-70 transition"
            />

            <div className="absolute inset-0 flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
              <p className="text-xl font-semibold mb-2">{c.title}</p>

              <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                View Collection
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}