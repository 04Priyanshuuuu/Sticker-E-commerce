"use client";
import { motion } from "framer-motion";

const reviews = [
  { name: "Sara", text: "I love these! Perfect texture and print quality 💖" },
  { name: "Aman", text: "Worth every rupee 😍" },
  { name: "Zoya", text: "Stuck perfectly on my laptop. Aesthetic af ✨" },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">What People Say 💬</h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl w-[300px] shadow-md border border-white/10"
          >
            <p className="text-lg italic mb-4">“{r.text}”</p>
            <p className="text-blue-400 font-semibold">— {r.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
