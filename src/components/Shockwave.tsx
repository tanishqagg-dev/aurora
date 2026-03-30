"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Shockwave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeFallback: ReturnType<typeof setTimeout>;
    const resizeShock = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeShock();
    
    // In next.js, the layout might shift right after mount
    resizeFallback = setTimeout(resizeShock, 100);
    window.addEventListener("resize", resizeShock);

    const onClick = (e: MouseEvent) => {
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#1F2937';
      const obj = { p: 0 };
      
      gsap.to(obj, {
        p: 1,
        duration: 0.75,
        ease: "expo.out",
        onUpdate: () => {
          if (!ctx) return;
          const latest = obj.p;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.arc(e.clientX, e.clientY, latest * 110, 0, Math.PI * 2);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = (1 - latest) * 0.7;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        },
        onComplete: () => {
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("resize", resizeShock);
      document.removeEventListener("click", onClick);
      clearTimeout(resizeFallback);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9997]" 
      aria-hidden="true"
    />
  );
}

