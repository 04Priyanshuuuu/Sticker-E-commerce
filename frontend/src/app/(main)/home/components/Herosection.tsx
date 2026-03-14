"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ThreeDMarquee } from "../components/ui/3d-marquee";

const images = [
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511092/3d2_s1h2az.png",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476926/stickers/nature2_ik6gl2.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476529/stickers/dhoni_mbcd6n.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773478920/stickers/levi_nfm0f1.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773472128/stickers/i_want_to_eat_your_pancreas_ya0ton.png",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511090/3d4_sowwz4.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773472479/stickers/yn_teiseg.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511089/3d5_cw4np5.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d3_qt3a9t.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d3_qt3a9t.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d3_qt3a9t.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d1_re66lg.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511092/3d2_s1h2az.png",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773519441/3d12_hslaq8.png",//center
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d3_qt3a9t.jpg",//down
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511088/3d6_lavb6l.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d3_qt3a9t.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476656/stickers/virat_xu06fa.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511090/3d4_sowwz4.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d3_qt3a9t.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773472698/stickers/dodge_rqawzg.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773508058/explorestickers_iqw6mj.png",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773520020/3d13_a0o15l.png",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476967/stickers/nature3_egk26y.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476967/stickers/nature3_egk26y.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773478920/stickers/levi_nfm0f1.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773511091/3d3_qt3a9t.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476894/stickers/nature1_wx5eej.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476444/stickers/mustang_igiyjd.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476444/stickers/mustang_igiyjd.jpg",
    "https://res.cloudinary.com/dlifuwcgw/image/upload/v1773476656/stickers/virat_xu06fa.jpg",
  ];

const slides = [
  {
    id: 1,
    content: (
      <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">

        {/* 3D Marquee */}
        <ThreeDMarquee
          images={images}
          className="absolute inset-0 scale-[1.1]"
        />

      </div>
    ),
  },

  {
    id: 2,
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dlifuwcgw/video/upload/v1773507810/yourname_mbhezk.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    ),
  },

  {
    id: 3,
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dlifuwcgw/image/upload/v1773508058/explorestickers_iqw6mj.png"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-white">
            Explore Awesome Stickers
          </h1>

          <p className="text-lg text-gray-200 mt-4">
            Anime • Cars • Cricketers • Nature
          </p>
        </div>
      </div>
    ),
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

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
    <div className="relative w-full h-[650px] overflow-hidden rounded-2xl shadow-xl">

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