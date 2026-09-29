import React from 'react';

// Static hardware-accelerated 35mm film grain overlay
export const FilmGrain: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.045,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden mix-blend-screen select-none transform-gpu will-change-transform ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

export default FilmGrain;
