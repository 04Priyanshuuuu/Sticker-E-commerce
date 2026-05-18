"use client";
import { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
          {
            method:
            "POST",

            headers:{
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

      } else {

        const data =
          await res.json();

        setError(
          data.detail ||
          "Signup failed"
        );
      }

    } catch {

      setError(
        "Something went wrong"
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
          Create Account
        </h2>

        <p className="text-sm text-gray-300 mt-1">
          Join the Sticke experience
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <Input
            label="Full Name"
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
            value={confirmPassword}
            onChange={(e:any)=>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-400 text-sm">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="
            w-full
            rounded-xl
            bg-white
            text-black
            py-3
            font-semibold
            hover:bg-gray-200
            transition
            cursor-pointer"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-300">

          Already have an account?{" "}

          <a
            href="/auth/login"
            className="text-white underline"
          >

            Login

          </a>

        </p>

      </div>
    </div>
  );
}

function Input({
  label,
  type="text",
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

        required

        className="
        w-full
        rounded-lg
        bg-white/10
        border
        border-white/10
        px-4
        py-2.5
        text-white
        focus:outline-none
        focus:ring-2
        focus:ring-white/20"
      />

    </div>
  );
}