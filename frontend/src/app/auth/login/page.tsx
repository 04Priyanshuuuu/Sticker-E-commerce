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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        try {
          const profileRes = await fetch("http://localhost:8000/api/auth/profile/", {
            credentials: "include",
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setUser && setUser(profileData);
          }
        } catch (e) { /* ignore */ }
        window.location.href = "/";
      } else {
        const data = await res.json();
        setError(data.errors?.non_field_errors?.[0] || "Invalid email or password");
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black">
      <div
        className="w-full max-w-md p-10"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 1)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
            Sign in
          </h2>
          <span className="text-sm text-gray-200">Welcome back to your account</span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 bg-white/20 text-black px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 bg-white/20 text-black px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300"
              required
            />
          </div>
          {error && (
            <div className="bg-red-100 border border-red-300 rounded p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-white to-gray-200 text-black font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Sign in
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <a
            href="/auth/forgot-password"
            className="text-gray-200 hover:text-white underline decoration-white/30 hover:decoration-white transition-colors duration-300"
          >
            Forgot Password?
          </a>
          <div className="text-sm text-gray-300">
            Don't have an account?{" "}
            <a
              href="/auth/signUp"
              className="text-white font-medium hover:underline decoration-white/50 hover:decoration-white transition-all duration-300"
            >
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
