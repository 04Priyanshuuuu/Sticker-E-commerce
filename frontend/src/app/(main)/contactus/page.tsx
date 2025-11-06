import WriteToUs from "../home/components/WriteToUs";
import { Goal } from "./components/Goal";
import Hero from "./components/Hero";
import SocialContacts from "./components/SocialContacts";
import Team from "./components/Team";

function page() {
  return (
    <div>
      <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Hero />
        <Goal />
        <Team />
        <WriteToUs />
        <SocialContacts />
        
      </main>
    </div>
  );
}

export default page;
