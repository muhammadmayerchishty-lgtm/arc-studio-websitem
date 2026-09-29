import React from 'react';
import { ArcLogo } from '@/components/ui/ArcLogo';
import { MapPin, Phone, Instagram, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Philosophy', href: '#story' },
    { label: 'Light Dynamics', href: '#daynight' },
    { label: 'Atelier Services', href: '#services' },
    { label: 'Selected Work', href: '#projects' },
    { label: 'Interiors', href: '#interiors' },
    { label: 'Territory', href: '#location' },
    { label: 'Commissioning', href: '#book' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="w-full bg-basalt border-t border-white/10 pt-20 pb-24 px-4 sm:px-8 lg:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <ArcLogo size={42} withText={true} />
            <p className="font-display italic text-lg text-brass-light font-light max-w-sm">
              &ldquo;Spaces drawn with intent.&rdquo;
            </p>
            <p className="font-body text-xs sm:text-sm text-smoke font-light max-w-sm leading-relaxed">
              Arc Studio is a private architecture and interior design atelier in DHA Lahore. We craft enduring private residences, pavilions, and custom sanctuaries with disciplined material honesty.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[11px] tracking-widest uppercase text-brass font-bold">
              Atelier Index
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-body">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-smoke-light hover:text-brass transition-colors py-1 flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Atelier Contact & Socials */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-[11px] tracking-widest uppercase text-brass font-bold">
              Direct Channels
            </span>

            <div className="space-y-3 text-xs font-body">
              <a
                href="tel:+923704921265"
                className="flex items-center gap-2.5 text-smoke-light hover:text-bone transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                <span>0370 4921265</span>
              </a>

              <a
                href="https://wa.me/923704921265"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-smoke-light hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                <span>WhatsApp Atelier Desk</span>
              </a>

              <a
                href="https://instagram.com/mayeroutreach_1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-smoke-light hover:text-brass transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                <span>@mayeroutreach_1</span>
                <ArrowUpRight className="w-3 h-3 text-smoke ml-auto" />
              </a>

              <div className="flex items-start gap-2.5 text-smoke-light pt-2">
                <MapPin className="w-3.5 h-3.5 text-brass flex-shrink-0 mt-0.5" />
                <span>DHA, Lahore, Punjab, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-smoke">
          <p>© 2026 Arc Studio. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest text-[10px] text-smoke/70">
            DHA Lahore • Architecture &amp; Interior Design
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
