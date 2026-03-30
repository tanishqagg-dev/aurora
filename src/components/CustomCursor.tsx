"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Cursor state types ───────────────────────────────────────────────────────
type CursorState = "default" | "hover-action" | "hover-text" | "hover-heading" | "drag";

interface StateConfig {
  outerScale: number;
  innerScale: number;
  rotation: number;
  gap: number;          // arc gap in degrees
  arcOpacity: number;
  dotOpacity: number;
  ringColor: string;
  dotColor: string;
  labelOpacity: number;
}

const STATES: Record<CursorState, StateConfig> = {
  "default": {
    outerScale: 1, innerScale: 1, rotation: 0,
    gap: 22, arcOpacity: 0.55, dotOpacity: 1,
    ringColor: "rgba(255,255,255,0.8)", dotColor: "#3B82F6",
    labelOpacity: 0,
  },
  "hover-action": {
    outerScale: 0.72, innerScale: 1.6, rotation: 45,
    gap: 8, arcOpacity: 1, dotOpacity: 1,
    ringColor: "#3B82F6", dotColor: "#ffffff",
    labelOpacity: 1,
  },
  "hover-text": {
    outerScale: 0.5, innerScale: 0.4, rotation: 0,
    gap: 0, arcOpacity: 0, dotOpacity: 0.4,
    ringColor: "rgba(255,255,255,0.5)", dotColor: "rgba(255,255,255,0.5)",
    labelOpacity: 0,
  },
  "hover-heading": {
    outerScale: 1.6, innerScale: 0.5, rotation: -45,
    gap: 35, arcOpacity: 0.7, dotOpacity: 0.6,
    ringColor: "rgba(147,197,253,0.9)", dotColor: "rgba(147,197,253,0.9)",
    labelOpacity: 0,
  },
  "drag": {
    outerScale: 1.2, innerScale: 0.8, rotation: 0,
    gap: 15, arcOpacity: 0.9, dotOpacity: 1,
    ringColor: "rgba(255,255,255,0.9)", dotColor: "#3B82F6",
    labelOpacity: 0,
  },
};

// ─── SVG arc path helper ──────────────────────────────────────────────────────
function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

const SIZE = 56;
const CX = SIZE / 2;
const OUTER_R = 22;
const INNER_R = 4;

// 4 arc segments with gap
function buildArcs(gapDeg: number) {
  const segCount = 4;
  const segSpan = 90 - gapDeg;
  return Array.from({ length: segCount }, (_, i) => {
    const start = i * 90 + gapDeg / 2;
    const end = start + segSpan;
    return arcPath(CX, CX, OUTER_R, start, end);
  });
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const arcRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRef = useRef<SVGCircleElement>(null);
  const innerRingRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -200, y: -200 });
  const stateRef = useRef<CursorState>("default");
  const labelText = useRef("");

  // Idle spin tracker
  const spinTween = useRef<gsap.core.Tween | null>(null);
  const currentRotation = useRef(0);

  const applyState = (next: CursorState, label = "") => {
    if (stateRef.current === next && label === labelText.current) return;
    stateRef.current = next;
    labelText.current = label;

    const cfg = STATES[next];
    const ease = "expo.out";
    const dur = 0.45;

    // Kill idle spin when locking on
    if (next === "hover-action") {
      spinTween.current?.kill();
    } else if (next === "default") {
      // Resume idle spin from current rotation
      spinTween.current = gsap.to(svgRef.current, {
        rotation: currentRotation.current + 360,
        duration: 14,
        ease: "none",
        repeat: -1,
        onUpdate() {
          currentRotation.current = gsap.getProperty(svgRef.current, "rotation") as number;
        },
      });
    }

    // Arc paths
    const newArcs = buildArcs(cfg.gap);
    arcRefs.current.forEach((arc, i) => {
      if (!arc) return;
      arc.setAttribute("d", newArcs[i]);
      gsap.to(arc, { opacity: cfg.arcOpacity, stroke: cfg.ringColor, duration: dur, ease });
    });

    // Outer ring scale (transform on SVG)
    gsap.to(svgRef.current, {
      scale: cfg.outerScale,
      rotation: cfg.rotation + (next === "default" ? currentRotation.current : 0),
      duration: dur,
      ease,
    });

    // Inner dot
    gsap.to(dotRef.current, {
      attr: { r: INNER_R * cfg.innerScale },
      fill: cfg.dotColor,
      opacity: cfg.dotOpacity,
      duration: dur,
      ease,
    });

    // Inner ring
    gsap.to(innerRingRef.current, {
      attr: { r: INNER_R * cfg.innerScale + 3 },
      stroke: cfg.ringColor,
      opacity: cfg.arcOpacity * 0.4,
      duration: dur,
      ease,
    });

    // Label
    if (labelRef.current) {
      labelRef.current.textContent = label;
      gsap.to(labelRef.current, { opacity: cfg.labelOpacity, duration: 0.25 });
    }
  };

  useEffect(() => {
    if (!cursorRef.current || !svgRef.current) return;

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.12, ease: "power3.out" });

    // Start idle spin
    spinTween.current = gsap.to(svgRef.current, {
      rotation: 360,
      duration: 14,
      ease: "none",
      repeat: -1,
      onUpdate() {
        currentRotation.current = gsap.getProperty(svgRef.current, "rotation") as number;
      },
    });

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onDown = () => {
      gsap.to(cursorRef.current, { scale: 0.85, duration: 0.15, ease: "power3.out" });
    };
    const onUp = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" });
    };

    // ── Interaction detector ──────────────────────────────────────────────────
    const detectState = (e: MouseEvent): { state: CursorState; label: string } => {
      const el = e.target as HTMLElement;
      if (!el) return { state: "default", label: "" };

      const tag = el.tagName.toLowerCase();
      const role = el.getAttribute("role");

      // Buttons & links
      if (
        tag === "button" ||
        tag === "a" ||
        role === "button" ||
        el.closest("button, a, [role='button']")
      ) {
        const btn = el.closest("button, a, [role='button']") as HTMLElement | null;
        const label =
          btn?.dataset.cursorLabel ||
          btn?.getAttribute("aria-label") ||
          (btn?.textContent?.trim().slice(0, 18) ?? "");
        return { state: "hover-action", label };
      }

      // Headings
      if (["h1", "h2", "h3", "h4"].includes(tag) || el.closest("h1,h2,h3,h4")) {
        return { state: "hover-heading", label: "" };
      }

      // Body text / paragraphs
      if (["p", "span", "li", "label"].includes(tag) || el.closest("p, li, label")) {
        return { state: "hover-text", label: "" };
      }

      return { state: "default", label: "" };
    };

    const onOver = (e: MouseEvent) => {
      const { state, label } = detectState(e);
      applyState(state, label);
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || related === document.documentElement) {
        applyState("default");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      spinTween.current?.kill();
      document.documentElement.style.cursor = "auto";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultArcs = buildArcs(STATES.default.gap);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ width: SIZE, height: SIZE, transform: "translate(-200px, -200px)" }}
        aria-hidden="true"
      >
        {/* Target SVG */}
        <svg
          ref={svgRef}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          fill="none"
          style={{ overflow: "visible", transformOrigin: "center" }}
        >
          {/* Outer arcs (4 segments) */}
          {defaultArcs.map((d, i) => (
            <path
              key={i}
              ref={(el) => { arcRefs.current[i] = el; }}
              d={d}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={STATES.default.arcOpacity}
            />
          ))}

          {/* Inner pulse ring */}
          <circle
            ref={innerRingRef}
            cx={CX}
            cy={CX}
            r={INNER_R + 3}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            fill="none"
          />

          {/* Center dot */}
          <circle
            ref={dotRef}
            cx={CX}
            cy={CX}
            r={INNER_R}
            fill="#3B82F6"
            opacity={1}
          />
        </svg>

        {/* Hover label */}
        <div
          ref={labelRef}
          className="absolute left-1/2 font-body text-[10px] tracking-widest uppercase text-white/80 whitespace-nowrap pointer-events-none select-none"
          style={{
            opacity: 0,
            top: SIZE + 6,
            transform: "translateX(-50%)",
            textShadow: "0 0 12px rgba(59,130,246,0.8)",
          }}
        />
      </div>
    </>
  );
}
