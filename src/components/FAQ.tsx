"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const faqGroups = [
  {
    group: "ELIGIBILITY",
    items: [
      {
        q: "Who can participate?",
        a: "Aurora is open to everyone globally — university students, recent graduates (within 2 years), and independent builders. You must be 18 or older, or have parental consent, to receive prizes. Teams of up to 4 people are allowed; solo entries are welcome.",
      },
      {
        q: "Can international teams join?",
        a: "Absolutely. The entire hackathon, from Stage 1 to the final Shark Tank round, is fully online, so anyone can participate regardless of location.",
      },
      {
        q: "Can I enter solo?",
        a: "Yes. Solo entries are accepted and judged on the same criteria as teams. We encourage finding teammates via our Discord — the #find-a-team channel is active from the day registrations open.",
      },
      {
        q: "Is there a team size limit?",
        a: "Teams of 1 to 4 members are allowed. All members must be registered individually on Devpost and listed on the team submission before the Stage 1 deadline.",
      },
    ],
  },
  {
    group: "PROCESS",
    items: [
      {
        q: "Is it free to enter?",
        a: "Yes, participation in Aurora is completely free. We believe access to opportunity should not depend on ability to pay. Registration, all online stages, and the closing ceremony are free of charge.",
      },
      {
        q: "What do I submit at Stage 1?",
        a: "A pitch deck (max 10 slides), a 2-minute video explaining your idea and the problem you're solving, and a brief team profile on Devpost. No working product required at this stage.",
      },
      {
        q: "What do I submit at Stage 2?",
        a: "A working prototype or MVP, a GitHub repo or Figma link, an updated pitch deck, and a short written progress update. Judges are looking for real execution, not polish.",
      },
      {
        q: "How does shortlisting work?",
        a: "Stage 1: All submissions → 200 teams shortlisted by our review panel. Stage 2: 200 teams → 20 finalists selected by judges. Final ranking is determined by the live virtual Shark Tank pitch.",
      },
      {
        q: "When will we hear back after Stage 1?",
        a: "The Stage 1 shortlist of 200 teams will be announced on 27 April 2026 — ten days after the submission deadline. All teams will be notified via email and Devpost.",
      },
    ],
  },
  {
    group: "LOGISTICS",
    items: [
      {
        q: "Do I need to travel for the final?",
        a: "No travel is required! The Shark Tank round and closing ceremony are held 100% virtually on 18–21 May 2026.",
      },
      {
        q: "What happens after the hackathon?",
        a: "Top teams are invited into the projectGRID incubation program. All finalists receive sponsor perks, community access, and ongoing mentorship. The relationships built here tend to last much longer than the event.",
      },
      {
        q: "I have an idea but no team. Can I still register?",
        a: "Yes. Register individually on Devpost and join our Discord. The #find-a-team channel helps you connect with designers, engineers, and domain experts who are also looking for co-builders.",
      },
    ],
  },
];

export function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const iconRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const textRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current.querySelectorAll(".faq-group-label"), { x: -30, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.15,
      scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
    });
  }, { scope: containerRef });

  useEffect(() => {
    faqGroups.forEach((group) => {
      group.items.forEach((faq, i) => {
        const key = `${group.group}-${i}`;
        const content = contentRefs.current[key];
        const icon = iconRefs.current[key];
        const textEl = textRefs.current[key];
        if (!content || !icon || !textEl) return;

        if (openKey === key) {
          gsap.to(content, { height: "auto", duration: 0.35, ease: "expo.out" });
          gsap.to(icon, { rotation: 45, scale: 1.15, duration: 0.3, ease: "expo.out" });
          textEl.textContent = faq.a;
        } else {
          gsap.to(content, { height: 0, duration: 0.25, ease: "expo.out" });
          gsap.to(icon, { rotation: 0, scale: 1, duration: 0.25, ease: "expo.out" });
        }
      });
    });
  }, [openKey]);

  return (
    <section ref={containerRef} className="relative w-full py-3xl px-xl flex flex-col bg-bg overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2xl gap-md">
        <div>
          <div className="caption-text text-muted mb-sm">07 · FAQ</div>
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-text leading-none tracking-tight">
            Common questions
          </h2>
        </div>
        <p className="font-body text-text-2 font-light text-base max-w-[40ch] md:text-right">
          Anything not covered here? Ask in our Discord.
        </p>
      </div>

      <div className="flex flex-col gap-3xl relative z-10">
        {faqGroups.map((group) => (
          <div key={group.group}>
            <div className="faq-group-label caption-text text-white/40 mb-lg font-black tracking-[0.4em] text-[10px] uppercase">{group.group}</div>
            <div className="flex flex-col">
              {group.items.map((faq, i) => {
                const key = `${group.group}-${i}`;
                return (
                  <div key={key} className="w-full border-b border-white/5 py-sm group relative">
                    <button
                      onClick={() => setOpenKey(openKey === key ? null : key)}
                      className="w-full flex justify-between items-center text-left py-sm focus:outline-none"
                    >
                      <h3 className="font-display font-black text-xl leading-snug text-white/80 transition-all duration-300 group-hover:text-white pr-md tracking-tight group-hover:tracking-normal uppercase italic">
                        {faq.q}
                      </h3>
                      <div
                        ref={(el) => { iconRefs.current[key] = el; }}
                        className="text-white/40 text-2xl font-black flex items-center justify-center w-11 h-11 shrink-0 select-none group-hover:text-white transition-colors"
                      >
                        +
                      </div>
                    </button>

                    <div
                      ref={(el) => { contentRefs.current[key] = el; }}
                      className="overflow-hidden"
                      style={{ height: 0 }}
                    >
                      <p
                        ref={(el) => { textRefs.current[key] = el; }}
                        className="font-body text-gray-400 text-base leading-relaxed max-w-[68ch] pb-md pt-xs"
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
