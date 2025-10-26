// /app/buy/[id]/page.tsx
import React from "react";

const BuyPage = async ({ params }) => {
  const res = await fetch(`http://localhost:8000/api/stickers/${params.id}/`);
  const sticker = await res.json();

  return (
    <div className="p-6">
      <img src={sticker.image} alt={sticker.name} className="w-64 h-64" />
      <h2 className="text-xl font-bold">{sticker.name}</h2>
      <p className="text-lg">Price: ₹{sticker.price}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default BuyPage;
