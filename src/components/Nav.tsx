"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = ["About", "Stages", "Prizes", "Judges", "Sponsors"];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const nav = navRef.current;
    if (!nav) return;

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
          setMenuOpen(false);
        }
      },
    });

    // Nav link underline micro-interactions (desktop only)
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

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-[9990] flex flex-col items-center pointer-events-none w-full px-4">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center gap-sm sm:gap-xl px-md sm:px-xl py-sm bg-surface-1 rounded-pill border border-border shadow-2xl w-full md:w-fit"
      >
        {/* Logo */}
        <div className="font-display font-bold text-lg text-text whitespace-nowrap flex-1 md:flex-none">AURORA</div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-lg">
          {navLinks.map((link) => (
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

        {/* Right side */}
        <div className="flex items-center gap-xs sm:gap-sm">
          <ThemeToggle />
          <button className="hidden sm:flex btn-register px-lg py-sm rounded-pill bg-white hover:scale-[1.03] text-black font-body text-sm font-semibold transition-all duration-300 relative overflow-hidden group whitespace-nowrap">
            <span className="relative z-10 flex items-center gap-1">
              Register <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="register-hover-overlay absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg hover:bg-white/10 transition-colors shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="pointer-events-auto md:hidden w-full mt-2 bg-surface-1 border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "500px" : "0px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col p-sm">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-body text-base font-medium text-text-2 hover:text-text py-sm px-md rounded-xl hover:bg-white/5 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <div className="border-t border-border mt-sm pt-sm">
            <button className="w-full py-sm rounded-pill bg-white text-black font-body text-sm font-semibold">
              Register on Devpost →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
