"use client";
import { motion } from "framer-motion";

const collections = [
  { name: "Anime", img: "https://source.unsplash.com/600x400/?anime" },
  { name: "Quotes", img: "https://source.unsplash.com/600x400/?quotes,poster" },
  { name: "Aesthetic", img: "https://source.unsplash.com/600x400/?aesthetic" },
  { name: "Tech", img: "https://source.unsplash.com/600x400/?technology,design" },
  { name: "Dark Humor", img: "https://source.unsplash.com/600x400/?dark,art" },
];

export default function PopularCollections() {
  return (
    <section className="py-20 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Popular Collections 💫
      </h2>

      <div className="flex overflow-x-auto gap-6 px-6 scrollbar-hide">
        {collections.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="relative flex-none w-[250px] h-[300px] rounded-2xl overflow-hidden group"
          >
            <img
              src={c.img}
              alt={c.name}
              className="w-full h-full object-cover group-hover:opacity-70 transition"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
              <p className="text-xl font-semibold mb-2">{c.name}</p>
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
