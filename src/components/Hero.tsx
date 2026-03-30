"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Aurora from "./Aurora";
import GradualBlur from "./GradualBlur";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glitchARef = useRef<HTMLDivElement>(null);
  const glitchBRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const titleText = "AURORA";

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    if (!titleRef.current || !subtitleRef.current) return;

    const chars = titleRef.current.querySelectorAll(".char");

    const tl = gsap.timeline();

    // Eyebrow SplitText
    if (eyebrowRef.current) {
      const split = new SplitText(eyebrowRef.current, { type: "chars" });
      tl.from(
        split.chars,
        {
          opacity: 0,
          y: 8,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.018,
          onComplete: () => split.revert(),
        },
        0
      );
    }

    // Main title chars
    tl.from(
      chars,
      {
        y: "120%",
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.025,
      },
      0.1
    );

    // Subtitle
    tl.from(
      subtitleRef.current,
      { opacity: 0, y: 16, duration: 0.6, ease: "expo.out" },
      "-=0.2"
    );

    // CTAs
    if (ctaRef.current?.children) {
      tl.from(
        ctaRef.current.children,
        { opacity: 0, y: 12, duration: 0.5, ease: "expo.out", stagger: 0.08 },
        "-=0.2"
      );
    }

    // Badge reveal
    if (badgeRef.current) {
      tl.from(
        badgeRef.current,
        { opacity: 0, x: -20, scale: 0.85, duration: 0.7, ease: "expo.out" },
        "-=0.4"
      );
    }

    // Badge continuous float
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }



    // Scroll parallax scale on title
    gsap.to(titleRef.current, {
      scale: 1.04,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Eyebrow parallax
    if (eyebrowRef.current) {
      gsap.to(eyebrowRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // CTA parallax
    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Badge parallax
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Glitch effect
    const layerA = glitchARef.current;
    const layerB = glitchBRef.current;
    if (!layerA || !layerB) return;

    let active = true;
    let glitchTimer: ReturnType<typeof setTimeout>;

    const randomClip = () => {
      const t = Math.random() * 80;
      const h = 4 + Math.random() * 18;
      return `inset(${t}% 0 ${Math.max(0, 100 - t - h)}% 0)`;
    };

    const triggerGlitch = () => {
      if (!active) return;
      const steps = 5 + Math.floor(Math.random() * 4);
      let s = 0;
      const step = () => {
        if (!active || s >= steps) {
          gsap.set([layerA, layerB], { opacity: 0 });
          return;
        }
        gsap.set(layerA, {
          opacity: 1,
          clipPath: randomClip(),
          x: -2 - Math.random() * 3,
          filter: "hue-rotate(180deg) brightness(1.2)",
        });
        gsap.set(layerB, {
          opacity: 0.6,
          clipPath: randomClip(),
          x: 2 + Math.random() * 3,
          filter: "hue-rotate(-40deg) brightness(1.1)",
        });
        s++;
        setTimeout(step, 45 + Math.random() * 30);
      };
      step();
      glitchTimer = setTimeout(triggerGlitch, 3000 + Math.random() * 4000);
    };

    const startTimer = setTimeout(() => { if (active) triggerGlitch(); }, 2200);

    return () => {
      active = false;
      clearTimeout(startTimer);
      clearTimeout(glitchTimer);
    };
  }, { scope: containerRef });

  // Mouse parallax per letter + badge inverse
  useEffect(() => {
    if (!titleRef.current) return;
    const chars = Array.from(
      titleRef.current.querySelectorAll(".char")
    ) as HTMLElement[];

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      chars.forEach((c, i) => {
        const depth = (i - 2.5) * 0.38;
        gsap.to(c, {
          x: nx * depth * 20,
          y: ny * depth * 9,
          duration: 0.9,
          ease: "power2.out",
        });
      });

      // Badge inverse parallax
      const badge = badgeRef.current;
      if (badge) {
        gsap.to(badge, {
          x: -nx * 18,
          y: -ny * 10,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);



  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(3rem, 20vw, 26rem)",
    zIndex: 3,
    position: "relative",
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Minimal background mesh - White Dominant with Blue Accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Aurora
          colorStops={["#3b82f6", "#ffffff", "#00d4ff"]}
          amplitude={1.5}
          blend={0.6}
        />
        <div className="hero-dark-gradient absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Dark vignette overlay */}
      <div
        className="hero-vignette absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 10%, rgba(8,8,16,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.01) 3px,rgba(255,255,255,0.01) 4px)",
          zIndex: 2,
        }}
      />

      {/* Content stack */}
      <div className="flex flex-col items-center" style={{ zIndex: 3, position: "relative", marginTop: "8vh" }}>
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="font-body text-white/50 mb-lg text-sm font-medium tracking-widest"
        >
          Organized by projectGRID · Student Initiative
        </div>

        {/* Title stack */}
        <div className="relative" style={titleStyle}>
          {/* Glitch layer A */}
          <div
            ref={glitchARef}
            aria-hidden="true"
            className="absolute inset-0 font-display font-black leading-[0.92] tracking-tight whitespace-nowrap pointer-events-none select-none opacity-0 text-white/20"
            style={{ fontSize: "inherit" }}
          >
            {titleText}
          </div>

          {/* Glitch layer B - Blue Accent */}
          <div
            ref={glitchBRef}
            aria-hidden="true"
            className="absolute inset-0 font-display font-black leading-[0.92] tracking-tight whitespace-nowrap pointer-events-none select-none opacity-0 text-blue-500/30"
            style={{ fontSize: "inherit" }}
          >
            {titleText}
          </div>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="font-display font-black text-white leading-[0.92] tracking-tighter whitespace-nowrap relative drop-shadow-[0_0_80px_rgba(59,130,246,0.5)] uppercase"
            style={{ fontSize: "inherit", zIndex: 3 }}
          >
            {titleText.split("").map((char, i) => (
              <span key={i} className="inline-block pb-[0.15em]">
                <span className="char inline-block">{char}</span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle inline */}
        <div
          ref={subtitleRef}
          className="flex flex-col items-center gap-sm mt-xl"
        >
          <p className="font-body text-gray-300 text-base sm:text-xl md:text-2xl text-center max-w-[42ch] font-light leading-snug tracking-tight">
            A global multi-stage hackathon. Concept, prototype, and pitch your way to glory.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="w-8 h-[1px] bg-white/10" />
            <p className="font-body text-xs text-white/40 text-center tracking-wide">
              Stage 1 closes <span className="text-blue-400 font-semibold">17 April 2026</span>
            </p>
            <span className="w-8 h-[1px] bg-white/10" />
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-md mt-sm will-change-transform" ref={ctaRef}>
          <button className="hero-cta-primary px-xl py-md rounded-pill bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-[1.03] text-black font-body text-sm font-bold tracking-wide transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-1">
              Register on Devpost
            </span>
            <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          <button className="hero-cta-secondary px-xl py-md rounded-pill border border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-body text-sm font-medium transition-all duration-300">
            View Schedule
          </button>
        </div>
      </div>



      {/* Gradual blur fade at the bottom edge */}
      <GradualBlur
        position="bottom"
        height="140px"
        strength={6}
        divCount={8}
        curve="ease-in-out"
        zIndex={4}
      />
    </section>
  );
}
