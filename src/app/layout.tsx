import type { Metadata } from "next";
import "./globals.css";
import { LenisScroll } from "@/components/LenisScroll";
import TargetCursor from "@/components/TargetCursor";
import { Shockwave } from "@/components/Shockwave";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL("https://aurora.projectgrid.org"),
  title: "AURORA | Global Hackathon 2026 · Results",
  description:
    "Aurora 2026, projectGRID's online global hackathon, is complete. 1,500 participants and 27+ countries reported, the Top 20 into incubation, and the winners.",
  openGraph: {
    title: "AURORA | Global Hackathon 2026 · Results",
    description: "1,500 builders. 27+ countries. One champion. See who won Aurora 2026.",
    images: ["/images/grid-campaign-11-aurora-winners.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme by applying stored theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('aurora-theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})();` }} />
      </head>
      <body className="antialiased bg-bg text-text" suppressHydrationWarning>
        <ScrollProgress />
        <LenisScroll />
        <TargetCursor targetSelector="a, button, [role='button'], .interactive, .stage-card, .flag-card, .sponsor-card" />
        <Shockwave />
        {children}
      </body>
    </html>
  );
}
