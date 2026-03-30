"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function LenisScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });
    // ScrollTrigger.normalizeScroll(true); // Temporarily disable normalizeScroll if it conflicts with Next Router on touch devices, but rules say to enable it:
    ScrollTrigger.normalizeScroll(true);

    const lenis = new Lenis({
      autoRaf: false, // We'll manage raf through GSAP as per rules
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}
