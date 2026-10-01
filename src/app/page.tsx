"use client";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Countries } from "@/components/Countries";
import { Theme } from "@/components/Theme";
import { Timeline } from "@/components/Timeline";
import { Prizes } from "@/components/Prizes";
import { Judges } from "@/components/Judges";
import { Sponsors } from "@/components/Sponsors";
import { Record } from "@/components/Record";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <Nav />
      <div className="relative z-10 w-full bg-bg pb-[60vh]">
        <Hero />
        <Countries />
        <Theme />
        <Timeline />
        <Prizes />
        <Judges />
        <Sponsors />
        <Record />
      </div>
      <div className="sticky bottom-0 left-0 w-full z-0 h-screen">
        <Footer />
      </div>
    </main>
  );
}
