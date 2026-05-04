import { CtaSection } from "@/components/landing/cta-section";
import { FeatureSpotlights } from "@/components/landing/feature-spotlights";
import { Footer } from "@/components/landing/footer";
import { GeneratedDescription } from "@/components/landing/generated-description";
import { Hero } from "@/components/landing/hero";
import { LandingNav } from "@/components/landing/nav";

export default function Home() {
  return (
    <>
      <LandingNav />
      <main className="min-h-svh bg-[hsl(var(--pb-canvas))] text-[hsl(var(--pb-foreground))]">
        <Hero />
        <GeneratedDescription />
        <FeatureSpotlights />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
