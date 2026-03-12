"use client";
import React, { useEffect, useState } from "react";
import { Plus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

type RawSticker = any;
type Sticker = {
  id: number | string;
  title?: string;
  img: string;
  price?: number;
  created_at?: string;
  category?: string;
  orientation?: "portrait" | "landscape" | "square";
};

// Detect image orientation
async function detectOrientation(url: string): Promise<Sticker["orientation"]> {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > img.naturalHeight) res("landscape");
      else if (img.naturalWidth < img.naturalHeight) res("portrait");
      else res("square");
    };
    img.onerror = () => res("landscape");
    img.src = url;
  });
}

export default function StickerSlider() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchStickers() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stickers/?ordering=-created_at&limit=10`
        );
        const text = await res.text();
        if (!res.ok) throw new Error(`${res.status} ${text}`);

        const parsed = JSON.parse(text);
        const data: RawSticker[] = Array.isArray(parsed)
          ? parsed
          : parsed.results ?? [];

        const mapped = await Promise.all(
          data.slice(0, 10).map(async (it) => {
            const imgUrl = it.image ?? it.img ?? it.image_url ?? "";
            const orientation = imgUrl
              ? await detectOrientation(imgUrl)
              : "landscape";

            return {
              id: it.id,
              title: it.title ?? it.name ?? "",
              img: imgUrl,
              price: Number(it.price ?? 0),
              created_at: it.created_at,
              category: it.category ?? "Uncategorized",
              orientation,
            } as Sticker;
          })
        );

        setStickers(mapped);
      } catch (e) {
        console.error(e);
        setError("Failed to load trending stickers.");
      } finally {
        setLoading(false);
      }
    }

    fetchStickers();
  }, []);

  // Loading UI
  if (loading)
    return (
      <div className="w-full">
        <h1 className="text-[40px] font-bold m-10 ml-5 border-l-4 border-blue-500 pl-4">
          Trending
        </h1>
        <div className="flex gap-4 overflow-x-scroll p-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[250px] h-[350px] bg-gray-300 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="w-full">
        <h1 className="text-[40px] font-bold m-10 ml-5 border-l-4 border-blue-500 pl-4">
          Trending
        </h1>
        <div className="p-6 text-red-600">{error}</div>
      </div>
    );

  return (
    <div className="w-full">
      <h1 className="text-[40px] font-bold m-10 ml-5 border-l-4 border-blue-500 pl-4">
        Trending
      </h1>

      <div className="flex gap-4 overflow-x-scroll p-5 scroll-smooth [&::-webkit-scrollbar]:hidden">
        {stickers.map((sticker, idx) => (
          <div
            key={sticker.id}
            onClick={() => router.push(`/buy/${sticker.id}`)}
            className="
              relative w-[250px] h-[350px] flex-none rounded-xl bg-black 
              overflow-hidden group shadow-md cursor-pointer
            "
          >
            {/* IMAGE */}
            <div className="w-full h-full flex items-center justify-center bg-black">
              <img
                src={sticker.img}
                alt={sticker.title}
                className={
                  "max-w-full max-h-full rounded-md transition-transform duration-300 " +
                  (sticker.orientation === "landscape"
                    ? "w-full h-auto object-cover"
                    : sticker.orientation === "portrait"
                    ? "w-auto h-full object-cover"
                    : "w-full h-full object-cover")
                }
              />
            </div>

            {/* Category tag */}
            <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-3 py-1 rounded z-20">
              {sticker.category}
            </span>

            {/* Index */}
            <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-20">
              {idx + 1}
            </span>

            {/* HOVER OVERLAY LIKE YOUR StickerHover */}
            <div
              className="
              absolute inset-0 bg-black/0 group-hover:bg-black/50 
              opacity-0 group-hover:opacity-100 
              transition-all duration-300 z-10
              flex flex-col justify-between p-3 pointer-events-none group-hover:pointer-events-auto
            "
            >
              {/* Top-right buttons */}
              <div className="flex flex-col gap-2 self-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Add to cart ${sticker.id}`);
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition"
                >
                  <Plus className="w-5 h-5 text-black" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(
                      location.origin + `/buy/${sticker.id}`
                    );
                    alert("Link Copied!");
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition"
                >
                  <Share2 className="w-5 h-5 text-black" />
                </button>
              </div>

              {/* Bottom row: price + BUY */}
              <div className="flex justify-between items-center">
                <span className="text-white text-lg font-semibold bg-black/60 px-3 py-1 rounded-lg">
                  ₹{sticker.price?.toFixed(0)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/buy/${sticker.id}`);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
