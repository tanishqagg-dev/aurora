"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import CountUp from "./CountUp";
import { UsersThree, Globe, Trophy, Ranking } from "@phosphor-icons/react";

const StatIcon = ({ icon }: { icon: string }) => {
  const cls = "w-6 h-6 text-[#3B82F6] opacity-80";
  if (icon === "users")   return <UsersThree className={cls} weight="duotone" />;
  if (icon === "globe")   return <Globe className={cls} weight="duotone" />;
  if (icon === "trophy")  return <Trophy className={cls} weight="duotone" />;
  if (icon === "ranking") return <Ranking className={cls} weight="duotone" />;
  return null;
};

const stats = [
  { to: 15000, suffix: "+", label: "Expected Registrations", sep: ",", icon: "users" },
  { to: 80,    suffix: "+", label: "Countries Welcome",     sep: "",  icon: "globe" },
  { to: 4,     suffix: "",  prefix: "", label: "Prize Tracks",  sep: "", icon: "trophy" },
  { to: 200,   suffix: "+", label: "Teams Shortlisted",     sep: "",  icon: "ranking" },
];

const reasons = [
  {
    title: "Win MacBooks & APIs",
    body: "Top teams walk away with Apple MacBooks, thousands in API credits, and official verified certifications.",
  },
  {
    title: "Real Exposure",
    body: "Demo your product in front of VCs, CTOs, and startup founders. Finalists get featured on Devfolio, Polygon, and partner channels.",
  },
  {
    title: "Incubation Access",
    body: "Top teams get fast-tracked into the projectGRID 8-week incubation program — mentorship, co-working space, and warm investor intros.",
  },
  {
    title: "Global Network",
    body: "Join 2,000+ builders, designers, and founders in the projectGRID community. The connections you make here outlast the hackathon.",
  },
];

const countries = [
  { name: "Indonesia", code: "id" }, { name: "India", code: "in" }, { name: "Vietnam", code: "vn" },
  { name: "USA", code: "us" }, { name: "UK", code: "gb" }, { name: "Germany", code: "de" },
  { name: "Singapore", code: "sg" }, { name: "Japan", code: "jp" }, { name: "Brazil", code: "br" },
  { name: "Canada", code: "ca" }, { name: "Australia", code: "au" }, { name: "South Korea", code: "kr" },
  { name: "France", code: "fr" }, { name: "Netherlands", code: "nl" }, { name: "Sweden", code: "se" },
  { name: "Nigeria", code: "ng" }, { name: "South Africa", code: "za" }, { name: "UAE", code: "ae" },
  { name: "Kenya", code: "ke" }, { name: "Mexico", code: "mx" }, { name: "Argentina", code: "ar" },
  { name: "Spain", code: "es" }, { name: "Italy", code: "it" }, { name: "Egypt", code: "eg" },
  { name: "Turkey", code: "tr" }, { name: "Thailand", code: "th" }, { name: "Malaysia", code: "my" },
  { name: "Poland", code: "pl" }, { name: "Norway", code: "no" }, { name: "Switzerland", code: "ch" },
  { name: "Colombia", code: "co" }, { name: "Peru", code: "pe" }, { name: "New Zealand", code: "nz" },
  { name: "Ireland", code: "ie" }, { name: "Austria", code: "at" }, { name: "Belgium", code: "be" },
  { name: "Portugal", code: "pt" }, { name: "Israel", code: "il" }, { name: "Qatar", code: "qa" },
  { name: "Saudi Arabia", code: "sa" }, { name: "Finland", code: "fi" }, { name: "Denmark", code: "dk" },
  { name: "Greece", code: "gr" }, { name: "Czech Republic", code: "cz" }, { name: "Hungary", code: "hu" },
  { name: "Philippines", code: "ph" }, { name: "Pakistan", code: "pk" }, { name: "Morocco", code: "ma" },
  { name: "Chile", code: "cl" }, { name: "Uruguay", code: "uy" }, { name: "Estonia", code: "ee" },
  { name: "Romania", code: "ro" }, { name: "Bulgaria", code: "bg" }, { name: "Croatia", code: "hr" },
  { name: "Serbia", code: "rs" }, { name: "Slovakia", code: "sk" }, { name: "Slovenia", code: "si" },
  { name: "Lithuania", code: "lt" }, { name: "Latvia", code: "lv" }, { name: "China", code: "cn" },
  { name: "Hong Kong", code: "hk" }, { name: "Taiwan", code: "tw" }, { name: "Ukraine", code: "ua" },
  { name: "Luxembourg", code: "lu" }, { name: "Malta", code: "mt" }, { name: "Iceland", code: "is" },
  { name: "Jordan", code: "jo" }, { name: "Kuwait", code: "kw" }, { name: "Oman", code: "om" },
  { name: "Bahrain", code: "bh" }, { name: "Cyprus", code: "cy" }, { name: "Monaco", code: "mc" },
  { name: "Ecuador", code: "ec" }, { name: "Costa Rica", code: "cr" }, { name: "Panama", code: "pa" },
  { name: "Guatemala", code: "gt" }, { name: "Dominican Republic", code: "do" }, { name: "Ghana", code: "gh" },
  { name: "Ethiopia", code: "et" }, { name: "Tanzania", code: "tz" }, { name: "Uganda", code: "ug" },
  { name: "Sri Lanka", code: "lk" }, { name: "Bangladesh", code: "bd" }, { name: "Nepal", code: "np" },
  { name: "Kazakhstan", code: "kz" }, { name: "Uzbekistan", code: "uz" }, { name: "Georgia", code: "ge" },
  { name: "Azerbaijan", code: "az" }, { name: "Armenia", code: "am" }, { name: "Mauritius", code: "mu" },
];

// ─── Scroll-story stages ─────────────────────────────────────────────────────
const storyStages = [
  { headline: "It starts with\none idea.",         sub: "A student. A problem. A spark.",                              upTo: 1  },
  { headline: "A team,\nthen another.",             sub: "Campuses across Asia begin to light up.",                    upTo: 10 },
  { headline: "Word spreads\nfast.",                sub: "Europe tunes in. The Americas follow.",                      upTo: 22 },
  { headline: "30 nations\nhave joined.",           sub: "Asia. Europe. The Americas. All converging on one stage.",   upTo: 36 },
  { headline: "Halfway around\nthe globe.",         sub: "Lagos. Seoul. São Paulo. Stockholm. All building together.", upTo: 55 },
  { headline: "Every corner\nof the world.",        sub: "From the Arabian Peninsula to the Pacific islands.",         upTo: 75 },
  { headline: "80+ nations.\nOne hackathon.",       sub: "Aurora 2026 — this is what global looks like.",              upTo: 90 },
];

// ─── Flag Scroll Story ────────────────────────────────────────────────────────
function FlagScrollStory({
  countries, discovered, hovered, onHover, onToggle, onQuiz, onReset,
}: {
  countries: { name: string; code: string }[];
  discovered: Set<string>;
  hovered: string | null;
  onHover: (c: string | null) => void;
  onToggle: (c: string) => void;
  onQuiz: () => void;
  onReset: () => void;
}) {
  const panelRef    = useRef<HTMLDivElement>(null);
  const flagRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const panel = panelRef.current;
    if (!panel) return;

    // Start everything invisible
    flagRefs.current.forEach(el => { if (el) gsap.set(el, { scale: 0, opacity: 0 }); });
    textRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0, y: 24 }); });
    if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0 });

    const scrollDist = storyStages.length * 100; // vw-agnostic %, becomes px via end

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top top",
        end: `+=${scrollDist}vh`,   // each stage = ~100vh of scroll travel
        pin: true,
        pinSpacing: true,
        scrub: 2,
        anticipatePin: 1,
      },
    });

    // Progress line sweeps full width
    tl.to(lineRef.current, { scaleX: 1, ease: "none", duration: storyStages.length }, 0);

    // Running counter 0 → 90
    const counter = { val: 0 };
    tl.to(counter, {
      val: countries.length, ease: "none", duration: storyStages.length,
      onUpdate() {
        if (counterRef.current)
          counterRef.current.textContent = Math.round(counter.val).toString();
      },
    }, 0);

    storyStages.forEach((stage, si) => {
      const t = si;

      if (si > 0 && textRefs.current[si - 1])
        tl.to(textRefs.current[si - 1], { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" }, t);

      tl.to(textRefs.current[si], { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t + 0.15);

      const prevUpTo = si === 0 ? 0 : storyStages[si - 1].upTo;
      const batch = flagRefs.current.slice(prevUpTo, stage.upTo).filter(Boolean);
      if (batch.length) {
        tl.to(batch, {
          scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.5)",
          stagger: { amount: 0.45, from: "start" },
        }, t + 0.2);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, [countries.length]);

  // 9 columns × 10 rows = 90 flags exactly
  const COLS = 9;

  return (
    /* GSAP pins this panel — pinSpacing adds the scroll room automatically */
    <div ref={panelRef} className="h-screen overflow-hidden bg-bg flex flex-col">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 shrink-0">
          <div className="flex items-baseline gap-2">
            <span ref={counterRef} className="font-display font-black text-white tabular-nums"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>0</span>
            <span className="font-display font-black text-white/20"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>/{countries.length}</span>
            <span className="font-body text-sm text-white/30 ml-1 mb-1 self-end">nations</span>
          </div>
          <button
            onClick={onQuiz}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-body text-sm font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 shrink-0"
          >
            <Globe weight="bold" className="w-4 h-4" />
            Play Flag Quiz
          </button>
        </div>

        {/* Scrub progress line */}
        <div className="w-full h-px bg-white/5 shrink-0 mb-0">
          <div ref={lineRef} className="h-full bg-blue-500 origin-left w-full" />
        </div>

        {/* ── Main two-column layout ── */}
        <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden min-h-0">

          {/* Left — narrative text */}
          <div className="col-span-4 xl:col-span-3 flex flex-col justify-center px-8 relative border-r border-white/5">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 120% 60% at 0% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

            <div className="relative">
              {storyStages.map((stage, si) => (
                <div key={si} ref={el => { textRefs.current[si] = el; }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-0 pointer-events-none select-none">
                  <h3 className="font-display font-black text-white leading-[0.92] whitespace-pre-line mb-5"
                    style={{ fontSize: "clamp(1.75rem,3.5vw,3rem)" }}>
                    {stage.headline}
                  </h3>
                  <p className="font-body text-white/40 text-sm leading-relaxed max-w-[28ch]">
                    {stage.sub}
                  </p>
                  {/* Stage dot */}
                  <div className="flex items-center gap-2 mt-6">
                    {storyStages.map((_, di) => (
                      <div key={di} className="rounded-full transition-all duration-300"
                        style={{
                          width: di === si ? 20 : 5,
                          height: 5,
                          background: di === si ? "rgba(59,130,246,0.9)" : "rgba(255,255,255,0.12)",
                        }} />
                    ))}
                  </div>
                </div>
              ))}
              {/* placeholder height so the relative container has height */}
              <div style={{ height: "clamp(12rem,28vh,22rem)" }} />
            </div>

            {/* Hint */}
            <p className="absolute bottom-6 left-8 font-body text-[10px] text-white/20 tracking-widest uppercase">
              Scroll to explore
            </p>
          </div>

          {/* Right — flag grid */}
          <div className="col-span-8 xl:col-span-9 p-5 overflow-hidden flex items-center">
            <div className="w-full" style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gap: "5px",
            }}>
              {countries.map((c, i) => {
                const isDisc = discovered.has(c.code);
                const isHov  = hovered === c.code;
                return (
                  <div
                    key={c.code}
                    ref={el => { flagRefs.current[i] = el; }}
                    className="relative overflow-hidden cursor-pointer"
                    style={{
                      aspectRatio: "4/3",
                      borderRadius: 6,
                      border: isDisc
                        ? "1.5px solid rgba(59,130,246,0.55)"
                        : isHov
                        ? "1.5px solid rgba(255,255,255,0.35)"
                        : "1.5px solid rgba(255,255,255,0.06)",
                      boxShadow: isDisc
                        ? "0 0 12px rgba(59,130,246,0.3)"
                        : isHov
                        ? "0 4px 20px rgba(0,0,0,0.6)"
                        : "none",
                      transform: isHov ? "scale(1.18)" : "scale(1)",
                      zIndex: isHov ? 10 : 1,
                      transition: "transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onClick={() => onToggle(c.code)}
                    onMouseEnter={() => onHover(c.code)}
                    onMouseLeave={() => onHover(null)}
                    title={c.name}
                  >
                    <img
                      src={`https://flagcdn.com/w160/${c.code}.png`}
                      alt={c.name}
                      draggable={false}
                      className="flag-img w-full h-full object-cover select-none pointer-events-none"
                      style={{
                        opacity: isDisc ? 1 : isHov ? 1 : 0.7,
                        filter: isHov ? "saturate(1.2) brightness(1.05)" : "saturate(0.85)",
                        transition: "opacity 0.2s, filter 0.2s",
                      }}
                    />
                    {/* Tooltip */}
                    {isHov && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-sm flex items-center justify-center py-0.5">
                        <span className="font-body font-semibold text-white text-[8px] leading-none px-1 truncate">{c.name}</span>
                      </div>
                    )}
                    {/* Discovered badge */}
                    {isDisc && (
                      <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center pointer-events-none shadow">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2 h-2">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Discovered count bar at bottom */}
        {discovered.size > 0 && (
          <div className="shrink-0 px-8 pb-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-0.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(discovered.size / countries.length) * 100}%` }} />
              </div>
              <span className="font-body text-xs text-white/30 shrink-0">
                {discovered.size} pinned
              </span>
              <button onClick={onReset}
                className="font-body text-xs text-white/20 hover:text-white/50 transition-colors">
                Reset
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

// ─── Flag Quiz ───────────────────────────────────────────────────────────────
const QUIZ_LENGTH = 10;

function FlagQuiz({ onClose }: { onClose: () => void }) {
  const [questions] = useState(() =>
    [...countries].sort(() => Math.random() - 0.5).slice(0, QUIZ_LENGTH)
  );
  const [idx, setIdx] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const buildChoices = useCallback((qIdx: number) => {
    const correct = questions[qIdx];
    const pool = countries.filter(c => c.code !== correct.code)
      .sort(() => Math.random() - 0.5).slice(0, 3);
    setChoices([...pool, correct].sort(() => Math.random() - 0.5).map(c => c.name));
  }, [questions]);

  useEffect(() => { buildChoices(0); }, [buildChoices]);

  const handleAnswer = (name: string) => {
    if (selected) return;
    setSelected(name);
    if (name === questions[idx].name) setScore(s => s + 1);

    // Animate card out, next question in
    if (cardRef.current) {
      gsap.to(cardRef.current, { opacity: 0, y: -20, duration: 0.35, ease: "power2.in", onComplete: () => {
        const nextIdx = idx + 1;
        if (nextIdx >= QUIZ_LENGTH) { setDone(true); return; }
        setIdx(nextIdx);
        setSelected(null);
        buildChoices(nextIdx);
        gsap.fromTo(cardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" });
      }});
    }
  };

  const currentQ = questions[idx];
  const pct = Math.round((score / QUIZ_LENGTH) * 100);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={onClose}>
      <div className="relative w-full max-w-md" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/50 hover:text-white text-sm font-body transition-colors">✕ Close</button>

        {done ? (
          <div className="rounded-3xl border border-white/10 bg-[#0a0a1a] p-10 flex flex-col items-center gap-6 text-center">
            <div className="text-6xl font-display font-black text-white">{score}<span className="text-white/30">/{QUIZ_LENGTH}</span></div>
            <div className="font-body text-gray-400 text-lg">
              {score >= 8 ? "🌍 Flag master! You know the world." : score >= 5 ? "🌐 Solid geography skills." : "📚 Time to explore more flags!"}
            </div>
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <button onClick={onClose} className="px-8 py-3 rounded-full bg-white text-black font-body font-semibold text-sm hover:scale-105 transition-transform">
              Back to Globe
            </button>
          </div>
        ) : (
          <div ref={cardRef} className="rounded-3xl border border-white/10 bg-[#0a0a1a] overflow-hidden">
            {/* Progress */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <span className="font-body text-xs text-white/40">{idx + 1} / {QUIZ_LENGTH}</span>
              <span className="font-display font-black text-white text-sm">{score} pts</span>
            </div>
            <div className="w-full h-[2px] bg-white/5">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((idx) / QUIZ_LENGTH) * 100}%` }} />
            </div>

            {/* Flag */}
            <div className="flex items-center justify-center p-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ width: 220, height: 147 }}>
                <img
                  key={currentQ.code}
                  src={`https://flagcdn.com/w320/${currentQ.code}.png`}
                  alt="Guess this flag"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Prompt */}
            <div className="text-center font-body text-sm text-white/40 -mt-4 mb-6 tracking-wide">Which country does this flag belong to?</div>

            {/* Choices */}
            <div className="grid grid-cols-2 gap-3 px-6 pb-6">
              {choices.map((name) => {
                const isCorrect = name === currentQ.name;
                const isSelected = name === selected;
                let cls = "px-4 py-3 rounded-2xl border font-body text-sm font-medium transition-all duration-300 text-left ";
                if (!selected) {
                  cls += "border-white/10 bg-white/[0.02] text-white hover:border-white/40 hover:bg-white/[0.06] cursor-pointer";
                } else if (isCorrect) {
                  cls += "border-green-500/60 bg-green-500/10 text-green-400";
                } else if (isSelected) {
                  cls += "border-red-500/60 bg-red-500/10 text-red-400";
                } else {
                  cls += "border-white/5 bg-white/[0.01] text-white/30";
                }
                return (
                  <button key={name} className={cls} onClick={() => handleAnswer(name)}>
                    {isSelected && isCorrect && <span className="mr-2">✓</span>}
                    {isSelected && !isCorrect && <span className="mr-2">✗</span>}
                    {!isSelected && isCorrect && selected && <span className="mr-2">✓</span>}
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  const [quizOpen, setQuizOpen] = useState(false);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleDiscover = (code: string) => {
    setDiscovered(prev => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code); else next.add(code);
      return next;
    });
  };

  const resetDiscovered = () => setDiscovered(new Set());

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    // Heading
    gsap.fromTo(headingRef.current, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
    });

    // Mission text word-by-word
    if (missionRef.current) {
      const words = Array.from(missionRef.current.querySelectorAll(".word-inner"));
      gsap.fromTo(words, { y: "110%", opacity: 0 }, {
        y: "0%", opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.02,
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      });
    }

    // Stats
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.querySelectorAll(".stat-card"), { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: statsRef.current, start: "top 90%" },
      });
    }

    // Reasons
    if (reasonsRef.current) {
      gsap.fromTo(reasonsRef.current.querySelectorAll(".reason-card"), { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: reasonsRef.current, start: "top 90%" },
      });
    }
  }, { scope: containerRef });

  // Word-by-word mission text
  const missionText = "Aurora is a global fully-online hackathon run exclusively by projectGRID, proudly partnered with IIIT Delhi. We bring together student builders, designers, and innovators from around the world to take ideas from zero to pitch-ready. No prior experience needed — just ambition and a problem worth solving.";

  return (
    <>
    <section
      ref={containerRef}
      className="relative w-full py-4xl px-xl bg-bg overflow-hidden"
    >
      {/* Cinematic Background - Grid + Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59,130,246,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      {/* Floating orbs */}
      <div className="absolute pointer-events-none opacity-40 z-0" style={{ width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", top: "-10%", left: "-10%", filter: "blur(100px)" }} />
      <div className="absolute pointer-events-none opacity-20 z-0" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", bottom: "10%", right: "-10%", filter: "blur(120px)" }} />

      {/* Section label + heading */}
      <div ref={headingRef} className="mb-3xl relative z-10">
        <h2 className="font-display font-bold text-[clamp(3rem,8vw,6rem)] text-white leading-[0.9] tracking-tighter max-w-[12ch]">
          The forge for <span className="text-white/50 about-gradient-span">future founders.</span>
        </h2>
      </div>

      {/* Grid wrapper for Mission and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl mb-4xl relative z-10 items-start">
        {/* Mission paragraph */}
        <div ref={missionRef} className="lg:col-span-5 flex flex-col gap-xl">
          <p className="font-body text-gray-300 font-light text-2xl leading-relaxed tracking-tight border-l-2 border-white/20 pl-8">
            {missionText.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
                <span className="word-inner inline-block">{word}</span>
              </span>
            ))}
          </p>

        </div>

        {/* Stats grid - More Editorial */}
        <div ref={statsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-sm">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card relative overflow-hidden rounded-3xl p-10 flex flex-col justify-end min-h-[220px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl transition-all duration-700 group cursor-default hover:border-white/40"
            >
              {/* White Border Beam Shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)]" />
              </div>
              <div className="absolute inset-[1px] rounded-[23px] bg-bg/95 z-0" />

              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/15 transition-colors duration-700" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors duration-500">
                    <StatIcon icon={stat.icon} />
                  </div>
                </div>
                <div className="font-display font-black text-6xl md:text-7xl text-white leading-none tracking-tighter flex items-center gap-1 group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                  {stat.prefix && <span className="text-base text-white/60 uppercase font-black tracking-widest mr-1 self-center">{stat.prefix}</span>}
                  <CountUp to={stat.to} from={0} duration={2.5} separator={stat.sep} className="tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                  <span className="text-white/60">{stat.suffix}</span>
                </div>
                <div className="mt-2 font-body text-[0.7rem] font-black text-gray-500 tracking-[0.3em] uppercase group-hover:text-white/60 transition-colors duration-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>

    {/* ── Flag story: OUTSIDE overflow-hidden section so pin works ── */}
    <FlagScrollStory
      countries={countries}
      discovered={discovered}
      hovered={hovered}
      onHover={setHovered}
      onToggle={toggleDiscover}
      onQuiz={() => setQuizOpen(true)}
      onReset={resetDiscovered}
    />

    {/* Quiz Modal */}
    {quizOpen && <FlagQuiz onClose={() => setQuizOpen(false)} />}

    {/* Why participate */}
    <div className="relative bg-bg px-xl py-4xl">
      <div className="font-body text-sm font-medium text-white/40 mb-xl">Why participate</div>
      <div ref={reasonsRef} className="grid grid-cols-1 md:grid-cols-2 gap-sm">
        {reasons.map((r, i) => (
          <div key={i} className="reason-card relative overflow-hidden rounded-[2.5rem] p-xl border border-white/5 bg-white/[0.01] backdrop-blur-3xl transition-all duration-500 group cursor-default hover:border-white/40 hover:bg-blue-500/[0.05]">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-500" />
            <div className="flex flex-col gap-lg relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-4xl text-white/5 group-hover:text-white transition-colors duration-500 italic px-2 py-1 rounded-xl bg-white/5 border border-white/5">
                  0{i + 1}
                </span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
                  <StatIcon icon={i === 0 ? "trophy" : i === 1 ? "ranking" : i === 2 ? "globe" : "users"} />
                </div>
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-white leading-tight mb-4 tracking-tight group-hover:tracking-normal transition-all duration-500">{r.title}</h3>
                <p className="font-body text-gray-400 font-light text-lg leading-relaxed max-w-[40ch]">{r.body}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all duration-700" />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
