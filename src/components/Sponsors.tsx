"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";


const confirmed: Array<{ name: string; label: string; logo: React.ReactNode; desc: string; perks: string[]; href?: string; linkText?: string }> = [
  {
    name: "projectGRID",
    label: "ORGANISER",
    logo: <span className="font-display font-black text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.05] text-white tracking-tight">projectGRID</span>,
    desc: "A student-run initiative. projectGRID designed and ran Aurora end to end, and took the Top 20 into incubation.",
    perks: ["Organiser", "Incubation"],
    href: "https://projectgrid.org/programmes/aurora",
    linkText: "VISIT PROJECTGRID",
  },
  {
    name: "HP",
    label: "PRIZE LAPTOPS",
    logo: <span className="font-display font-black text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.05] text-white tracking-tight">HP</span>,
    desc: "HP provided the laptops awarded to Aurora's winners, ₹1 lakh in prizes.",
    perks: ["Winner laptops"],
  },
  {
    name: "Apple employees",
    label: "INDIVIDUAL SUPPORT",
    logo: <span className="font-display font-black text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.05] text-white tracking-tight">Apple employees</span>,
    desc: "Employees of Apple helped Aurora as individuals. This was personal support, not a partnership with Apple.",
    perks: ["Personal support"],
  },
];

const benefits = [
  "Custom prize tracks & naming rights",
  "Recruitment access to top student talent",
  "Branding across all digital & live platforms",
  "Product demos & workshop opportunities",
  "Direct access to the next cohort",
];

const sponsorsList1 = [
  "1,500 BUILDERS", "27+ COUNTRIES", "TOP 20", "ONE CHAMPION", "AURORA 2026",
  "1,500 BUILDERS", "27+ COUNTRIES", "TOP 20", "ONE CHAMPION", "AURORA 2026",
];
const sponsorsList2 = [
  "INDIA", "NIGERIA", "CANADA", "GERMANY", "SINGAPORE", "GHANA", "UKRAINE", "AUSTRALIA",
  "INDIA", "NIGERIA", "CANADA", "GERMANY", "SINGAPORE", "GHANA", "UKRAINE", "AUSTRALIA",
];

export function Sponsors() {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    gsap.from(marqueeRef.current, {
      opacity: 0, y: 40, scale: 0.96, duration: 1.0, ease: "expo.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
    });

    gsap.fromTo(containerRef.current.querySelectorAll(".sponsor-card"), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: containerRef.current.querySelector(".sponsor-cards"), start: "top 90%" },
    });

    gsap.fromTo(containerRef.current.querySelectorAll(".benefit-card"), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: containerRef.current.querySelector(".benefits-grid"), start: "top 90%" },
    });
  }, { scope: containerRef });

  const handleMouseEnter = () => marqueeRef.current?.classList.add("paused");
  const handleMouseLeave = () => marqueeRef.current?.classList.remove("paused");

  return (
    <section
      id="partners"
      ref={containerRef}
      className="relative w-full py-2xl flex flex-col bg-bg overflow-hidden"
    >
      {/* Header */}
      <div className="px-xl mb-xl">
        <div className="font-body text-sm font-medium text-muted mb-sm">Support</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-none tracking-tight">
            Who made it possible.
          </h2>
          <p className="font-body text-gray-400 font-light text-base max-w-[40ch] md:text-right leading-relaxed">
            Aurora was organised by students, with prize laptops from HP and personal help from people at Apple.
          </p>
        </div>
      </div>

      {/* Confirmed sponsors */}
      <div className="sponsor-cards px-xl mb-2xl max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-sm">
        {confirmed.map((s, i) => {
          const Card = s.href ? "a" : "div";
          return (
          <Card key={i} {...(s.href ? { href: s.href, target: "_blank", rel: "noopener noreferrer" } : {})} className="sponsor-card glass rounded-2xl p-xl border border-white/5 bg-white/[0.01] backdrop-blur-xl flex flex-col gap-lg relative overflow-hidden shadow-xl group hover:border-white/40 transition-all duration-500 will-change-transform h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col gap-lg relative z-10">
              <div className="flex flex-col items-start gap-4">
                <div className="caption-text text-white/40 text-[0.6rem] tracking-[0.3em] uppercase font-black">{s.label}</div>
                <div className="shrink-0 transform group-hover:scale-105 transition-transform duration-500 origin-left">
                  {s.logo}
                </div>
              </div>

              <div className="flex-1">
                <p className="font-body text-gray-400 font-light text-sm leading-relaxed mb-6 block min-h-[3rem] tracking-tight">{s.desc}</p>
                {s.href && (
                  <div className="flex items-center gap-2 caption-text text-white font-black group-hover:tracking-widest transition-all duration-500 text-[0.7rem] tracking-[0.2em]">
                    {s.linkText} <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
              <div className="flex flex-wrap gap-2">
                {s.perks.map((p, j) => (
                  <span key={j} className="text-[0.65rem] text-gray-400 font-black tracking-[0.1em] glass px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02] group-hover:text-white group-hover:border-white/20 transition-all duration-300 uppercase">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Card>
          );
        })}
      </div>



      {/* Marquee */}
      <div className="relative mb-3xl">
        <div className="absolute inset-y-0 left-0 w-40 pointer-events-none z-10" style={{ background: "linear-gradient(90deg, var(--color-bg) 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-40 pointer-events-none z-10" style={{ background: "linear-gradient(270deg, var(--color-bg) 0%, transparent 100%)" }} />
        <div ref={marqueeRef} className="flex flex-col w-full marquee-container gap-sm" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="marquee-row w-full overflow-hidden whitespace-nowrap flex">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-content animate-marquee-s flex items-center shrink-0" aria-hidden={copy === 1}>
                {sponsorsList1.map((name, i) => (
                  <span key={i} className={`font-display font-bold text-3xl sm:text-5xl md:text-8xl mx-md tracking-tighter transition-all duration-300 hover:text-accent hover:scale-110 inline-block ${i % 2 === 0 ? "text-text" : "text-transparent"}`} style={i % 2 !== 0 ? { WebkitTextStroke: "1px var(--color-border-2)" } : {}}>
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee-row w-full overflow-hidden whitespace-nowrap flex">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-content animate-marquee-reverse-s flex items-center shrink-0" aria-hidden={copy === 1}>
                {sponsorsList2.map((name, i) => (
                  <span key={i} className={`font-display font-bold text-3xl sm:text-5xl md:text-8xl mx-md tracking-tighter transition-all duration-300 hover:text-accent hover:scale-110 inline-block ${i % 2 !== 0 ? "text-text" : "text-transparent"}`} style={i % 2 === 0 ? { WebkitTextStroke: "1px var(--color-border-2)" } : {}}>
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsorship tiers CTA */}
      <div className="px-xl">
        <div className="caption-text text-white/40 mb-lg font-black tracking-[0.4em] text-[10px] uppercase">PARTNER ON THE NEXT AURORA</div>
        <p className="font-body text-gray-300 font-light text-2xl max-w-[50ch] mb-xl leading-relaxed tracking-tight border-l-2 border-white/10 pl-8">
          Aurora 2026 reached 1,500 reported participants from 27+ countries. If you want a prize track, mentors or your brand in front of the next cohort, talk to projectGRID.
        </p>

        <div className="benefits-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm mb-xl">
          {benefits.map((benefit, i) => (
            <div key={i} className="benefit-card glass rounded-2xl p-xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/40 transition-all duration-300 group flex items-start gap-md relative overflow-hidden shadow-lg will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="text-white text-lg shrink-0 mt-[2px] drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] font-display font-black italic">0{i + 1}</span>
              <div className="font-body text-gray-200 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">{benefit}</div>
            </div>
          ))}
        </div>

        <a href="mailto:info@projectgrid.org?subject=Partnering%20on%20Aurora" className="inline-block sponsor-deck-btn rounded-xl bg-white text-[#080810] font-body text-base font-black px-2xl py-md tracking-widest transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] uppercase">
          GET IN TOUCH
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-marquee-s         { animation: marquee 18s linear infinite; }
        .animate-marquee-reverse-s { animation: marquee-reverse 26s linear infinite; }
        .paused .animate-marquee-s,
        .paused .animate-marquee-reverse-s { animation-play-state: paused; }
        @keyframes marquee         { 0%{transform:translateX(0%)}  100%{transform:translateX(-100%)} }
        @keyframes marquee-reverse { 0%{transform:translateX(-100%)} 100%{transform:translateX(0%)} }
      ` }} />
    </section>
  );
}
