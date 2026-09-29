'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Glass } from '@/components/ui/Glass';
import {
  ChevronLeft,
  ChevronRight,
  Move,
  Phone,
  Sparkles,
  MapPin,
  Calendar,
  Maximize2,
  Layers,
} from 'lucide-react';

// Lazy-load R3F 3D Canvas
const ProjectsCanvas = dynamic(
  () => import('@/components/canvas/projects/ProjectsCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-basalt-surface/50 rounded-[20px] border border-white/10">
        <span className="w-3 h-3 rounded-full bg-brass animate-ping mb-3" />
        <span className="font-mono text-xs uppercase tracking-widest text-smoke">
          Loading 3D Viewport...
        </span>
      </div>
    ),
  }
);

export interface ProjectData {
  id: string;
  name: string;
  area: string;
  location: string;
  style: string;
  year: string;
  tagline: string;
  description: string;
  features: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'villa-aurora',
    name: 'Villa Aurora',
    area: '1 Kanal (4,500 sq ft)',
    location: 'DHA Phase 6, Lahore',
    style: 'Floating Flat Roof, Walnut & Black Slate',
    year: '2026',
    tagline: 'Deep Cantilevers & Acoustic Pool',
    description:
      'A bespoke single-family estate defined by horizontal structural planes, walnut ceiling soffits, and a full-width reflecting pool that cools interior air currents.',
    features: ['Floating Flat Roof', 'Black Slate Cladding', 'Acoustic Reflecting Pool', 'Walnut Joinery'],
  },
  {
    id: 'noir-residence',
    name: 'Noir Residence',
    area: '2 Kanals (9,000 sq ft)',
    location: 'DHA Phase 8, Lahore',
    style: 'Brutalist Black Concrete with Brass Accent',
    year: '2026',
    tagline: 'Monolithic Massing & Internal Courtyard',
    description:
      'Cast-in-place pigmented black concrete monolithic volumes structured around a secluded inward-facing courtyard garden with an architectural brass accent tower.',
    features: ['Pigmented Black Concrete', 'Sculptural Brass Tower', 'Private Atrium Courtyard', 'Narrow Light Slits'],
  },
  {
    id: 'dune-house',
    name: 'Dune House',
    area: '1.5 Kanals (6,750 sq ft)',
    location: 'DHA Phase 5, Lahore',
    style: 'Sand Stucco with Arched Loggias & Roof Terrace',
    year: '2025',
    tagline: 'Warm Earth Textures & Shaded Colonnades',
    description:
      'Earthy sand-stucco villa integrating rhythmic Romanesque arches, deep thermal porticos, and an expansive rooftop sunset terrace sheltered by a timber pergola.',
    features: ['Textured Sand Stucco', 'Triad Arched Loggias', 'Rooftop Pergola Terrace', 'Integrated Planters'],
  },
  {
    id: 'lumen-penthouse',
    name: 'Lumen Penthouse',
    area: 'Full Floor (5,200 sq ft)',
    location: 'Gulberg, Lahore',
    style: 'Glass Tower Crown with Curved Panoramic Terrace',
    year: '2026',
    tagline: '360° Skyline Views & Sky Lounge',
    description:
      'High-rise crown residence featuring a continuous curved glass rotunda, cantilevered viewing deck, and architectural brass mullions framing panoramic urban horizons.',
    features: ['Curved Glass Rotunda', '360° Viewing Deck', 'High-Rise Steel & Brass', 'Skyline Illumination'],
  },
  {
    id: 'arc-pavilion',
    name: 'Arc Pavilion',
    area: '1 Kanal (4,500 sq ft)',
    location: 'Bahria Town, Lahore',
    style: 'Curved Sweeping Roof with Brass Arc Ribbon',
    year: '2025',
    tagline: 'Sculptural Vault & Reflecting Basin',
    description:
      'An iconic architectural pavilion sheltered under a parabolic sweeping roofline and banded by a gleaming brass architectural ribbon across a double-height glass volume.',
    features: ['Parabolic Sweeping Roof', 'Signature Brass Arc Ribbon', 'Double-Height Glass Salon', 'Stepped Water Basin'],
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisibleOnScreen, setIsVisibleOnScreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeProject = PROJECTS[activeIndex];

  // Lazy-load 3D scene when section nears viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisibleOnScreen(true);
        }
      },
      { rootMargin: '300px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const switchProject = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 280);
  };

  const handlePrev = () => {
    const prev = activeIndex === 0 ? PROJECTS.length - 1 : activeIndex - 1;
    switchProject(prev);
  };

  const handleNext = () => {
    const next = activeIndex === PROJECTS.length - 1 ? 0 : activeIndex + 1;
    switchProject(next);
  };

  const handleConsultationForHome = (projectName: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('arc-prefill-book', { detail: { project: projectName } })
      );
      const bookEl = document.getElementById('book');
      if (bookEl) {
        bookEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-28 px-4 sm:px-8 lg:px-12 bg-basalt overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brass/5 blur-[160px] rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brass/30 bg-brass/5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brass" />
              <span className="text-[10px] font-body tracking-[0.25em] uppercase text-brass-light font-medium">
                Portfolio Showcase
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone tracking-tight">
              Selected Work
            </h2>
          </div>

          <p className="font-body text-xs sm:text-sm text-smoke max-w-md font-light leading-relaxed">
            Explore five bespoke architectural residences rendered in interactive 3D. Drag to inspect geometries, material junctions, and daylight response.
          </p>
        </div>

        {/* Main Interactive Stage: Left/Bottom Project Tabs + Center 3D Viewer + Right Info Panel */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Project Selector List (Desktop 3 Cols, Mobile Horizontal Pills) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {PROJECTS.map((proj, idx) => {
              const isActive = activeIndex === idx;

              return (
                <button
                  key={proj.id}
                  onClick={() => switchProject(idx)}
                  className={`text-left p-4 rounded-[16px] transition-all duration-300 relative overflow-hidden flex-shrink-0 lg:flex-shrink w-64 lg:w-full border ${
                    isActive
                      ? 'bg-white/[0.08] border-brass/50 shadow-[0_4px_20px_rgba(201,163,107,0.15)]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest ${
                        isActive ? 'text-brass font-bold' : 'text-smoke'
                      }`}
                    >
                      0{idx + 1} • {proj.year}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
                    )}
                  </div>

                  <h4
                    className={`font-display text-lg sm:text-xl font-normal transition-colors leading-tight ${
                      isActive ? 'text-bone' : 'text-bone-muted'
                    }`}
                  >
                    {proj.name}
                  </h4>

                  <span className="block mt-1 font-body text-[11px] text-smoke truncate font-light">
                    {proj.location}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CENTER: Interactive 3D Turntable Viewer (Desktop 6 Cols) */}
          <div className="lg:col-span-6 relative flex flex-col min-h-[460px] sm:min-h-[560px]">
            <Glass
              variant="panel"
              className="relative w-full h-full !p-0 overflow-hidden border-brass/30 flex items-center justify-center bg-basalt-surface/70"
            >
              {/* Top Bar inside Viewer: Drag Hint & Carousel Controls */}
              <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-basalt/70 backdrop-blur-md border border-brass/25 text-[10px] font-body uppercase tracking-wider text-brass-light select-none">
                  <Move className="w-3.5 h-3.5 text-brass animate-pulse" />
                  <span>Drag to rotate • Scroll to zoom</span>
                </div>

                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Project"
                    className="p-2 rounded-full bg-basalt/70 hover:bg-basalt border border-white/10 hover:border-brass/40 text-bone hover:text-brass transition-colors backdrop-blur-md"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Project"
                    className="p-2 rounded-full bg-basalt/70 hover:bg-basalt border border-white/10 hover:border-brass/40 text-bone hover:text-brass transition-colors backdrop-blur-md"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* R3F 3D Viewport */}
              {isVisibleOnScreen && (
                <ProjectsCanvas
                  activeProjectIndex={activeIndex}
                  isTransitioning={isTransitioning}
                />
              )}

              {/* Bottom Tag inside Viewer */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-basalt/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-smoke">
                  Procedural R3F Model • {activeProject.name}
                </span>
              </div>
            </Glass>
          </div>

          {/* RIGHT: Glass Project Info Panel (Desktop 3 Cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <Glass
              variant="panel"
              className="w-full h-full !p-6 sm:!p-7 flex flex-col justify-between border-brass/25 backdrop-blur-xl shadow-xl"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="font-mono text-xs text-brass tracking-widest uppercase">
                    0{activeIndex + 1} / 05
                  </span>
                  <span className="font-body text-[10px] text-smoke uppercase tracking-wider">
                    {activeProject.location}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-bone font-normal leading-tight">
                  {activeProject.name}
                </h3>

                <p className="mt-1 font-body text-xs text-brass-light tracking-wide font-medium">
                  {activeProject.tagline}
                </p>

                <p className="mt-4 font-body text-xs sm:text-sm text-smoke-light font-light leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Specification Table */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-2.5 text-xs font-body">
                  <div className="flex items-center justify-between text-smoke">
                    <span className="flex items-center gap-1.5 font-light">
                      <Maximize2 className="w-3.5 h-3.5 text-brass/70" /> Area
                    </span>
                    <span className="text-bone-muted font-medium">{activeProject.area}</span>
                  </div>

                  <div className="flex items-center justify-between text-smoke">
                    <span className="flex items-center gap-1.5 font-light">
                      <MapPin className="w-3.5 h-3.5 text-brass/70" /> Location
                    </span>
                    <span className="text-bone-muted font-medium">{activeProject.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-smoke">
                    <span className="flex items-center gap-1.5 font-light">
                      <Layers className="w-3.5 h-3.5 text-brass/70" /> Architecture
                    </span>
                    <span className="text-bone-muted font-medium truncate max-w-[130px]" title={activeProject.style}>
                      {activeProject.style}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-smoke">
                    <span className="flex items-center gap-1.5 font-light">
                      <Calendar className="w-3.5 h-3.5 text-brass/70" /> Year Completed
                    </span>
                    <span className="text-bone-muted font-medium">{activeProject.year}</span>
                  </div>
                </div>

                {/* Key Architectural Features Chips */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {activeProject.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-2.5 py-1 rounded-md text-[10px] font-body bg-white/[0.04] text-bone-muted border border-white/5"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation Action Button */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleConsultationForHome(activeProject.name)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-body tracking-wider uppercase font-semibold text-basalt shadow-md hover:shadow-brass-glow transition-all duration-300 group cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
                  }}
                >
                  <Phone className="w-3.5 h-3.5 text-basalt" />
                  <span>Book for similar home</span>
                </button>
              </div>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
