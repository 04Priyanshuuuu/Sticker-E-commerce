"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function MakeYourOwnSticker() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // TODO: send to backend via API later
    }
  };

  return (
    <section className="py-24 bg-white/10 backdrop-blur-md text-white flex flex-col md:flex-row items-center justify-center gap-12 px-6">
      {/* LEFT SIDE — Upload box */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative w-64 h-64 rounded-3xl border-2 border-dashed border-neutral-400 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-white/10"
      >
        {!selectedImage ? (
          <>
            <Upload size={48} className="text-neutral-300 mb-2" />
            <p className="text-neutral-300 text-sm">Click to upload</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </>
        ) : (
          <img
            src={selectedImage}
            alt="Uploaded Sticker"
            className="rounded-2xl object-cover w-full h-full"
          />
        )}
      </motion.div>

      {/* RIGHT SIDE — Description */}
      <div className="text-center md:text-left max-w-md">
        <motion.h2
          whileInView={{ scale: [0.9, 1] }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          Design Your Own Sticker 🚀
        </motion.h2>
        <p className="text-lg mb-6 text-neutral-300">
          Upload your artwork or logo to create custom stickers that reflect your style.
          We’ll handle the printing & shipping!
        </p>
        <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Save to My Stickers
        </button>
      </div>
    </section>
  );
}
