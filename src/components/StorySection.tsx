"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const beats = [
  {
    kicker: "What it is",
    headline: "A global, fully-online\nhackathon.",
    body: "Aurora is a multi-stage student hackathon built around a single belief — that great ideas deserve a real stage. Open to any student, anywhere, at any level of experience.",
    tags: ["Multi-Stage", "Online", "Open to All"],
    stat: { value: "5", label: "Elimination Rounds" },
  },
  {
    kicker: "Who's behind it",
    headline: "Meet\nprojectGRID.",
    body: "An independent student initiative with zero institutional backing. No gatekeeping. No corporate filters. Just a team of builders who wanted to create something that actually matters to students.",
    tags: ["Student-Run", "Independent", "No Gatekeeping"],
    stat: { value: "100%", label: "Student Organised" },
  },
  {
    kicker: "Student-run. Entirely.",
    headline: "Built by students,\nfor students.",
    body: "Every track brief, every mentor pairing, every judging rubric — crafted by students who have shipped products, pitched to investors, and bombed demos. They know what you're going through.",
    tags: ["Peer Mentors", "Real Judges", "Student Leads"],
    stat: { value: "20+", label: "Student Organisers" },
  },
  {
    kicker: "The stakes",
    headline: "Real prizes.\nReal exposure.",
    body: "Winners walk away with cash prizes, sponsor partnership deals, incubation fast-track invites, and direct introductions to VCs. Aurora isn't a school project — it's a launchpad.",
    tags: ["Cash Prizes", "VC Introductions", "Incubation Offers"],
    stat: { value: "$5K+", label: "Prize Pool" },
  },
  {
    kicker: "The mission",
    headline: "From idea\nto impact.",
    body: "Aurora gives you the stage, the mentors, the tracks, the community, and the credibility. Four specialisation tracks. Twenty finalists. One global champion. You bring the ambition — we'll handle the rest.",
    tags: ["4 Tracks", "20 Finalists", "1 Champion"],
    stat: { value: "∞", label: "Potential" },
  },
];

// Per-beat scroll height (vh) — shorter = less scrolling per beat
const BEAT_VH = 85;

export function StorySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const beatsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: sticky,
        pinSpacing: false,
      });

      const total = beats.length;

      beatsRef.current.forEach((beat, i) => {
        if (!beat) return;

        const kicker  = beat.querySelector<HTMLElement>(".beat-kicker");
        const headline = beat.querySelector<HTMLElement>(".beat-headline");
        const body    = beat.querySelector<HTMLElement>(".beat-body");
        const line    = beat.querySelector<HTMLElement>(".beat-line");
        const tags    = beat.querySelectorAll<HTMLElement>(".beat-tag");
        const stat    = beat.querySelector<HTMLElement>(".beat-stat");

        const splitH = headline ? new SplitText(headline, { type: "lines,words" }) : null;
        const splitB = body     ? new SplitText(body,    { type: "words" })        : null;

        const segStart  = i / total;
        const segEnd    = (i + 1) / total;
        const midPoint  = (segStart + segEnd) / 2;
        const fadeIn    = segStart + (midPoint - segStart) * 0.18;
        const wordStart = segStart + (midPoint - segStart) * 0.35;
        const wordEnd   = midPoint + (segEnd   - midPoint) * 0.45;
        const fadeOut   = midPoint + (segEnd   - midPoint) * 0.65;

        // ── Entrance ──────────────────────────────────────────────────
        const entrances: { beat: gsap.TweenVars; lines: gsap.TweenVars }[] = [
          { beat: { opacity: 0, y: "10vh" },            lines: { y: "55%",  opacity: 0, stagger: 0.07 } },
          { beat: { opacity: 0, x: "28vw",  rotate: 2 }, lines: { x: "12%",  opacity: 0, stagger: 0.06 } },
          { beat: { opacity: 0, x: "-28vw", rotate: -2 },lines: { x: "-12%", opacity: 0, stagger: 0.06 } },
          { beat: { opacity: 0, scale: 1.35, filter: "blur(12px)" }, lines: { scale: 1.15, opacity: 0, stagger: 0.05 } },
          { beat: { opacity: 0, y: "-10vh", skewY: -3 }, lines: { y: "-35%", opacity: 0, stagger: 0.07 } },
        ];
        const entry = entrances[i] ?? entrances[0];

        gsap.set(beat, { opacity: 0, ...entry.beat });

        const inTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: () => `top+=${segStart * wrapper.offsetHeight} top`,
            end:   () => `top+=${fadeIn   * wrapper.offsetHeight} top`,
            scrub: true,
          },
        });

        inTl.to(beat, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, skewY: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" });
        if (line)           inTl.from(line, { scaleX: 0, duration: 0.4, ease: "power3.out" }, 0);
        if (kicker)         inTl.from(kicker, { opacity: 0, y: 8, duration: 0.3 }, 0.1);
        if (splitH?.lines)  inTl.from(splitH.lines, { ...entry.lines, duration: 0.5, ease: "power4.out" }, 0.1);
        if (stat)           inTl.from(stat, { opacity: 0, y: 16, duration: 0.35 }, 0.25);
        if (tags.length)    inTl.from(tags, { opacity: 0, y: 10, stagger: 0.08, duration: 0.3 }, 0.3);

        // ── Word-by-word body illumination (scrub) ────────────────────
        if (splitB?.words?.length) {
          // Set all words dim at start of active window
          gsap.set(splitB.words, { color: "rgba(255,255,255,0.15)" });

          const wordTl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: () => `top+=${wordStart * wrapper.offsetHeight} top`,
              end:   () => `top+=${wordEnd   * wrapper.offsetHeight} top`,
              scrub: 1.2,
            },
          });

          wordTl.to(splitB.words, {
            color: "rgba(255,255,255,0.75)",
            stagger: { each: 0.06, from: "start" },
            ease: "none",
          });
        }

        // ── Exit ──────────────────────────────────────────────────────
        if (i < total - 1) {
          const exits: gsap.TweenVars[] = [
            { opacity: 0, x: "-38vw", rotate: -3, duration: 1 },
            { opacity: 0, x: "38vw",  rotate:  3, duration: 1 },
            { opacity: 0, scale: 0.62, filter: "blur(10px)", duration: 1 },
            { opacity: 0, y: "-32vh", skewY: 4, duration: 1 },
          ];

          const outTl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: () => `top+=${fadeOut * wrapper.offsetHeight} top`,
              end:   () => `top+=${segEnd  * wrapper.offsetHeight} top`,
              scrub: true,
            },
          });
          outTl.to(beat, exits[i] ?? { opacity: 0, y: -30, duration: 1 });
        }
      });

      return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${beats.length * BEAT_VH}vh` }}
      className="relative"
    >
      <div
        ref={stickyRef}
        className="w-full h-screen flex items-center justify-center overflow-hidden bg-bg"
        style={{ position: "sticky", top: 0 }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />

        {beats.map((beat, i) => (
          <div
            key={i}
            ref={(el) => { beatsRef.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: 0 }}
          >
            {/* Kicker */}
            {beat.kicker && (
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="beat-line block h-px bg-blue-500/60"
                  style={{ width: "40px", transformOrigin: "left center" }}
                />
                <span className="beat-kicker font-body text-xs tracking-[0.22em] uppercase text-blue-400/80">
                  {beat.kicker}
                </span>
              </div>
            )}

            {/* Stat — above headline */}
            {beat.stat && (
              <div className="beat-stat flex items-baseline gap-2 mb-4">
                <span className="font-display font-black text-5xl md:text-6xl text-white/90 tracking-tighter tabular-nums">
                  {beat.stat.value}
                </span>
                <span className="font-body text-xs text-white/35 uppercase tracking-widest">
                  {beat.stat.label}
                </span>
              </div>
            )}

            {/* Headline */}
            <h2
              className="beat-headline font-display font-black text-white leading-[1.0] tracking-tighter whitespace-pre-line"
              style={{
                fontSize:
                  beat.headline.replace(/\n/g, "").length < 14
                    ? "clamp(4rem, 11vw, 11rem)"
                    : "clamp(2.8rem, 7vw, 8rem)",
              }}
            >
              {beat.headline}
            </h2>

            {/* Body — words animate on scroll */}
            {beat.body && (
              <p className="beat-body font-body text-lg md:text-xl max-w-[44ch] font-light leading-relaxed mt-7">
                {beat.body}
              </p>
            )}

            {/* Tags */}
            {beat.tags && (
              <div className="flex flex-wrap justify-center gap-2 mt-7">
                {beat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="beat-tag font-body text-xs font-medium tracking-wide text-white/50 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
