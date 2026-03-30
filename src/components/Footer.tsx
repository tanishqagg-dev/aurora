"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FloatingParticles } from "./FloatingParticles";
import VariableProximity from "./VariableProximity";
import GradualBlur from "./GradualBlur";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  // VariableProximity needs a ref to the container for mouse tracking
  const proximityContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!footerRef.current) return;

    gsap.from(".footer-fade", {
      opacity: 0,
      y: 28,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.4,
      scrollTrigger: { trigger: footerRef.current, start: "top 75%" },
    });

    // Breathing AURORA background text
    gsap.to(".footer-bg-text", {
      opacity: 0.09,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, { scope: footerRef });

  // ── Magnetic register button ───────────────────────
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.38;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.38;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.55)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-end items-center bg-bg pb-lg"
    >
      {/* Floating dots rising upward */}
      <FloatingParticles />

      {/* Blur transition from above */}
      <GradualBlur
        position="top"
        height="120px"
        strength={5}
        divCount={7}
        curve="ease-out"
        zIndex={2}
      />

      {/* Giant watermark */}
      <div
        className="footer-bg-text absolute bottom-[-10vh] left-1/2 -translate-x-1/2 font-display font-black whitespace-nowrap text-white text-[40vw] leading-[0.75] z-0 pointer-events-none select-none opacity-5 tracking-tighter italic"
      >
        AURORA
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pb-3xl pt-2xl">
        {/* VariableProximity CTA title */}
        <div
          ref={proximityContainerRef}
          className="footer-fade mb-md text-center"
        >
          <VariableProximity
            label="Register before April 17, 2026"
            className="font-display font-black tracking-tight text-white uppercase italic"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
            containerRef={proximityContainerRef}
            fromFontVariationSettings="'wght' 300"
            toFontVariationSettings="'wght' 900"
            radius={280}
            falloff="gaussian"
          />
        </div>

        <p className="footer-fade font-body font-light text-gray-400 text-xl mb-xl text-center tracking-tight">
          Submissions for Stage 1 are open now.
        </p>

        <div className="footer-fade flex gap-md mb-2xl">
          <button
            ref={btnRef}
            className="px-2xl py-md rounded-pill bg-[#3B82F6] text-white font-display text-lg font-black italic uppercase tracking-wider transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:scale-105"
            style={{ willChange: "transform" }}
          >
            REGISTER ON DEVPOST
          </button>
        </div>
      </div>

      <div className="footer-fade w-[calc(100%-4rem)] border-t border-white/5 pt-md flex flex-col md:flex-row justify-between items-start z-10 mb-sm gap-lg md:gap-0">
        <div className="flex flex-col gap-md">
          <div className="font-display font-black text-xl text-white italic uppercase tracking-tight">AURORA 2026</div>
          <div className="caption-text text-white/40 font-black tracking-[0.2em] text-[10px] uppercase">BY PROJECTGRID × IIIT DELHI</div>
          <div className="flex gap-lg flex-wrap">
            <a href="mailto:taniaagg9910922265@gmail.com" className="caption-text text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">taniaagg9910922265@gmail.com</a>
            <a href="#" className="caption-text text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">DEVPOST</a>
            <a href="#" className="caption-text text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">DISCORD</a>
            <a href="#" className="caption-text text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">INSTAGRAM</a>
            <a href="#" className="caption-text text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">TWITTER / X</a>
            <a href="#" className="caption-text text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">LINKEDIN</a>
          </div>
        </div>
        <div className="flex flex-col items-end gap-lg">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="footer-fade w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-colors duration-300 group shadow-lg"
            aria-label="Scroll to top"
          >
            <span className="text-sm group-hover:-translate-y-0.5 transition-transform duration-200">↑</span>
          </button>
          <div className="caption-text text-white/20 text-right font-black tracking-widest text-[9px] uppercase">
            © 2026 PROJECTGRID.<br />ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
