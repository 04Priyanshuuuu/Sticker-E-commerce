"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/app/store/useCartStore";
import {
  ShoppingCart,
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

  const { cart: globalCart, setCart: setGlobalCart } =
    useCartStore();

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

        if (!cartRes.ok)
          throw new Error(
            "Failed to fetch cart"
          );

        const cartData =
          await cartRes.json();

        const items = Array.isArray(
          cartData.items
        )
          ? cartData.items
          : [];

        setCart(items);
        setGlobalCart(items);

      } catch (err) {
        console.error(
          "Cart fetch error:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setGlobalCart]);

  // 🟣 Related stickers FIXED
  useEffect(() => {
    if (cart.length === 0) return;

    const fetchRelated = async () => {
      try {
        const category =
          cart[0]?.sticker?.category;

        if (!category) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stickers/?search=${category}`
        );

        const data =
          await res.json();

        const stickers =
          Array.isArray(data)
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
  const updateQuantity = async (
    itemId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    setUpdatingItem(itemId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}/`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            quantity:
              newQuantity,
          }),
        }
      );

      if (!res.ok)
        throw new Error(
          "Failed"
        );

      const updatedCart =
        await res.json();

      const items =
        Array.isArray(
          updatedCart.items
        )
          ? updatedCart.items
          : [];

      setCart(items);

      setGlobalCart(items);

    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingItem(null);
    }
  };

  // 🟣 Remove item
  const removeItem = async (
    itemId: number
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove/${itemId}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        const newItems =
          cart.filter(
            (item) =>
              item.id !== itemId
          );

        setCart(newItems);

        setGlobalCart(
          newItems
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat:
              Infinity,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-6">

          <ShoppingCart className="w-10 h-10 mx-auto" />

          <h1 className="text-2xl font-bold">
            Please login
          </h1>

        </div>
      </main>
    );
  }

  const subtotal =
    Array.isArray(cart)
      ? cart.reduce(
          (
            acc,
            item
          ) =>
            acc +
            (item
              .sticker
              ?.price ||
              0) *
              (item.quantity ||
                1),

          0
        )
      : 0;

  const total =
    subtotal;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">

      <div className="max-w-7xl mt-30 mx-auto">

        <h1 className="text-3xl font-bold mb-4">
          Hi {
            user.name ||
            "User"
          }, your cart 🛒
        </h1>

        <p className="text-gray-400 mb-10">
          {
            cart.length
          } items in
          your cart
        </p>

        {cart.length ===
        0 ? (

          <div className="text-center py-16">

            <ShoppingCart className="w-12 h-12 mx-auto text-gray-500 mb-4" />

            <h3 className="text-xl font-semibold mb-2">
              Your cart is empty
            </h3>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">

              <AnimatePresence>

                {cart.map(
                  (
                    item,
                    index
                  ) => (

                    <motion.div
                      key={
                        item.id
                      }
                      className="flex flex-col md:flex-row items-center gap-8 bg-gray-800/30 rounded-2xl p-6"
                    >

                      {/* IMAGE FIXED */}

                      <div className="w-40 h-40 flex justify-center items-center bg-gray-900 rounded-xl overflow-hidden">

                        <Image
                          src={
                            item
                              .sticker
                              ?.image?.startsWith(
                                "http"
                              )

                              ? item
                                  .sticker
                                  .image

                              : item
                                  .sticker
                                  ?.img?.startsWith(
                                    "http"
                                  )

                              ? item
                                  .sticker
                                  .img

                              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${
                                  item
                                    .sticker
                                    ?.image ||

                                  item
                                    .sticker
                                    ?.img ||

                                  ""
                                }`
                          }

                          alt={
                            item
                              .sticker
                              ?.title ||

                            item
                              .sticker
                              ?.name ||

                            "Sticker"
                          }

                          width={
                            180
                          }

                          height={
                            180
                          }

                          className="object-contain"
                        />

                      </div>

                      <div className="flex-1">

                        <h2 className="text-2xl font-bold">
                          {
                            item
                              .sticker
                              ?.name
                          }
                        </h2>

                        <p>
                          ₹
                          {
                            item
                              .sticker
                              ?.price
                          }
                        </p>

                        <button
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          className="bg-red-600 px-4 py-2 mt-4 rounded"
                        >

                          Remove

                        </button>

                      </div>

                    </motion.div>

                  )
                )}

              </AnimatePresence>

            </div>

            <div className="bg-gray-800/30 rounded-2xl p-6 h-fit">

              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between">

                <span>
                  Total
                </span>

                <span>
                  ₹
                  {total.toFixed(
                    2
                  )}
                </span>

              </div>

              <button
                onClick={() =>
                  router.push(
                    "/checkout"
                  )
                }
                className="w-full mt-6 bg-purple-600 py-3 rounded-xl"
              >

                Proceed to Checkout

              </button>

            </div>

          </div>

        )}

        {/* RELATED FIXED */}

        {relatedStickers.length >
          0 && (

          <div className="mt-16">

            <h2 className="text-2xl font-semibold mb-6">

              More from this category

            </h2>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">

              {relatedStickers.map(
                (
                  s
                ) => (

                  <StickerHover
                    key={
                      s.id
                    }

                    id={
                      s.id
                    }

                    name={
                      s.title ||
                      s.name
                    }

                    price={
                      s.price
                    }

                    img={
                      s.image ||
                      s.img
                    }
                  />

                )
              )}

            </div>

          </div>

        )}

      </div>

    </main>
  );
}