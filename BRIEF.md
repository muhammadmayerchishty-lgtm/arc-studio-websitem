# Arc Studio — Project Master Brief

## Brand Identity
- **Brand**: Arc Studio, Architecture & Interior Design, DHA Lahore
- **Logo**: A brass "A" with an elegant curved arc sweeping across it
- **Tagline**: "Spaces drawn with intent."

## Contact & Location
- **Phone / WhatsApp**: 0370 4921265 ([wa.me/923704921265](https://wa.me/923704921265))
- **Instagram**: [@mayeroutreach_1](https://instagram.com/mayeroutreach_1)
- **Location**: DHA, Lahore, Punjab, Pakistan

## Color Palette
- **Basalt (Dark Background)**: `#0d0c0b`
- **Bone (Primary Foreground / Text)**: `#ece4d6`
- **Brass (Accent / Identity)**: `#c9a36b`
- **Smoke (Secondary Text / Subtle Accent)**: `#8b8378`

## Typography
- **Display Font**: `Cormorant Garamond` (via `next/font/google`, variable font / serif)
- **Body Font**: `Manrope` (via `next/font/google`, variable font / sans-serif)

## Design System & Style
- **Aesthetic**: Apple-level ultra-premium, architectural restraint, glassmorphism
- **Glass Spec**:
  - Background Fill: `rgba(255, 255, 255, 0.06)`
  - Backdrop Blur: `24px`
  - Border: `1px solid rgba(201, 163, 107, 0.25)` (subtle brass rim)
  - Inner Highlight: `inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 20px 0 rgba(201, 163, 107, 0.03)`
  - Border Radius: `20px` (or `rounded-[20px]`)

## Motion & Animation
- **Primary Curve**: `cubic-bezier(0.22, 1, 0.36, 1)` applied universally across transitions and GSAP tweens
- **Accessibility**: Strictly honor `prefers-reduced-motion` across all animations, Three.js rotations, and scroll scrubs

## Asset Registry
- **Frames**: `/public/frames/{hero,interior,daynight,blueprint,aerial}/{4k,hd}/frame_0001.webp`
  - `hero` & `interior`: ~120 frames
  - `daynight`, `blueprint`, `aerial`: ~150 frames
- **Stills**: `/public/images/`
- **Video Reference**: `/public/arc studio .mp4`

## Core Rules & Constraints
1. **Never generate paid assets.**
2. If the `scroll-world` skill is installed, use **ONLY** its scroll-scrub engine patterns (lazy loading, seam crossfades, canvas/blob scrubbing).
3. **NEVER** run its Monid, Higgsfield, or Codex generation steps.
4. **DO NOT** modify, delete, or overwrite `/public/frames`, `/public/images`, or the `.mp4` file.

## Editable Copy & Milestone Stats (Configurable)
The following stat badges rendered in `DayNightSection.tsx` are marked as editable placeholders:
- **Stat 1**: `"Concept to handover: 40+ homes in DHA"` (Editable metric: change `40+ homes in DHA` to actual verified project count).
- **Stat 2**: `"Structure and interiors: one team"` (Editable metric: denotes unified in-house atelier practice).
- **Stat 3**: `"Turnkey delivery"` (Editable metric: denotes end-to-end realization from plot testing to furnishing).

## Implemented Architecture & Sections
- **Global Design Tokens & Layout**: `src/app/globals.css`, `src/app/layout.tsx` (Cormorant Garamond, Manrope, smooth scroll, cursor).
- **Core Components**:
  - `<Glass>`: Reusable glassmorphic container (`src/components/ui/Glass.tsx`).
  - `<TiltCard>`: 3D perspective card with cursor glare & CSS vars (`src/components/ui/TiltCard.tsx`).
  - `<ArcLogo>`: Precision SVG brass logo with curved arc (`src/components/ui/ArcLogo.tsx`).
  - `<Navbar>`: Floating glass navigation with WhatsApp pill (`src/components/layout/Navbar.tsx`).
  - `<SectionProgress>`: Right-edge scroll progress rail (`src/components/layout/SectionProgress.tsx`).
  - `<CustomCursor>`: Smooth desktop lerp cursor with ring expansion (`src/components/layout/CustomCursor.tsx`).
  - `<FilmGrain>`: 35mm architectural noise overlay (`src/components/canvas/FilmGrain.tsx`).
  - `<FrameSequence>`: Fullscreen high-DPR canvas scrub engine with tiered memory decoding & linear crossfades (`src/components/canvas/FrameSequence.tsx`).
- **Hero Section**: `src/components/sections/HeroSection.tsx` (100vh pinned, 300vh scroll, 120-frame "hero" sequence, per-word blur-in, bottom-left glass card, camera push dissolve).
- **Story Section**: `src/components/sections/StorySection.tsx` (100vh pinned, 400vh scroll, 150-frame "blueprint" sequence, "From a conversation to a building", 4 glass chapters with parallax & vertical brass progress rail).
- **DayNight Section**: `src/components/sections/DayNightSection.tsx` (100vh pinned, 350vh scroll, 150-frame "daynight" sequence, "Designed for every hour of light", dynamic solar dial, 3 sequential glass stat cards).
- **Services Section**: `src/components/sections/ServicesSection.tsx` (Dark background, 4 3D tilt cards with cursor glare: Architecture, Interior Design, Renovation, Commercial Fit-out).
