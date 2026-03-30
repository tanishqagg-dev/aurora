"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const criteria = [
  { label: "Innovation", weight: "25%", desc: "How novel is the idea? Does it open a new space or solve an overlooked problem in a genuinely new way?" },
  { label: "Feasibility", weight: "20%", desc: "Can this actually be built and shipped? Is the technical and business approach grounded in reality?" },
  { label: "Design & UX", weight: "20%", desc: "Is the product intuitive, polished, and built with the end-user in mind? Quality of visual and interaction design." },
  { label: "Execution", weight: "20%", desc: "How much was built? Does the prototype work? Quality of the live demo and code." },
  { label: "Impact", weight: "15%", desc: "What is the potential real-world impact? How well does the solution align with the SDG theme?" },
];

const judges = [
  { name: "Moksh Sindhwani", role: "cofounder", org: "grid organization", initials: "MS" },
  { name: "Apply to be a Judge", role: "Join the Panel", org: "Aurora 2026", initials: "▼", isApply: true },
];

export function Judges() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current.querySelectorAll(".criteria-card"), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.08,
      scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
    });

    const cards = containerRef.current.querySelectorAll(".judge-card");
    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: containerRef.current.querySelector(".judges-grid"), start: "top 90%" },
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.querySelectorAll(".judge-card")) as HTMLElement[];
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 22, rotateX: -y * 22, scale: 1.05, duration: 0.35, ease: "power2.out", transformPerspective: 800, overwrite: "auto" });
        card.style.setProperty("--gx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--gy", `${e.clientY - rect.top}px`);
      };
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
        card.style.removeProperty("--gx");
        card.style.removeProperty("--gy");
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-3xl px-xl flex flex-col bg-bg overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2xl gap-md">
        <div>
          <div className="caption-text text-muted mb-sm">06 · JURY & MENTORS</div>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-none tracking-tight">
            Who will judge you
          </h2>
        </div>
        <p className="font-body text-gray-300 font-light text-base max-w-[40ch] md:text-right leading-relaxed">
          Judging takes place live online. Our panel spans founders, VCs, researchers, and design directors.
        </p>
      </div>

      {/* Judging criteria */}
      <div className="mb-3xl">
        <div className="caption-text text-white/40 mb-lg font-black tracking-[0.4em] text-[10px] uppercase">JUDGING CRITERIA</div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-sm">
          {criteria.map((c, i) => (
            <div key={i} className="criteria-card glass rounded-2xl p-lg border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/40 transition-all duration-500 flex flex-col gap-sm shadow-lg relative overflow-hidden group will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex items-baseline justify-between relative z-10">
                <span className="font-display font-black text-lg text-white/60 group-hover:text-white transition-colors duration-300 uppercase tracking-tighter">{c.label}</span>
                <span className="caption-text text-white font-black text-xs">{c.weight}</span>
              </div>
              <p className="font-body text-gray-400 font-light text-xs leading-relaxed relative z-10">{c.desc}</p>
              {/* Weight bar */}
              <div className="h-[2px] bg-white/5 rounded-pill overflow-hidden mt-auto">
                <div className="h-full bg-white/40 group-hover:bg-white transition-colors duration-500" style={{ width: c.weight }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Format callout */}
      <div className="glass rounded-[2rem] p-xl border border-white/10 bg-white/[0.02] backdrop-blur-md mb-2xl flex flex-col md:flex-row gap-xl items-start relative overflow-hidden shadow-2xl transition-all duration-700 hover:border-white/30">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
        <div className="shrink-0 relative z-10">
          <div className="caption-text text-white/40 mb-xs font-black tracking-[0.3em] text-[10px] uppercase">FORMAT</div>
          <div className="font-display font-black text-2xl text-white tracking-tight italic uppercase">Live. Fully Online.</div>
        </div>
        <div className="flex flex-col gap-sm flex-1 relative z-10">
          {[
            "Top 20 teams pitch live virtually on 18 May 2026",
            "8-minute pitch followed by 7-minute Q&A from the full judge panel",
            "Judges score independently; final scores are averaged across all criteria",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-sm">
              <span className="text-white/40 mt-[3px] text-xs shrink-0">▸</span>
              <span className="font-body text-gray-400 text-sm leading-relaxed tracking-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Judges grid */}
      <div>
        <div className="caption-text text-white/40 mb-lg font-black tracking-[0.4em] text-[10px] uppercase">CONFIRMED PANEL</div>
        <div
          className="judges-grid w-full grid gap-md"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
        >
          {judges.map((judge, i) => (
            <div
              key={i}
              className="judge-card glass flex flex-col p-lg rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-500 hover:border-white/40 shadow-lg group cursor-none h-60 justify-between relative overflow-hidden will-change-transform"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {judge.isApply ? (
                <a href="mailto:contact@projectgrid.org" className="absolute inset-0 z-20" aria-label="Apply to be a Judge"></a>
              ) : null}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.1) 0%, transparent 70%)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className={`w-10 h-10 rounded-xl ${judge.isApply ? 'bg-white text-black' : 'bg-white/10 border border-white/20 text-white'} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                  <span className={`caption-text text-[0.6rem] font-black ${judge.isApply ? 'text-black' : 'text-white'}`}>{judge.initials}</span>
                </div>
                <div className="caption-text text-white/40 text-[9px] font-black tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                  {judge.org}
                </div>
              </div>
              <div className="relative z-10">
                <div className="font-display font-black text-xl text-white leading-none mb-xs tracking-tight group-hover:tracking-normal transition-all duration-500 uppercase italic">
                  {judge.name}
                </div>
                <div className="caption-text text-gray-500 font-black tracking-[0.1em] text-[10px] uppercase">{judge.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
