"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import StickyTabs from "@/components/ui/sticky-section-tabs";
import {
  Calendar,
  ClipboardCheck,
  Award,
  MessageCircle,
  Code2,
  Info,
  MapPin,
  CheckCircle2,
  Trophy,
  ArrowRight,
} from "lucide-react";

const stages = [
  {
    num: "01",
    name: "Idea Submission",
    id: "idea-submission",
    dates: "Deadline: 17 Apr 2026",
    badge: "Open Now",
    desc: "A business-focused round. Answer 10 questions about your idea via Google Form — no code required, just a clear problem and a compelling solution.",
    expect: ["10-question Google Form", "Clear problem statement", "Team profile"],
    out: "All teams → 200 shortlisted",
    icon: <ClipboardCheck className="w-10 h-10" />,
  },
  {
    num: "02",
    name: "Prototyping Phase",
    id: "prototyping",
    dates: "Deadline: 4 May 2026",
    badge: "Remote",
    desc: "Take your shortlisted idea and build it. Submit your GitHub repo and a 2-minute explainer video showing your working MVP.",
    expect: ["GitHub repository", "2-min explainer video", "Updated pitch deck"],
    out: "200 teams → 20 finalists",
    icon: <Code2 className="w-10 h-10" />,
  },
  {
    num: "03",
    name: "Shark Tank Live Pitch",
    id: "pitch",
    dates: "18 May 2026",
    badge: "Live",
    desc: "The top 20 teams pitch live in a Shark Tank-style session to our panel of judges. 8 minutes to pitch, 7 minutes Q&A. No safety net.",
    expect: ["Live demo of working product", "8-min pitch + 7-min Q&A", "Virtual pitch session"],
    out: "20 finalists compete",
    icon: <MessageCircle className="w-10 h-10" />,
  },
  {
    num: "04",
    name: "Prize Ceremony",
    id: "prizes",
    dates: "TBD · May 2026",
    badge: "Awards",
    desc: "Winners are announced across all four tracks at a dedicated virtual ceremony. Prizes, sponsor deals, and incubation offers.",
    expect: ["Track winners announced", "Sponsor partnerships offered", "Incubation fast-track invites"],
    out: "Winners Crowned",
    icon: <Award className="w-10 h-10" />,
  },
  {
    num: "05",
    name: "Closing Ceremony",
    id: "closing",
    dates: "21 May 2026 · Online",
    badge: "Virtual",
    desc: "The official close of Aurora 2026. Online networking for all finalists, judges, sponsors, and the wider projectGRID community.",
    expect: ["Networking with judges and VCs", "Virtual demo floor", "Community after-party"],
    out: "Open to all finalists",
    icon: <Trophy className="w-10 h-10" />,
  },
];

export function Timeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!wrapperRef.current) return;

    // Header intro
    gsap.fromTo(".tl-hero-content", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: wrapperRef.current, start: "top 85%", once: true },
    });

    // Each phase section: left slides from left, right cards stagger from below
    document.querySelectorAll(".phase-row").forEach((row) => {
      gsap.fromTo(row.querySelector(".phase-left"), { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: row, start: "top 80%", once: true },
      });

      gsap.fromTo(row.querySelectorAll(".submit-card"), { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.13,
        scrollTrigger: { trigger: row, start: "top 75%", once: true },
      });

      gsap.fromTo(row.querySelector(".portal-card"), { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: row, start: "top 65%", once: true },
      });

      gsap.fromTo(row.querySelector(".outcome-card"), { scale: 0.92, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.75, ease: "back.out(1.4)",
        scrollTrigger: { trigger: row, start: "top 70%", once: true },
      });
    });
  }, { scope: wrapperRef });

  return (
    <div id="stages" className="bg-bg" ref={wrapperRef}>

      {/* ── Section header ── */}
      <div className="bg-bg text-text px-xl pt-3xl pb-xl border-b border-white/5">
        <div className="tl-hero-content">
          <div className="font-body text-sm font-medium text-white/40 mb-sm">Timeline</div>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-none tracking-tighter mb-md">
            Five stages. Six weeks.<br />
            <span className="text-white/50 timeline-gradient-span">One champion.</span>
          </h2>
          <p className="font-body text-gray-400 font-light text-lg max-w-[50ch] leading-relaxed">
            Each round eliminates teams. Only the most resilient and innovative builders
            will reach the global live stage.
          </p>
          <div className="flex items-center gap-lg mt-xl py-lg border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl tracking-tighter">20,000+</span>
              <span className="font-body text-xs text-white/40 font-medium mt-1">Initial ideas</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl tracking-tighter">200</span>
              <span className="font-body text-xs text-white/40 font-medium mt-1">Shortlisted</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl tracking-tighter">20</span>
              <span className="font-body text-xs text-white/40 font-medium mt-1">Finalists</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Phases ── */}
      <StickyTabs
        mainNavHeight="8rem"
        rootClassName="bg-bg"
        navSpacerClassName="bg-bg"
        sectionClassName="bg-surface-1 border-b border-white/5"
        headerContentWrapperClassName="border-b border-white/10 bg-bg/95 backdrop-blur-md"
        headerContentLayoutClassName="px-xl py-5"
        titleClassName="font-display text-xl md:text-2xl font-bold tracking-tight text-text border-l-4 border-text pl-md h-10 flex items-center"
        contentLayoutClassName="px-xl py-3xl"
      >
        {stages.map((stage) => (
          <StickyTabs.Item
            key={stage.id}
            title={`Phase ${stage.num}: ${stage.name}`}
            id={stage.id}
          >
            {/* phase-row: GSAP target */}
            <div className="phase-row grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

              {/* ──────────── LEFT COLUMN ──────────── */}
              <div className="phase-left lg:col-span-4 flex flex-col gap-xl pr-2xl border-r border-white/5">

                {/* Phase number watermark */}
                <div className="relative">
                  <span
                    className="absolute -top-4 -left-2 font-display font-black text-[8rem] leading-none select-none pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.03)" }}
                    aria-hidden
                  >
                    {stage.num}
                  </span>

                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between mb-lg relative z-10">
                    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/30 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-2xl">
                        <div className="absolute -inset-[100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]" />
                      </div>
                      <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-500">
                        {React.isValidElement(stage.icon)
                          ? React.cloneElement(stage.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10" })
                          : stage.icon}
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-white/8 border border-white/15 font-body text-xs font-semibold text-white/70 tracking-wide">
                      {stage.badge}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-white/35 text-sm mb-sm relative z-10">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-body">{stage.dates}</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-black text-5xl xl:text-6xl text-white tracking-tighter leading-[0.88] mb-xl relative z-10">
                    {stage.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="relative border-l-2 border-white/15 pl-6">
                  <p className="font-body text-lg text-gray-400 font-light leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                {/* Outcome card */}
                <div className="outcome-card mt-auto">
                  <div className="relative p-7 rounded-3xl bg-white/[0.02] border border-white/8 overflow-hidden group hover:border-white/25 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />
                    <div className="font-body text-xs font-medium text-white/35 mb-4 uppercase tracking-widest">Outcome</div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-400 shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white group-hover:text-black transition-colors duration-400" />
                      </div>
                      <span className="text-white font-display font-black text-xl tracking-tight">{stage.out}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────── RIGHT COLUMN ──────────── */}
              <div className="lg:col-span-8 pl-2xl pt-0 flex flex-col gap-md">
                <div className="font-body text-sm font-medium text-white/35 mb-md uppercase tracking-widest">
                  What to Submit
                </div>

                {/* Submit items — full-width editorial cards */}
                {stage.expect.map((item, idx) => (
                  <div
                    key={idx}
                    className="submit-card group relative rounded-3xl border border-white/6 bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden cursor-default"
                  >
                    <div className="flex items-stretch min-h-[72px]">
                      {/* Number strip */}
                      <div className="flex items-center justify-center w-20 xl:w-24 shrink-0 border-r border-white/6 group-hover:border-white/15 transition-colors duration-500">
                        <span className="font-display font-black text-3xl xl:text-4xl text-white/[0.06] group-hover:text-white/12 transition-colors tabular-nums leading-none select-none">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex items-center px-8 xl:px-10 py-7 gap-6">
                        <h4 className="font-display font-black text-lg xl:text-xl text-white tracking-tight leading-tight flex-1">
                          {item}
                        </h4>
                        <div className="shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-400">
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom shimmer line */}
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}

                {/* Virtual Portal Access */}
                <div className="portal-card relative mt-sm p-8 xl:p-10 rounded-3xl bg-gradient-to-br from-white/8 via-transparent to-transparent border border-white/10 flex items-center justify-between group cursor-help hover:border-white/30 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-bg/90 -z-0" />
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="relative p-3 rounded-xl bg-white/5 border border-white/10">
                      <MapPin className="w-6 h-6 text-white/70 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                      <div className="absolute inset-0 bg-white blur-2xl opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                    </div>
                    <div>
                      <div className="text-white font-display font-black text-xl tracking-tight">Virtual Portal Access</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <span className="font-body text-xs text-white/40">Live stream + async replay available</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 group-hover:rotate-[360deg]" style={{ transitionDuration: "700ms" }}>
                    <Info className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>

            </div>
          </StickyTabs.Item>
        ))}
      </StickyTabs>
    </div>
  );
}
