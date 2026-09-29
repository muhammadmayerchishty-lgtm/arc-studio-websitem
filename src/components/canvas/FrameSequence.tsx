'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Glass } from '@/components/ui/Glass';

interface FrameSequenceProps {
  folder: string;
  frameCount: number;
  pinLength?: string | number; // e.g. '300vh' or 3000
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

  // In-memory cache for decoded ImageBitmaps or HTMLImageElements
  const framesRef = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  const loadedCountRef = useRef<number>(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState<boolean>(false);
  const [isPreloadComplete, setIsPreloadComplete] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Track current animated scrub frame value for GSAP
  const scrubTargetRef = useRef<{ value: number }>({ value: 1 });
  const rafIdRef = useRef<number | null>(null);

  // Determine resolution folder based on window width
  const getFolderPath = useCallback(() => {
    if (typeof window === 'undefined') return `/frames/${folder}/hd`;
    const isDesktop = window.innerWidth >= 1024;
    return `/frames/${folder}/${isDesktop ? '4k' : 'hd'}`;
  }, [folder]);

  // Decode frame into memory
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

  // Draw frame with object-fit: cover mathematics and devicePixelRatio sizing
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

      // Find best available frame for A
      let imgA = framesRef.current.get(frameA);
      if (!imgA) {
        // Fallback to nearest loaded frame
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

      // Object-fit "cover" calculation
      const imgW = imgA.width;
      const imgH = imgA.height;
      const scale = Math.max(width / imgW, height / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (width - drawW) * 0.5;
      const drawY = (height - drawH) * 0.5;

      // Draw primary frame A
      ctx.globalAlpha = 1.0;
      ctx.drawImage(imgA, drawX, drawY, drawW, drawH);

      // Linearly crossfade with neighboring frame B if available and fraction > 0.001
      if (frac > 0.001 && frameB !== frameA) {
        const imgB = framesRef.current.get(frameB);
        if (imgB) {
          ctx.globalAlpha = frac;
          ctx.drawImage(imgB, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }

      // Memory Management: On mobile, prune bitmaps far from current frame
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        const radius = 15;
        if (framesRef.current.size > 30) {
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

  // Resize canvas for crisp devicePixelRatio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // 2 is optimal for 4K performance
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
    }

    renderFrameToCanvas(scrubTargetRef.current.value);
  }, [renderFrameToCanvas]);

  // Main lifecycle: loading frames, setting up ScrollTrigger
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(reduceMotion);

    const folderPath = getFolderPath();
    let isCancelled = false;

    // STEP 1: Load Frame 1 first as poster
    const initFirstFrame = async () => {
      const firstFrame = await loadSingleFrame(1, folderPath);
      if (isCancelled) return;

      if (firstFrame) {
        loadedCountRef.current = 1;
        setLoadPercent(Math.round((1 / frameCount) * 100));
        setIsFirstFrameReady(true);
        handleResize();
        onReady?.();

        if (reduceMotion) {
          renderFrameToCanvas(reducedMotionStaticFrame);
          return;
        }

        // STEP 2: Load next 20 frames proactively for instant scroll readiness
        const initialBatchEnd = Math.min(21, frameCount);
        const batchPromises: Promise<any>[] = [];

        for (let i = 2; i <= initialBatchEnd; i++) {
          batchPromises.push(
            loadSingleFrame(i, folderPath).then(() => {
              if (isCancelled) return;
              loadedCountRef.current += 1;
              setLoadPercent(Math.round((loadedCountRef.current / frameCount) * 100));
            })
          );
        }

        await Promise.all(batchPromises);
        if (isCancelled) return;

        // STEP 3: Load remaining frames in background with idle callbacks
        const remainingIndices: number[] = [];
        for (let i = initialBatchEnd + 1; i <= frameCount; i++) {
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

  // Setup GSAP ScrollTrigger once first frame is ready
  useEffect(() => {
    if (!isFirstFrameReady || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    // Create ScrollTrigger mapped to frame sequence with 0.4s scrub smoothing
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: sticky,
      pinSpacing: false,
      scrub: 0.4, // 0.4s smoothing as requested
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
      {/* Sticky Fullscreen Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-basalt"
      >
        {/* Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        />

        {/* Loading Glass State: Visible until frame 1 is decoded, then dissolves */}
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

            {/* Brass Glass Loading Bar */}
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

        {/* Floating background streaming indicator: subtle bottom badge during idle background loading */}
        {isFirstFrameReady && !isPreloadComplete && (
          <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-basalt/60 backdrop-blur-md border border-brass/20 text-[10px] font-mono text-smoke">
            <span className="w-1.5 h-1.5 rounded-full bg-brass/60 animate-pulse" />
            <span>Streaming 4K frames ({loadPercent}%)</span>
          </div>
        )}

        {/* Overlay Content passed as children */}
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
