"use client";
import { motion } from "framer-motion";

export default function HowTheyStick() {
  return (
    <section className="relative py-20 text-center text-white bg-gradient-to-b from-black to-blue-950">
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="w-[90%] max-w-4xl mx-auto rounded-3xl shadow-2xl"
      >
        <source src="/videos/sticker_apply.mp4" type="video/mp4" />
      </motion.video>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold mt-10"
      >
        Peel. Stick. Flex. That easy 😎
      </motion.h2>
    </section>
  );
}
