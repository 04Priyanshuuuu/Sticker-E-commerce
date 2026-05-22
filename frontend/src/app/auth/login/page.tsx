"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading } = useState(false);

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
            method: "POST",

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
                1200
              )
          );

          const profileRes =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`,
              {
                method: "GET",

                credentials:
                "include",

                headers: {
                  "Content-Type":
                  "application/json"
                }
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

        } catch { }

        window.location.href = "/";

      }

      else {

        const txt =
          await res.text();

        setError(
          txt ||
          "Invalid email or password"
        );

      }

    }

    catch {

      setError(
        "Something went wrong!"
      );

    }

  };

  return (

    <div className="
      min-h-screen
      bg-black
      relative
      overflow-hidden
      text-white
      flex
      items-center
      justify-center
      px-6
    ">

      {/* Background Glow */}

      <div className="
      absolute
      top-[-180px]
      left-[-150px]
      w-[450px]
      h-[450px]
      bg-cyan-500/20
      blur-[150px]
      rounded-full
      " />

      <div className="
      absolute
      bottom-[-150px]
      right-[-100px]
      w-[400px]
      h-[400px]
      bg-blue-700/20
      blur-[150px]
      rounded-full
      " />

      <div className="
      relative
      z-10
      max-w-6xl
      w-full
      grid
      lg:grid-cols-2
      gap-16
      items-center
      ">

        {/* LEFT */}

        <div>

          <div className="
          h-20
          w-[4px]
          bg-blue-500
          mb-8
          " />

          <h1 className="
          text-6xl
          lg:text-7xl
          font-bold
          leading-tight
          ">

            Welcome to

            <span className="
            block
            text-blue-400
            mt-2
            ">

              Sticke

            </span>

          </h1>

          <p className="
          text-gray-400
          text-lg
          mt-6
          max-w-xl
          leading-8
          ">

            Explore premium anime,
            nature, cars and custom
            sticker collections.

            Build your collection,
            discover trending designs
            and personalize your world.

          </p>

          <div className="
          mt-10
          flex
          gap-4
          flex-wrap
          ">

            <div className="
            px-5
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            ">

              Anime

            </div>

            <div className="
            px-5
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            ">

              Nature

            </div>

            <div className="
            px-5
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
            ">

              Trending

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div
          className="
          border
          border-white/10
          rounded-3xl
          p-10
          bg-white/5
          backdrop-blur-xl
          shadow-[0_0_50px_rgba(0,0,0,.6)]
          "
        >

          <h2 className="
          text-3xl
          font-bold
          ">

            Login

          </h2>

          <p className="
          text-gray-400
          mt-2
          ">

            Continue your Sticke journey

          </p>

          <form
            onSubmit={handleSubmit}
            className="
            mt-8
            space-y-6
            "
          >

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: any) =>
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
              onChange={(e: any) =>
                setPassword(
                  e.target.value
                )
              }
            />

            {
              error &&
              (
                <p className="
                text-red-400
                text-sm
                ">

                  {error}

                </p>
              )
            }

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              py-3
              rounded-xl
              bg-blue-500
              hover:bg-blue-600
              transition
              font-semibold
              "
            >

              {
                loading
                  ? "Logging In..."
                  : "Enter Sticke"
              }

            </button>

          </form>

          <div className="
          mt-8
          text-sm
          text-gray-400
          space-y-3
          ">

            <a
              href="/auth/forgot-password"
              className="
              underline
              hover:text-white
              "
            >

              Forgot Password?

            </a>

            <div>

              Don't have an account?

              <a
                href="/auth/signUp"
                className="
                text-blue-400
                ml-2
                underline
                "
              >

                Create one

              </a>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

function Input({

  label,

  type = "text",

  placeholder,

  value,

  onChange

}: any) {

  return (

    <div>

      <label className="
      block
      mb-2
      text-sm
      text-gray-300
      ">

        {label}

      </label>

      <input
        type={type}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        required

        className="
        w-full
        bg-white/5
        border
        border-white/10
        rounded-xl
        px-4
        py-3
        text-white
        placeholder-gray-500
        focus:outline-none
        focus:border-blue-500
        transition
        "
      />

    </div>

  );

}