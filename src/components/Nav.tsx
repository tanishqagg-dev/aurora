"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const nav = navRef.current;
    if (!nav) return;

    // Start hidden above viewport
    gsap.set(nav, { yPercent: -150, opacity: 0 });

    let visible = false;

    const showAnim = gsap.to(nav, {
      yPercent: 0,
      opacity: 1,
      duration: 0.55,
      ease: "power3.out",
      paused: true,
    });

    const hideAnim = gsap.to(nav, {
      yPercent: -150,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      paused: true,
    });

    const st = ScrollTrigger.create({
      start: "top-=100 top",
      end: "max",
      onUpdate: (self) => {
        const scrolled = self.scroll() > 100;
        if (scrolled && !visible) {
          visible = true;
          hideAnim.pause();
          showAnim.restart();
          gsap.to(nav, { backdropFilter: "blur(20px)", duration: 0.3 });
        } else if (!scrolled && visible) {
          visible = false;
          showAnim.pause();
          hideAnim.restart();
        }
      },
    });

    // Nav link underline micro-interactions
    const links = nav.querySelectorAll<HTMLElement>(".nav-link");
    const cleanups: Array<() => void> = [];

    links.forEach((link) => {
      const underline = link.querySelector<HTMLElement>(".nav-underline");
      if (!underline) return;

      const onEnter = () => {
        gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out", transformOrigin: "left" });
      };
      const onLeave = () => {
        gsap.to(underline, { scaleX: 0, duration: 0.2, ease: "power2.in", transformOrigin: "right" });
      };

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      st.kill();
      showAnim.kill();
      hideAnim.kill();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[9990] flex justify-center pointer-events-none w-full">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center gap-xl px-xl py-sm bg-surface-1 rounded-pill border border-border shadow-2xl"
        style={{ width: "fit-content" }}
      >
        {/* Left: logo */}
        <div className="font-display font-bold text-lg text-text whitespace-nowrap">AURORA</div>

        {/* Middle: links */}
        <div className="flex items-center gap-lg">
          {["About", "Stages", "Prizes", "Judges", "Sponsors"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link relative font-body text-sm font-medium text-text-2 hover:text-text transition-colors duration-200"
            >
              {link}
              <span
                className="nav-underline absolute -bottom-1 left-0 w-full h-[1px] bg-text block"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              />
            </a>
          ))}
        </div>

        {/* Right: theme toggle + Register */}
        <div className="flex items-center gap-sm">
          <ThemeToggle />
          <button className="btn-register px-lg py-sm rounded-pill bg-white hover:scale-[1.03] text-black font-body text-sm font-semibold transition-all duration-300 relative overflow-hidden group whitespace-nowrap">
            <span className="relative z-10 flex items-center gap-1">
              Register <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="register-hover-overlay absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>
      </nav>
    </div>
  );
}
