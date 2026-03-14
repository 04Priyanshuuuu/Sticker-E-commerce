"use client";
import React, { useEffect, useRef, useState } from "react";

interface Sticker {
  id: number;
  title: string;
  image: string;
}

export default function StickerRound() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const rotationY = useRef(0);
  const theta = useRef(0);
  const radius = 400;
  const isDragging = useRef(false);
  const startX = useRef(0);

  // 🧩 Fetch stickers from Django backend
  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stickers/?is_popular=true&limit=10`,
        );
        const parsed = await res.json();
        const data = Array.isArray(parsed) ? parsed : (parsed.results ?? []);
        console.log("Sticker API response:", data);
        setStickers(
          data.map((it: any) => ({
            id: it.id,
            title: it.title ?? it.name ?? "",
            image: it.image ?? it.img ?? it.image_url ?? "",
          })),
        );
      } catch (error) {
        console.error("Error fetching stickers:", error);
      }
    }
    fetchPopular();
  }, []);

  // 🌀 3D carousel setup
  useEffect(() => {
    if (!stickers.length) return;
    const track = trackRef.current;
    const scene = sceneRef.current;
    if (!track || !scene) return;

    const cards = Array.from(track.children) as HTMLDivElement[];
    theta.current = 360 / stickers.length;

    cards.forEach((card, i) => {
      const angle = theta.current * i;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    const updateRotation = () => {
      track.style.transform = `rotateY(${rotationY.current}deg)`;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      startX.current = e.pageX;
      scene.style.cursor = "grabbing";
    };
    const onMouseUp = () => {
      isDragging.current = false;
      scene.style.cursor = "grab";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.pageX - startX.current;
      startX.current = e.pageX;
      rotationY.current += delta * 0.3;
      updateRotation();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      rotationY.current += e.deltaY * 0.2;
      updateRotation();
    };

    scene.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    scene.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      scene.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      scene.removeEventListener("wheel", onWheel);
    };
  }, [stickers]);

  return (
    <section>
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Popular
      </h1>
      <div className="relative w-full h-[100vh] bg-black flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          MAKE IT YOURS
        </h2>

        {/* 3D Scene */}
        <div
          ref={sceneRef}
          className="relative w-[400px] h-[400px] perspective-[1000px] cursor-grab"
        >
          <div
            ref={trackRef}
            className="absolute w-full h-full transition-transform duration-500 [transform-style:preserve-3d] [transform-origin:center_center]"
          >
            {stickers.map((sticker, i) => (
              <div
                key={i}
                className="absolute w-[160px] h-[200px] bg-zinc-900/90 rounded-lg p-2 text-center 
              shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:scale-105 hover:shadow-[0_0_15px_#00fff7] 
              transition-transform duration-300"
              >
                <img
                  src={sticker.image || ""}
                  alt={sticker.title || "Sticker image"}
                  className="w-full h-[160px] object-cover rounded-md"
                />
                <p className="mt-2 text-sm text-gray-300">{sticker.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
