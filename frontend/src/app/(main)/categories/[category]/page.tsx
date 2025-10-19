import HeroCarousel from "../../../components/HeroSection";
import CategoryPage from "../../../components/CategoryPage";

// Make the route a server (async) component and await params (Next recommendation)
export default async function Page({ params }: { params: { category: string } }) {
  // Await params per Next's guidance (keeps you compatible with sync/async route params)
  // Using `await params` inside an async function avoids the runtime warning you've seen.
  const resolvedParams = await (params as unknown as Promise<{ category: string }> | { category: string });
  // `resolvedParams` will be the object; if it was not a Promise it resolves immediately.
  const category = (resolvedParams as any).category ?? "";

  return (
    <main>
      <HeroCarousel />
      <CategoryPage category={category} />
    </main>
  );
}
