import Herosection from "./components/Herosection";
import StickerSlider from "./components/Slider";
import Grid from "./components/Grid";
import { DraggableCard } from "./components/Stack";

// New Sections 👇
import WhyStickers from "./components/WhyStickers";
import PopularCollections from "./components/PopularCollections";
import HowTheyStick from "./components/HowTheyStick";
import Testimonials from "./components/Testimonials";
import MakeYourOwnSticker from "./components/MakeYourOwnSticker";
import InstagramGallery from "./components/InstagramGallery";
import OrderingProcess from "./components/OrderingProcess";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] text-white">
      <Herosection />
      <WhyStickers />
      <PopularCollections />
      <StickerSlider />
      <HowTheyStick />
      <Testimonials />
      <MakeYourOwnSticker />
      <OrderingProcess />
      <InstagramGallery />
      <Grid />
      <DraggableCard />
    </main>
  );
}
