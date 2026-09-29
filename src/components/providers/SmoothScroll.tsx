'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis with brief's cubic-bezier(0.22, 1, 0.36, 1)
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential approximation matching architectural feel
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Handle internal anchor links
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a');
        if (target && target.hash && target.hash.startsWith('#')) {
          const element = document.querySelector(target.hash);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement, { offset: -80, duration: 1.4 });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);

      return () => {
        document.removeEventListener('click', handleAnchorClick);
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
        lenisRef.current = null;
      };
    }
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
