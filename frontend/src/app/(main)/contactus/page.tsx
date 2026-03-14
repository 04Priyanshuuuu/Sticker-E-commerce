import WriteToUs from "../home/components/WriteToUs";
import Goal from "./components/Goal";
import Hero from "./components/Hero";
import SocialContacts from "./components/SocialContacts";
import Team from "./components/Team";
import TechStack from "./components/TechStack";

function Page() {
  return (
    <div>
      <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Hero />
        <Goal />
        <Team />
        <WriteToUs />
        <SocialContacts />
        <TechStack />
      </main>
    </div>
  );
}

export default Page;