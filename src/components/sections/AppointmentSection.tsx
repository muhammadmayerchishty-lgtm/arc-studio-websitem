'use client';

import React from 'react';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { Sparkles, Calendar } from 'lucide-react';

export const AppointmentSection: React.FC = () => {
  return (
    <section
      id="book"
      className="relative w-full py-28 px-4 sm:px-8 lg:px-12 bg-basalt overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brass/5 blur-[180px] rounded-full"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brass/30 bg-brass/5 mb-4">
          <Calendar className="w-3.5 h-3.5 text-brass" />
          <span className="text-[10px] font-body tracking-[0.25em] uppercase text-brass-light font-medium">
            Atelier Commissioning
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone tracking-tight">
          Book a consultation.
        </h2>

        <p className="mt-4 font-body text-xs sm:text-sm text-smoke-light font-light max-w-lg mx-auto leading-relaxed">
          Select your architectural requirements below. Our principal architects in DHA Lahore will review your plot parameters and schedule an in-person or virtual design consultation.
        </p>

        {/* Appointment Form with card-resize transition & success animation */}
        <div className="w-full mt-12">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
