'use client';

import React, { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
  number: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Intro', number: '01' },
  { id: 'story', label: 'Story', number: '02' },
  { id: 'daynight', label: 'Light', number: '03' },
  { id: 'services', label: 'Services', number: '04' },
  { id: 'projects', label: 'Projects', number: '05' },
  { id: 'interiors', label: 'Interiors', number: '06' },
  { id: 'location', label: 'Territory', number: '07' },
  { id: 'book', label: 'Consult', number: '08' },
  { id: 'contact', label: 'Contact', number: '09' },
];

export const SectionProgress: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall page scroll %
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Detect active section
      const sectionElements = SECTIONS.map((sec) => ({
        id: sec.id,
        el: document.getElementById(sec.id),
      }));

      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const top = item.el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Section Navigation"
      className="fixed right-5 sm:right-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      <div 
        className="flex flex-col items-center py-4 px-2 rounded-full relative"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(201, 163, 107, 0.2)',
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), 0 10px 25px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Subtle background rail line */}
        <div className="absolute top-6 bottom-6 w-[1px] bg-white/10" />

        {/* Dynamic brass scroll indicator track */}
        <div
          className="absolute top-6 w-[2px] bg-gradient-to-b from-brass-light via-brass to-brass-dark transition-all duration-300 rounded-full"
          style={{
            height: `${Math.max(0, (scrollProgress / 100) * 160)}px`,
            maxHeight: 'calc(100% - 48px)',
          }}
        />

        {/* Section Indicators */}
        <div className="relative z-10 flex flex-col items-center gap-5 my-1">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center justify-center p-1 focus:outline-none"
                aria-label={`Scroll to ${sec.label}`}
              >
                {/* Hover label tooltip floating on left */}
                <span className="pointer-events-none absolute right-7 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-widest font-body text-bone bg-basalt/90 border border-brass/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                  {sec.number} • {sec.label}
                </span>

                {/* Section Dot Indicator */}
                <div
                  className={`transition-all duration-400 rounded-full ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-brass shadow-[0_0_10px_rgba(201,163,107,0.8)] scale-110'
                      : 'w-1.5 h-1.5 bg-smoke/50 hover:bg-bone hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Numerical percentage badge below rail */}
      <span className="text-[10px] font-mono tracking-tighter text-smoke/70 pr-0.5">
        {Math.round(scrollProgress)}%
      </span>
    </aside>
  );
};

export default SectionProgress;
