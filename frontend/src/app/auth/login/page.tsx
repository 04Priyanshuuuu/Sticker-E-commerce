"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    try {

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
          {
            method:
            "POST",

            credentials:
            "include",

            headers: {
              "Content-Type":
              "application/json"
            },

            body:
            JSON.stringify({
              email,
              password
            }),
          }
        );

      if (res.ok) {

        try {

          await new Promise(
            resolve =>
              setTimeout(
                resolve,
                500
              )
          );

          const profileRes =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`,
              {
                credentials:
                "include"
              }
            );

          if (
            profileRes.ok
          ) {

            const profileData =
              await profileRes.json();

            setUser &&
            setUser(
              profileData
            );

          }

        } catch {}

        window.location.href =
          "/";

      } else {

        const txt =
          await res.text();

        console.log(
          "LOGIN RESPONSE:",
          txt
        );

        setError(
          txt ||
          "Invalid email or password"
        );

      }

    } catch (err) {

      console.log(
        err
      );

      setError(
        "Something went wrong!"
      );

    }

  };

  return (

    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b0f] flex items-center justify-center">

      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-blue-500/60 rounded-full blur-[140px]" />

      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-orange-500/60 rounded-full blur-[140px]" />

      <div
        className="relative z-10 w-[420px] rounded-2xl border border-white/10
                   bg-white/10 backdrop-blur-xl p-8
                   shadow-[0_0_50px_rgba(0,0,0,0.6)] text-white"
      >

        <h2 className="text-3xl font-bold">
          Login Here
        </h2>

        <p className="text-sm text-gray-300 mt-1">
          Welcome back to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e:any)=>
              setEmail(
                e.target.value
              )
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e:any)=>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (

            <p className="text-red-400 text-sm">

              {error}

            </p>

          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-white text-black py-3 font-semibold
                       hover:bg-gray-200 transition cursor-pointer"
          >

            Log In

          </button>

        </form>

        <div className="mt-6 text-center space-y-3 text-sm text-gray-300">

          <a
            href="/auth/forgot-password"
            className="underline hover:text-white"
          >

            Forgot Password?

          </a>

          <div>

            Don&apos;t have an account?{" "}

            <a
              href="/auth/signUp"
              className="text-white underline"
            >

              Create one

            </a>

          </div>

        </div>

      </div>

    </div>

  );

}

function Input({

  label,

  type="text",

  placeholder,

  value,

  onChange

}:any){

  return(

    <div>

      <label className="block text-sm mb-1 text-gray-300">

        {label}

      </label>

      <input
        type={type}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        required

        className="w-full rounded-lg bg-white/10 border border-white/10
                   px-4 py-2.5 text-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-white/20"
      />

    </div>

  );

}"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    try {

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
          {
            method:
            "POST",

            credentials:
            "include",

            headers: {
              "Content-Type":
              "application/json"
            },

            body:
            JSON.stringify({
              email,
              password
            }),
          }
        );

      if (res.ok) {

        try {

          await new Promise(
            resolve =>
              setTimeout(
                resolve,
                500
              )
          );

          const profileRes =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`,
              {
                credentials:
                "include"
              }
            );

          if (
            profileRes.ok
          ) {

            const profileData =
              await profileRes.json();

            setUser &&
            setUser(
              profileData
            );

          }

        } catch {}

        window.location.href =
          "/";

      } else {

        const txt =
          await res.text();

        console.log(
          "LOGIN RESPONSE:",
          txt
        );

        setError(
          txt ||
          "Invalid email or password"
        );

      }

    } catch (err) {

      console.log(
        err
      );

      setError(
        "Something went wrong!"
      );

    }

  };

  return (

    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0b0f] flex items-center justify-center">

      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-blue-500/60 rounded-full blur-[140px]" />

      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-orange-500/60 rounded-full blur-[140px]" />

      <div
        className="relative z-10 w-[420px] rounded-2xl border border-white/10
                   bg-white/10 backdrop-blur-xl p-8
                   shadow-[0_0_50px_rgba(0,0,0,0.6)] text-white"
      >

        <h2 className="text-3xl font-bold">
          Login Here
        </h2>

        <p className="text-sm text-gray-300 mt-1">
          Welcome back to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e:any)=>
              setEmail(
                e.target.value
              )
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e:any)=>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (

            <p className="text-red-400 text-sm">

              {error}

            </p>

          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-white text-black py-3 font-semibold
                       hover:bg-gray-200 transition cursor-pointer"
          >

            Log In

          </button>

        </form>

        <div className="mt-6 text-center space-y-3 text-sm text-gray-300">

          <a
            href="/auth/forgot-password"
            className="underline hover:text-white"
          >

            Forgot Password?

          </a>

          <div>

            Don&apos;t have an account?{" "}

            <a
              href="/auth/signUp"
              className="text-white underline"
            >

              Create one

            </a>

          </div>

        </div>

      </div>

    </div>

  );

}

function Input({

  label,

  type="text",

  placeholder,

  value,

  onChange

}:any){

  return(

    <div>

      <label className="block text-sm mb-1 text-gray-300">

        {label}

      </label>

      <input
        type={type}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        required

        className="w-full rounded-lg bg-white/10 border border-white/10
                   px-4 py-2.5 text-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-white/20"
      />

    </div>

  );

}