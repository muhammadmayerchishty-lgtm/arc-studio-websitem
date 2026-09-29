'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { DayNightSection } from '@/components/sections/DayNightSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { InteriorsSection } from '@/components/sections/InteriorsSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { AppointmentSection } from '@/components/sections/AppointmentSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center w-full min-h-[100svh] overflow-x-hidden bg-basalt">
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
          08. APPOINTMENT SECTION (id="book" - Glass Consultation Commissioning)
         ========================================================================= */}
      <AppointmentSection />

      {/* =========================================================================
          09. CONTACT SECTION (id="contact" - Glass Cards + vCard Download)
         ========================================================================= */}
      <ContactSection />

      {/* =========================================================================
          10. FOOTER & BRAND CLOSE
         ========================================================================= */}
      <Footer />

      {/* =========================================================================
          11. PERSISTENT FLOATING WHATSAPP PILL (Bottom-Right Safe Insets)
         ========================================================================= */}
      <FloatingWhatsApp />
    </main>
  );
}
