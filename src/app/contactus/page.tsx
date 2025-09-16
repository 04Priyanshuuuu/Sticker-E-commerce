import { Goal } from "./components/Goal";
import Hero from "./components/Hero";
import Team from "./components/Team";

function page() {
  return (
    <div>
      <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Hero />
        <Goal />
        <Team />
        
      </main>
    </div>
  );
}

export default page;
