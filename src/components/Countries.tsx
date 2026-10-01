"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { COUNTRIES, REPORTED } from "@/data/recap";

export function Countries() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current.querySelector(".countries-heading"), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
    });

    gsap.fromTo(containerRef.current.querySelectorAll(".flag-card"), { scale: 0.6, opacity: 0, rotateX: -60 }, {
      scale: 1, opacity: 1, rotateX: 0, duration: 0.9, ease: "expo.out", stagger: { each: 0.05, from: "start" },
      scrollTrigger: { trigger: containerRef.current.querySelector(".flags-grid"), start: "top 85%" },
    });
  }, { scope: containerRef });

  const unnamed = REPORTED.countries - REPORTED.namedCountries;

  return (
    <section id="countries" ref={containerRef} className="relative w-full py-3xl px-xl bg-bg overflow-hidden">
      <div className="countries-heading flex flex-col md:flex-row md:items-end justify-between mb-2xl gap-md relative z-10">
        <div>
          <div className="caption-text text-muted mb-sm">01 · REACH</div>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-none tracking-tight">
            27+ countries.<br />
            <span className="text-accent drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">One stage.</span>
          </h2>
        </div>
        <p className="font-body text-gray-300 font-light text-base max-w-[42ch] md:text-right leading-relaxed">
          Builders joined from 27+ countries, as reported by projectGRID. These {REPORTED.namedCountries} are named in the registration sheet.
        </p>
      </div>

      <div className="flags-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-sm relative z-10" style={{ perspective: "900px" }}>
        {COUNTRIES.map(([code, name]) => (
          <div
            key={code}
            className="flag-card glass group rounded-2xl p-md border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-white/40 transition-all duration-500 flex items-center gap-md will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/w160/${code}.png`}
              alt=""
              loading="lazy"
              className="flag-img w-12 h-9 rounded-md object-cover shrink-0 transition-transform duration-500 group-hover:scale-110"
            />
            <span className="font-display font-bold text-white text-base tracking-tight leading-tight">{name}</span>
          </div>
        ))}
        <div className="flag-card rounded-2xl p-md border border-dashed border-white/20 flex items-center gap-md will-change-transform">
          <span className="font-display font-black text-3xl text-accent tracking-tighter">+{unnamed}</span>
          <span className="font-body text-sm text-white/50 leading-tight">more countries reported</span>
        </div>
      </div>
    </section>
  );
}
