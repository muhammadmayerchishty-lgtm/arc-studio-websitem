'use client';

import React from 'react';
import { FrameSequence } from '@/components/canvas/FrameSequence';
import { FilmGrain } from '@/components/canvas/FilmGrain';
import { Glass } from '@/components/ui/Glass';
import { Headphones, PenTool, Box, Hammer, LucideIcon } from 'lucide-react';

interface Chapter {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  start: number;
  peak: number;
  end: number;
}

const CHAPTERS: Chapter[] = [
  {
    number: '01',
    title: 'Listen',
    tagline: 'Site Alignment & Discovery',
    description:
      'We walk your plot, meet your family or team, and write a brief you approve.',
    icon: Headphones,
    start: 0.04,
    peak: 0.16,
    end: 0.28,
  },
  {
    number: '02',
    title: 'Sketch',
    tagline: 'Proportion & Spatial Rhythm',
    description:
      'Concept plans and mood boards, revised with you until the layout feels right.',
    icon: PenTool,
    start: 0.28,
    peak: 0.4,
    end: 0.52,
  },
  {
    number: '03',
    title: 'Model',
    tagline: 'Hyper-Realistic 3D Simulation',
    description:
      'A full 3D walkthrough lets you see every room and material before we build.',
    icon: Box,
    start: 0.52,
    peak: 0.64,
    end: 0.76,
  },
  {
    number: '04',
    title: 'Build',
    tagline: 'Turnkey Architectural Delivery',
    description:
      'Our site team manages contractors, budgets and timelines through handover.',
    icon: Hammer,
    start: 0.76,
    peak: 0.88,
    end: 0.98,
  },
];

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative w-full bg-basalt">
      <FrameSequence folder="blueprint" frameCount={150} pinLength="400vh">
        {({ progress }) => {
          // Identify current active chapter index (0..3)
          let activeIndex = 0;
          for (let i = 0; i < CHAPTERS.length; i++) {
            if (progress >= CHAPTERS[i].start) {
              activeIndex = i;
            }
          }

          return (
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
              {/* Subtle 35mm film grain overlay */}
              <FilmGrain opacity={0.04} />

              {/* Atmospheric lighting & contrast vignettes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-gradient-to-b from-basalt/90 via-transparent to-basalt/90"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-basalt/70 via-transparent to-basalt/50"
              />

              {/* TOP HEADER: Intro Line */}
              <div className="relative z-20 mt-20 sm:mt-24 max-w-xl">
                <span className="font-body text-[11px] tracking-[0.3em] uppercase text-brass font-medium">
                  The Atelier Methodology
                </span>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-light text-bone tracking-tight">
                  From a conversation to a building.
                </h2>
                <div className="mt-3 w-16 h-px bg-gradient-to-r from-brass via-brass/50 to-transparent" />
              </div>

              {/* CENTER / DESKTOP LAYOUT: Left Progress Rail + Floating Glass Chapters */}
              <div className="relative z-20 w-full flex-1 flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
                {/* Vertical Brass Progress Rail (Desktop / Tablet) */}
                <div className="hidden md:flex flex-col items-start gap-4 select-none pointer-events-auto">
                  <div className="flex items-center gap-6">
                    {/* Continuous vertical brass progress bar */}
                    <div className="relative w-[2px] h-64 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-brass-light via-brass to-brass-dark transition-all duration-300 rounded-full"
                        style={{
                          height: `${Math.min(100, Math.max(0, progress * 105))}%`,
                        }}
                      />
                    </div>

                    {/* Step Nodes */}
                    <div className="flex flex-col justify-between h-64 py-1">
                      {CHAPTERS.map((ch, idx) => {
                        const isActive = activeIndex === idx;
                        const isPassed = progress >= ch.peak;

                        return (
                          <div
                            key={ch.number}
                            className="flex items-center gap-3 transition-all duration-300"
                          >
                            <span
                              className={`font-mono text-xs transition-colors duration-300 ${
                                isActive
                                  ? 'text-brass font-bold scale-110'
                                  : isPassed
                                  ? 'text-bone-muted'
                                  : 'text-smoke/60'
                              }`}
                            >
                              {ch.number}
                            </span>
                            <span
                              className={`font-body text-xs tracking-wider uppercase transition-colors duration-300 ${
                                isActive
                                  ? 'text-bone font-medium'
                                  : isPassed
                                  ? 'text-smoke-light'
                                  : 'text-smoke/40'
                              }`}
                            >
                              {ch.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Glass Chapter Cards Container */}
                <div className="relative w-full max-w-lg md:ml-auto h-72 sm:h-80 flex items-center justify-center pointer-events-auto">
                  {CHAPTERS.map((ch, idx) => {
                    const Icon = ch.icon;

                    // Calculate opacity and subtle parallax translateY
                    let opacity = 0;
                    let translateY = 30;

                    if (progress >= ch.start && progress <= ch.end) {
                      if (progress < ch.peak) {
                        // Fade in & slide up from below
                        const t = (progress - ch.start) / (ch.peak - ch.start);
                        opacity = t;
                        translateY = (1 - t) * 24;
                      } else {
                        // Fade out & slide subtly upward
                        const t = (progress - ch.peak) / (ch.end - ch.peak);
                        opacity = 1 - t;
                        translateY = -t * 24;
                      }
                    }

                    // Visibility optimization to avoid paint overhead
                    const isVisible = opacity > 0.01;

                    return (
                      <div
                        key={ch.number}
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                        style={{
                          opacity,
                          transform: `translate3d(0, ${translateY}px, 0)`,
                          visibility: isVisible ? 'visible' : 'hidden',
                          pointerEvents: isVisible ? 'auto' : 'none',
                        }}
                      >
                        <Glass
                          variant="panel"
                          className="w-full !p-6 sm:!p-8 border-brass/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-brass/15 border border-brass/35 flex items-center justify-center text-brass">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="block font-mono text-[10px] text-brass uppercase tracking-widest">
                                  Chapter {ch.number}
                                </span>
                                <h3 className="font-display text-2xl sm:text-3xl text-bone font-normal leading-tight">
                                  {ch.title}
                                </h3>
                              </div>
                            </div>

                            <span className="font-body text-[10px] uppercase tracking-widest text-smoke hidden sm:inline">
                              {ch.tagline}
                            </span>
                          </div>

                          {/* Card Body */}
                          <p className="font-body text-sm sm:text-base text-bone-muted font-light leading-relaxed">
                            {ch.description}
                          </p>

                          {/* Mobile Subtitle Tag */}
                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-body text-smoke">
                            <span className="sm:hidden tracking-wider uppercase text-brass-light">
                              {ch.tagline}
                            </span>
                            <span className="font-mono text-[10px] text-smoke-light ml-auto">
                              Stage {idx + 1} of 4
                            </span>
                          </div>
                        </Glass>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM FOOTER: Blueprint Sequence Legend & Scroll Progress */}
              <div className="relative z-20 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-body text-smoke">
                <span className="tracking-widest uppercase text-[10px]">
                  Architectural Drafting Protocol • DHA Lahore
                </span>
                <span className="font-mono text-[11px] text-brass/80">
                  {Math.round(progress * 100)}% Through Process
                </span>
              </div>
            </div>
          );
        }}
      </FrameSequence>
    </section>
  );
};

export default StorySection;
