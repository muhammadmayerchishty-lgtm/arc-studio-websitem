'use client';

import React from 'react';
import { FrameSequence } from '@/components/canvas/FrameSequence';
import { FilmGrain } from '@/components/canvas/FilmGrain';
import { Glass } from '@/components/ui/Glass';
import { Sun, Sunset, Moon, ShieldCheck, Users, Home, LucideIcon } from 'lucide-react';

interface StatCardConfig {
  id: string;
  badge: string;
  stat: string;
  subtext: string;
  icon: LucideIcon;
  start: number;
  peak: number;
  end: number;
}

// Editable placeholder stats noted in BRIEF.md
const STAT_CARDS: StatCardConfig[] = [
  {
    id: 'homes',
    badge: 'Portfolio Milestone',
    stat: '40+ homes in DHA',
    subtext: 'Concept to handover with disciplined architectural oversight.',
    icon: Home,
    start: 0.08,
    peak: 0.26,
    end: 0.42,
  },
  {
    id: 'team',
    badge: 'Integrated Practice',
    stat: 'Structure and interiors: one team',
    subtext: 'Eliminating the gap between structural concrete and bespoke millwork.',
    icon: Users,
    start: 0.42,
    peak: 0.58,
    end: 0.74,
  },
  {
    id: 'turnkey',
    badge: 'Frictionless Realization',
    stat: 'Turnkey delivery',
    subtext: 'Soil analysis, municipal permits, structural build, and custom joinery.',
    icon: ShieldCheck,
    start: 0.74,
    peak: 0.88,
    end: 0.98,
  },
];

export const DayNightSection: React.FC = () => {
  return (
    <section id="daynight" className="relative w-full bg-basalt">
      <FrameSequence folder="daynight" frameCount={150} pinLength="350vh">
        {({ progress }) => {
          // Dynamic time of day label based on sequence progress
          let timeLabel = '14:00 • Solar Peak';
          let TimeIcon = Sun;
          if (progress > 0.35 && progress <= 0.7) {
            timeLabel = '18:45 • Golden Hour';
            TimeIcon = Sunset;
          } else if (progress > 0.7) {
            timeLabel = '21:30 • Nocturnal Illumination';
            TimeIcon = Moon;
          }

          return (
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
              {/* Cinematic 35mm film grain overlay */}
              <FilmGrain opacity={0.045} />

              {/* Dynamic atmosphere ambient shading */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-basalt/85 via-transparent to-basalt/70"
              />

              {/* Top Header: Title & Solar Dial */}
              <div className="relative z-20 mt-20 sm:mt-24 flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-6xl mx-auto w-full">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brass/30 bg-basalt/50 backdrop-blur-md mb-3">
                    <TimeIcon className="w-3.5 h-3.5 text-brass animate-spin-slow" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-brass-light font-medium">
                      {timeLabel}
                    </span>
                  </div>

                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone tracking-tight leading-[1.1]">
                    Designed for every{' '}
                    <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brass-light via-brass to-brass-dark">
                      hour of light.
                    </span>
                  </h2>
                </div>

                <p className="font-body text-xs sm:text-sm text-smoke-light max-w-xs font-light leading-relaxed">
                  Natural sunlight is treated as a physical building material—proportioned through deep reveals, shading louvers, and warm nightfall illumination.
                </p>
              </div>

              {/* Center / Lower: Three Stat Cards appearing in turn */}
              <div className="relative z-20 w-full max-w-lg mx-auto flex items-center justify-center my-auto min-h-[170px] pointer-events-auto">
                {STAT_CARDS.map((card) => {
                  const Icon = card.icon;

                  let opacity = 0;
                  let translateY = 20;

                  if (progress >= card.start && progress <= card.end) {
                    if (progress < card.peak) {
                      const t = (progress - card.start) / (card.peak - card.start);
                      opacity = t;
                      translateY = (1 - t) * 18;
                    } else {
                      const t = (progress - card.peak) / (card.end - card.peak);
                      opacity = 1 - t;
                      translateY = -t * 18;
                    }
                  }

                  const isVisible = opacity > 0.01;

                  return (
                    <div
                      key={card.id}
                      className="absolute inset-x-0 flex justify-center transition-opacity duration-200"
                      style={{
                        opacity,
                        transform: `translate3d(0, ${translateY}px, 0)`,
                        visibility: isVisible ? 'visible' : 'hidden',
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                    >
                      <Glass
                        variant="panel"
                        className="w-full !p-6 sm:!p-7 border-brass/35 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                      >
                        {/* Top Row with Badge & Icon */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-brass/15 border border-brass/40 flex items-center justify-center text-brass">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-body text-[10px] tracking-widest uppercase text-brass-light font-medium">
                              {card.badge}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] text-smoke">
                            DHA Lahore
                          </span>
                        </div>

                        {/* Main Highlight Stat */}
                        <h3 className="font-display text-2xl sm:text-3xl text-bone font-normal leading-snug">
                          {card.stat}
                        </h3>

                        {/* Subtext description */}
                        <p className="mt-2 font-body text-xs sm:text-sm text-smoke-light font-light leading-relaxed">
                          {card.subtext}
                        </p>
                      </Glass>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Row: Day/Night Scrub Timeline Bar */}
              <div className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-4 border-t border-white/10 text-xs font-body text-smoke">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase">Sun Path Cycle</span>
                  <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px]">
                    <span className={progress <= 0.35 ? 'text-brass font-bold' : 'text-smoke/50'}>Day</span>
                    <span className="text-white/20">→</span>
                    <span className={progress > 0.35 && progress <= 0.7 ? 'text-brass font-bold' : 'text-smoke/50'}>Dusk</span>
                    <span className="text-white/20">→</span>
                    <span className={progress > 0.7 ? 'text-brass font-bold' : 'text-smoke/50'}>Night</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-24 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brass-light via-brass to-brass-dark rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-brass">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          );
        }}
      </FrameSequence>
    </section>
  );
};

export default DayNightSection;
