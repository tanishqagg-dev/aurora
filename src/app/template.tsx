"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wipeRef.current) {
      gsap.fromTo(
        wipeRef.current,
        { scaleX: 1, transformOrigin: "right" },
        { scaleX: 0, duration: 0.6, ease: "expo.inOut" }
      );
    }
  }, []);

  return (
    <>
      <div 
        ref={wipeRef} 
        className="fixed top-0 left-0 w-full h-full bg-accent z-[9999] pointer-events-none origin-right" 
      />
      {children}
    </>
  );
}
