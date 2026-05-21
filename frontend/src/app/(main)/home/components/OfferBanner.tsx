"use client";
import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/app/store/useCartStore";

export default function OfferBanner() {

  const addAlert = useCartStore((s) => s.addAlert);

  return (
    <section>
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Offers
      </h1>

      <div className="flex justify-center items-center py-24 px-6 bg-black text-white">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full max-w-6xl h-[450px] border border-white bg-black/40 backdrop-blur-sm flex flex-col md:flex-row justify-between items-center px-10 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
        >

          {/* LEFT TEXT SECTION */}
          <div className="flex flex-col items-start text-left space-y-6">

            <h3 className="text-5xl md:text-6xl font-extrabold tracking-wide font-[Poppins]">
              ✨ Buy 2 Stickers, Get 1 Free!
            </h3>

            <p className="text-gray-300 text-lg max-w-3xl font-[Inter]">
              Level up your sticker game — grab this limited-time deal before
              it’s gone! Stick more, pay less. 🎨
            </p>

          </div>

          {/* RIGHT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 border border-white bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-all duration-200"
            onClick={() =>
              addAlert({
                type: "success",
                message: "Coming Soon! 🎉",
              })
            }
          >
            Coming soon
          </motion.button>

        </motion.div>

      </div>
    </section>
  );
}