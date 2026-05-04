import { CtaSection } from "@/components/landing/cta-section";
import { FeatureSpotlights } from "@/components/landing/feature-spotlights";
import { Footer } from "@/components/landing/footer";
import { GeneratedDescription } from "@/components/landing/generated-description";
import { Hero } from "@/components/landing/hero";
import { LandingNav } from "@/components/landing/nav";
import { PageGuides } from "@/components/landing/page-guides";

/**
 * Landing page composition.
 *
 *   <main relative>
 *     <PageGuides />     ← architectural rails, painted at z-0 first
 *     <Hero/>            ← content sections paint over the rails in flow
 *     <GeneratedDescription/>
 *     <FeatureSpotlights/>
 *     <CtaSection/>
 *
 * <main> is `relative` so PageGuides can absolutely position to it.
 * Sections no longer paint their own canvas background; the body's
 * `bg-[hsl(var(--pb-canvas))]` (set in layout.tsx) shows through, with
 * the rails layered on top of it. Each section's foreground content
 * (text, screenshots, halos) paints in document order over the rails.
 */
export default function Home() {
  return (
    <>
      <LandingNav />
      <main className="relative min-h-svh text-[hsl(var(--pb-foreground))]">
        <PageGuides />
        <Hero />
        <GeneratedDescription />
        <FeatureSpotlights />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
