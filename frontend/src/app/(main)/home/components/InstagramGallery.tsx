"use client";

const gallery = [
  "https://source.unsplash.com/300x300/?stickers,art",
  "https://source.unsplash.com/300x300/?laptop,stickers",
  "https://source.unsplash.com/300x300/?phone,stickers",
  "https://source.unsplash.com/300x300/?bottle,stickers",
  "https://source.unsplash.com/300x300/?aesthetic,stickers",
  "https://source.unsplash.com/300x300/?skateboard,stickers",
];

export default function InstagramGallery() {
  return (
    <section className="py-20 text-center text-white">
      <h2 className="text-4xl font-bold mb-10">Follow us on Instagram 🌈</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-6 max-w-6xl mx-auto">
        {gallery.map((img, i) => (
          <a
            key={i}
            href="https://instagram.com/"
            target="_blank"
            className="relative group"
          >
            <img
              src={img}
              alt="Instagram post"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-2xl">
              <img src="/icons/instagram.svg" alt="IG" className="w-8 h-8" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
