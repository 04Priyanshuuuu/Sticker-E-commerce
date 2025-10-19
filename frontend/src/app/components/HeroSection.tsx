"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


const slides = [
  {
    id: 1,
    content: (
      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          Sticke
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          

          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="relative w-full h-full">
       
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Slide 2 with Video Background
          </h1>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex items-center justify-center h-full w-full bg-green-500 text-white">
        <h1 className="text-4xl font-bold">Slide 3 Content</h1>
      </div>
    ),
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 60 sec
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {slides[current].content}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-5 right-5 flex gap-3">
        <button
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg"
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
}
