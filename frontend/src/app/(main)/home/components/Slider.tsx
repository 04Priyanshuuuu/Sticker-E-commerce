"use client";
import React from "react";

const stickers = [
  {
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1669839774770-df5a3d2da257?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  { id: 2, img: "https://source.unsplash.com/600x900/?film,hollywood" },
  { id: 3, img: "https://source.unsplash.com/600x900/?poster,action" },
  { id: 4, img: "https://source.unsplash.com/600x900/?thriller,movie" },
  { id: 5, img: "https://source.unsplash.com/600x900/?sci-fi,poster" },
  { id: 6, img: "https://source.unsplash.com/600x900/?drama,movie" },
  { id: 7, img: "https://source.unsplash.com/600x900/?adventure,film" },
  { id: 8, img: "https://source.unsplash.com/600x900/?romance,movie" },
  { id: 9, img: "https://source.unsplash.com/600x900/?fantasy,cinema" },
  { id: 10, img: "https://source.unsplash.com/600x900/?animation,film" },
];

const StickerSlider: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Trending
      </h1>

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
                      transition-transform duration-300 overflow-hidden
                      hover:scale-105 hover:shadow-lg
                    "
            style={{ backgroundImage: `url(${sticker.img})` }}
          >
            {/* Number tag */}
            <span
              className="
                          absolute top-2 left-2 bg-black/60 text-white 
                          text-2xl font-bold px-3 py-1 rounded
                        "
            >
              {sticker.id}
            </span>

            {/* Hover Overlay */}
            <div
              className="
                          absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 
                          flex flex-col justify-between items-center p-4
                          transition-opacity duration-300
                        "
            >
              {/* Top icons */}
              <div className="flex justify-end w-full gap-2">
                <button className="bg-white/80 p-2 rounded hover:bg-blue-500 hover:text-white transition">
                  +
                </button>
                <button className="bg-white/80 p-2 rounded hover:bg-blue-500 hover:text-white transition">
                  ↻
                </button>
              </div>

              {/* Bottom part */}
              <div className="w-full text-center">
                <p className="text-white text-lg mb-2">₹20</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Buy
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StickerSlider;
