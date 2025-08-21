"use client";
import Link from "next/link";
import { ThreeDMarquee } from "./ui/3d-marquee";

function Herosection() {
  const images = [
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
    "/stickers/stickers.jpg",
  ];

  return (
    <div className="relative h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center overflow-hidden mx-auto py-10 md:py-0">
      {/* 👇 3D Marquee Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-30">
        <div className="scale-90 translate-y-20">
          <ThreeDMarquee images={images} />
        </div>
      </div>

      {/* 👇 Foreground Content */}
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Get stickE wicky
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Dive into sticke
        </p>
        <div className="mt-4">
          <Link href={"/stickers"}>Explore Stickers</Link>
        </div>
      </div>
    </div>
  );
}

export default Herosection;
