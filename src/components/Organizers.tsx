"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const orgs = [
  {
    abbr: "GRID",
    name: "projectGRID",
    tagline: "Building the infrastructure for the next generation of founders.",
    desc: "projectGRID is a student-led innovation collective based at IIIT Delhi. We run hackathons, incubation sprints, and community events that connect ambitious builders with real mentors and real capital. Aurora is our flagship event — the largest thing we make.",
    links: [
      { label: "Website", url: "#" },
      { label: "Discord", url: "#" },
      { label: "Instagram", url: "#" },
    ],
    stats: [
      { val: "2,000+", label: "Community" },
      { val: "4", label: "Hackathons" },
      { val: "12", label: "Startups" },
    ],
    color: "#6B7FFF",
  },
  {
    abbr: "IIITD",
    name: "IIIT Delhi",
    tagline: "India's premier institute for technology and applied research.",
    desc: "Indraprastha Institute of Information Technology Delhi is a research-focused university known for cutting-edge work in AI, systems, and human-computer interaction. IIIT Delhi co-hosts Aurora and provides the venue, faculty mentors, and institutional backing for the closing ceremony.",
    links: [
      { label: "Website", url: "#" },
      { label: "Research", url: "#" },
    ],
    stats: [
      { val: "2008", label: "Founded" },
      { val: "200+", label: "Faculty" },
      { val: "4,000+", label: "Students" },
    ],
    color: "#34D399",
  },
];

export function Organizers() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    gsap.from(containerRef.current.querySelectorAll(".org-card"), {
      y: 70, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.15,
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-3xl px-xl bg-bg overflow-hidden"
    >
      <div className="mb-2xl">
        <div className="caption-text text-muted mb-sm">09 · ORGANISERS</div>
        <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-text leading-none tracking-tight">
          Who runs Aurora
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
        {orgs.map((org, i) => (
          <div
            key={i}
            className="org-card glass rounded-2xl border border-white/6 hover:border-accent/35 transition-colors duration-300 overflow-hidden"
          >
            {/* Top colour bar */}
            <div className="h-[3px]" style={{ background: org.color }} />

            <div className="p-xl flex flex-col gap-lg">
              {/* Monogram + name */}
              <div className="flex items-center gap-md">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${org.color}22`, border: `1px solid ${org.color}44` }}
                >
                  <span className="font-display font-bold text-sm leading-none" style={{ color: org.color }}>
                    {org.abbr}
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-text leading-none">{org.name}</div>
                  <div className="font-body text-text-2 font-light text-sm mt-xs leading-snug max-w-[36ch]">
                    {org.tagline}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-text-2 font-light text-base leading-relaxed">{org.desc}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-sm">
                {org.stats.map((s, j) => (
                  <div key={j} className="glass rounded-xl p-md border border-white/5 text-center">
                    <div className="font-display font-bold text-xl text-text leading-none">{s.val}</div>
                    <div className="caption-text text-muted mt-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-sm flex-wrap">
                {org.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    className="caption-text text-text-2 border border-border rounded-pill px-md py-xs hover:border-accent/60 hover:text-accent transition-all duration-300"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
