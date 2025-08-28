"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    content: (
      <div className="flex items-center justify-center h-full w-full bg-black text-white">
        <h1 className="text-4xl font-bold">Slide 1 Content</h1>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">Slide 2 Content</h1>
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


