import Herosection from "./components/Herosection";

import Grid from "./components/Grid";
import { DraggableCard } from "./components/Stack";
import StickerSlider from "./components/Slider";
import Wheel from "./components/Wheel";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Herosection />
      <StickerSlider />
      <Grid />
      <Wheel />
      <DraggableCard />
    </main>
  );
}
