"use client";

import { useState } from "react";

export default function SignupPage() {

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword,
  setConfirmPassword] =
  useState("");

  const [error, setError] =
  useState("");

  const [success, setSuccess] =
  useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;

    }

    try {

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
          {

            method:
            "POST",

            headers: {
              "Content-Type":
              "application/json"
            },

            body:
            JSON.stringify({

              name:
              fullName,

              email,

              password,

              password2:
              confirmPassword

            }),

          }
        );

      if (res.ok) {

        setSuccess(
          "Account created successfully"
        );

        setTimeout(
          () =>
            window.location.replace(
              "/"
            ),
          1000
        );

      }

      else {

        const data =
          await res.json();

        setError(
          data.detail ||
          "Signup failed"
        );

      }

    }

    catch {

      setError(
        "Something went wrong"
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

      {/* Background */}

      <div className="
      absolute
      top-[-180px]
      left-[-150px]
      w-[450px]
      h-[450px]
      rounded-full
      bg-cyan-500/20
      blur-[150px]
      " />

      <div className="
      absolute
      bottom-[-120px]
      right-[-100px]
      w-[420px]
      h-[420px]
      rounded-full
      bg-blue-700/20
      blur-[150px]
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
          mt-6
          text-gray-400
          text-lg
          leading-8
          max-w-xl
          ">

            Join Sticke and explore
            anime, cars, nature and
            premium sticker collections.

            Save favorites, discover
            trending designs and build
            your own sticker world.

          </p>

          <div className="
          mt-10
          flex
          flex-wrap
          gap-4
          ">

            <div className="
            px-5
            py-2
            rounded-full
            border
            border-white/10
            bg-white/5
            ">

              Anime

            </div>

            <div className="
            px-5
            py-2
            rounded-full
            border
            border-white/10
            bg-white/5
            ">

              Cars

            </div>

            <div className="
            px-5
            py-2
            rounded-full
            border
            border-white/10
            bg-white/5
            ">

              Trending

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-10
        shadow-[0_0_50px_rgba(0,0,0,.6)]
        ">

          <h2 className="
          text-3xl
          font-bold
          ">

            Create Account

          </h2>

          <p className="
          mt-2
          text-gray-400
          ">

            Start your Sticke journey

          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="
            mt-8
            space-y-5
            "
          >

            <Input
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e:any)=>
                setFullName(
                  e.target.value
                )
              }
            />

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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e:any)=>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            {error && (

              <p className="
              text-red-400
              text-sm
              ">

                {error}

              </p>

            )}

            {success && (

              <p className="
              text-green-400
              text-sm
              ">

                {success}

              </p>

            )}

            <button
              type="submit"
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

              Join Sticke

            </button>

          </form>

          <div className="
          mt-8
          text-sm
          text-gray-400
          ">

            Already have an account?

            <a
              href="/auth/login"
              className="
              ml-2
              text-blue-400
              underline
              "
            >

              Login

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
        px-4
        py-3
        rounded-xl
        bg-white/5
        border
        border-white/10
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