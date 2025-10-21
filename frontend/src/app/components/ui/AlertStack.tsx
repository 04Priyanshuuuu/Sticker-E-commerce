"use client";
import { useStore } from "@/app/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

export default function AlertStack() {
  const alerts = useStore((s) => s.alerts);

  return (
    <div className="fixed inset-x-0 top-6 z-[9999] flex flex-col items-center space-y-2">
      <AnimatePresence>
        {alerts.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-xl px-4 py-2 shadow-lg text-white text-sm ${
              a.type === "success"
                ? "bg-green-500"
                : a.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {a.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
