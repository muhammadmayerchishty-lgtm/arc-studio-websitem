'use client';

import React from 'react';
import { TiltCard } from '@/components/ui/TiltCard';
import { Glass } from '@/components/ui/Glass';
import { Building2, Compass, Wrench, Briefcase, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'architecture',
    number: '01',
    title: 'Architecture',
    subtitle: 'Residential Estates & Sanctuaries',
    description:
      'Turnkey architectural design from blank plot to structural completion. We sculpt volumetric concrete forms, cantilevered rooflines, and daylight apertures proportioned specifically for Lahore’s climate.',
    deliverables: [
      'Plot Feasibility & Sun Path Analysis',
      'Cantilever & Structural Engineering',
      'DHA Municipal & Cantonment Approvals',
      'Façade Engineering & Fenestration',
    ],
    icon: Building2,
  },
  {
    id: 'interiors',
    number: '02',
    title: 'Interior Design',
    subtitle: 'Bespoke Environments & Millwork',
    description:
      'Interior spaces developed in seamless continuity with the building architecture. We design custom furniture pieces, concealed acoustic joinery, and procure rare stones and brushed brass accents.',
    deliverables: [
      'Spatial Planning & Flow Optimization',
      'Basalt, Brass & Timber Palettes',
      'Architectural Lighting Design',
      'Bespoke Fixed Cabinetry & Vanities',
    ],
    icon: Compass,
  },
  {
    id: 'renovation',
    number: '03',
    title: 'Renovation',
    subtitle: 'Estate Rejuvenation & Expansion',
    description:
      'Transforming existing residential structures into modern, open-concept masterpieces. We strip away compartmentalized layouts to introduce expansive double-height volumes and thermal efficiency.',
    deliverables: [
      'Structural Load-Bearing Alterations',
      'Façade Modernization & Glazing',
      'HVAC & Smart Infrastructure Overhaul',
      'Acoustic Ceiling & Wall Re-lining',
    ],
    icon: Wrench,
  },
  {
    id: 'commercial',
    number: '04',
    title: 'Commercial Fit-out',
    subtitle: 'Executive Headquarters & Boutiques',
    description:
      'Atmospheric corporate flagships, private wealth suites, and high-end retail spaces crafted with the same architectural restraint and luxury finish as private residences.',
    deliverables: [
      'Executive Boardrooms & Lounge Suites',
      'Acoustically Isolated Private Offices',
      'Bespoke Reception & Brand Portals',
      'Precision Commercial Joinery',
    ],
    icon: Briefcase,
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full py-32 px-6 sm:px-12 bg-basalt overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-brass/5 blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-smoke/5 blur-[140px] rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="w-full text-center max-w-2xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brass/30 bg-brass/5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-brass-light font-medium">
              Disciplines of Practice
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone tracking-tight">
            Integrated Design Services
          </h2>

          <p className="mt-4 font-body text-sm sm:text-base text-smoke font-light leading-relaxed">
            One cohesive team bridging structural architecture and bespoke interior realization across DHA Lahore.
          </p>

          <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-brass/50 to-transparent mx-auto" />
        </div>

        {/* 4 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;

            return (
              <div key={svc.id} className="min-h-[460px] sm:min-h-[490px]">
                <TiltCard maxTilt={10}>
                  {/* Card Header: Icon, Number, Title */}
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <div className="w-12 h-12 rounded-xl bg-brass/10 border border-brass/30 flex items-center justify-center text-brass shadow-inner">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-brass font-bold">
                        {svc.number}
                      </span>
                    </div>

                    <span className="block font-body text-[11px] tracking-[0.2em] uppercase text-brass-light font-medium mb-1">
                      {svc.subtitle}
                    </span>

                    <h3 className="font-display text-3xl sm:text-4xl text-bone font-light leading-tight">
                      {svc.title}
                    </h3>

                    <p className="mt-4 font-body text-xs sm:text-sm text-smoke-light font-light leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Card Deliverables & Footer Action */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <span className="block font-mono text-[10px] tracking-widest uppercase text-smoke mb-3">
                      Scope of Execution
                    </span>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {svc.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs font-body text-bone-muted font-light"
                        >
                          <span className="w-1 h-1 rounded-full bg-brass flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/923704921265"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-body tracking-wider uppercase text-brass hover:text-brass-light font-medium transition-colors group cursor-pointer"
                    >
                      <span>Inquire About {svc.title}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Glass Box */}
        <Glass
          variant="panel"
          className="mt-16 w-full max-w-4xl !p-8 sm:!p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-brass/25"
        >
          <div>
            <h4 className="font-display text-2xl text-bone font-light">
              Have a plot or property in DHA?
            </h4>
            <p className="mt-1 font-body text-xs sm:text-sm text-smoke font-light">
              We arrange an initial site walk and brief formulation with no commitment.
            </p>
          </div>

          <a
            href="https://wa.me/923704921265"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-body tracking-wider uppercase font-semibold text-basalt shadow-lg hover:shadow-brass-glow transition-all duration-300 flex-shrink-0 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
            }}
          >
            <span>Book Site Walk</span>
            <ArrowUpRight className="w-4 h-4 text-basalt" />
          </a>
        </Glass>
      </div>
    </section>
  );
};

export default ServicesSection;
