import Hero from "./components/Hero";

function page() {
  return (
    <div>
      <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Hero />
      </main>
    </div>
  );
}

export default page;
