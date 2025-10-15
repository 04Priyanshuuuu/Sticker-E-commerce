"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        credentials: "include", // ⚠️ Important — cookies send/receive
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Update AuthContext immediately so pages (cart/profile/orders) update without a hard reload
        try {
          const profileRes = await fetch("http://localhost:8000/api/auth/profile/", {
            credentials: "include",
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setUser && setUser(profileData);
          }
        } catch (e) {
          // ignore
        }

        window.location.href = "/"; // login ke baad redirect
      } else {
        const data = await res.json();
        setError(
          data.errors?.non_field_errors?.[0] || "Invalid email or password"
        );
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center bg-black">
      <div className="w-full h-full max-w-md bg-black text-white p-8 rounded-2xl shadow-2xl border border-black">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Sign in</h2>
          <span className="text-sm text-gray-400">Welcome back</span>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent border border-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full bg-transparent border border-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold shadow-sm hover:brightness-95 hover:cursor-pointer active:scale-98 transition-transform"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <a href="/auth/forgot-password" className="text-gray-200 underline">
            Forgot Password?
          </a>
          <br />
          Don’t have an account?{" "}
          <a href="/auth/signUp" className="text-gray-200 underline">
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}
