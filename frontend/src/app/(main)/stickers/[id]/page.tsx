"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StickerDetail() {
  const { id } = useParams();
  const [sticker, setSticker] = useState<any>(null);

  useEffect(() => {
    // baad mein: backend se fetch karna
    setSticker({
      id,
      name: "Retro Vinyl Sticker",
      price: 149,
      description: "High quality matte finish vinyl sticker.",
      img: "https://plus.unsplash.com/premium_photo-1669839774770-df5a3d2da257?q=80&w=1976&auto=format&fit=crop",
    });
  }, [id]);

  if (!sticker) return <p>Loading...</p>;

  return (
    <div className="p-10 flex flex-col md:flex-row items-center gap-10">
      <img
        src={sticker.img}
        alt={sticker.name}
        className="w-80 h-80 object-cover rounded-xl shadow-md"
      />
      <div>
        <h1 className="text-3xl font-bold">{sticker.name}</h1>
        <p className="text-gray-600 mt-2">{sticker.description}</p>
        <p className="text-2xl font-semibold mt-4">₹{sticker.price}</p>

        <div className="mt-6 flex gap-4">
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700">
            Add to Cart
          </button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
