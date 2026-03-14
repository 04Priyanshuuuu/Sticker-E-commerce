"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MakeYourOwnSticker() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: any) => {
    const img = e.target.files[0];
    if (!img) return;
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleUploadAndBuy = async () => {
    if (!file) return alert("Image upload karo");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stickers/custom-stickers/`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      // 👇 checkout page (same flow as other stickers)
      router.push(`/checkout?custom=${data.id}&price=40`);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-[40px] font-bold m-10 ml-5 text-left border-l-4 border-blue-500 pl-4">
        Make your own sticker
      </h1>
      <div className="py-24 bg-black text-white flex flex-col md:flex-row items-center justify-center gap-16 px-6">
        {/* Upload box */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="relative w-72 h-72 rounded-2xl border border-neutral-700 bg-neutral-900 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {!preview ? (
            <>
              <Upload size={42} className="text-neutral-500" />
              <p className="absolute bottom-6 text-sm text-neutral-500">
                Upload Image
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </>
          ) : (
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt="custom sticker"
            />
          )}
        </motion.div>

        {/* Text */}
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Design Your Own Sticker</h2>
          <p className="text-neutral-400 mb-6">
            Apna logo ya artwork upload karo. Sticker banega, print hoga &
            deliver hoga.
          </p>

          <button
            onClick={handleUploadAndBuy}
            disabled={loading}
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Buy for ₹400"}
          </button>
        </div>
      </div>
    </section>
  );
}
