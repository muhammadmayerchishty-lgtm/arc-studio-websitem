'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Glass } from '@/components/ui/Glass';

interface FrameSequenceProps {
  folder: string;
  frameCount: number;
  pinLength?: string | number;
  className?: string;
  reducedMotionStaticFrame?: number;
  children?:
    | React.ReactNode
    | ((props: { progress: number; currentFrame: number; isReady: boolean }) => React.ReactNode);
  onProgress?: (progress: number) => void;
  onReady?: () => void;
}

export const FrameSequence: React.FC<FrameSequenceProps> = ({
  folder,
  frameCount,
  pinLength = '300vh',
  className = '',
  reducedMotionStaticFrame = 1,
  children,
  onProgress,
  onReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  const loadedCountRef = useRef<number>(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState<boolean>(false);
  const [isPreloadComplete, setIsPreloadComplete] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const scrubTargetRef = useRef<{ value: number }>({ value: 1 });
  const rafIdRef = useRef<number | null>(null);

  const getFolderPath = useCallback(() => {
    if (typeof window === 'undefined') return `/frames/${folder}/hd`;
    const isMobile = window.innerWidth < 768;
    return `/frames/${folder}/${isMobile ? 'hd' : '4k'}`;
  }, [folder]);

  const loadSingleFrame = useCallback(
    async (index: number, folderPath: string): Promise<ImageBitmap | HTMLImageElement | null> => {
      if (framesRef.current.has(index)) {
        return framesRef.current.get(index)!;
      }

      const paddedIndex = String(index).padStart(4, '0');
      const url = `${folderPath}/frame_${paddedIndex}.webp`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
        const blob = await response.blob();

        if (typeof createImageBitmap !== 'undefined') {
          const bitmap = await createImageBitmap(blob);
          framesRef.current.set(index, bitmap);
          return bitmap;
        } else {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = () => {
              framesRef.current.set(index, img);
              resolve(img);
            };
            img.onerror = reject;
          });
        }
      } catch (err) {
        console.warn(`Failed loading frame ${index}:`, err);
        return null;
      }
    },
    []
  );

  const renderFrameToCanvas = useCallback(
    (frameFloat: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      const frameA = Math.floor(frameFloat);
      const frameB = Math.min(frameCount, frameA + 1);
      const frac = frameFloat - frameA;

      let imgA = framesRef.current.get(frameA);
      if (!imgA) {
        for (let offset = 1; offset <= frameCount; offset++) {
          if (framesRef.current.has(frameA - offset)) {
            imgA = framesRef.current.get(frameA - offset);
            break;
          }
          if (framesRef.current.has(frameA + offset)) {
            imgA = framesRef.current.get(frameA + offset);
            break;
          }
        }
      }

      if (!imgA) return;

      const imgW = imgA.width;
      const imgH = imgA.height;
      const scale = Math.max(width / imgW, height / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (width - drawW) * 0.5;
      const drawY = (height - drawH) * 0.5;

      ctx.globalAlpha = 1.0;
      ctx.drawImage(imgA, drawX, drawY, drawW, drawH);

      if (frac > 0.001 && frameB !== frameA) {
        const imgB = framesRef.current.get(frameB);
        if (imgB) {
          ctx.globalAlpha = frac;
          ctx.drawImage(imgB, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }

      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth < 768;
        const maxCacheSize = isMobile ? 10 : 20;
        const radius = isMobile ? 4 : 8;

        if (framesRef.current.size > maxCacheSize) {
          for (const [idx, frame] of framesRef.current.entries()) {
            if (idx !== 1 && (idx < frameA - radius || idx > frameA + radius)) {
              if ('close' in frame && typeof (frame as ImageBitmap).close === 'function') {
                (frame as ImageBitmap).close();
              }
              framesRef.current.delete(idx);
            }
          }
        }
      }
    },
    [frameCount]
  );

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5); 
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
    }

    renderFrameToCanvas(scrubTargetRef.current.value);
  }, [renderFrameToCanvas]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(reduceMotion);

    const folderPath = getFolderPath();
    let isCancelled = false;

    // STEP 1: Load Frame 1 and unlock scrolling INSTANTLY
    const initFirstFrame = async () => {
      const firstFrame = await loadSingleFrame(1, folderPath);
      if (isCancelled) return;

      if (firstFrame) {
        loadedCountRef.current = 1;
        setLoadPercent(Math.round((1 / frameCount) * 100));
        setIsFirstFrameReady(true); // <--- Scroll unlocks right away!
        handleResize();
        onReady?.();

        if (reduceMotion) {
          renderFrameToCanvas(reducedMotionStaticFrame);
          return;
        }

        // STEP 2: Stream remaining frames smoothly in the background without blocking
        const remainingIndices: number[] = [];
        for (let i = 2; i <= frameCount; i++) {
          remainingIndices.push(i);
        }

        const scheduleIdleLoad = () => {
          if (isCancelled || remainingIndices.length === 0) {
            setIsPreloadComplete(true);
            return;
          }

          const loadNext = (deadline?: IdleDeadline) => {
            if (isCancelled) return;

            while (
              (!deadline || deadline.timeRemaining() > 5 || !('timeRemaining' in (deadline || {}))) &&
              remainingIndices.length > 0
            ) {
              const nextIndex = remainingIndices.shift();
              if (nextIndex) {
                loadSingleFrame(nextIndex, folderPath).then(() => {
                  if (isCancelled) return;
                  loadedCountRef.current += 1;
                  setLoadPercent(Math.round((loadedCountRef.current / frameCount) * 100));
                });
              }
            }

            if (remainingIndices.length > 0) {
              if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                window.requestIdleCallback(loadNext, { timeout: 1000 });
              } else {
                setTimeout(loadNext, 16);
              }
            } else {
              setIsPreloadComplete(true);
            }
          };

          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback(loadNext, { timeout: 1000 });
          } else {
            setTimeout(loadNext, 16);
          }
        };

        scheduleIdleLoad();
      }
    };

    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (container && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            initFirstFrame();
            observer?.disconnect();
            observer = null;
          }
        },
        { rootMargin: '600px' }
      );
      observer.observe(container);
    } else {
      initFirstFrame();
    }

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isCancelled = true;
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [
    folder,
    frameCount,
    getFolderPath,
    handleResize,
    loadSingleFrame,
    onReady,
    reducedMotionStaticFrame,
    renderFrameToCanvas,
  ]);

  useEffect(() => {
    if (!isFirstFrameReady || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: sticky,
      pinSpacing: false,
      scrub: 0.4,
      onUpdate: (self) => {
        const currentProgress = self.progress;
        setProgress(currentProgress);
        onProgress?.(currentProgress);

        const targetFrame = 1 + currentProgress * (frameCount - 1);
        scrubTargetRef.current.value = targetFrame;
        renderFrameToCanvas(targetFrame);
      },
    });

    scrollTriggerRef.current = st;

    return () => {
      if (st) st.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isFirstFrameReady, isReducedMotion, frameCount, onProgress, renderFrameToCanvas]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: pinLength }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-basalt"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        />

        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-basalt transition-opacity duration-700 pointer-events-none ${
            isFirstFrameReady ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Glass
            variant="panel"
            className="flex flex-col items-center gap-4 !p-6 sm:!p-8 max-w-sm w-[90%] text-center border-brass/30"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brass animate-ping" />
              <span className="font-display text-xl tracking-[0.2em] uppercase text-bone">
                Arc Studio
              </span>
            </div>

            <p className="font-body text-xs tracking-widest uppercase text-smoke">
              Initializing Spatial Sequence
            </p>

            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-brass-light via-brass to-brass-dark transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(8, loadPercent)}%` }}
              />
            </div>

            <span className="font-mono text-xs text-brass-light">
              {loadPercent}%
            </span>
          </Glass>
        </div>

        {isFirstFrameReady && !isPreloadComplete && (
          <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-basalt/60 backdrop-blur-md border border-brass/20 text-[10px] font-mono text-smoke">
            <span className="w-1.5 h-1.5 rounded-full bg-brass/60 animate-pulse" />
            <span>Streaming frames ({loadPercent}%)</span>
          </div>
        )}

        {typeof children === 'function'
          ? children({
              progress,
              currentFrame: Math.round(scrubTargetRef.current.value),
              isReady: isFirstFrameReady,
            })
          : children}
      </div>
    </div>
  );
};

export default FrameSequence;