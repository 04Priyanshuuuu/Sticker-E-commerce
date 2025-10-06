import Herosection from "../../components/Herosection";

import Grid from "../../components/Grid";
import { DraggableCard } from "../../components/Stack";
import StickerSlider from "../../components/Slider";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Herosection />
      <StickerSlider />
      <Grid />
      <DraggableCard />
    </main>
  );
}
