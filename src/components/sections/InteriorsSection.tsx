'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { FrameSequence } from '@/components/canvas/FrameSequence';
import { FilmGrain } from '@/components/canvas/FilmGrain';
import { Glass } from '@/components/ui/Glass';
import { Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  space: string;
  materials: string;
  description: string;
  priority?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'living',
    src: '/images/interior-living.jpg',
    alt: 'Arc Studio Living Room Interior — DHA Lahore',
    title: 'The Grand Salon',
    space: 'Double-Height Living & Hearth Space',
    materials: 'Materials: walnut, travertine, brass',
    description:
      'Proportioned around continuous vertical lines, acoustic timber louvers, and a flush basalt hearth that grounds the double-height volume.',
    priority: true, // Priority only for the first as requested
  },
  {
    id: 'bedroom',
    src: '/images/interior-bedroom.jpg',
    alt: 'Arc Studio Master Suite Interior — DHA Lahore',
    title: 'The Master Suite',
    space: 'Private Sanctuary & Dressing Quarters',
    materials: 'Materials: walnut, travertine, brass',
    description:
      'Warm indirect cove lighting, bookmatched vein-cut travertine vanities, and hand-rubbed brass hardware crafted specifically for this residence.',
    priority: false,
  },
];

function ZoomableGalleryCard({ item }: { item: GalleryItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const imgEl = imageRef.current;
    if (!container || !imgEl) return;

    // Scroll-driven zoom from 1.0 to 1.12
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        const scale = 1.0 + progress * 0.12; // 1.0 to 1.12
        gsap.set(imgEl, { scale });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative w-full h-[480px] sm:h-[540px] rounded-[20px] overflow-hidden border border-brass/25 bg-basalt-surface shadow-2xl transition-all duration-500 hover:border-brass/50"
    >
      {/* Zoomable Image Container */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-300 ease-out"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={item.priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/20 to-transparent pointer-events-none"
      />

      {/* Hover Reveal: "Materials: walnut, travertine, brass" */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-basalt/80 border border-brass/40 backdrop-blur-md shadow-xl opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Sparkles className="w-3.5 h-3.5 text-brass" />
          <span className="font-body text-xs text-brass-light font-medium tracking-wide">
            {item.materials}
          </span>
        </div>
      </div>

      {/* Glass Caption at Bottom */}
      <div className="absolute bottom-6 inset-x-6 z-20">
        <Glass
          variant="panel"
          className="!p-5 sm:!p-6 border-brass/30 backdrop-blur-xl bg-basalt/60 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-brass font-bold">
              {item.space}
            </span>
            <span className="text-[10px] font-body text-smoke uppercase tracking-wider">
              DHA Lahore
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-bone font-normal leading-tight">
            {item.title}
          </h3>

          <p className="mt-2 font-body text-xs sm:text-sm text-smoke-light font-light leading-relaxed">
            {item.description}
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-body">
            <span className="text-smoke font-light">Custom Millwork & Stone</span>
            <span className="inline-flex items-center gap-1 text-brass-light font-medium group-hover:underline">
              Inspect Materials <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Glass>
      </div>
    </div>
  );
}

export const InteriorsSection: React.FC = () => {
  return (
    <section id="interiors" className="relative w-full bg-basalt">
      {/* =========================================================================
          PINNED INTERIOR SEQUENCE (FrameSequence - 300vh)
         ========================================================================= */}
      <FrameSequence folder="interior" frameCount={120} pinLength="300vh">
        {({ progress }) => {
          // Fade UI as camera dives into interior sanctuary
          const fadeProgress = Math.min(1, Math.max(0, progress / 0.35));
          const opacity = Math.max(0, 1 - fadeProgress);
          const translateY = -fadeProgress * 30;

          return (
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
              {/* Cinematic 35mm film grain overlay */}
              <FilmGrain opacity={0.045} />

              {/* Atmospheric lighting gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-basalt/80 via-transparent to-basalt/60"
              />

              {/* Top Title: "Rooms that feel like home" */}
              <div
                className="relative z-20 mt-20 sm:mt-24 max-w-2xl transition-all duration-300 will-change-transform"
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0)`,
                  visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brass/30 bg-basalt/50 backdrop-blur-md mb-4">
                  <Eye className="w-3.5 h-3.5 text-brass" />
                  <span className="text-[10px] font-body tracking-[0.25em] uppercase text-brass-light font-medium">
                    Spatial Flow & Sanctuary
                  </span>
                </div>

                <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-bone tracking-tight leading-[1.08]">
                  Rooms that feel like{' '}
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brass-light via-brass to-brass-dark">
                    home.
                  </span>
                </h2>

                <p className="mt-4 font-body text-xs sm:text-sm text-smoke-light font-light leading-relaxed max-w-lg">
                  We conceive interiors from within the architectural frame—where light, noble timber, and tactile stone converge to create authentic emotional calm.
                </p>
              </div>

              {/* Pinned Bottom Ambient Glass Status */}
              <div
                className="relative z-20 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-body text-smoke transition-all duration-300"
                style={{ opacity }}
              >
                <span className="text-[10px] tracking-widest uppercase">
                  Interior Spatial Progression • 120 Frames
                </span>
                <span className="font-mono text-[11px] text-brass">
                  {Math.round(progress * 100)}% Through Sequence
                </span>
              </div>
            </div>
          );
        }}
      </FrameSequence>

      {/* =========================================================================
          GLASS GALLERY (Living & Bedroom with Scroll-driven Zoom)
         ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto py-28 px-4 sm:px-8 lg:px-12">
        <div className="w-full text-center max-w-2xl mx-auto mb-16">
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-brass font-medium">
            Tactile Curation
          </span>
          <h3 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-light text-bone tracking-tight">
            Crafted for Permanence
          </h3>
          <p className="mt-3 font-body text-xs sm:text-sm text-smoke font-light leading-relaxed">
            Hover each space to inspect raw noble materials. Every surface is sculpted for acoustic softness and tactile warmth.
          </p>
          <div className="mt-4 w-12 h-px bg-brass/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {GALLERY_ITEMS.map((item) => (
            <ZoomableGalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteriorsSection;
