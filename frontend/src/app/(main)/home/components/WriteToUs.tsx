"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function WriteToUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = async () => {
    try {
      await emailjs.send(
        "service_a24z3yg",
        "template_9007h3t",
        {
          name: email.split("@")[0],
          email: email,
          message: message,
          title: "Website Message",
        },
        "poWpnV2bFY9ROtC9W"
      );

      addAlert({
  type: "success",
  message: "Message sent! ✉️",
});

      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="w-full">
      <h1 className="text-[40px] font-bold m-10 ml-5 border-l-4 border-blue-500 pl-4">
        Connect With Us
      </h1>
      <div className="bg-black text-white py-20 flex flex-col items-center px-4">
        
        <h2 className="text-4xl font-bold mb-6">
          Write To Us 📨
        </h2>

        <div className="flex flex-col gap-4 w-full max-w-md">

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="border border-white bg-transparent px-4 py-3 rounded-md"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write here..."
            className="border border-white bg-transparent px-4 py-3 rounded-md h-32"
          />

          <button
            onClick={handleSendEmail}
            className="px-6 py-3 bg-white text-black rounded-md cursor-pointer"
          >
            Send
          </button>

        </div>

      </div>
      </div>
    </section>
  );
}