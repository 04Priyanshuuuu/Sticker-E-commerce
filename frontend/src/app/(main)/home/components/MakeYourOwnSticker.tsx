"use client";
import { motion } from "framer-motion";

export default function MakeYourOwnSticker() {
  return (
    <section className="py-24 text-center bg-white/10 backdrop-blur-md text-white">
      <motion.h2
        whileInView={{ scale: [0.9, 1] }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-4"
      >
        Design Your Own Sticker 🚀
      </motion.h2>
      <p className="text-lg mb-8 text-neutral-300">
        Coming soon — unleash your creativity & make it yours!
      </p>
      <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition">
        Join Waitlist
      </button>
    </section>
  );
}
