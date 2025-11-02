"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Filter,
  Search,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const cancelOrder = async (orderId) => {
    if (!confirm("Kya aap sure hain? Ye order cancel ho jaayega.")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${orderId}/cancel/`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: "cancelled" } : o
          )
        );
      } else {
        alert("Cancel karne me error aayi.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error aayi.");
    }
  };

  const getProgress = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { width: "20%", color: "bg-gray-400" };
      case "accepted":
        return { width: "40%", color: "bg-yellow-400" };
      case "on_the_way":
        return { width: "70%", color: "bg-blue-500" };
      case "delivered":
        return { width: "100%", color: "bg-green-500" };
      case "cancelled":
        return { width: "100%", color: "bg-red-500" };
      default:
        return { width: "10%", color: "bg-gray-500" };
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </main>
    );
  }

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "all" || order.status.toLowerCase() === filter;
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Your Orders
        </h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/50"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/30 rounded-xl px-4 py-3 text-white"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="on_the_way">On The Way</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order, index) => {
                const { width, color } = getProgress(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-center gap-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300"
                  >
                    {/* Sticker Image */}
                    <div className="flex justify-center items-center w-44 h-44 bg-gray-900/40 rounded-2xl overflow-hidden">
                      <Image
                        src={
                          order.items?.[0]?.sticker?.image?.startsWith("http")
                            ? order.items[0].sticker.image
                            : `http://localhost:8000${order.items?.[0]?.sticker?.image || ""}`
                        }
                        alt={order.items?.[0]?.sticker?.name || "Sticker"}
                        width={180}
                        height={180}
                        className="object-contain rounded-xl bg-gray-900/30 p-2"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 space-y-3 w-full">
                      <h3 className="text-lg font-semibold">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Category: {order.items?.[0]?.sticker?.category || "Sticker"}
                      </p>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ₹{order.total}
                      </div>

                      {/* Status and progress */}
                      <div className="text-sm capitalize">
                        Status:{" "}
                        <span className="font-semibold text-purple-400">
                          {order.status.replaceAll("_", " ")}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width }}
                          transition={{ duration: 1 }}
                          className={`${color} h-2`}
                        />
                      </div>

                      {/* Cancel button */}
                      {order.status.toLowerCase() !== "cancelled" &&
                        order.status.toLowerCase() !== "delivered" && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
                          >
                            Cancel Order
                          </button>
                        )}

                      {order.status.toLowerCase() === "cancelled" && (
                        <div className="mt-4 text-red-400 font-semibold flex items-center gap-2">
                          <XCircle className="w-5 h-5" />
                          Cancelled ({order.cancelled_by === "user" ? "by you" : "by admin"})
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">No orders yet.</div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
