"use client";

import React, { useEffect, useState } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]) {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

/** Position classes */
const POSITIONS = [
  "absolute top-10 left-[6%] rotate-[-8deg]",
  "absolute top-8 left-[22%] rotate-[-5deg]",
  "absolute top-5 left-[40%] rotate-[8deg]",
  "absolute top-24 left-[45%] rotate-[-7deg]",
  "absolute top-32 left-[55%] rotate-[10deg]",
  "absolute top-40 left-[25%] rotate-[-7deg]",
  "absolute top-20 right-[35%] rotate-[2deg]",
  "absolute top-16 left-[30%] rotate-[4deg]",
  "absolute top-28 right-[20%] rotate-[-4deg]",
  "absolute top-6 left-[50%] rotate-[6deg]",
];

type Item = {
  title: string;
  image: string;
  className?: string;
};

export function DraggableCard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const ITEM_LIMIT = 7;

  const BACKEND_API = `${process.env.NEXT_PUBLIC_API_URL}/stickers/?limit=${ITEM_LIMIT}`;

  const fetchImages = async () => {
    try {
      setLoading(true);

      const res = await fetch(BACKEND_API);

      if (!res.ok) {
        throw new Error("Backend fetch failed");
      }

      const data = await res.json();

      const normalized = (Array.isArray(data) ? data : [])
        .map((d: any) => ({
          title: d.name || d.title || "Sticker",

          image: d.image.startsWith("http")
            ? d.image
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${d.image}`,
        }))
        .filter((d: Item) => d.image);

      const shuffled = shuffle(normalized);

      const finalItems = shuffled.map((item) => ({
        ...item,

        className:
          POSITIONS[Math.floor(Math.random() * POSITIONS.length)],
      }));

      setItems(finalItems);
    } catch (err) {
      console.error(err);

      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="w-full">

      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Random
      </h1>

      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">

        <button
          onClick={fetchImages}
          className="
          absolute top-1/2
          -translate-y-1/2
          z-50

          px-6 py-3

          rounded-xl

          bg-white/10
          backdrop-blur-md

          border border-white/20

          text-white

          hover:bg-white
          hover:text-black

          transition
        "
        >
          Randomize
        </button>

        {loading && (
          <div className="text-white text-xl">
            Loading...
          </div>
        )}

        {!loading &&
          items.map((item, index) => (
            <DraggableCardBody
              key={index}
              className={item.className}
            >
              <img
                src={item.image}
                alt={item.title}
                className="
                h-80
                w-80
                object-cover

                pointer-events-none
                relative
                z-10
              "
              />

              <h3 className="
              mt-4
              text-center
              text-2xl
              font-bold
              text-white
              ">
                {item.title}
              </h3>

            </DraggableCardBody>
          ))}
      </DraggableCardContainer>

    </div>
  );
}