"use client";
import React from "react";

const movies = [
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
      <p className="text-[40px] font-bold">Trending</p>
      <div
        className="
          flex gap-4 overflow-x-scroll p-5 scroll-smooth
          [scroll-snap-type:x_mandatory] 
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] [scrollbar-width:none]
        "
      >
        {movies.map((movie) => (
          <a
            key={movie.id}
            href="#"
            className="
              relative flex-none w-[250px] h-[350px] rounded-lg
              bg-center bg-cover shadow-md scroll-snap-align-start
              hover:scale-105 hover:shadow-lg transition-transform duration-300
            "
            style={{ backgroundImage: `url(${movie.img})` }}
          >
            <span
              className="
                absolute top-2 left-2 bg-black/60 text-white 
                text-2xl font-bold px-3 py-1 rounded
              "
            >
              {movie.id}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StickerSlider;
