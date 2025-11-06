"use client";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function SocialContacts() {
  return (
    <section className="bg-black text-white py-16 flex flex-col items-center justify-center px-4">
      {/* WhatsApp Section */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Or Contact Us on WhatsApp 💬
        </h2>
        <p className="text-gray-400 text-center mb-6 max-w-md">
          Need a quick reply? Message us directly on WhatsApp for instant support or queries.
        </p>

        <a
          href="https://wa.me/919555669802"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-500 px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300"
        >
          <FaWhatsapp className="text-2xl" />
          Chat on WhatsApp
        </a>
      </div>

      {/* Instagram Section */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mt-20 mb-3 text-center">
          Or DM Us on Instagram 📸
        </h2>
        <p className="text-gray-400 text-center mb-6 max-w-md">
          Prefer Instagram? Drop us a DM — we love connecting with our sticker fam there!
        </p>

        <a
          href="https://www.instagram.com/sticke_official?utm_source=qr&igsh=MTliaWpsaXN4NjFxNA=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-pink-600/20 hover:bg-pink-600/40 text-pink-400 border border-pink-500 px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300"
        >
          <FaInstagram className="text-2xl" />
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}
