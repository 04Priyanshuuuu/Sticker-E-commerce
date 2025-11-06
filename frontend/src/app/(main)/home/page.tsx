import Herosection from "./components/Herosection";
import StickerSlider from "./components/Slider";
import { DraggableCard } from "./components/Stack";
import WhyStickers from "./components/WhyStickers";
import StickerRound from "./components/StickerRound";
import HowTheyStick from "./components/HowTheyStick";
import MakeYourOwnSticker from "./components/MakeYourOwnSticker";
import InstagramGallery from "./components/InstagramGallery";
import OrderingProcess from "./components/OrderingProcess";
import WriteToUs from "./components/WriteToUs";
import OfferBanner from "./components/OfferBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] text-white">
      <Herosection />
      <StickerSlider />
      <StickerRound />
      <DraggableCard />
      <OfferBanner />
      {/* offer wala box */}
      <MakeYourOwnSticker />
      <WhyStickers />
      <OrderingProcess />
      <InstagramGallery />
      <HowTheyStick />
      <WriteToUs />
    </main>
  );
}
