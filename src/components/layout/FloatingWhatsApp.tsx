'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Direct WhatsApp assistance"
      className="fixed z-50 transition-all duration-300 pointer-events-auto"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.5rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <a
        href="https://wa.me/923704921265?text=Hi%20Arc%20Studio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Arc Studio"
        className="group relative flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full backdrop-blur-xl border transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 cursor-pointer shadow-2xl"
        style={{
          backgroundColor: 'rgba(20, 80, 45, 0.45)',
          borderColor: 'rgba(37, 211, 102, 0.4)',
          boxShadow:
            '0 10px 25px -5px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(37, 211, 102, 0.2)',
        }}
      >
        {/* Beacon Pulse Ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-[#25D366]/40 animate-ping pointer-events-none opacity-40"
          style={{ animationDuration: '3s' }}
        />

        {/* WhatsApp Icon with Gentle Breathing Pulse */}
        <div className="relative flex items-center justify-center text-[#25D366]">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-basalt animate-pulse" />
        </div>

        {/* Floating Tooltip Label (Desktop) */}
        <div className="hidden sm:flex flex-col items-start pr-1 text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#25D366] font-semibold">
            Direct Atelier Desk
          </span>
          <span className="font-body text-xs font-medium text-bone tracking-wide">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
