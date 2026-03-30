"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const prizes = [
  {
    name: "Overall Winner",
    amount: "MacBooks & Featherless API",
    track: "GRAND PRIZE",
    color: "#3B82F6",
    desc: "Awarded to the team that excels across all dimensions — strongest idea, execution, and live pitch.",
    perks: ["Apple MacBooks", "Featherless API Credits", "projectGRID incubation fast-track"],
  },
  {
    name: "Best Design",
    amount: "Design Tools & Pro Credits",
    track: "DESIGN TRACK",
    color: "#3B82F6",
    desc: "For teams with the most polished, user-centred product experience and visual identity.",
    perks: ["Framer / Figma Pro", "Design mentorship sessions", "Portfolio feature"],
  },
  {
    name: "Best Innovation",
    amount: "Ecosystem Grants",
    track: "INNOVATION TRACK",
    color: "#3B82F6",
    desc: "Recognising the most novel concept that opens a genuinely new market or solves an overlooked problem.",
    perks: ["Polygon ecosystem grants", "Devfolio feature", "VC office hours"],
  },
  {
    name: "Best Tech",
    amount: "Cloud & DB Credits",
    track: "TECH TRACK",
    color: "#3B82F6",
    desc: "Awarded for the most technically impressive implementation — architecture, scale, or engineering craft.",
    perks: ["AWS / Vercel credits", "Supabase pro tier", "Open source amplification"],
  },
  {
    name: "All Participants",
    amount: "Certification",
    track: "PARTICIPATION",
    color: "#3B82F6",
    desc: "Every single builder who submits a valid project will receive a verified official Certification of Participation.",
    perks: ["Certification of Participation", "Partner Credits", "Community Access"],
  },
];

const perksGlobal = [
  { label: "All Finalists (Top 20)", items: ["Official Aurora finalist badge", "Devpost featured project", "Discord exclusive channel access", "Invites to projectGRID events for life"] },
  { label: "All Participants", items: ["Certification of Participation", "projectGRID community membership", "Sponsor discount codes & free tiers", "Access to recorded mentor sessions"] },
];

export function Prizes() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!listRef.current || !containerRef.current) return;

    const rows = listRef.current.querySelectorAll(".prize-row");

    gsap.fromTo(rows, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });

    // Perks cards
    gsap.fromTo(containerRef.current.querySelectorAll(".perk-card"), { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: containerRef.current.querySelector(".perks-section"), start: "top 90%" },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-3xl px-xl flex flex-col justify-center bg-bg overflow-hidden"
    >
      {/* Pulsing radial backdrop */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)", animation: "glow-pulse 5s ease-in-out infinite" }} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2xl relative z-10 gap-md">
        <div>
          <div className="caption-text text-muted mb-sm">03 · PRIZE POOL</div>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-none tracking-tight">
            Build the future.<br />
            <span className="text-accent drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">Four tracks.</span>
          </h2>
        </div>
        <p className="font-body text-gray-300 font-light text-base max-w-[42ch] md:text-right leading-relaxed">
          The ultimate hardware, API credits, cash prizes, and incubation access for the best builders.
        </p>
      </div>

      {/* Prize rows */}
      <div ref={listRef} className="flex flex-col w-full relative z-10 gap-sm mb-3xl">
        {prizes.map((prize, i) => (
          <div
            key={i}
            className="prize-row glass flex flex-col lg:flex-row lg:items-center justify-between p-xl rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md group hover:border-white/40 hover:bg-white/[0.03] transition-all duration-500 relative overflow-hidden shadow-lg will-change-transform"
          >
            <div className="flex flex-col gap-xs flex-1 relative z-10">
              <div className="flex items-center gap-md flex-wrap">
                <span
                  className="caption-text px-sm py-[3px] rounded-pill text-white/60 font-black border border-white/10 bg-white/5 uppercase tracking-[0.2em]"
                  style={{ fontSize: "0.6rem" }}
                >
                  {prize.track}
                </span>
              </div>
              <div className="font-display font-black text-[clamp(1.8rem,3.5vw,3rem)] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] leading-none tracking-tight transition-all duration-500 italic uppercase">
                {prize.name}
              </div>
              <div className="font-body text-gray-400 font-light text-sm max-w-[52ch] leading-relaxed">
                {prize.desc}
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-sm mt-md lg:mt-0 shrink-0 lg:pl-xl relative z-10">
              <div className="prize-amount font-display font-black text-[clamp(1.4rem,2.5vw,2.2rem)] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tighter italic uppercase">
                {prize.amount}
              </div>
              <div className="flex flex-wrap gap-xs">
                {prize.perks.map((perk, j) => (
                  <span key={j} className="caption-text text-gray-400 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-pill px-sm py-[2px] text-[0.55rem] font-black tracking-widest uppercase">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global perks */}
      <div className="perks-section relative z-10">
        <div className="caption-text text-white/40 mb-xl font-black tracking-[0.4em] text-[10px] uppercase">PERKS FOR EVERYONE</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          {perksGlobal.map((group, i) => (
            <div key={i} className="perk-card glass rounded-2xl p-xl border border-white/5 bg-white/[0.01] backdrop-blur-md relative overflow-hidden shadow-lg hover:border-white/30 transition-all duration-300 will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <div className="caption-text text-white/60 mb-md relative z-10 font-bold uppercase tracking-widest text-xs italic">{group.label}</div>
              <div className="flex flex-col gap-sm relative z-10">
                {group.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-sm">
                    <span className="text-white/40 mt-[3px] text-xs shrink-0">▸</span>
                    <span className="font-body text-gray-400 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

