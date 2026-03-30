"use client";
import { useEffect, useRef } from "react";

interface Dot {
  x: number; y: number;
  vy: number; size: number;
  opacity: number; drift: number;
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    let W = canvas.width;
    let H = canvas.height;
    let raf = 0;

    const makeDot = (): Dot => ({
      x: Math.random() * W,
      y: H + Math.random() * H * 0.5,
      vy: 0.4 + Math.random() * 0.9,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.05,
      drift: (Math.random() - 0.5) * 0.4,
    });

    const dots: Dot[] = Array.from({ length: 60 }, makeDot);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        d.y -= d.vy;
        d.x += d.drift;
        if (d.y < -10) {
          d.y = H + 10;
          d.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107,127,255,${d.opacity})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      resize();
      W = canvas.width;
      H = canvas.height;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
