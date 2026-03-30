"use client";
import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { Theme } from "@/components/Theme";
import { Timeline } from "@/components/Timeline";
import { Prizes } from "@/components/Prizes";
import { Judges } from "@/components/Judges";
import { Sponsors } from "@/components/Sponsors";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("aurora-intro-seen");
    if (!seen) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("aurora-intro-seen", "1");
    setShowIntro(false);
    document.body.style.overflow = "";
  };

  return (
    <main className="relative w-full">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Nav />
      <div className="relative z-10 w-full bg-bg pb-[60vh]">
        <Hero />
        <StorySection />
        <Theme />
        <Timeline />
        <Prizes />
        <Judges />
        <Sponsors />
        <FAQ />
      </div>
      <div className="sticky bottom-0 left-0 w-full z-0 h-screen">
        <Footer />
      </div>
    </main>
  );
}
