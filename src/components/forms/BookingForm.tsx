'use client';

import React, { useState, useEffect } from 'react';
import { Glass } from '@/components/ui/Glass';
import { Sparkles, X, MessageSquare, ArrowRight } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPlot, setClientPlot] = useState<string>('');

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ project: string }>;
      if (customEvent.detail && customEvent.detail.project) {
        setSelectedProject(customEvent.detail.project);
      }
    };

    window.addEventListener('arc-prefill-book', handlePrefill);
    return () => window.removeEventListener('arc-prefill-book', handlePrefill);
  }, []);

  const buildWhatsAppLink = () => {
    let msg = 'Hello Arc Studio, I would like to schedule an architectural consultation.';
    if (selectedProject) {
      msg += ` I am particularly inspired by ${selectedProject}.`;
    }
    if (clientName) {
      msg += ` My name is ${clientName}.`;
    }
    if (clientPlot) {
      msg += ` Plot details / location: ${clientPlot}.`;
    }
    return `https://wa.me/923704921265?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 flex flex-col items-center">
      {/* Prefill Banner when a project is selected */}
      {selectedProject && (
        <div className="mb-6 w-full flex items-center justify-between p-3.5 rounded-full bg-brass/15 border border-brass/40 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="w-4 h-4 text-brass animate-pulse" />
            <span className="text-xs font-body text-bone">
              Inquiring about:{' '}
              <strong className="text-brass-light font-medium">{selectedProject}</strong>
            </span>
          </div>
          <button
            onClick={() => setSelectedProject('')}
            className="p-1.5 rounded-full hover:bg-white/10 text-smoke hover:text-bone transition-colors"
            title="Clear project selection"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Quick Inquiry Form */}
      <Glass
        variant="panel"
        className="w-full !p-6 sm:!p-7 border-brass/25 bg-basalt/60 text-left space-y-4"
      >
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-smoke mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            placeholder="e.g. Malik Ahmad"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-bone text-xs font-body placeholder:text-smoke/50 focus:outline-none focus:border-brass/60 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-smoke mb-1.5">
            Plot Size & DHA Phase
          </label>
          <input
            type="text"
            placeholder="e.g. 1 Kanal, DHA Phase 6"
            value={clientPlot}
            onChange={(e) => setClientPlot(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-bone text-xs font-body placeholder:text-smoke/50 focus:outline-none focus:border-brass/60 transition-colors"
          />
        </div>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-2 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-body tracking-wider uppercase font-semibold text-basalt shadow-lg hover:shadow-brass-glow transition-all duration-300 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
          }}
        >
          <MessageSquare className="w-4 h-4 text-basalt" />
          <span>Send Inquiry via WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5 text-basalt" />
        </a>
      </Glass>
    </div>
  );
};

export default BookingForm;
