import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pb-inter",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pb-mono-stack",
  weight: ["400", "500"],
});

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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[hsl(var(--pb-canvas))] text-[hsl(var(--pb-foreground))]">
        {children}
      </body>
    </html>
  );
}
