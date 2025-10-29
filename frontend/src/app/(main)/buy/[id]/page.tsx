"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCartStore } from "@/app/store/useCartStore";

const BuyPage = () => {
  const router = useRouter();
  const { id } = useParams(); // 👈 yeh safe aur supported method hai
  const [sticker, setSticker] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const addAlert = useCartStore((s) => s.addAlert);


  useEffect(() => {
    if (!id) return;
    const fetchSticker = async () => {
      const res = await fetch(`http://localhost:8000/api/stickers/${id}/`);
      const data = await res.json();
      setSticker(data);

      // fetch related stickers
      const relatedRes = await fetch(
        `http://localhost:8000/api/stickers/?search=${data.category}`
      );
      const relatedData = await relatedRes.json();
      setRelated(relatedData.filter((s) => s.id !== data.id));
    };
    fetchSticker();
  }, [id]);

  if (!sticker)
    return <div className="text-center mt-10 text-white">Loading...</div>;

  const totalPrice = (sticker.price * quantity).toFixed(2);

  const handleAddToCart = async (e?: React.SyntheticEvent) => {
    e?.stopPropagation();

    try {
      const profileRes = await fetch(
        "http://localhost:8000/api/auth/profile/",
        {
          credentials: "include",
        }
      );

      if (!profileRes.ok) {
        addAlert({
          type: "error",
          message: "Please log in to add items to cart!",
        });
        router.push("/auth/login");
        return;
      }

      const addRes = await fetch("http://localhost:8000/api/cart/add/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sticker_id: id,
          size: "M",
          quantity: 1,
        }),
      });

      const data = await addRes.json();

      if (addRes.ok) {
        addAlert({ type: "success", message: "Sticker added to cart 🛒" });
      } else {
        addAlert({
          type: "error",
          message: data.detail || "Failed to add to cart",
        });
      }
    } catch (error) {
      console.error("Cart error:", error);
      addAlert({ type: "error", message: "Error adding to cart" });
    }
  };

  return (
    <div className="text-white px-8 py-12 bg-black min-h-screen">
      <div className="flex flex-col mt-30 md:flex-row items-center gap-10">
        <div className="flex-1 flex justify-center">
          <img
            src={sticker.image}
            alt={sticker.name}
            className="w-80 h-80 object-contain rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{sticker.name}</h2>
          <p className="text-gray-400 capitalize">
            Category: {sticker.category}
          </p>
          <p className="text-2xl font-semibold">Price: ₹{sticker.price}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-700 px-3 py-1 rounded text-lg"
            >
              −
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-700 px-3 py-1 rounded text-lg"
            >
              +
            </button>
          </div>

          <p className="text-lg">Total: ₹{totalPrice}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-6">More from this category</h3>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {related.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid cursor-pointer hover:scale-[1.02] transition"
              onClick={() => router.push(`/buy/${item.id}`)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
