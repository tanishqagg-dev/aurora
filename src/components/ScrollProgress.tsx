"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      },
    });
  }, []);

  return (
    <div className="scroll-progress-track fixed top-0 right-0 h-full w-[4px] bg-white/5 backdrop-blur-md z-[9999] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-accent origin-top shadow-[0_0_12px_rgba(107,127,255,0.8)]"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
