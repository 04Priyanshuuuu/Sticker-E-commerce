"use client";
import React from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ import auth context

export default function ProfilePage() {
  const { user } = useAuth(); // get logged-in user

  return (
    <main className="min-h-screen bg-black/[0.96] text-white flex flex-col items-center justify-center">
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Welcome, {user.name || "User"} 👋
          </h1>

          <p className="text-lg text-gray-300">
            This is your profile page. You can view your details here.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">
            Please login to see your profile
          </h1>
          <a
            href="/auth/login"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Go to Login
          </a>
        </>
      )}
    </main>
  );
}
