"use client";
import { useEffect, useState } from "react";

export default function CategoryPage({ category }: { category: string }) {
  const [stickers, setStickers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api").replace(/\/$/, "");
  // BACKEND_BASE used to prefix media paths (images)
  const BACKEND_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");

  const getImageSrc = (s: any) => {
    const val = s.image || s.image_url || s.imageUrl || "";
    if (!val) return "/placeholder.png"; // optional: add a placeholder in /public
    // If API returned an absolute URL already, just use it
    if (val.startsWith("http://") || val.startsWith("https://")) return val;
    // Otherwise prefix BACKEND_BASE and ensure there's one leading slash
    const cleaned = val.startsWith("/") ? val : `/${val}`;
    return `${BACKEND_BASE}${cleaned}`;
  };

  const fetchStickers = async (pageToFetch = page) => {
    try {
      setLoading(true);
      const url = `${API_BASE}/stickers/?search=${encodeURIComponent(category)}&page=${pageToFetch}`;
      // If your API uses cookie auth and you want browser to include cookies, uncomment:
      // const res = await fetch(url, { credentials: 'include' });
      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error("Stickers fetch failed:", res.status, text);
        throw new Error(`Failed to fetch stickers: ${res.status}`);
      }

      const data = await res.json();
      const items = data.results ?? data ?? [];

      if (items.length === 0) setHasMore(false);
      setStickers((prev) => [...prev, ...items]);
    } catch (err) {
      console.error("fetchStickers error:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // When category changes, reset and fetch page 1
  useEffect(() => {
    setStickers([]);
    setPage(1);
    setHasMore(true);
    if (category) {
      fetchStickers(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // When page increments (after initial), fetch it
  useEffect(() => {
    if (page === 1) return;
    fetchStickers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // infinite scroll
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
          <img
            key={s.id}
            src={getImageSrc(s)}
            alt={s.title ?? "sticker"}
            className="w-full rounded-2xl mb-4 hover:opacity-80 transition"
            loading="lazy"
          />
        ))}
      </div>

      {loading && <p className="text-center text-gray-300 mt-6">Loading...</p>}

      {!hasMore && !loading && (
        <p className="text-center text-gray-400 mt-6">No more stickers</p>
      )}
    </div>
  );
}
