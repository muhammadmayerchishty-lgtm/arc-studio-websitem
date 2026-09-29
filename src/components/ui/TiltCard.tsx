'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Glass } from '@/components/ui/Glass';

interface TiltCardProps {
  className?: string;
  children: React.ReactNode;
  maxTilt?: number; // default 12 deg
}

export const TiltCard: React.FC<TiltCardProps> = ({
  className = '',
  children,
  maxTilt = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rx = ((y - centerY) / centerY) * -maxTilt;
    const ry = ((x - centerX) / centerX) * maxTilt;

    // Glare coordinates in percentages
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    const el = cardRef.current;
    el.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
    el.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
    el.style.setProperty('--tilt-gx', `${gx.toFixed(1)}%`);
    el.style.setProperty('--tilt-gy', `${gy.toFixed(1)}%`);
  };

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (reducedMotion || !cardRef.current) return;
    setIsHovered(false);

    // Return to neutral state
    const el = cardRef.current;
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
    el.style.setProperty('--tilt-gx', '50%');
    el.style.setProperty('--tilt-gy', '50%');
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={`relative w-full h-full rounded-[20px] will-change-transform ${className}`}
        style={{
          transform: reducedMotion
            ? 'none'
            : 'rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))',
          transformStyle: 'preserve-3d',
          transition: reducedMotion
            ? 'none'
            : isHovered
            ? 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <Glass
          variant="panel"
          className="relative w-full h-full !p-8 flex flex-col justify-between overflow-hidden border-brass/25 hover:border-brass/50 transition-colors"
        >
          {/* Dynamic cursor-following white glare (mix-blend-mode: screen) */}
          {!reducedMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                mixBlendMode: 'screen',
                background:
                  'radial-gradient(circle 350px at var(--tilt-gx, 50%) var(--tilt-gy, 50%), rgba(255, 255, 255, 0.16) 0%, rgba(201, 163, 107, 0.08) 35%, transparent 70%)',
              }}
            />
          )}

          {children}
        </Glass>
      </div>
    </div>
  );
};

export default TiltCard;
