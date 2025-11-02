import Herosection from "./components/Herosection";
import StickerSlider from "./components/Slider";
import Grid from "./components/Grid";
import { DraggableCard } from "./components/Stack";
import WhyStickers from "./components/WhyStickers";
import StickerRound from "./components/StickerRound";
import HowTheyStick from "./components/HowTheyStick";
import Testimonials from "./components/Testimonials";
import MakeYourOwnSticker from "./components/MakeYourOwnSticker";
import InstagramGallery from "./components/InstagramGallery";
import OrderingProcess from "./components/OrderingProcess";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] text-white">
      <Herosection />
      <StickerSlider />
      <StickerRound />
      <Grid />
      <DraggableCard />
      {/* offer wala box */}
      <MakeYourOwnSticker />
      <WhyStickers />
      <OrderingProcess />
      <HowTheyStick />
      <Testimonials />
      <InstagramGallery />
      {/* emails us FAQs */}
    </main>
  );
}
