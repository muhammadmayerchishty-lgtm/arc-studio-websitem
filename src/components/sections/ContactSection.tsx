'use client';

import React from 'react';
import { Glass } from '@/components/ui/Glass';
import {
  Phone,
  MessageSquare,
  Instagram,
  MapPin,
  Clock,
  Download,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const downloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Studio;Arc;;;',
      'FN:Arc Studio',
      'ORG:Arc Studio Architecture & Interior Design',
      'TITLE:Principal Architectural Atelier',
      'TEL;TYPE=WORK,VOICE:+923704921265',
      'TEL;TYPE=CELL,WHATSAPP:+923704921265',
      'ADR;TYPE=WORK:;;DHA;Lahore;Punjab;;Pakistan',
      'URL:https://instagram.com/mayeroutreach_1',
      'NOTE:Spaces drawn with intent. Architecture & Interior Design Atelier in DHA Lahore.',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Arc-Studio-Lahore.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-4 sm:px-8 lg:px-12 bg-basalt overflow-hidden border-t border-white/5"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-brass/5 blur-[180px] rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="w-full text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brass/30 bg-brass/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span className="text-[10px] font-body tracking-[0.25em] uppercase text-brass-light font-medium">
              Direct Atelier Connections
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-bone tracking-tight">
            Contact the Atelier
          </h2>
          <p className="mt-4 font-body text-xs sm:text-sm text-smoke-light font-light leading-relaxed">
            Whether inquiring about plot viability, commissioning a new estate, or arranging an atelier visit in DHA Lahore, our partners are directly accessible.
          </p>
        </div>

        {/* Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Card 1: Direct Phone Call */}
          <Glass
            variant="panel"
            className="!p-7 flex flex-col justify-between border-brass/25 hover:border-brass/50 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brass/10 border border-brass/30 flex items-center justify-center text-brass mb-6 group-hover:scale-105 transition-transform duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass">
                Voice Telephone
              </span>
              <h3 className="font-display text-2xl text-bone mt-2 font-normal">
                0370 4921265
              </h3>
              <p className="mt-2 text-xs font-body text-smoke-light font-light leading-relaxed">
                Direct atelier line for urgent client inquiries and structural partner coordination.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href="tel:+923704921265"
                className="inline-flex items-center gap-2 text-xs font-body text-brass-light hover:text-bone font-medium tracking-wide transition-colors"
              >
                <span>Call +92 370 4921265</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Glass>

          {/* Card 2: WhatsApp Desk */}
          <Glass
            variant="panel"
            className="!p-7 flex flex-col justify-between border-brass/25 hover:border-brass/50 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-6 group-hover:scale-105 transition-transform duration-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#25D366]">
                WhatsApp Atelier
              </span>
              <h3 className="font-display text-2xl text-bone mt-2 font-normal">
                Instant Chat Desk
              </h3>
              <p className="mt-2 text-xs font-body text-smoke-light font-light leading-relaxed">
                Send blueprints, site photographs, or plot dimensions for immediate feedback within 2 hours.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href="https://wa.me/923704921265"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-body text-[#25D366] hover:text-[#52e78c] font-medium tracking-wide transition-colors"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Glass>

          {/* Card 3: Instagram Atelier */}
          <Glass
            variant="panel"
            className="!p-7 flex flex-col justify-between border-brass/25 hover:border-brass/50 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brass/10 border border-brass/30 flex items-center justify-center text-brass mb-6 group-hover:scale-105 transition-transform duration-300">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass">
                Visual Atelier Journal
              </span>
              <h3 className="font-display text-2xl text-bone mt-2 font-normal">
                @mayeroutreach_1
              </h3>
              <p className="mt-2 text-xs font-body text-smoke-light font-light leading-relaxed">
                Behind-the-scenes structural pours, material mockups, and client walkthroughs in Lahore.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href="https://instagram.com/mayeroutreach_1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-body text-brass-light hover:text-bone font-medium tracking-wide transition-colors"
              >
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Glass>

          {/* Card 4: Location */}
          <Glass
            variant="panel"
            className="!p-7 flex flex-col justify-between border-brass/25 hover:border-brass/50 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brass/10 border border-brass/30 flex items-center justify-center text-brass mb-6 group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass">
                Physical Atelier
              </span>
              <h3 className="font-display text-2xl text-bone mt-2 font-normal">
                DHA Lahore
              </h3>
              <p className="mt-2 text-xs font-body text-smoke-light font-light leading-relaxed">
                Defence Housing Authority, Lahore, Punjab, Pakistan. Serving all phases of DHA, Gulberg, and Bahria Town.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href="https://www.google.com/maps/search/?api=1&query=DHA+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-body text-brass-light hover:text-bone font-medium tracking-wide transition-colors"
              >
                <span>Locate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Glass>

          {/* Card 5: Working Hours (Placeholder) */}
          <Glass
            variant="panel"
            className="!p-7 flex flex-col justify-between border-brass/25 hover:border-brass/50 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brass/10 border border-brass/30 flex items-center justify-center text-brass mb-6 group-hover:scale-105 transition-transform duration-300">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass">
                Studio Hours
              </span>
              <h3 className="font-display text-2xl text-bone mt-2 font-normal">
                Hours of Operation
              </h3>
              <div className="mt-3 space-y-1.5 text-xs font-body text-smoke-light font-light">
                <div className="flex justify-between">
                  <span>Monday – Saturday:</span>
                  <span className="text-bone font-medium">10:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-brass font-medium">By Prior Appointment</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-body text-smoke">
              <span>Site visits scheduled 7 days a week</span>
            </div>
          </Glass>

          {/* Card 6: vCard "Save contact" Download */}
          <Glass
            variant="panel"
            className="!p-7 flex flex-col justify-between border-brass/35 bg-brass/[0.04] hover:bg-brass/[0.07] transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brass/20 border border-brass/40 flex items-center justify-center text-brass mb-6 group-hover:scale-105 transition-transform duration-300">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass font-bold">
                Atelier Directory
              </span>
              <h3 className="font-display text-2xl text-bone mt-2 font-normal">
                Save Studio Contact
              </h3>
              <p className="mt-2 text-xs font-body text-smoke-light font-light leading-relaxed">
                Download Arc Studio&apos;s verified digital business card (vCard .vcf) straight to your iPhone or Android device.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brass/20">
              <button
                type="button"
                onClick={downloadVCard}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-body tracking-wider uppercase font-semibold text-basalt shadow-md hover:shadow-brass-glow transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
                }}
              >
                <Download className="w-4 h-4 text-basalt" />
                <span>Save Contact (vCard)</span>
              </button>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
