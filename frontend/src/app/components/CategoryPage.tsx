"use client";
import { useEffect, useState } from "react";
import StickerHover from "./StickerHover";

export default function CategoryPage({ category }: { category: string }) {
  const [stickers, setStickers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const API_BASE = (
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api"
  ).replace(/\/$/, "");
  const BACKEND_BASE = (
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000"
  ).replace(/\/$/, "");

  const getImageSrc = (s: any) => {
    const val = s.image || s.image_url || s.imageUrl || "";
    if (!val) return "/placeholder.png";
    if (val.startsWith("http://") || val.startsWith("https://")) return val;
    const cleaned = val.startsWith("/") ? val : `/${val}`;
    return `${BACKEND_BASE}${cleaned}`;
  };

  const fetchStickers = async (pageToFetch = page) => {
    try {
      setLoading(true);
      const url = `${API_BASE}/stickers/?search=${encodeURIComponent(
        category
      )}&page=${pageToFetch}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      const items = data.results ?? data ?? [];
      if (items.length === 0) setHasMore(false);
      setStickers((prev) => {
        const combined = [...prev, ...items];
        const unique = combined.filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        );
        return unique;
      });
    } catch (err) {
      console.error("fetchStickers error:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStickers([]);
    setPage(1);
    setHasMore(true);
    if (category) fetchStickers(1);
  }, [category]);

  useEffect(() => {
    if (page === 1) return;
    fetchStickers(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore && !loading) setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] px-4 py-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {stickers.map((s) => (
          <div
            key={`${s.id}-${category}`}
            className="relative group break-inside-avoid mb-4 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <img
              src={getImageSrc(s)}
              alt={s.title ?? "sticker"}
              className="w-full h-auto object-cover relative z-0 transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <StickerHover
              id={s.id}
              name={s.title}
              price={s.price ?? 0}
              overlayOnly={true}
            />
          </div>
        ))}
      </div>

      {loading && <p className="text-center text-gray-300 mt-6">Loading...</p>}
      {!hasMore && !loading && (
        <p className="text-center text-gray-400 mt-6">No more stickers</p>
      )}
    </div>
  );
}
