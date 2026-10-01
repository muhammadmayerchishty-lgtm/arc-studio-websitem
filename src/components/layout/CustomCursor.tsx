'use client';

import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    document.body.classList.add('custom-cursor-enabled');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add('cursor-clicked');
    };
    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('cursor-clicked');
    };
    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      if (ringRef.current) {
        if (interactiveEl) {
          ringRef.current.classList.add('cursor-hovered');
        } else {
          ringRef.current.classList.remove('cursor-hovered');
        }
      }
    };

    // Buttery-smooth lerp loop without React state bottlenecks
    const loop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.2;

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
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Brass Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-brass shadow-[0_0_8px_rgba(201,163,107,0.9)] will-change-transform transition-opacity duration-300"
      />

      {/* Lagging Glass Architectural Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-brass/40 bg-white/[0.03] backdrop-blur-[1px] will-change-transform transition-all duration-200 ease-out [&.cursor-hovered]:-ml-6 [&.cursor-hovered]:-mt-6 [&.cursor-hovered]:w-12 [&.cursor-hovered]:h-12 [&.cursor-hovered]:border-brass [&.cursor-hovered]:bg-brass/10 [&.cursor-hovered]:scale-110 [&.cursor-clicked]:-ml-3.5 [&.cursor-clicked]:-mt-3.5 [&.cursor-clicked]:w-7 [&.cursor-clicked]:h-7 [&.cursor-clicked]:border-brass-light [&.cursor-clicked]:bg-white/10"
      />
    </div>
  );
};

export default CustomCursor;