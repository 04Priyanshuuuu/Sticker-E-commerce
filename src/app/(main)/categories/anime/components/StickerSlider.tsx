"use client";
import React from "react";

interface Sticker {
  id: number;
  img: string;
}

interface StickerSliderProps {
  title: string;
  stickers: Sticker[];
}

const StickerSlider: React.FC<StickerSliderProps> = ({ title, stickers }) => {
  return (
    <div className="w-full">
      {/* Genre / Category Title */}
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        {title}
      </h1>

      {/* Scrollable Slider */}
      <div
        className="
          flex gap-4 overflow-x-scroll p-5 scroll-smooth
          [scroll-snap-type:x_mandatory] 
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] [scrollbar-width:none]
        "
      >
        {stickers.map((sticker) => (
          <a
            key={sticker.id}
            href="#"
            className="
              relative flex-none w-[250px] h-[350px] rounded-lg
              bg-center bg-cover shadow-md scroll-snap-align-start
              hover:scale-105 hover:shadow-lg transition-transform duration-300
            "
            style={{ backgroundImage: `url(${sticker.img})` }}
          >
            <span
              className="
                absolute top-2 left-2 bg-black/60 text-white 
                text-2xl font-bold px-3 py-1 rounded
              "
            >
              {sticker.id}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StickerSlider;
