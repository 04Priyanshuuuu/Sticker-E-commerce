"use client";
import React, { useState } from "react";

export default function WriteToUs() {
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    const adminEmail = "admin@yourdomain.com"; // replace with your admin email
    const subject = encodeURIComponent("Message from Sticker Website");
    const body = encodeURIComponent(
      `Hey team,\n\nI wanted to get in touch. Here's my email: ${email}\n\nMessage: `
    );
    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section>
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Connect With Us
      </h1>
    <div className="bg-black text-white py-20 flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Write To Us 📨
      </h2>
      <p className="text-gray-400 text-center mb-8 max-w-xl">
        Have a question, feedback, or collaboration idea? Drop your email below
        and we’ll get back to you soon!
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full border border-white bg-transparent text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
        />
        <button
          onClick={handleSendEmail}
          className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-300 transition-all"
        >
          Send
        </button>
      </div>
    </div>
    </section>
  );
}
