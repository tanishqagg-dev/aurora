"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import { AppleLogo, Lightning } from "@phosphor-icons/react";

const confirmed = [
  {
    name: "Apple",
    logo: (
      <div className="flex items-center gap-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple"
          className="apple-logo-img h-10 w-auto filter invert brightness-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        />
        <span className="font-display font-medium text-2xl text-white tracking-tight">Apple</span>
      </div>
    ),
    desc: "Providing the ultimate performance tools: top-of-the-line MacBooks for the overall winning team of Aurora 2026.",
    perks: ["MacBooks for Overall Winners"],
    url: "apple.com",
    href: "https://www.apple.com"
  },
  {
    name: "Featherless.AI",
    logo: (
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" fill="currentColor" className="featherless-logo-svg h-10 w-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
          <path d="M22.724 3.088C21.527 2.376 19.91 2 18.044 2c-2.854 0-6 .877-8.826 2.403l-.02-.007-.004.021c-.855.464-1.684.981-2.462 1.558C2.147 9.376.863 13.412 1.947 15.57.76 17.542.03 19.583 0 22c2.28-4.233 3.648-7.663 11.076-13.438-2.122.443-5.79 2.545-8.258 5.735-.233-1.866 1.28-4.879 4.65-7.379.428-.316.871-.612 1.324-.893-.354 1.071-.24.805-.975 2.307 1.086-1.001 1.8-1.62 2.873-3.335a18.995 18.995 0 014.276-1.465c-.238.767-.69 2.067-1.302 3.095 0 0 1.553-.324 2.837-.25-.701.753-1.333 1.569-1.973 2.403-.876 1.142-1.782 2.322-2.943 3.421-.14.133-.273.253-.408.377-1.784-.167-2.961.483-4.065 1.63.87-.395 2.04-.72 2.772-.524-1.35 1.073-3.477 2.487-5.224 2.37-.332.492-.353.507-.717 1.1 2.835.688 6.395-2.118 8.49-4.103 1.229-1.164 2.165-2.383 3.07-3.56 1.862-2.427 3.471-4.523 7.04-5.32L24 3.846l-1.276-.758z"></path>
        </svg>
        <span className="font-display font-medium text-2xl text-white tracking-tight">Featherless</span>
      </div>
    ),
    desc: "Serverless LLM hosting for 30,000+ open models. Build and scale AI apps without managing infrastructure.",
    perks: ["Free API Credits", "Technical Mentorship"],
    url: "featherless.ai",
    href: "https://featherless.ai"
  },
];

const benefits = [
  "Custom prize tracks & naming rights",
  "Recruitment access to top student talent",
  "Branding across all digital & live platforms",
  "Product demos & workshop opportunities",
  "Direct interaction with 15,000+ builders",
];

const sponsorsList1 = [
  "PROJECTGRID", "IIIT DELHI", "FEATHERLESS.AI", "DEVFOLIO", "POLYGON",
  "PROJECTGRID", "IIIT DELHI", "FEATHERLESS.AI", "DEVFOLIO", "POLYGON",
];
const sponsorsList2 = [
  "VERCEL", "SUPABASE", "AWS", "GITHUB", "NOTION",
  "VERCEL", "SUPABASE", "AWS", "GITHUB", "NOTION",
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
      ref={containerRef}
      className="relative w-full py-2xl flex flex-col bg-bg overflow-hidden"
    >
      {/* Header */}
      <div className="px-xl mb-xl">
        <div className="font-body text-sm font-medium text-muted mb-sm">Sponsors & Partners</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-none tracking-tight">
            Backed by the best.
          </h2>
          <p className="font-body text-gray-400 font-light text-base max-w-[40ch] md:text-right leading-relaxed">
            Aurora is powered by partners providing real tools, mentors, and capital.
          </p>
        </div>
      </div>

      {/* Confirmed sponsors */}
      <div className="sponsor-cards px-xl mb-2xl max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-sm">
        {confirmed.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="sponsor-card glass rounded-2xl p-xl border border-white/5 bg-white/[0.01] backdrop-blur-xl flex flex-col gap-lg relative overflow-hidden shadow-xl group hover:border-white/40 transition-all duration-500 will-change-transform h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex flex-col gap-lg relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                <div className="shrink-0 mb-2 sm:mb-0 transform group-hover:scale-105 transition-transform duration-500">
                  {s.logo}
                </div>
                <div className="caption-text text-white/40 text-[0.6rem] tracking-[0.3em] uppercase font-black">OFFICIAL PARTNER</div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <p className="font-body text-gray-400 font-light text-sm leading-relaxed mb-6 block min-h-[3rem] tracking-tight">{s.desc}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 caption-text text-white font-black group-hover:tracking-widest transition-all duration-500 text-[0.7rem] tracking-[0.2em]">
                  VISIT WEBSITE <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
              <div className="caption-text text-white/40 text-[0.6rem] tracking-[0.2em] mb-4 font-black uppercase">PERKS</div>
              <div className="flex flex-wrap gap-2">
                {s.perks.map((p, j) => (
                  <span key={j} className="text-[0.65rem] text-gray-400 font-black tracking-[0.1em] glass px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02] group-hover:text-white group-hover:border-white/20 transition-all duration-300 uppercase">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
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
        <div className="caption-text text-white/40 mb-lg font-black tracking-[0.4em] text-[10px] uppercase">BECOME A SPONSOR</div>
        <p className="font-body text-gray-300 font-light text-2xl max-w-[50ch] mb-xl leading-relaxed tracking-tight border-l-2 border-white/10 pl-8">
          Put your brand in front of 15,000+ students and builders from 80+ countries. Sponsoring Aurora means access to the sharpest emerging technical talent in Asia — before anyone else finds them.
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

        <button className="sponsor-deck-btn rounded-xl bg-white text-[#080810] font-body text-base font-black px-2xl py-md tracking-widest transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] uppercase">
          GET THE SPONSOR DECK
        </button>
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
