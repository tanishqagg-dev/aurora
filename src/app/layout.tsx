import type { Metadata } from "next";
import "./globals.css";
import { LenisScroll } from "@/components/LenisScroll";
import TargetCursor from "@/components/TargetCursor";
import { Shockwave } from "@/components/Shockwave";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "AURORA | Global Hackathon 2026",
  description: "5 Stages. Global reach. One Mission. A hackathon by projectGRID.",
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
