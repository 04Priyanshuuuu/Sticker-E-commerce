import Hero from "./components/Hero";
import StickerSlider from "./components/StickerSlider";
import { actionStickers, adventureStickers, romanceStickers, scifiStickers, horrorStickers } from "./data/genres";

function page() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Hero />
      <StickerSlider title="Action Stickers" stickers={actionStickers} />
      <StickerSlider title="Adventure Stickers" stickers={adventureStickers} />
      <StickerSlider title="Romance Stickers" stickers={romanceStickers} />
      <StickerSlider title="Sci-Fi Stickers" stickers={scifiStickers} />
      <StickerSlider title="Horror Stickers" stickers={horrorStickers} />
      
    </main>
  );
}

export default page;
