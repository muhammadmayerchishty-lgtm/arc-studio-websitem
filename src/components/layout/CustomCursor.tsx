'use client';

import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates for trailing ring
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!visible) setVisible(true);

      // Instant update for the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Hover detection on interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      setHovered(!!interactiveEl);
    };

    // Smooth animation loop for the trailing ring
    const loop = () => {
      // Lerp factor (0.16 gives smooth architectural responsiveness)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [visible]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Brass Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-brass shadow-[0_0_8px_rgba(201,163,107,0.9)] will-change-transform"
      />

      {/* Lagging Glass Architectural Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-brass/40 backdrop-blur-[1px] will-change-transform transition-[width,height,margin,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hovered
            ? '-ml-6 -mt-6 w-12 h-12 border-brass bg-brass/10 scale-110 shadow-[0_0_20px_rgba(201,163,107,0.3)]'
            : clicked
            ? '-ml-3.5 -mt-3.5 w-7 h-7 border-brass-light bg-white/10 scale-90'
            : '-ml-4 -mt-4 w-8 h-8 bg-white/[0.03]'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
