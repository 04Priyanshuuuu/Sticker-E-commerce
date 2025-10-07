"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userRes = await fetch("http://localhost:8000/api/auth/profile/", {
          credentials: "include",
        });
        if (!userRes.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = await userRes.json();
        setUser(userData);

        const ordersRes = await fetch("http://localhost:8000/api/orders/", {
          credentials: "include",
        });
        const ordersData = await ordersRes.json();
        setOrders(ordersData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl mb-4">Please login to see your orders</h1>
          <a
            href="/auth/login"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mb-6 mt-70 ml-150">
        <h1 className="text-3xl font-bold">
          Welcome, {user.name || user.username || "User"} 👋
        </h1>
      </div>

      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className="border border-gray-700 rounded-xl p-4 hover:bg-gray-900 transition"
            >
              <p>
                <span className="font-semibold">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ₹{order.total}
              </p>
              <p className="text-gray-400 text-sm">
                Placed on: {new Date(order.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-6 mt-10 ml-170">No orders found.</p>
      )}
    </main>
  );
}
