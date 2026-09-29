'use client';

import React, { useState } from 'react';
import { FrameSequence } from '@/components/canvas/FrameSequence';
import { FilmGrain } from '@/components/canvas/FilmGrain';
import { Glass } from '@/components/ui/Glass';
import { MapPin, Phone, ExternalLink, Compass, ShieldAlert } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [mapError, setMapError] = useState(false);

  // Google Maps embed URL for DHA Lahore
  const mapsEmbedUrl =
    'https://maps.google.com/maps?q=DHA%20Lahore%20Punjab%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed';
  const mapsExternalUrl = 'https://www.google.com/maps/search/?api=1&query=DHA+Lahore';

  return (
    <section id="location" className="relative w-full bg-basalt">
      {/* =========================================================================
          PINNED AERIAL SEQUENCE (FrameSequence - 300vh)
         ========================================================================= */}
      <FrameSequence folder="aerial" frameCount={150} pinLength="300vh">
        {({ progress }) => {
          // Dynamic fade as camera glides across Lahore skyline
          const fadeProgress = Math.min(1, Math.max(0, progress / 0.35));
          const opacity = Math.max(0, 1 - fadeProgress);
          const translateY = -fadeProgress * 30;

          return (
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
              {/* Cinematic 35mm film grain overlay */}
              <FilmGrain opacity={0.045} />

              {/* Atmospheric lighting gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-basalt/85 via-transparent to-basalt/70"
              />

              {/* Top Title: "Built in DHA Lahore" */}
              <div
                className="relative z-20 mt-20 sm:mt-24 max-w-xl transition-all duration-300 will-change-transform"
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0)`,
                  visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brass/30 bg-basalt/50 backdrop-blur-md mb-4">
                  <Compass className="w-3.5 h-3.5 text-brass" />
                  <span className="text-[10px] font-body tracking-[0.25em] uppercase text-brass-light font-medium">
                    Geographic Atelier Base
                  </span>
                </div>

                <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-bone tracking-tight leading-[1.08]">
                  Built in{' '}
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brass-light via-brass to-brass-dark">
                    DHA Lahore.
                  </span>
                </h2>
              </div>

              {/* Pinned Glass Card with Location Pitch and Action Buttons */}
              <div
                className="relative z-20 w-full max-w-md pointer-events-auto transition-all duration-300 will-change-transform my-auto sm:my-0 sm:mb-6"
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY * 0.75}px, 0)`,
                  visibility: opacity <= 0.01 ? 'hidden' : 'visible',
                }}
              >
                <Glass
                  variant="panel"
                  className="!p-6 sm:!p-8 border-brass/30 backdrop-blur-2xl shadow-2xl bg-basalt/70"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-brass" />
                    <span className="font-mono text-xs uppercase tracking-widest text-brass">
                      Atelier Coordinates
                    </span>
                  </div>

                  <p className="font-body text-sm sm:text-base text-bone font-light leading-relaxed">
                    Studio in DHA, Lahore. Serving DHA, Gulberg, Bahria Town and beyond.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={mapsExternalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body tracking-wider uppercase font-semibold text-basalt shadow-md hover:shadow-brass-glow transition-all duration-300 cursor-pointer"
                      style={{
                        background:
                          'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
                      }}
                    >
                      <MapPin className="w-3.5 h-3.5 text-basalt" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-basalt" />
                    </a>

                    <a
                      href="https://wa.me/923704921265"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-body tracking-wider uppercase text-bone border border-brass/30 bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brass" />
                      <span>WhatsApp us</span>
                    </a>
                  </div>
                </Glass>
              </div>

              {/* Pinned Bottom Status Bar */}
              <div
                className="relative z-20 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-body text-smoke transition-all duration-300"
                style={{ opacity }}
              >
                <span className="text-[10px] tracking-widest uppercase">
                  Aerial Drone Survey • DHA & Greater Lahore
                </span>
                <span className="font-mono text-[11px] text-brass">
                  {Math.round(progress * 100)}% Progress
                </span>
              </div>
            </div>
          );
        }}
      </FrameSequence>

      {/* =========================================================================
          EMBEDDED GOOGLE MAPS (Theme Dark-Tinted via CSS Filter inside Glass Frame)
         ========================================================================= */}
      <div className="relative z-20 w-full max-w-6xl mx-auto py-24 px-4 sm:px-8 lg:px-12">
        <div className="w-full text-center max-w-xl mx-auto mb-12">
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-brass font-medium">
            Interactive Territorial Map
          </span>
          <h3 className="mt-2 font-display text-3xl sm:text-4xl font-light text-bone tracking-tight">
            Atelier Territory
          </h3>
          <p className="mt-2 font-body text-xs sm:text-sm text-smoke font-light">
            Conveniently situated in DHA Lahore for immediate on-site architectural coordination.
          </p>
        </div>

        {/* Glass Frame enclosing the Dark-Tinted Google Map */}
        <Glass
          variant="panel"
          className="relative w-full h-[420px] sm:h-[500px] !p-2 sm:!p-3 border-brass/30 overflow-hidden shadow-2xl bg-basalt-surface"
        >
          {!mapError ? (
            <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-basalt">
              <iframe
                title="DHA Lahore Map"
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                onError={() => setMapError(true)}
                className="w-full h-full border-0 rounded-[14px]"
                style={{
                  // Invert and hue-rotate to convert default light map into luxurious dark basalt theme
                  filter:
                    'invert(90%) hue-rotate(180deg) contrast(95%) grayscale(25%)',
                }}
              />

              {/* Brass Coordinate Overlays */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-basalt/90 text-brass border border-brass/30 backdrop-blur-md">
                  31.4697° N, 74.3768° E • DHA Lahore
                </span>
              </div>
            </div>
          ) : (
            /* Fallback link if iframe fails */
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-basalt rounded-[16px]">
              <ShieldAlert className="w-8 h-8 text-brass mb-3" />
              <h4 className="font-display text-xl text-bone">Interactive Map Unavailable</h4>
              <p className="font-body text-xs text-smoke mt-1 max-w-sm">
                Unable to load interactive map within this browser frame.
              </p>
              <a
                href={mapsExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body tracking-wider uppercase bg-brass text-basalt font-semibold hover:bg-brass-light transition-colors"
              >
                <span>Open DHA Lahore on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </Glass>

        {/* Fallback & Direct Link Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-body text-smoke gap-2 px-2">
          <span>DHA Lahore, Punjab, Pakistan</span>
          <a
            href={mapsExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-brass hover:text-brass-light transition-colors"
          >
            <span>Open in full Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
