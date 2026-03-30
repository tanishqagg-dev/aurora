"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const pillars = [
  {
    title: "Mentorship",
    body: "8 weeks of structured mentorship from founders, VCs, and domain experts. Weekly 1:1s, group sessions, and warm intros.",
  },
  {
    title: "Resources",
    body: "Co-working at IIIT Delhi, Rs 50K in cloud credits, design tool licenses, and priority projectGRID community access.",
  },
  {
    title: "Investor Introductions",
    body: "Warm introductions to 25+ seed-stage VCs and angels actively investing in the Aurora thematic areas.",
  },
  {
    title: "Market Strategy",
    body: "Go-to-market sprint with projectGRID advisors. Customer discovery, pricing strategy, and launch playbook.",
  },
];

const milestones = [
  { week: "Week 1", label: "Onboarding" },
  { week: "Week 4", label: "Investor Preview" },
  { week: "Week 8", label: "Demo Day" },
  { week: "Ongoing", label: "Alumni Network" },
];

export function Incubation() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Hero heading SplitText
    if (headingRef.current) {
      const split = new SplitText(headingRef.current, { type: "words" });
      gsap.from(split.words, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 75%",
        },
        onComplete: () => split.revert(),
      });
    }

    // Cards
    if (cardsRef.current) {
      gsap.from(".incubation-card", {
        scale: 0.88,
        opacity: 0,
        duration: 0.75,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    }

    // Milestone line
    if (pathRef.current) {
      gsap.fromTo(
        pathRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "expo.out",
          duration: 1.6,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Milestone dots
    gsap.from(".milestone-dot", {
      scale: 0,
      duration: 0.5,
      ease: "elastic.out(1.2,0.5)",
      stagger: 0.18,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
      },
    });

    // Milestone labels
    gsap.from(".milestone-label", {
      y: 12,
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  // Card cursor spotlight
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".incubation-card");
    const handlers: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];

    cards.forEach((card) => {
      const fn = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--gx", `${x}%`);
        card.style.setProperty("--gy", `${y}%`);
      };
      card.addEventListener("mousemove", fn);
      handlers.push({ el: card, fn });
    });

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("mousemove", fn));
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-3xl px-xl overflow-hidden"
      style={{ background: "var(--color-surface-1)" }}
    >
      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(rgba(107,127,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,127,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section label */}
      <div className="font-body text-sm font-medium text-muted mb-sm relative z-10">Incubation Program</div>

      {/* Hero heading */}
      <h2
        ref={headingRef}
        className="font-display font-bold text-[clamp(2.4rem,5vw,4.2rem)] text-text leading-none tracking-tight max-w-[22ch] mb-xl relative z-10"
      >
        The Top 20 Teams Don't Just Win. They Begin.
      </h2>

      {/* Subtitle */}
      <p className="font-body text-text-2 font-light text-lg leading-relaxed max-w-[60ch] mb-3xl relative z-10">
        Every finalist is automatically enrolled in the Aurora Incubation Program — 8 weeks of mentorship,
        resources, and investor access, beginning the week after the closing ceremony.
      </p>

      {/* Pillar cards 2×2 */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-sm mb-3xl relative z-10"
      >
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className="incubation-card glass border border-border rounded-2xl p-xl cursor-default"
            style={{
              backgroundImage:
                "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(107,127,255,0.07) 0%, transparent 60%)",
            }}
          >
            <div className="caption-text text-accent mb-sm">0{i + 1}</div>
            <h3 className="font-display font-bold text-xl text-text leading-tight mb-sm">
              {pillar.title}
            </h3>
            <p className="font-body text-text-2 font-light text-base leading-relaxed">{pillar.body}</p>
          </div>
        ))}
      </div>

      {/* Post-event milestone timeline */}
      <div ref={timelineRef} className="relative z-10 mb-3xl">
        <div className="font-body text-sm font-medium text-muted mb-xl">Post-event milestones</div>

        {/* Track + nodes */}
        <div className="relative flex items-start justify-between gap-4">
          {/* Connecting line */}
          <div className="absolute top-[10px] left-0 right-0 h-[1px] bg-border" style={{ zIndex: 0 }}>
            <div
              ref={pathRef}
              className="absolute inset-0 bg-accent origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-sm" style={{ zIndex: 1, flex: 1 }}>
              <div
                className="milestone-dot w-5 h-5 rounded-full border-2 border-accent bg-[#06060E]"
                style={{ boxShadow: "0 0 10px rgba(107,127,255,0.5)" }}
              />
              <div className="milestone-label text-center">
                <div className="caption-text text-accent">{m.week}</div>
                <div className="font-body text-text-2 text-sm mt-1">{m.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 flex flex-col items-start gap-md pt-xl border-t border-border">
        <p className="font-display font-bold text-2xl text-text">
          Already enrolled if you make the final 20.
        </p>
        <p className="font-body text-text-2 font-light text-base max-w-[52ch]">
          No applications. No extra forms. Reach the top 20 and the program begins automatically.
          Everything you need to go from finalist to funded.
        </p>
        <button className="mt-sm px-xl py-md rounded-pill border border-accent text-accent caption-text tracking-widest hover:bg-accent hover:text-bg transition-all duration-300">
          READ THE BRIEF →
        </button>
      </div>
    </section>
  );
}
