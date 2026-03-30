"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const pillars = [
  {
    num: "01",
    title: "Hackathons",
    body: "We run Aurora and other flagship events that bring builders, designers, and founders together to solve real problems under real pressure.",
  },
  {
    num: "02",
    title: "Incubation",
    body: "Post-hackathon, promising teams enter our 8-week incubation track. We provide mentorship, co-working space at IIIT Delhi, and warm intros to seed investors.",
  },
  {
    num: "03",
    title: "Community",
    body: "A network of 2,000+ students, engineers, and founders across India. Monthly demo days, AMAs with CTOs and VCs, and a Discord that actually ships things.",
  },
  {
    num: "04",
    title: "Research & Tools",
    body: "We publish open research on product and engineering practices, and build internal tools that help student teams move from zero to MVP faster.",
  },
];

export function ProjectGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const heading = containerRef.current.querySelector(".pg-heading");
    const cards = containerRef.current.querySelectorAll(".pg-card");
    const intro = containerRef.current.querySelector(".pg-intro");

    gsap.from(heading, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });

    gsap.from(intro, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "expo.out",
      delay: 0.15,
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.85,
      ease: "expo.out",
      stagger: 0.1,
      delay: 0.2,
      scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-3xl px-xl bg-bg overflow-hidden"
    >
      {/* Accent orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,127,255,0.06) 0%, transparent 70%)",
          top: "10%",
          right: "-15%",
          filter: "blur(60px)",
        }}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2xl gap-lg relative z-10">
        <div>
          <div className="caption-text text-muted mb-sm">00 · ABOUT THE ORGANISER</div>
          <h2 className="pg-heading font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] text-text leading-none tracking-tight">
            What is<br />projectGRID?
          </h2>
        </div>
        <p className="pg-intro font-body text-text-2 font-light text-base max-w-[44ch] md:text-right leading-relaxed">
          projectGRID is a student-led innovation collective based at IIIT Delhi. We build the infrastructure for the next generation of founders — running events, incubating startups, and growing a community where ambitious people find each other.
        </p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-sm mb-2xl relative z-10">
        {[
          { val: "2,000+", label: "Community members" },
          { val: "4",      label: "Hackathons run" },
          { val: "12",     label: "Startups incubated" },
          { val: "Rs 40L+",label: "Total prizes awarded" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-lg flex flex-col gap-xs">
            <div className="font-display font-bold text-[clamp(1.8rem,3vw,2.8rem)] text-text leading-none tracking-tight">
              {s.val}
            </div>
            <div className="caption-text text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pillars grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm relative z-10">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="pg-card glass rounded-2xl p-xl flex flex-col gap-md border border-white/6 hover:border-accent/35 transition-colors duration-300 group"
          >
            <div className="flex items-center gap-md">
              <span className="caption-text text-accent">{p.num}</span>
              <h3 className="font-display font-bold text-xl text-text leading-none group-hover:text-accent transition-colors duration-300">
                {p.title}
              </h3>
            </div>
            <p className="font-body text-text-2 font-light text-base leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
