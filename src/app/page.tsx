
import Herosection from "./components/Herosection";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import { DraggableCard } from "./components/Stack";
import StickerSlider from "./components/slider";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Herosection />
      <StickerSlider/>
      <Grid />
      <DraggableCard />
      <Footer />
    </main>
  );
}
