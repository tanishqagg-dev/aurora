"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const sdgIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export function Theme() {
  const containerRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    // Heading animation
    gsap.fromTo(containerRef.current.querySelector(".theme-heading"), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
    });

    // Marquee 1 (Left to Right)
    if (marquee1Ref.current) {
      gsap.to(marquee1Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
    }

    // Marquee 2 (Right to Left)
    if (marquee2Ref.current) {
      gsap.set(marquee2Ref.current, { xPercent: -50 });
      gsap.to(marquee2Ref.current, {
        xPercent: 0,
        repeat: -1,
        duration: 45,
        ease: "none",
      });
    }

    // Fade in the marquees
    gsap.fromTo([marquee1Ref.current, marquee2Ref.current], { opacity: 0, scale: 0.95 }, {
      opacity: 1, scale: 1, duration: 1.2, ease: "expo.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });

  }, { scope: containerRef });

  const getSdgUrl = (num: number) => `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${num < 10 ? `0${num}` : num}.jpg`;

  return (
    <section
      ref={containerRef}
      className="relative w-full py-4xl bg-bg overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-xl mb-xl text-center">
        <div className="theme-heading">
          <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-none tracking-tighter mb-lg">
            Build for global impact.<br />
            <span className="text-accent">The UN Sustainable Goals.</span>
          </h2>
          <p className="font-body text-gray-400 font-light text-lg max-w-[65ch] mx-auto leading-relaxed">
            Pick any of the 17 UN Sustainable Development Goals. Whether it's climate action, clean energy, or quality education — your project can help shape a better world.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex flex-col gap-md py-xl overflow-hidden pointer-events-none select-none">
        {/* Row 1 */}
        <div className="flex w-fit whitespace-nowrap gap-md" ref={marquee1Ref}>
          {[...sdgIndices, ...sdgIndices].map((num, i) => (
            <div key={i} className="flex-shrink-0 w-[240px] md:w-[320px] aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500">
               <img 
                 src={getSdgUrl(num)} 
                 alt={`SDG Goal ${num}`} 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-fit whitespace-nowrap gap-md invisible md:flex" ref={marquee2Ref}>
          {[...[...sdgIndices].reverse(), ...[...sdgIndices].reverse()].map((num, i) => (
            <div key={i} className="flex-shrink-0 w-[240px] md:w-[320px] aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500">
               <img 
                 src={getSdgUrl(num)} 
                 alt={`SDG Goal ${num}`} 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </div>
          ))}
        </div>

        {/* Horizontal Fades */}
        <div className="theme-fade-left absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-bg to-transparent z-20 pointer-events-none" />
        <div className="theme-fade-right absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-bg to-transparent z-20 pointer-events-none" />
      </div>

      <div className="relative z-10 mt-xl flex flex-col items-center">
        <button className="group relative px-xl py-lg bg-white/0 border border-white/20 rounded-full font-display font-medium text-white transition-all duration-500 hover:bg-white hover:text-black hover:border-white">
          <span className="relative z-10 flex items-center gap-sm">
            Explore the Full SDG Brief
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}

