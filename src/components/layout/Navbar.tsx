'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArcLogo } from '@/components/ui/ArcLogo';
import { Glass } from '@/components/ui/Glass';
import { Phone, ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Light', href: '#daynight' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Interiors', href: '#interiors' },
  { label: 'Book', href: '#book' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'pt-3 sm:pt-4' : 'pt-6 sm:pt-8'
        }`}
      >
        <Glass
          as="nav"
          variant="panel"
          className="w-full max-w-7xl !py-3 sm:!py-3.5 !px-5 sm:!px-7 flex items-center justify-between shadow-2xl transition-all duration-500"
        >
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
            aria-label="Arc Studio Home"
          >
            <ArcLogo size={36} withText={true} />
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-1.5 text-xs lg:text-sm font-body tracking-[0.1em] uppercase text-bone-muted hover:text-bone transition-colors duration-300 rounded-full hover:bg-white/[0.04] group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[1px] bg-gradient-to-r from-transparent via-brass to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>

          {/* Right Action: Brass Consultation Pill & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923704921265"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-body tracking-wider uppercase font-semibold text-basalt overflow-hidden transition-all duration-400 group shadow-lg hover:shadow-brass-glow cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 4px 15px rgba(201,163,107,0.3)',
              }}
            >
              <Phone className="w-3.5 h-3.5 text-basalt transition-transform duration-300 group-hover:rotate-12" />
              <span className="hidden sm:inline">Book a consultation</span>
              <span className="sm:hidden">Consult</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-basalt transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-bone hover:text-brass transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Glass>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-basalt/80 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 transition-opacity duration-300">
          <div className="flex flex-col gap-6 items-center text-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl uppercase tracking-[0.2em] text-bone hover:text-brass transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 border-t border-white/10 w-full max-w-xs flex flex-col items-center gap-4 text-xs font-body text-smoke tracking-widest uppercase">
              <span>DHA • Lahore • Pakistan</span>
              <a
                href="tel:03704921265"
                className="text-brass hover:underline"
              >
                0370 4921265
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
