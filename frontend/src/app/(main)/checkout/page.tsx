"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/orders/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          payment_method: paymentMethod,
          shipping_address: address,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      alert("Order placed successfully!");
      router.push("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="max-w-lg w-full bg-gray-900 rounded-2xl p-6 border border-gray-700 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Checkout 🧾</h1>

        <div>
          <label className="block text-gray-400 mb-2">Shipping Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:outline-none"
            rows={3}
            placeholder="Enter your full address"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Payment Method</label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="accent-purple-500"
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center space-x-3 opacity-50 cursor-not-allowed">
              <input
                type="radio"
                disabled
                className="accent-purple-500"
              />
              <span>Online Payment (coming soon)</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </main>
  );
}
