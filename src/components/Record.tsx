"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RECORD } from "@/data/recap";

export function Record() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current.querySelectorAll(".record-row"), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.07,
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });
  }, { scope: containerRef });

  return (
    <section id="record" ref={containerRef} className="relative w-full py-3xl px-xl bg-bg overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2xl gap-md">
        <div>
          <div className="caption-text text-muted mb-sm">04 · THE RECORD</div>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-none tracking-tight">
            Every number.<br />
            <span className="text-white/50 timeline-gradient-span">With its source.</span>
          </h2>
        </div>
        <p className="font-body text-gray-300 font-light text-base max-w-[42ch] md:text-right leading-relaxed">
          Aurora has more than one source, and they don&apos;t always count the same thing. Here is each figure with where it comes from.
        </p>
      </div>

      <div className="flex flex-col gap-sm">
        {RECORD.map(([term, value, tag]) => (
          <div
            key={term}
            className="record-row glass rounded-2xl p-lg sm:p-xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-white/30 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-sm md:gap-xl items-start will-change-transform"
          >
            <div className="md:col-span-4 flex items-center gap-md flex-wrap">
              <span className="font-display font-black text-xl text-white tracking-tight uppercase italic">{term}</span>
              {tag && (
                <span className="caption-text px-sm py-[3px] rounded-pill text-white/60 font-black border border-white/10 bg-white/5 uppercase tracking-[0.2em]" style={{ fontSize: "0.6rem" }}>
                  {tag}
                </span>
              )}
            </div>
            <p className="md:col-span-8 font-body text-gray-400 font-light text-base leading-relaxed m-0">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
