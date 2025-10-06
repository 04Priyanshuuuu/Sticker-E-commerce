"use client";
import { useState } from "react";

export default function ResetPasswordPage({ params }: { params: { uid: string; token: string } }) {
  const { uid, token } = params; // Extract uid and token from params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/auth/resetpassword/${params.uid}/${params.token}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, password2: confirmPassword }),
        credentials: "include",
      });

      if (res.ok) {
        setSuccess("Password reset successfully!");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.token || data.password || "Failed to reset password");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex w-full h-full min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-2xl shadow-2xl border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Reset Password</h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full bg-transparent border border-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              className="w-full bg-transparent border border-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold shadow-sm hover:brightness-95 hover:cursor-pointer active:scale-98 transition-transform"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <a href="/auth/login" className="text-gray-200 underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
