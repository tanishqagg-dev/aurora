"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Props {
  onComplete: () => void;
}

const INTRO_CHARS = "AURORA".split("");

export function IntroAnimation({ onComplete }: Props) {
  const overlayRef    = useRef<HTMLDivElement>(null);
  const curtainRef    = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const tagRef        = useRef<HTMLDivElement>(null);
  const flashRef      = useRef<HTMLDivElement>(null);
  const hl1Ref        = useRef<HTMLDivElement>(null);
  const hl2Ref        = useRef<HTMLDivElement>(null);
  const hl3Ref        = useRef<HTMLDivElement>(null);
  const amountRef     = useRef<HTMLDivElement>(null);
  const auroraRef     = useRef<HTMLDivElement>(null);
  const glitchARef    = useRef<HTMLDivElement>(null);
  const glitchBRef    = useRef<HTMLDivElement>(null);
  const bylineRef     = useRef<HTMLDivElement>(null);
  const dateRef       = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);
  const scanRef       = useRef<HTMLDivElement>(null);
  const skipRef       = useRef<HTMLButtonElement>(null);
  const finishedRef   = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Kill all running tweens on overlay children
    gsap.killTweensOf([
      overlayRef.current, auroraRef.current,
      glitchARef.current, glitchBRef.current,
    ]);

    const tl = gsap.timeline({ onComplete: onComplete });

    // Flash white
    tl.to(flashRef.current, { opacity: 1, duration: 0.08, ease: "none" });
    tl.to(flashRef.current, { opacity: 0, duration: 0.15, ease: "none" });

    // Curtain wipes up
    tl.to(curtainRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut",
    }, "+=0.05");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // Hide all elements that start invisible so GSAP from() animates 0→1 correctly
      gsap.set([
        scanRef.current, gridRef.current, tagRef.current,
        amountRef.current, dateRef.current, bylineRef.current, lineRef.current,
      ], { opacity: 0 });

      const tl = gsap.timeline();

      /* ─── Beat 0: scanlines + grid pulse in ─── */
      tl.from(scanRef.current, { opacity: 0, duration: 0.3 });
      tl.from(gridRef.current, { opacity: 0, duration: 0.6, ease: "expo.out" }, "<");

      /* ─── Beat 1: thin horizontal line draws ─── */
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, opacity: 1, duration: 0.7, ease: "expo.out" },
        "+=0.1"
      );

      /* ─── Beat 2: tag "A PROJECTGRID PRODUCTION" ─── */
      tl.from(tagRef.current, { opacity: 0, letterSpacing: "0.5em", duration: 0.5, ease: "expo.out" }, "+=0.1");
      tl.to(tagRef.current, { opacity: 0, y: -12, duration: 0.35, ease: "expo.in" }, "+=0.6");
      tl.to(lineRef.current, { scaleX: 0, opacity: 0, duration: 0.35, ease: "expo.in" }, "<");

      /* ─── Beat 3: grid dims, headlines slam in ─── */
      tl.to(gridRef.current, { opacity: 0.04, duration: 0.3 });

      // Headline 1
      tl.fromTo(hl1Ref.current,
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.55, ease: "expo.out" },
        "+=0.05"
      );
      tl.to(hl1Ref.current,
        { clipPath: "inset(0% 0 100% 0)", y: -40, duration: 0.4, ease: "expo.in" },
        "+=0.55"
      );

      // Headline 2
      tl.fromTo(hl2Ref.current,
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.55, ease: "expo.out" },
        "-=0.15"
      );
      tl.to(hl2Ref.current,
        { clipPath: "inset(0% 0 100% 0)", y: -40, duration: 0.4, ease: "expo.in" },
        "+=0.55"
      );

      // Headline 3 (prize)
      tl.fromTo(hl3Ref.current,
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.55, ease: "expo.out" },
        "-=0.15"
      );

      /* ─── Beat 4: amount counter scramble ─── */
      tl.from(amountRef.current, { opacity: 0, scale: 0.7, duration: 0.3, ease: "back.out(2)" }, "+=0.1");

      // Number scramble via JS callback
      tl.add(() => {
        if (!amountRef.current) return;
        let count = 0;
        const target = 2000000;
        const el = amountRef.current;
        const iv = setInterval(() => {
          count++;
          if (count >= 18) {
            clearInterval(iv);
            el.textContent = "RS 20,00,000";
          } else {
            const rand = Math.floor(Math.random() * target);
            el.textContent = `RS ${rand.toLocaleString("en-IN")}`;
          }
        }, 38);
      });

      tl.to([hl3Ref.current, amountRef.current],
        { opacity: 0, y: -20, duration: 0.4, ease: "expo.in" },
        "+=0.85"
      );

      /* ─── Beat 5: screen flicker ─── */
      tl.to(overlayRef.current, { opacity: 0.1, duration: 0.05 }, "+=0.05");
      tl.to(overlayRef.current, { opacity: 1, duration: 0.05 });
      tl.to(overlayRef.current, { opacity: 0.15, duration: 0.04 });
      tl.to(overlayRef.current, { opacity: 1, duration: 0.06 });

      /* ─── Beat 6: AURORA letters slam in ─── */
      tl.to(gridRef.current, { opacity: 0.03, duration: 0.2 });

      const charEls = auroraRef.current?.querySelectorAll(".i-char");
      if (charEls) {
        tl.fromTo(charEls,
          { y: "130%", skewX: -12 },
          { y: "0%", skewX: 0, duration: 0.85, ease: "power4.out", stagger: 0.055 }
        );
      }

      /* ─── Beat 7: glitch on AURORA ─── */
      const glitchSteps = 7;
      for (let s = 0; s < glitchSteps; s++) {
        const t = 0.07 * s;
        const inClip  = `inset(${10 + Math.random() * 60}% 0 ${5 + Math.random() * 20}% 0)`;
        const inClip2 = `inset(${5  + Math.random() * 40}% 0 ${20 + Math.random() * 40}% 0)`;
        tl.set(glitchARef.current, { opacity: s % 2 === 0 ? 0.9 : 0, clipPath: inClip, x: -5 - Math.random() * 8, filter: "hue-rotate(180deg) saturate(4)" }, `glitch+=${t}`);
        tl.set(glitchBRef.current, { opacity: s % 2 === 0 ? 0 : 0.8, clipPath: inClip2, x:  4 + Math.random() * 6, filter: "hue-rotate(-40deg) saturate(5) brightness(1.5)" }, `glitch+=${t}`);
      }
      tl.addLabel("glitch", "+=0.05");
      tl.set([glitchARef.current, glitchBRef.current], { opacity: 0 }, `glitch+=${0.07 * glitchSteps}`);

      /* ─── Beat 8: byline + date reveal ─── */
      tl.from(dateRef.current,
        { opacity: 0, y: 16, duration: 0.55, ease: "expo.out" },
        "+=0.2"
      );
      tl.from(bylineRef.current,
        { opacity: 0, y: 12, duration: 0.5, ease: "expo.out" },
        "-=0.3"
      );

      /* ─── Beat 9: hold then exit ─── */
      tl.add(finish, "+=1.4");
    }, overlayRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* The curtain that wipes up on exit */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] bg-[#080810] pointer-events-none"
        style={{ transformOrigin: "top center" }}
      />

      {/* Main overlay content */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-[#080810] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* White flash layer */}
        <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none z-50" />

        {/* CRT scanlines */}
        <div
          ref={scanRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
          }}
        />

        {/* Grid overlay */}
        <div
          ref={gridRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(107,127,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(107,127,255,0.12) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Corner accent dots */}
        {["top-6 left-6","top-6 right-6","bottom-6 left-6","bottom-6 right-6"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-accent`}
            style={{ animation: `dot-ping 2s ease-in-out ${i * 0.5}s infinite` }}
          />
        ))}

        {/* Horizontal line */}
        <div
          ref={lineRef}
          className="absolute w-full h-[1px] bg-accent origin-center"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Tag */}
        <div
          ref={tagRef}
          className="absolute caption-text text-accent"
          style={{ letterSpacing: "0.3em" }}
        >
          A PROJECTGRID PRODUCTION
        </div>

        {/* Headline wrappers */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={hl1Ref}
            className="absolute font-display font-bold text-text text-center leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem,8vw,7rem)", clipPath: "inset(100% 0 0 0)" }}
          >
            THE PROBLEM<br />
            <span className="text-accent">IS REAL.</span>
          </div>

          <div
            ref={hl2Ref}
            className="absolute font-display font-bold text-text text-center leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem,8vw,7rem)", clipPath: "inset(100% 0 0 0)" }}
          >
            BUILD<br />
            <span className="text-accent">THE SOLUTION.</span>
          </div>

          <div
            ref={hl3Ref}
            className="absolute font-display font-bold text-text text-center leading-none tracking-tight"
            style={{ fontSize: "clamp(2rem,5vw,4.5rem)", clipPath: "inset(100% 0 0 0)" }}
          >
            <span className="text-text-2">THE PRIZE:</span>
          </div>
        </div>

        {/* Amount counter */}
        <div
          ref={amountRef}
          className="absolute font-display font-bold text-accent text-center leading-none tracking-tight tabular-nums"
          style={{ fontSize: "clamp(2.5rem,7vw,6rem)", top: "58%" }}
        >
          RS 0
        </div>

        {/* AURORA title stack */}
        <div className="relative select-none" style={{ zIndex: 20 }}>
          {/* Glitch layer A */}
          <div
            ref={glitchARef}
            aria-hidden="true"
            className="absolute inset-0 font-display font-bold text-text leading-none tracking-tight whitespace-nowrap pointer-events-none opacity-0"
            style={{ fontSize: "clamp(7rem,22vw,22rem)" }}
          >
            AURORA
          </div>
          {/* Glitch layer B */}
          <div
            ref={glitchBRef}
            aria-hidden="true"
            className="absolute inset-0 font-display font-bold text-accent leading-none tracking-tight whitespace-nowrap pointer-events-none opacity-0"
            style={{ fontSize: "clamp(7rem,22vw,22rem)" }}
          >
            AURORA
          </div>
          {/* Main letters */}
          <div
            ref={auroraRef}
            className="font-display font-bold text-text leading-none tracking-tight whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(7rem,22vw,22rem)" }}
          >
            {INTRO_CHARS.map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
                <span className="i-char inline-block" style={{ transform: "translateY(130%)" }}>{ch}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Date */}
        <div
          ref={dateRef}
          className="absolute font-display font-bold text-text-2 text-center"
          style={{ fontSize: "clamp(1.2rem,3vw,2.5rem)", bottom: "28%" }}
        >
          2026
        </div>

        {/* Byline */}
        <div
          ref={bylineRef}
          className="absolute caption-text text-muted text-center"
          style={{ bottom: "22%" }}
        >
          BY PROJECTGRID &nbsp;×&nbsp; IIIT DELHI &nbsp;·&nbsp; STAGE 1 CLOSES 17 APRIL 2026
        </div>

        {/* Skip button */}
        <button
          ref={skipRef}
          onClick={finish}
          className="absolute bottom-8 right-8 caption-text text-muted hover:text-text transition-colors duration-300 z-30"
          style={{ letterSpacing: "0.15em" }}
        >
          SKIP →
        </button>
      </div>
    </>
  );
}
