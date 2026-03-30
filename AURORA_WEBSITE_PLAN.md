# AURORA GLOBAL HACKATHON 2026 — WEBSITE MASTER PLAN
### Crazy Parallax + GSAP Micro-interaction Bible
> Stack: Next.js 14 · TypeScript · Tailwind · GSAP 3.12 + ScrollTrigger + SplitText + MorphSVG + DrawSVG · Three.js · Lenis · Barba.js
> All dates: 2026. All animations are GSAP unless stated. All micro-interactions are listed per element.

---

## 0. GLOBAL SETUP (already in place — enforce everywhere)

```js
gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin, DrawSVGPlugin);
ScrollTrigger.normalizeScroll(true);

const lenis = new Lenis({ lerp: 0.08, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Custom Cursor (global)
- Default: 10px circle, `border: 1.5px solid var(--color-accent)`, `mix-blend-mode: difference`
- GSAP follower: 40px outer ring, `position: fixed`, lags 0.1s behind with `gsap.quickTo(cursor, "x/y", { duration: 0.4, ease: "power3" })`
- **Hover on any link/button:** outer ring scales to `2.4`, fills with `var(--color-accent-dim)`, label "text" swaps to contextual string ("ENTER", "VIEW", "REGISTER")
- **Hover on section headings:** outer ring morphs to a rectangle (MorphSVGPlugin: circle → rect), accent fill
- **Hover on cards:** cursor ring squishes to an oval (scaleX 1.8, scaleY 0.7), rotates 15deg
- **On scroll:** cursor opacity drops to 0.4 during fast scroll, back to 1 on stop
- **Drag/click:** cursor ring implodes to 0 scale then re-expands with bounce ease (`elastic.out(1, 0.3)`)

### Scroll Progress Bar
- 2px bar at very top of viewport, `background: linear-gradient(90deg, var(--color-accent), #A855F7, #EC4899)`
- GSAP `scaleX` scrubbed: `{ scaleX: 0 → 1, transformOrigin: "left", ease: "none", scrub: true }`
- Micro: pulses a 200ms glow on the leading edge every 3s with `gsap.to(bar, { boxShadow: "0 0 12px var(--color-accent)", yoyo: true, repeat: 1 })`

### Aurora Particle Canvas (Three.js — already exists, enhance)
- **Layer 1:** 2,000 point cloud in HSL aurora colors (greens, teals, purples), drifting via simplex noise
- **Layer 2:** 12 volumetric light beams (long quads), `opacity: 0.04–0.12`, gentle slow rotation
- **Parallax:** `camera.position.y` offset = `scrollY * 0.0003` (very subtle, adds depth)
- **Mouse parallax:** `camera.rotation.x/y += (mouseNorm * 0.02 - camera.rotation.x) * 0.05` per frame
- **On section enter:** beam colors shift hue by 60deg over 2s to match section accent color

---

## 1. INTRO ANIMATION (full-screen overlay — already exists, enhance)

### Sequence
```
Timeline tl = gsap.timeline();
```
1. **Black screen** → Aurora wordmark draws itself via DrawSVGPlugin: `{ drawSVG: "0% 0%" → "0% 100%", duration: 1.8, ease: "power2.inOut" }`
2. Stroke draw → fill flood via `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`, duration 0.6
3. AURORA letters: each char falls from y:-100%, stagger 0.04s, `elastic.out(1, 0.75)`
4. Tagline "Global Hackathon 2026" fades in word-by-word, stagger 0.06s
5. Particle burst: 80 tiny dots radiate from center, `gsap.to(each, { x: random(-300,300), y: random(-300,300), opacity: 0, duration: 1.2, ease: "power2.out", stagger: 0.01 })`
6. Whole overlay scales to 0.9, then `clip-path: inset(0 0 100% 0)` wipes upward, duration 0.7, `expo.inOut`
7. Page content fades in with `y: 60 → 0` stagger on sections

### Micro-interactions
- Letter hover during intro: individual char jiggles x: ±3px, `elastic.out(2,0.5)`, 200ms
- Logo pulsates with a corona glow: `box-shadow: 0 0 0px → 0 0 60px var(--color-accent)`, yoyo, 3x

---

## 2. NAV (already exists — CRAZY enhancements needed)

### Structure
```
[AURORA logo] ............. [About] [Stages] [Prizes] [Judges] [Sponsors] [Register →]
```

### Entrance
- On page load (after intro): nav slides in from `y: -100%`, `expo.out`, duration 0.9
- Each nav link reveals character by character via SplitText, stagger 0.03s from center outward

### Scroll behavior
- Transparent on hero → at scroll 80px: `background: rgba(bg, 0.85)` + `backdrop-filter: blur(20px)` + `border-bottom: 1px solid var(--color-border)` — GSAP `to`, duration 0.4
- Nav height: clamp from 80px → 56px as user scrolls 0–200px (scrub)
- At scroll > 400px: nav recedes (`y: -110%`, duration 0.3) on scroll DOWN, returns on UP — direction tracked via `lenis.direction`

### Micro-interactions (per nav link)
- Default: underline `scaleX: 0`, origin left
- Hover: `scaleX: 0 → 1`, duration 0.3, `power2.out`
- Unhover: `scaleX: 1 → 0`, origin right, duration 0.2
- Active section: underline blinks once then stays at `scaleX: 1`, accent color
- **"Register →" CTA:**
  - Background sweeps left→right with accent color on hover, text color inverts simultaneously
  - Arrow: `x: 0 → 4px` on hover, `elastic.out(3, 0.4)`
  - On click: button pulses `scale: 0.94 → 1`, `elastic.out(2, 0.5)`
- **Logo:**
  - Hover: letters scatter to random positions (SplitText chars, `x: random(-20,20), y: random(-10,10), rotation: random(-15,15)`), then reform after 400ms
  - Sub-hover: mini aurora shimmer sweeps across logo text (background-clip gradient animation)

### Mobile hamburger
- 3 lines → X: top line rotates +45deg, bottom -45deg, middle `scaleX: 0`, all `power2.inOut` 0.4s
- Menu panel: `clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)`, `expo.out` 0.6s
- Each menu item falls in from `y: 40, opacity: 0`, stagger 0.07s

---

## 3. HERO SECTION (already exists — upgrade to INSANE level)

### Layout
```
[sticky parallax Aurora particle canvas — full-screen]
[Centered: eyebrow | "AURORA" giant + glitch | tagline | stats row | CTA buttons]
[Mouse-parallax floating badge: "IIIT Delhi · May 2026"]
[Scroll indicator — animated arrow]
```

### GSAP Animations

**Title "AURORA" (SplitText, per-char):**
- Enter: each char `clip-path: inset(110% 0 0% 0) → inset(0% 0 0% 0)`, stagger 0.03s, `expo.out` 1.2s
- Continuous: subtle random micro-drift — each char on a slow individual timeline, `x: random(-1.5,1.5), y: random(-1,1)`, `sine.inOut`, duration random 3–6s, yoyo repeat -1
- Glitch: fires every 6–12s (random interval) — CSS clip-path glitch layers already built, add GSAP sequence: 5 quick frames, layerA shifts x:-4, layerB x:+3, each 40ms, then silence
- Scroll parallax: `scaleX: 1 → 1.08` + `y: 0 → -80px` scrubbed from `top top` to `center top`

**Tagline "Global Hackathon 2026 · 50+ Countries":**
- Enter: `y: 24, opacity: 0 → 1`, delay after title chars, `expo.out`
- Continuous: "50+ Countries" subtext — a small globe SVG next to it slowly rotates: `rotation: 0 → 360`, 20s, repeat -1, ease "none"

**Eyebrow label "ORGANISED BY PROJECTGRID × IIIT DELHI":**
- Enter: letters revealed one by one via SplitText, stagger 0.02s from left, `power3.out`
- Continuous: dot separator between sections blinks via `opacity: 1 → 0.2`, yoyo, 1.5s repeat -1

**Stats Row (7K–15K · 50+ Countries · Rs 20L · 200 Teams):**
- Enter: each stat card `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`, stagger 0.12s, `expo.out`
- Numbers: CountUp triggers on enter (already built)
- Hover on each stat: card lifts `y: -6px`, border color transitions to accent, number flickers ±1 quickly then settles

**CTA Buttons:**
- "Register Now" button:
  - Enter: `scale: 0 → 1`, `elastic.out(1, 0.6)`, after stats
  - Background: animated gradient wash shifts 0→360deg hue over 4s, repeat -1
  - Hover: border sweeps around perimeter (DrawSVG: `drawSVG: "0% 0%" → "0% 100%"`), 0.5s
  - Click: ripple burst from click point (canvas overlay, 3 expanding circles), `scale: 0→3, opacity: 1→0`, 0.6s
- "View Stages ↓" secondary:
  - Hover: arrow bounces `y: 3px` in loop, `sine.inOut`, 0.6s
  - Enter: `x: -20, opacity: 0 → 0 → 1`, delay after primary CTA

**Floating Badge "IIIT Delhi · May 2026 · Offline Final":**
- Hovers at 30% left, 75% top
- Mouse parallax: moves inverse to cursor at 15% speed (`gsap.quickTo` x/y)
- Continuous: gentle float animation `y: 0 → -8px`, `sine.inOut`, 2.5s, yoyo repeat -1
- Hover: badge rotates slightly (+3deg), scale 1.05, glow expands

**Scroll Indicator:**
- Arrow + "SCROLL" text rotated 90deg
- Arrow bounces y: 0→8px, `sine.inOut`, 1s yoyo repeat -1
- "SCROLL" text: letters wave individually via per-char y offset, stagger sine pattern
- Fades out at scroll > 100px

### Parallax Layers (ScrollTrigger scrub, trigger: hero, start: "top top", end: "bottom top")
| Layer | Element | Parallax amount |
|-------|---------|-----------------|
| -3 (slowest) | Aurora Three.js canvas | y: 0 → +60px |
| -2 | Giant title "AURORA" | y: 0 → -80px, scale 1→1.04 |
| -1 | Eyebrow + tagline | y: 0 → -40px |
| 0 | Stats row | y: 0 → -20px |
| +1 | CTA buttons | y: 0 → -10px |
| +2 (fastest) | Floating badge | y: 0 → -120px |

---

## 4. ABOUT SECTION (existing — MASSIVE upgrades)

### Layout
```
[Eyebrow: "01 · ABOUT AURORA"]
[Giant mission statement — word-wrap reveal already exists, enhance]
[Stats band — already exists with CountUp]
[4 reason cards grid — already exists, animate heavily]
[NEW: Full-width horizontal marquee of partner logos / countries]
```

### New GSAP Animations

**Mission text (word-by-word already built — enhance):**
- Each word has a progress bar under it that fills as the word enters viewport
- Words "fragmented", "structured", "iteration" — these key words: on reveal, the char pops scale: 1 → 1.15 → 1 with `elastic.out`, accent color for 800ms then fades back to normal color
- Whole paragraph: as user scrolls through it, a soft `background: linear-gradient(90deg, transparent → accent-dim)` travels left to right behind the text, perfectly synced to scroll position (scrub)

**Stats band:**
- Each stat number: on enter, it counts up rapidly then `overshoots by +200` → `settles back` to correct value (rubber band feel)
- After CountUp completes, `+` suffix char bounces: `y: -4 → 0`, `elastic.out`, 400ms
- Stat card on hover: background floods accent-dim from bottom: `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`, 0.3s, `power2.out`; number glows
- A thin line connects the 4 stat cards — DrawSVG draws the connector left-to-right as cards enter

**Reason cards (4-grid):**
- Enter: cards fly in from different directions — card1 from left, card2 from bottom, card3 from right, card4 from bottom-right. `x/y: ±80px, opacity: 0`, stagger 0.1s, `expo.out`
- Hover: card corner badge rotates 15deg, border changes from `--color-border` to accent
- Hover: background grid pattern on card (SVG dots) scales up subtly: `scale: 1 → 1.08`, `power2.out`
- Hover: title text each char shifts slightly on a random micro-jitter (SplitText, `x: random(-1,1)`, elastic)
- Card click/tap: expansion ripple (same as CTA click ripple) emanates from card center

**NEW Country Ticker Marquee:**
- Horizontal marquee: `display: flex`, `animation: marquee-scroll` via GSAP `x: 0 → -50%`, repeat -1, ease "none", 30s
- Contains: flag emoji + country name, for 20 representative countries from the 50+ reach
- On hover over marquee: `timeScale(0.2)` — slows to crawl, cursor changes to "PAUSE" label
- On unhover: `timeScale(1)` smooth speed-up
- Individual country chip hover: chip lifts `y: -4px`, accent border, country name swaps to local language momentarily then back

### Parallax
- Section background: subtle `y: 0 → +30px` on scroll (very slow, creates depth)
- Stats band: `y: 0 → -15px` relative to section scroll
- Reason cards: cards 1+3 move `y: -10px`, cards 2+4 move `y: +10px` over section scroll (staggered parallax)

---

## 5. TIMELINE SECTION (existing — INSANE overhaul)

### Layout
```
[Eyebrow: "02 · EVENT STAGES"]
[Stage cards: horizontal scroll on desktop, vertical on mobile]
[Timeline spine: SVG drawn path connecting all 5 stages]
[Each stage: number, name, badge, dates, description, deliverables, outcome]
```

### GSAP Animations

**Timeline Spine SVG (NEW — must build):**
- SVG path snaking through all 5 stage cards
- DrawSVGPlugin: path draws from left to right as user scrolls, perfectly scrubbed: `{ drawSVG: "0% 0%" → "0% 100%", ease: "none", scrub: 1 }`
- Path is not straight — it curves through each stage card like a circuit board trace
- At each stage node: a circle pulses `scale: 0 → 1.4 → 1`, `elastic.out`, when the draw reaches that point
- Color: starts at `--color-accent`, gradually shifts through `teal → pink` across the 5 nodes (gradient along path via multiple stroke segments)

**Stage Cards entrance (staggered per card):**
- Cards enter from alternating sides: odd cards from `x: -100px`, even cards from `x: +100px`, all `opacity: 0`
- Stagger: 0.15s per card, triggered by ScrollTrigger on the container
- `expo.out`, duration 0.9s

**Stage Card — per element micro-interactions:**
- Stage number (01–05): on card enter, number counts up from 00 in 400ms (quick CountUp)
- Badge pill ("OPEN NOW", "REMOTE", etc.):
  - Entry: `scale: 0 → 1`, `elastic.out(1.2, 0.5)`, 0.4s delay after card
  - Continuous pulse: "OPEN NOW" badge specifically pulses scale: 1 → 1.05 → 1, repeat -1, 2s `sine.inOut`
  - "LIVE" badge: a red dot blinks via `opacity: 1 → 0`, 0.8s repeat -1 (like a recording indicator)
- Date text: types itself with a typewriter effect (cursor blinks, chars appear one by one, 40ms per char) on card enter
- Deliverables list: each bullet point slides in from left, stagger 0.05s, after card main content loads
- Outcome text ("200 teams → 20 finalists"): the arrow `→` between the numbers animates: `x: -4 → 0`, `elastic.out`, repeat on hover
- Card expand on hover:
  - Card `height` expands to show full deliverables (GSAP `height: auto` via `autoAlpha`)
  - Vertical border on left goes from `scaleY: 0 → 1`, accent color, origin top
  - Card `box-shadow: 0 4px 40px var(--color-accent-glow)` sweeps in
  - Background: very subtle `background: var(--color-subtle)` fills from bottom
- Card click (mobile): card flips 3D (`rotateY: 0 → 180deg`) to show extended details on back

**Key Dates Strip (below stages):**
```
[Apr 17] — [Apr 27] — [May 4] — [May 9] — [May 18] — [May 21]
  Round 1    200 teams   Prototype   20 teams  Shark Tank  Closing
  Deadline   Shortlist   Deadline    Final      Live        IIIT Delhi
```
- Enter: dates tick up from blank to correct date (GSAP text scramble / number flip)
- Connecting line between dates: DrawSVG draws left to right as section scrolls into view
- Today's position (if before event): a `NOW →` indicator appears at correct date position, blinks
- Each date on hover: pops up a small card with details, `scale: 0.8 → 1, opacity: 0 → 1`, `expo.out`
- Past dates (after event): visually struck-through with a red DrawSVG line animating across the text

### Parallax
- Timeline spine SVG: `y: 0 → -20px` slow drift
- Stage cards: each card has a slightly different parallax rate (alternating `±5px`) to create non-flat feel
- Stage number overlays (giant ghost numbers behind cards): `y: 0 → -40px`, slowest layer

---

## 6. TRACKS SECTION (existing FlowingMenu — enhance heavily)

### Layout
```
[Eyebrow: "03 · COMPETITION TRACKS"]
[Subtitle: "Four tracks. One prize pool."]
[FlowingMenu marquee rows: Best Design · Best Innovation · Best Tech · Overall Winner]
[Below menu: track detail panel that morphs based on hovered track]
```

### GSAP Micro-interactions

**FlowingMenu rows (enhance existing):**
- Each row on hover: background image (SVG gradient) sweeps in from left, `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`, 0.4s `expo.out`
- Track name text: on row hover, letters scatter +5px y in wave pattern (SplitText stagger sine), then snap back
- Arrow icon: `x: -8 → 0`, opacity 0 → 1 on hover, `expo.out`
- Each row has a continuous slow scrolling marquee of the track name repeated (visible on hover only)

**Track Detail Panel (NEW component):**
- Below the FlowingMenu, a panel sits hidden (`height: 0, opacity: 0`)
- On track hover → panel reveals with `height: 0 → auto`, `opacity: 0 → 1`, `expo.out` 0.5s
- Panel morphs content between tracks: exit via `x: -30, opacity: 0 → 0`, enter new via `x: 30 → 0, opacity: 0 → 1`
- Panel contains: track name, prize amount, track description, who should apply
- Prize amount: does a quick flash CountUp on panel enter

**Background Accent (per track hover):**
- Page background subtly shifts hue to match track color: Design=pink, Innovation=teal, Tech=blue, Overall=gold
- GSAP: `gsap.to("body", { backgroundColor: trackColor + "08", duration: 0.6 })`

### Parallax
- Giant ghost track numbers ("01", "02", "03", "04"): positioned absolutely, `y: 0 → -60px` scrub, `opacity: 0.03`

---

## 7. PRIZES SECTION (existing — enhance confetti + cards)

### Layout
```
[Eyebrow: "04 · PRIZE POOL · Rs 20,00,000 TOTAL"]
[4 prize cards in a grid — already exists]
[Global perks accordion — already exists]
[Rs 20L total counter at bottom — NEW animated]
```

### GSAP Animations

**Section Enter — Rs 20L reveal:**
- Giant text "Rs 20,00,000" in the background: `scale: 0.5, opacity: 0 → 1, scale: 1`, `expo.out`, on section enter
- Then it blurs out and becomes a ghost behind the cards: `opacity: 1 → 0.04, blur: 0 → 20px`

**Prize Cards:**
- Enter: cards come in from bottom with extreme stagger (0.2s each), `y: 100 → 0, opacity: 0 → 1`, `expo.out`
- Grand Prize card enters LAST but with bigger animation: `scale: 0.8 → 1`, `elastic.out(1, 0.5)`
- Prize amount on card: starts at Rs 0, counts up to final value, `power2.out` 1.5s — NUMBER FLIPS using slot machine reveal (clip + translate)
- Card hover → confetti burst (already built) but add: card lifts `y: -12px`, rotates `3deg`, shadow grows, track badge spins 360deg `elastic.out`
- On hover: prize amount re-counts up quickly (300ms) as if re-confirming the number
- Card border on hover: DrawSVG traces the card perimeter in accent color over 0.6s

**Track badge (pill on each card):**
- Continuous rotate-hover: `rotation: -2 → 2 → -2`, `sine.inOut`, 3s repeat -1

**Perks accordion:**
- Expand: panel reveals `height: 0 → auto`, checkmarks next to perks draw in via DrawSVG (checkmark SVG, `drawSVG: "0% → 100%"`, stagger 0.08s)
- Each perk on hover: text shifts accent color, small star ✦ icon bounces next to it

**Rs 20L Total Counter (bottom banner — NEW):**
- Full-width dark banner: "TOTAL PRIZE POOL: Rs 20,00,000"
- Number scrolling: slot-machine style vertical digit flip, each digit in separate clip-overflow container
- GSAP: `y: 0 → -100%` per digit reveal, stagger each digit right to left (most significant first)
- Continuous: digits slightly flicker every 8s (2–3 frames of random digits, then settle) — like a live prize counter

### Parallax
- Cards 1+2 parallax up (`y: 0 → -15px`), cards 3+4 down (`y: 0 → +10px`) — gives floating 3D grid feel
- Ghost Rs amount behind: `y: 0 → +40px` (moves down slower than scroll — floats behind)

---

## 8. JUDGES / JURY SECTION (existing — cinematic card treatment)

### Layout
```
[Eyebrow: "05 · JUDGES & MENTORS"]
[Horizontal scroll carousel of judge cards on desktop]
[Vertical stack on mobile]
[Each card: photo area, name, title, org, expertise tags]
```

### GSAP Animations

**Horizontal Scroll (pin + scrub — NEW):**
- Pin the section for `n * 100vw` where n = number of judges
- GSAP: `gsap.to(judgesTrack, { x: -(totalWidth - viewportWidth), ease: "none", scrollTrigger: { pin: true, scrub: 1 } })`
- Left/right arrow buttons: also control via `lenis.scrollTo`

**Judge Card entrance:**
- As each card enters the horizontal viewport (via Observer or custom check): `scale: 0.85 → 1, opacity: 0.3 → 1`, `power2.out`
- Card in center of viewport: always at `scale: 1`; cards on edges: `scale: 0.9`; GSAP scrubs this continuously

**Per-card micro-interactions:**
- Photo area: black & white initially → on hover, saturation floods back: `filter: saturate(0) → saturate(1)`, 0.4s
- Photo hover: subtle `scale: 1.03`, parallax within card (inner image moves opposite direction to card: `y: -5 → +5px`)
- Name: on hover, each character bounces with slight stagger `y: -3 → 0`, `elastic.out`
- Title text: reveals via horizontal wipe on card enter: `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`, `expo.out`
- Expertise tags: enter staggered `scale: 0 → 1`, `elastic.out`, 0.1s stagger
- Tag hover: tag bounces, background floods with accent color
- "Connect" icon (LinkedIn): `rotation: 0 → 360`, `expo.out` 0.5s on hover
- Card hover → thin aurora gradient border animates all the way around perimeter (conic-gradient spinning)

**Progress indicator (horizontal scroll position):**
- Below the card track: a thin line with a fill that advances as user scrolls
- Active judge's dot indicator pulses

### Parallax (within horizontal scroll)
- Photo within card: moves `y: ±10px` opposite to scroll direction
- Card background gradients move at `x: ±5%` relative to card position

---

## 9. SPONSORS SECTION (existing — leveled up)

### Layout
```
[Eyebrow: "06 · SPONSORS & PARTNERS"]
[Subtitle + "Become a Founding Sponsor" CTA]
[Sponsor logos grid — existing]
[Sponsorship tier benefits rows — NEW]
["Get in touch" large CTA — NEW]
```

### GSAP Animations

**Logo Grid:**
- Logos enter from a grid scramble: each logo appears at a random grid position, then all snap to correct positions simultaneously — `gsap.timeline` with `from(each, { x: random(-200,200), y: random(-100,100), opacity: 0 })` then `to(all, { x:0, y:0, opacity:1, stagger: 0.04, ease: "expo.out" })`
- Each logo: black & white → color on hover (`filter: grayscale(1) → grayscale(0)`, `saturate(0) → saturate(1)`)
- Logo hover: gentle float `y: -4px`, `power2.out`; subtle drop shadow; scale 1.05
- Logo hover: background behind logo gets a soft accent glow `box-shadow: 0 0 20px var(--color-accent-glow)`
- "Founding Partner" badge on top 2–3 sponsor slots: small badge bounces in with `elastic.out` after logos load

**Sponsorship Benefits (NEW animated feature list):**
- Six benefit rows: "Brand visibility", "Award naming rights", "Stage presence", etc.
- Each row reveals like a terminal typing: text types in from left, 40ms per char
- Checkmark SVG next to each: DrawSVG draws the check on reveal, stagger 0.1s per row
- Row hover: row slides right `x: +8px`, accent left-border color transitions, `power2.out`

**"Become a Founding Sponsor" CTA:**
- Giant button, full width of the section on mobile
- Background: shifting aurora gradient (HSL hue cycles through aurora spectrum over 4s)
- Hover: gradient reverses direction, text size micro-increases `font-size → 1.03em`
- "→" arrow on button: on hover, arrow shoots off right and a new one enters from left: `x: 0 → 20px, opacity: 0` exit then new `x: -20px → 0, opacity: 0 → 1` enter
- Click: button implodes (`scale: 0.96`), then email client opens (or modal opens with contact form)

**Section background:**
- Faint grid (CSS `background-image: repeating-linear-gradient`), grid `opacity: 0 → 0.06` on section enter
- On mouse move: grid perspective subtly shifts (3D transform on grid overlay layer) — `perspective: 800px; rotateX: mouseY*0.02; rotateY: mouseX*0.02`

### Parallax
- Logo grid: `y: 0 → -20px` slow
- Giant ghost "SPONSORS" text behind grid: `y: 0 → +50px`, `opacity: 0.02`
- Benefits list: `x: 0 → -10px` (drifts slightly left on scroll)

---

## 10. INCUBATION PROGRAM SECTION (NEW — must build)

> This is a key differentiator from the doc. Must be its own section with premium feel.

### Layout
```
[Full-width section, dark background (--color-text) with light text for contrast]
[Eyebrow: "07 · INCUBATION PROGRAM"]
[Hero statement: "The Top 20 Teams Don't Just Win. They Begin."]
[4 program pillars in animated cards]
[Timeline of post-event support]
[Partners/logos carousel for incubation network]
```

### GSAP Animations

**Section Background Transition:**
- As section scrolls into view, background color transitions from white to near-black: `gsap.to("section", { backgroundColor: "#0A0A14", color: "#F8F8FA", duration: 1, ease: "none", scrollTrigger: { scrub: true } })`
- Aurora particle canvas hue shifts to deeper purples/greens on section enter

**Hero Statement:**
- SplitText by word: each word enters `y: 60px, opacity: 0 → 0 → 1, y: 0`, stagger 0.05s, `expo.out`
- Key phrase "Top 20 Teams": each char scaled up `1.1x` vs rest, accent color, enters with extra `elastic.out` bounce
- After full text loads: a thin accent underline DrawSVGs under "They Begin.", 0.6s

**4 Pillars Cards (Mentorship, Resources, Investor Intros, Market Strategy):**
- Enter: cards scale from `0.7 → 1`, `opacity: 0 → 1`, stagger 0.12s, `expo.out`
- Each card: an icon (SVG line-art) in the corner — DrawSVG draws the icon on card enter, `ease: "power2.inOut"`, 0.8s
- Hover: card border lights up (conic-gradient rotating continuously: `@keyframes border-spin` or GSAP `rotation` on gradient)
- Hover: background shifts from transparent to `rgba(accent, 0.06)`
- Hover: icon SVG pulses scale 1 → 1.15 → 1, `elastic.out`
- Hover: card expands to show extended description: `height: auto`, `expo.out`

**Post-event Support Timeline (horizontal):**
- Horizontal path with 4 milestones post May 2026: Week 1, Week 4, Week 8, Ongoing
- DrawSVG path draws left to right on section scroll
- Each milestone node: dot appears with `scale: 0 → 1`, `elastic.out`, plus label fades in from `opacity: 0, y: 10`
- Continuous: path color pulses gently, `opacity: 0.6 → 1 → 0.6`, 2s sine repeat -1

**"Join the Network" final CTA:**
- Morphing button: on hover, button rectangle morphs (MorphSVGPlugin) to a rounded pill, border animates
- Text: "Join the Network" → hover swaps char-by-char to "Apply Now" (SplitText stagger exit/enter)

### Parallax
- Background color transition creates natural depth
- Cards at different z-depths: card shadow grows as section is scrolled through
- Giant "2026" ghost text: `y: 0 → -60px`, `opacity: 0.02`, behind everything

---

## 11. FAQ SECTION (existing — upgrade interactions)

### Layout
```
[Eyebrow: "08 · FREQUENTLY ASKED"]
[Accordion list of questions]
[Floating "Still have questions?" CTA card]
```

### GSAP Animations

**FAQ Items enter:**
- Staggered reveal: each item `x: -30, opacity: 0 → 1, x: 0`, stagger 0.07s, `expo.out`, on section enter
- Left border accent line: `scaleY: 0 → 1` on item enter, `power2.out`

**Accordion expand/collapse (per item):**
- Question text hover: `x: +4px` shift right, `power2.out`, then back
- Open: panel `height: 0 → auto` via GSAP (not CSS), `expo.out` 0.5s; `+` icon `rotation: 0 → 45deg`, 0.3s
- Answer text: once panel is open, words reveal one by one `y: 10 → 0, opacity: 0 → 1`, stagger 0.025s per word
- Close: panel collapses `height → 0`, `expo.in` 0.35s; `+` `rotation: 45 → 0`
- Only one can be open (accordion behavior); closing old one triggers while new one opens: sequence via GSAP timeline
- Active item: left border changes from muted to accent color, `colorProps` or CSS var swap
- Background fill on active: `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`, very subtle `accent-dim` background

**Hover state for closed items:**
- Background floods from left: `clip-path: inset(0 100% 0 0 → 0 0 0 0)`, 0.25s `power2.out`
- Question mark `?` icon at far right: `scale: 0 → 1, opacity: 0 → 1` on hover, `elastic.out`

**"Still have questions" CTA card:**
- Gentle float: `y: 0 → -6px → 0`, `sine.inOut`, 3s repeat -1
- Mouse parallax: card follows cursor at 10% speed
- Hover: card border traces accent color (DrawSVG perimeter), 0.5s
- Email link: underline draws in from left on hover, `scaleX: 0 → 1`

### Parallax
- FAQ list: `x: 0 → -8px` very subtle drift
- Section heading: `y: 0 → -20px`

---

## 12. FOOTER (existing — enhance dramatically)

### Layout
```
[Full-screen sticky footer]
[Giant "AURORA 2026" text taking 40% of height]
[Nav links | Social links | Contact | Legal]
[Bottom bar: "© 2026 Aurora Organizing Committee × IIIT Delhi"]
[Animated background: persistent aurora canvas]
```

### GSAP Animations

**Footer Reveal (sticky scroll effect already in place — enhance):**
- As page scrolls to expose footer: giant "AURORA" text scales from `0.9 → 1` while `opacity: 0 → 1`, scrubbed
- Each letter of "AURORA 2026" enters from different angles: A from top-left, U from bottom, R from right, etc.

**Giant "AURORA 2026" text:**
- Continuous slow hue-shift on text fill: gradient `background-clip: text` cycling through aurora spectrum over 8s
- On mouse proximity: nearest characters magnetically attract toward cursor (SplitText each char, `gsap.quickTo` x/y with cursor proximity check per frame)
- Letters gently breathe: `scaleY: 1 → 1.01 → 1`, stagger across chars, `sine.inOut`, 4s

**Footer Nav links:**
- Enter: `y: 20, opacity: 0 → 1, y: 0`, stagger 0.05s, `expo.out`, triggered when footer fully visible
- Hover: underline draws in (scaleX 0→1), char-by-char color transition to accent

**Social icons:**
- Enter: `scale: 0, rotation: -180 → 1, rotation: 0`, stagger 0.1s, `elastic.out`
- Hover: continuous rotation `360deg`, `power2.inOut`, 0.5s; background floods in accent color

**Bottom divider line:**
- DrawSVG draws from center outward both ways on footer enter, `expo.out` 1s

**"Scroll to top" button (appears when user is in footer):**
- Small circle button, bottom-right
- Enter: `scale: 0 → 1`, `elastic.out` when footer in view
- Hover: inner arrow bounces `y: -3px`, `elastic.out` repeat
- Click: `lenis.scrollTo(0, { duration: 2, easing: (t) => 1 - Math.pow(1 - t, 5) })`
- Particle burst on click (same burst as hero CTA)

### Parallax
- Giant AURORA text: scrubbed with footer scroll, `scale: 0.9 → 1` as footer comes into view
- Background aurora canvas continues from hero (persistent Three.js scene)

---

## 13. FLOATING MICRO-INTERACTIONS (global, not section-specific)

### Magnetic Buttons
- All `<button>` and `<a class="btn">` elements: on mouse proximity within 80px, button drifts toward cursor
- `gsap.to(btn, { x: (cursorX - btnCenterX) * 0.3, y: (cursorY - btnCenterY) * 0.3, duration: 0.4, ease: "power2.out" })`
- On mouse leave: `gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" })` — snaps back with bounce

### Text Scramble on Hover
- Applicable to section numbers ("01", "02", etc.) and key labels
- On hover: rapid random char substitution (8 frames, 30ms each: chars flicker through A–Z/0–9), then resolves back to correct text
- GSAP: tick-based function, `gsap.ticker.add`, runs for 300ms total

### Page Transition (Barba.js)
- Leave: current page `opacity: 1 → 0, scale: 1 → 0.97`, `expo.in`, 0.4s; overlay wipes in from bottom `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`
- Enter: new page wipes in from top, then overlay clips away upward; content `opacity: 0 → 1, y: 30 → 0`, stagger on sections

### Shockwave on Click (already built — ensure everywhere)
- Every primary click emits expanding ring: `scale: 0 → 3, opacity: 0.4 → 0`, 0.6s `power2.out`
- Color matches nearest section's accent at time of click

### Selection Color
```css
::selection { background: var(--color-accent-dim); color: var(--color-accent); }
```

### Focus states (keyboard nav)
- All focused elements: `outline: 2px solid var(--color-accent); outline-offset: 3px`
- GSAP: `outline-offset: 3 → 6px`, `sine.inOut`, 0.8s yoyo repeat -1 when focused

---

## 14. PERFORMANCE RULES

1. **All ScrollTrigger instances**: use `invalidateOnRefresh: true` and `refreshPriority` ordering
2. **Three.js canvas**: render at `0.75 * devicePixelRatio` max; pause render when tab not visible (`document.visibilityState`)
3. **GSAP animations**: prefer `transform` and `opacity` only for GPU compositing. Never animate `width`, `height`, `top`, `left` — use `x`, `y`, `scale` equivalents
4. **SplitText**: always revert on resize (`splitInstance.revert()` then re-split)
5. **Lenis**: smooth scroll target `lerp: 0.08`, desktop only — disable on touch devices (`if (!isTouchDevice) new Lenis()`)
6. **Images**: all loaded with `next/image`, priority on hero image; lazy on all others
7. **GSAP context**: wrap all GSAP in `useGSAP(() => {...}, { scope: containerRef })` for Next.js cleanup

---

## 15. COMPONENT BUILD ORDER

Priority order for implementation:

1. ✅ **Global cursor** — affects every interaction, build first
2. ✅ **Nav** — always visible, must be perfect
3. ✅ **IntroAnimation** — first impression
4. 🔲 **Hero** — parallax layers + Three.js enhancements
5. 🔲 **Timeline** — SVG spine DrawSVG (most complex animation)
6. 🔲 **Incubation** — new section, build from scratch
7. 🔲 **Prizes** — slot machine counter
8. 🔲 **Judges** — horizontal pin-scroll
9. 🔲 **About** — country marquee + parallax cards
10. 🔲 **Tracks** — track detail panel
11. 🔲 **Sponsors** — benefits list + logo scramble
12. 🔲 **FAQ** — word-by-word answer reveal
13. 🔲 **Footer** — magnetic text + scroll-to-top

---

## 16. FULL PAGE SECTION ORDER

```
[IntroAnimation — overlay]
[Nav — sticky]
[Hero — #hero]
[About — #about]
[Timeline/Stages — #stages]
[Tracks — #tracks]
[Prizes — #prizes]
[Judges — #judges]
[Incubation Program — #incubation]  ← NEW
[Sponsors — #sponsors]
[Organizers — #organizers]
[FAQ — #faq]
[Footer — sticky bottom]
```

---

## 17. KEY CONTENT (CONFIRMED 2026 DATES)

| Event | Date |
|-------|------|
| Website + proposal live | End of March 2026 |
| Round 1 submission deadline | **17 April 2026** |
| 200 teams shortlist announced | **27 April 2026** |
| Prototyping phase deadline | **4 May 2026** |
| 20 finalists announced | **9 May 2026** |
| Shark Tank Round (live pitches) | **18 May 2026** |
| Closing Ceremony, IIIT Delhi | **21 May 2026** |

**Organizers:** Aurora Organizing Committee × IIIT Delhi
**Expected Participants:** 7,000–15,000
**Geographic Reach:** 50+ countries
**Prize Pool:** Rs 20,00,000
**Top 20 Teams:** All enrolled in Aurora Incubation Program

**Award Tracks:**
- Overall Winner (Grand Prize)
- Best Design
- Best Innovation
- Best Technology

**Contact:** taniaagg9910922265@gmail.com

---

*This plan is the ground truth for all development. Every component must reference this document before writing a line of code. All dates are 2026. All animations are GSAP-first. Zero placeholder content.*
