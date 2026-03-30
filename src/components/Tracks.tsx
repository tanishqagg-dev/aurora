"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import FlowingMenu from "./FlowingMenu";

// SVG gradient data URIs used as thumbnail images inside the marquee
const img = (color1: string, color2: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='80'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='${color1}'/><stop offset='100%' stop-color='${color2}'/></linearGradient></defs><rect width='200' height='80' rx='12' fill='url(%23g)'/></svg>`
  )}`;

const trackItems = [
  { link: "#", text: "Best Design",     image: img("#FFFFFF", "#E0E0E0") },
  { link: "#", text: "Best Innovation", image: img("#F5F5F5", "#D6D6D6") },
  { link: "#", text: "Best Tech",       image: img("#E8E8E8", "#C0C0C0") },
  { link: "#", text: "Overall Winner",  image: img("#FFFFFF", "#B0B0B0") },
];

export function Tracks() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    gsap.from(containerRef.current.querySelector(".flowing-menu-wrap"), {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col bg-bg"
      style={{ minHeight: "80vh" }}
    >
      <div className="px-xl pt-3xl pb-xl">
        <div className="caption-text text-white/40 mb-sm font-black tracking-[0.4em] text-[10px] uppercase">03 · COMPETITION TRACKS</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] text-white leading-none tracking-tight italic uppercase">
            Four tracks. One prize pool.
          </h2>
          <p className="font-body text-gray-400 font-light text-sm max-w-[40ch] leading-relaxed tracking-tight">
            Every team competes in the Overall track automatically. Choose an additional specialisation track to qualify for a second prize.
          </p>
        </div>
      </div>

      <div className="flowing-menu-wrap flex-1" style={{ height: "65vh" }}>
        <FlowingMenu
          items={trackItems}
          speed={18}
          textColor="#EEEEF8"
          bgColor="#080810"
          marqueeBgColor="#FFFFFF"
          marqueeTextColor="#080810"
          borderColor="#2A2A3E"
        />
      </div>
    </section>
  );
}
