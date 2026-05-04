import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

/**
 * PageBrain marketing — fonts.
 *
 * Mirror the desktop app exactly: Geist (sans) + Geist Mono. Same family,
 * same weights, same OpenType features. Web and product feel like one
 * system, not two.
 *
 *   desktop globals.css → @font-face Geist + Geist Mono
 *   desktop body        → font-feature-settings: "rlig" 1, "calt" 1, "ss01" 1
 *
 * `geist/font/sans` and `geist/font/mono` from the `geist` package handle
 * variable-font loading and produce two CSS variables wired into our token
 * system in globals.css:
 *
 *   --font-pb-sans  ← GeistSans.variable
 *   --font-pb-mono  ← GeistMono.variable
 */

export const metadata: Metadata = {
  title: "PageBrain — Crawl intelligence for the AI age",
  description:
    "Render modern sites, map meaning across every page, and ask agents to turn crawl evidence into audits, strategy, and deliverables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[hsl(var(--pb-canvas))] text-[hsl(var(--pb-foreground))]">
        {children}
      </body>
    </html>
  );
}
