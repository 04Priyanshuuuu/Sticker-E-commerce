"use client";

import CartPage from "./components/CartPage";
import { useAuth } from "../../context/AuthContext"; // aapka auth context
import { useEffect } from "react";

export default function Page() {
  const { user, loading, setUser } = useAuth(); // user ki state aur loading status

  // Fallback: if provider somehow didn't populate user after loading, try fetching profile here.
  useEffect(() => {
    const ensureUser = async () => {
      if (!loading && !user) {
        try {
          const res = await fetch("http://localhost:8000/api/auth/profile/", {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            if (setUser) {
              setUser(data);
            }
          }
        } catch {
          // ignore — stay unauthenticated
        }
      }
    };
    ensureUser();
  }, [loading, user, setUser]);

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] flex justify-center items-start p-4">
      {loading ? (
        <div className="text-white text-xl font-semibold mt-120">Loading...</div>
      ) : !user ? (
        <div className="text-white text-xl font-semibold mt-120">Login to add items</div>
      ) : (
        <CartPage user={user} />
      )}
    </main>
  );
}
