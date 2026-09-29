'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { DayNightSection } from '@/components/sections/DayNightSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { InteriorsSection } from '@/components/sections/InteriorsSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { BookingForm } from '@/components/forms/BookingForm';
import { Glass } from '@/components/ui/Glass';
import { ArcLogo } from '@/components/ui/ArcLogo';
import { MapPin, Phone, Instagram } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center w-full min-h-screen overflow-x-hidden bg-basalt">
      {/* =========================================================================
          01. PINNED HERO SECTION (FrameSequence - 300vh)
         ========================================================================= */}
      <HeroSection />

      {/* =========================================================================
          02. PINNED STORY SECTION (Blueprint FrameSequence - 400vh)
         ========================================================================= */}
      <StorySection />

      {/* =========================================================================
          03. PINNED DAYNIGHT SECTION (Day/Night FrameSequence - 350vh)
         ========================================================================= */}
      <DayNightSection />

      {/* =========================================================================
          04. SERVICES SECTION (3D Tilt Cards)
         ========================================================================= */}
      <ServicesSection />

      {/* =========================================================================
          05. PROJECTS SECTION (5 Interactive 3D Houses)
         ========================================================================= */}
      <ProjectsSection />

      {/* =========================================================================
          06. PINNED INTERIORS SECTION (Interior FrameSequence - 300vh + Glass Gallery)
         ========================================================================= */}
      <InteriorsSection />

      {/* =========================================================================
          07. PINNED LOCATION SECTION (Aerial FrameSequence - 300vh + Dark Map)
         ========================================================================= */}
      <LocationSection />

      {/* =========================================================================
          08. BOOKING & CONSULTATION SECTION
         ========================================================================= */}
      <section
        id="book"
        className="w-full max-w-4xl mx-auto py-24 px-6 sm:px-12 flex flex-col items-center text-center"
      >
        <Glass variant="panel" className="w-full !p-8 sm:!p-14 border-brass/30">
          <div className="w-12 h-12 rounded-full bg-brass/15 border border-brass/40 flex items-center justify-center mx-auto mb-6 text-brass">
            <Phone className="w-6 h-6" />
          </div>

          <span className="font-body text-xs tracking-[0.3em] uppercase text-brass">
            Initiate Consultation
          </span>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-light text-bone">
            Commission Your Project
          </h2>

          <p className="mt-6 font-body text-sm sm:text-base text-smoke-light font-light max-w-xl mx-auto leading-relaxed">
            Our atelier accepts a strictly limited number of architectural commissions each year to ensure personal partner oversight from initial sketch to final turnkey delivery.
          </p>

          <BookingForm />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://wa.me/923704921265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-body tracking-[0.15em] uppercase font-semibold text-basalt shadow-lg hover:shadow-brass-glow transition-all duration-400 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
              }}
            >
              <Phone className="w-4 h-4 text-basalt" />
              <span>WhatsApp: 0370 4921265</span>
            </a>

            <a
              href="tel:03704921265"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-body tracking-[0.15em] uppercase text-bone border border-brass/30 bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            >
              <span>Call Direct</span>
            </a>
          </div>

          <p className="mt-8 font-body text-xs text-smoke">
            Atelier inquiries are typically answered within 2 hours.
          </p>
        </Glass>
      </section>

      {/* =========================================================================
          09. CONTACT & FOOTER SECTION
         ========================================================================= */}
      <footer
        id="contact"
        className="w-full max-w-6xl mx-auto pt-16 pb-20 px-6 sm:px-12 border-t border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 flex flex-col gap-4">
            <ArcLogo size={42} withText={true} />
            <p className="font-body text-sm text-smoke max-w-sm font-light mt-2 leading-relaxed">
              Spaces drawn with intent. An architecture and interior design studio crafting timeless private estates and residential masterworks in Lahore.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-body text-xs tracking-widest uppercase text-brass font-medium">
              Atelier Location
            </span>
            <div className="flex items-start gap-2.5 text-sm text-smoke-light font-body font-light">
              <MapPin className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
              <span>DHA, Lahore, Punjab, Pakistan</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-smoke-light font-body font-light mt-1">
              <Phone className="w-4 h-4 text-brass flex-shrink-0" />
              <a href="tel:03704921265" className="hover:text-bone transition-colors">
                0370 4921265
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-body text-xs tracking-widest uppercase text-brass font-medium">
              Digital Presence
            </span>
            <a
              href="https://instagram.com/mayeroutreach_1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-smoke-light hover:text-brass transition-colors font-body"
            >
              <Instagram className="w-4 h-4" />
              <span>@mayeroutreach_1</span>
            </a>
            <a
              href="https://wa.me/923704921265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-smoke-light hover:text-brass transition-colors font-body"
            >
              <span>WhatsApp Atelier Desk</span>
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-smoke">
          <p>© {new Date().getFullYear()} Arc Studio. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[10px]">
            DHA Lahore • Architecture & Interior Design
          </p>
        </div>
      </footer>
    </main>
  );
}
