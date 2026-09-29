'use client';

import React, { useState, useEffect } from 'react';
import { FrameSequence } from '@/components/canvas/FrameSequence';
import { FilmGrain } from '@/components/canvas/FilmGrain';
import { Glass } from '@/components/ui/Glass';
import { ArrowRight, Phone } from 'lucide-react';

const HEADLINE_WORDS = ['Spaces', 'drawn', 'with', 'intent.'];

export const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger per-word blur-in on mount
    const timer = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative w-full bg-basalt">
      <FrameSequence folder="hero" frameCount={120} pinLength="300vh">
        {({ progress, isReady }) => {
          // Fade and blur out UI as camera flies toward villa (0 -> 0.32 scroll progress)
          const fadeProgress = Math.min(1, Math.max(0, progress / 0.32));
          const opacity = Math.max(0, 1 - fadeProgress);
          const translateY = -fadeProgress * 40;
          const blur = fadeProgress * 12;

          return (
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12">
              {/* Cinematic 35mm film grain overlay */}
              <FilmGrain opacity={0.045} />

              {/* Ambient Vignette & Gradient Shadows for readibility */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-basalt/80 via-transparent to-basalt/40" 
              />
              <div 
                aria-hidden="true" 
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-basalt/60 via-transparent to-transparent" 
              />

              {/* Center-Top Title: "Spaces drawn with intent." */}
              <div
                className="relative z-20 mt-28 sm:mt-32 max-w-4xl transition-all duration-300 ease-out will-change-transform"
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0)`,
                  filter: `blur(${blur}px)`,
                  visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                }}
              >
                {/* Atelier Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brass/30 bg-basalt/50 backdrop-blur-md mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
                  <span className="text-[11px] font-body tracking-[0.25em] uppercase text-brass-light font-medium">
                    Architecture & Interiors • DHA Lahore
                  </span>
                </div>

                {/* Per-word blur-in Headline */}
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-bone font-light leading-[1.05]">
                  {HEADLINE_WORDS.map((word, idx) => {
                    const isAccent = word === 'intent.';
                    return (
                      <span
                        key={word}
                        className={`inline-block mr-3 sm:mr-5 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          mounted && isReady
                            ? 'opacity-100 blur-0 translate-y-0'
                            : 'opacity-0 blur-lg translate-y-6'
                        } ${
                          isAccent
                            ? 'italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brass-light via-brass to-brass-dark'
                            : ''
                        }`}
                        style={{
                          transitionDelay: `${idx * 160 + 200}ms`,
                        }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </h1>
              </div>

              {/* Bottom Row: Bottom-Left Pitch Card + Bottom-Right Thin Brass Scroll Indicator */}
              <div
                className="relative z-20 flex flex-col sm:flex-row items-end justify-between gap-8 pb-4 sm:pb-8 transition-all duration-300 ease-out will-change-transform"
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY * 0.75}px, 0)`,
                  filter: `blur(${blur * 0.8}px)`,
                  visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                }}
              >
                {/* Glass card bottom-left with pitch & two buttons */}
                <Glass
                  variant="panel"
                  className="w-full sm:max-w-md pointer-events-auto border-brass/25 !p-6 sm:!p-7 shadow-2xl backdrop-blur-2xl"
                >
                  <p className="font-body text-xs sm:text-sm text-bone-muted font-light leading-relaxed tracking-wide">
                    An architectural atelier in DHA Lahore crafting timeless residential estates through proportional geometry and noble materials.
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href="https://wa.me/923704921265"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body tracking-wider uppercase font-semibold text-basalt shadow-md hover:shadow-brass-glow transition-all duration-300 cursor-pointer group"
                      style={{
                        background: 'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
                      }}
                    >
                      <Phone className="w-3.5 h-3.5 text-basalt" />
                      <span>Book a consultation</span>
                    </a>

                    <Glass
                      as="a"
                      href="#projects"
                      variant="pill"
                      interactive={true}
                      className="text-xs font-body tracking-wider uppercase text-bone font-medium px-4 py-2 hover:text-brass transition-colors"
                    >
                      View projects
                    </Glass>
                  </div>
                </Glass>

                {/* "Scroll" indicator with thin brass line */}
                <div className="hidden sm:flex flex-col items-center gap-2.5 select-none pointer-events-auto">
                  <span className="text-[10px] font-body tracking-[0.35em] uppercase text-smoke">
                    Scroll
                  </span>
                  <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden rounded-full">
                    <div 
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-brass-light via-brass to-transparent animate-pulse rounded-full"
                      style={{ height: '70%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </FrameSequence>
    </section>
  );
};

export default HeroSection;
