"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const winners = [
  {
    name: "Overall Winner",
    amount: "ChillGui",
    track: "GRAND PRIZE",
    person: "Jerovin Floyd Vincent Joseph · IIIT Delhi",
    photo: "/images/grid-photo-10-p8.jpg",
    alt: "Jerovin Floyd Vincent Joseph holding his Aurora prize laptop",
    desc: "Built solo. An Edge-AI layer that simplifies everyday app interfaces for older users. The idea came from helping older family members use their smartphones.",
    perks: ["HP laptop", "Solo builder", "Accessibility"],
  },
  {
    name: "Best Innovation",
    amount: "Handwriting AI",
    track: "INNOVATION TRACK",
    person: "Gantavya Rohilla · IIT Madras",
    photo: "/images/grid-photo-11-p8.jpg",
    alt: "Gantavya Rohilla holding his Aurora prize laptop",
    desc: "A model that learns a user's handwriting and can do calculations, with the aim of moving note-taking into physical space. He is exploring smart-glasses integration.",
    perks: ["HP laptop", "Third-year student", "Smart-glasses next"],
  },
  {
    name: "Top 20",
    amount: "Incubation",
    track: "FINALISTS",
    person: "Pictured: Siddhant Dasgupta's certificate",
    photo: "/images/aurora-top20-team.jpg",
    alt: "Aurora Top 20 certificate of appreciation for Siddhant Dasgupta",
    desc: "Builders who reached the Top 20 received a certificate of appreciation signed by projectGRID's co-founders, and moved on to the incubation stage.",
    perks: ["Certificate of appreciation", "Incubation with projectGRID"],
  },
];

const proof = [
  { src: "/images/aurora-winner-01.jpg", alt: "The ChillGui project logo", caption: "The ChillGui project mark." },
  { src: "/images/aurora-winner-02.jpg", alt: "Aurora overall-winner certificate for Jerovin Floyd", caption: "Jerovin's overall-winner certificate." },
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
      id="winners"
      ref={containerRef}
      className="relative w-full py-3xl px-xl flex flex-col justify-center bg-bg overflow-hidden"
    >
      {/* Pulsing radial backdrop */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)", animation: "glow-pulse 5s ease-in-out infinite" }} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2xl relative z-10 gap-md">
        <div>
          <div className="caption-text text-muted mb-sm">02 · RESULTS</div>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-none tracking-tight">
            The champions.<br />
            <span className="text-accent drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">Who won Aurora.</span>
          </h2>
        </div>
        <p className="font-body text-gray-300 font-light text-base max-w-[42ch] md:text-right leading-relaxed">
          ₹1 lakh in HP laptops went to the winners. The Top 20 moved on to incubation with projectGRID.
        </p>
      </div>

      {/* Prize rows */}
      <div ref={listRef} className="flex flex-col w-full relative z-10 gap-sm mb-3xl">
        {winners.map((prize, i) => (
          <div
            key={i}
            className="prize-row glass flex flex-col lg:flex-row lg:items-center gap-lg p-lg sm:p-xl rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md group hover:border-white/40 hover:bg-white/[0.03] transition-all duration-500 relative overflow-hidden shadow-lg will-change-transform"
          >
            <div className="shrink-0 w-full lg:w-[220px] aspect-[4/3] lg:aspect-[3/4] rounded-xl overflow-hidden border border-white/10 relative z-10">
              <img src={prize.photo} alt={prize.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
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
              <div className="font-body text-white/80 font-medium text-base">{prize.person}</div>
              <div className="font-body text-gray-400 font-light text-sm max-w-[56ch] leading-relaxed">
                {prize.desc}
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-sm shrink-0 lg:pl-xl relative z-10">
              <div className="prize-amount font-display font-black text-[clamp(1.4rem,2.5vw,2.2rem)] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tighter italic uppercase">
                {prize.amount}
              </div>
              <div className="flex flex-wrap lg:justify-end gap-xs max-w-[22rem]">
                {prize.perks.map((perk, j) => (
                  <span key={j} className="caption-text text-gray-400 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-pill px-sm py-[3px] text-[0.65rem] font-black tracking-widest uppercase">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proof */}
      <div className="perks-section relative z-10">
        <div className="caption-text text-white/40 mb-xl font-black tracking-[0.4em] text-[10px] uppercase">THE PROOF</div>
        <div className="perk-card glass rounded-2xl overflow-hidden border border-white/5 mb-sm will-change-transform">
          <img src="/images/grid-campaign-11-aurora-winners.jpg" alt="Jerovin Floyd Vincent Joseph and Gantavya Rohilla holding their Aurora prize laptops" loading="lazy" className="w-full h-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          {proof.map((item) => (
            <figure key={item.src} className="perk-card glass rounded-2xl p-md border border-white/5 bg-white/[0.01] backdrop-blur-md relative overflow-hidden shadow-lg hover:border-white/30 transition-all duration-300 will-change-transform m-0">
              <img src={item.src} alt={item.alt} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-xl bg-white" />
              <figcaption className="font-body text-gray-400 text-sm leading-relaxed mt-sm">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="font-body text-white/30 text-xs mt-lg">Winner details come from projectGRID&apos;s published result stories.</p>
      </div>
    </section>
  );
}

