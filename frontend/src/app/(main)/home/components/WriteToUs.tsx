"use client";
import React, { useState } from "react";

export default function WriteToUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
  const adminEmail = "04myexperimentswithai@gmail.com";

  const subject = encodeURIComponent(
    "Message from Website"
  );

  const body = encodeURIComponent(
`User Email: ${email}

Message:
${message}`
  );

  window.open(
    `mailto:${adminEmail}?subject=${subject}&body=${body}`
  );
};

  return (
    <section>
      <div className="bg-black text-white py-20 flex flex-col items-center px-4">

        <h2 className="text-4xl font-bold mb-6">
          Write To Us 📨
        </h2>

        <div className="flex flex-col gap-4 w-full max-w-md">

          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Your Email"
            className="border border-white bg-transparent px-4 py-3 rounded-md"
          />

          <textarea
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="Write here..."
            className="border border-white bg-transparent px-4 py-3 rounded-md h-32"
          />

          <button
            onClick={handleSendEmail}
            className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-300 cursor-pointer"
          >
            Send
          </button>

        </div>
      </div>
    </section>
  );
}