"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/app/store/useCartStore";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StickerHover from "@/app/components/StickerHover";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState<number | null>(null);
  const [relatedStickers, setRelatedStickers] = useState<any[]>([]);
  const router = useRouter();
  const { cart: globalCart, setCart: setGlobalCart } = useCartStore();

  // 🟣 Fetch user + cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`,
          {
            credentials: "include",
          }
        );

        if (!userRes.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = await userRes.json();
        setUser(userData);

        const cartRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!cartRes.ok) throw new Error("Failed to fetch cart");
        const cartData = await cartRes.json();
        const items = Array.isArray(cartData.items) ? cartData.items : [];
        setCart(items);
        setGlobalCart(items);
      } catch (err) {
        console.error("Cart fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setGlobalCart]);

  useEffect(() => {
  if (cart.length === 0) return;

  const fetchRelated = async () => {
    try {
      const category = cart[0]?.sticker?.category;

      if (!category) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stickers/?search=${category}`
      );

      const data = await res.json();

      const stickers = Array.isArray(data)
        ? data
        : data.results || [];

      setRelatedStickers(
        stickers.filter(
          (s: any) =>
            !cart.some(
              (c: any) =>
                c.sticker?.id === s.id
            )
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  fetchRelated();
}, [cart]);

  

  // 🟣 Update quantity
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdatingItem(itemId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}/`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!res.ok) throw new Error("Failed to update quantity");

      const updatedCart = await res.json();
      const items = Array.isArray(updatedCart.items) ? updatedCart.items : [];
      setCart(items);
      setGlobalCart(items);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingItem(null);
    }
  };

  // 🟣 Remove item
  const removeItem = async (itemId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove/${itemId}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        const newItems = cart.filter((item) => item.id !== itemId);
        setCart(newItems);
        setGlobalCart(newItems); // ✅ Zustand update
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🟣 Loading spinner
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </main>
    );
  }

  // 🟣 If user not logged in
  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Please login to see your Cart</h1>
          <a
            href="/auth/login"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            <span>Go to Login</span>
          </a>
        </div>
      </main>
    );
  }

  // 🟣 Price calculations
  const subtotal = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) => acc + (item.sticker?.price || 0) * (item.quantity || 1),
        0
      )
    : 0;

  const deliveryCharge = 0; // Free delivery for all orders
  const discount = 0;
  const total = subtotal + deliveryCharge - discount;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mt-30 mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Hi {user.name || "User"}, your cart 🛒
        </h1>
        <p className="text-gray-400 mb-10">{cart.length} items in your cart</p>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-12 h-12 mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <a
              href="/"
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl mt-4"
            >
              Start Shopping <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT: CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.sticker?.id || index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-center gap-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300"
                  >
                    {/* 🟢 Product Image fix: alt text corrected */}
                    <div className="flex justify-center items-center w-40 h-40 bg-gray-900/30 rounded-2xl overflow-hidden">
                      <Image
  src={
    item.sticker?.image?.startsWith("http")
      ? item.sticker.image
      : item.sticker?.img?.startsWith("http")
      ? item.sticker.img
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${
          item.sticker?.image ||
          item.sticker?.img ||
          ""
        }`
  }
  alt={
    item.sticker?.title ||
    item.sticker?.name ||
    "Sticker"
  }
  width={180}
  height={180}
  className="object-contain rounded-xl bg-gray-900/30 p-2"
/>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <h2 className="text-2xl font-bold">
                        {item.sticker?.name}
                      </h2>
                      <p className="text-gray-400 capitalize">
                        Category: {item.sticker?.category}
                      </p>
                      <p className="text-xl font-semibold">
                        Price: ₹{item.sticker?.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          className="bg-gray-700 px-3 py-1 cursor-pointer rounded text-lg"
                          disabled={(item.quantity || 1) <= 1}
                        >
                          −
                        </button>
                        <span className="text-xl">{item.quantity || 1}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="bg-gray-700 px-3 py-1 cursor-pointer rounded text-lg"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg">
                        Total: ₹
                        {(item.sticker?.price || 0) * (item.quantity || 1)}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 cursor-pointer rounded-lg"
                        >
                          <Trash2 className="inline w-4 h-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-1 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 h-fit sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Charges</span>
                  <span
                    className={`font-semibold ${
                      deliveryCharge === 0 ? "text-green-400" : ""
                    }`}
                  >
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="border-t border-gray-600 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/checkout")}
                className="w-full bg-gradient-to-r cursor-pointer  from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </motion.button>
            </div>
          </div>
        )}

        {/* Related Stickers */}
        {relatedStickers.map((s) => (
  <StickerHover
    key={s.id}
    id={s.id}
    name={s.title || s.name}
    price={s.price}
    img={s.image || s.img}
  />
))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
