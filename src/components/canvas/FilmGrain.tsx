'use client';

import React from 'react';

export const FilmGrain: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.045,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden mix-blend-screen select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="arc-film-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0"
            result="coloredNoise"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#arc-film-grain)" />
      </svg>
    </div>
  );
};

export default FilmGrain;
