import Image from "next/image";
import Herosection from "./components/Herosection";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import { DraggableCard } from "./components/Stack";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Herosection />
      <Grid />
      <DraggableCard />
      <Footer />
    </main>
  );
}
