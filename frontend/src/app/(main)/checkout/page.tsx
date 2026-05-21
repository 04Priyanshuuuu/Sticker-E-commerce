"use client";

import {
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("cod");

  const [
    address,
    setAddress,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth =
      async () => {
        try {
          const res =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`,
              {
                credentials:
                  "include",
              }
            );

          if (!res.ok) {
            addAlert({
  type: "error",
  message: "Login to place order 🔒",
});

            router.push(
              "/auth/login"
            );
          }
        } catch {
          router.push(
            "/auth/login"
          );
        }
      };

    checkAuth();
  }, [router]);

  const handlePlaceOrder =
    async () => {
      setLoading(true);

      try {
        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/create/`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "include",

              body:
                JSON.stringify(
                  {
                    payment_method:
                      paymentMethod,

                    shipping_address:
                      address,
                  }
                ),
            }
          );

        if (!res.ok)
          throw new Error();

        addAlert({
  type: "success",
  message: "Order placed sucessfully✅",
});

        router.push(
          "/orders"
        );
      } catch {
        addAlert({
  type: "error",
  message: "Failed to place order!",
});
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center px-4">

      <div className="max-w-lg w-full bg-gray-900 rounded-2xl p-6 border border-gray-700 space-y-6">

        <h1 className="text-2xl font-bold">
          Checkout 🧾
        </h1>

        <div>

          <label className="block text-gray-400 mb-2">
            Shipping Address
          </label>

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:outline-none"
            rows={3}
            placeholder="Enter address"
          />

        </div>

        <div>

          <label className="block text-gray-400 mb-2">
            Payment Method
          </label>

          <label className="flex items-center gap-2">

            <input
              type="radio"
              checked={
                paymentMethod ===
                "cod"
              }
              onChange={() =>
                setPaymentMethod(
                  "cod"
                )
              }
            />

            COD

          </label>

        </div>

        <button
          onClick={
            handlePlaceOrder
          }
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl cursor-pointer"
        >
          {loading
            ? "Placing..."
            : "Place Order"}
        </button>

      </div>
    </main>
  );
}