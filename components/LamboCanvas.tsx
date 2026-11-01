"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface AnimationTelemetry {
  overallProgress: number; // 0.0 to 1.0
  activeClip: "A" | "B" | "C";
  clipFrame: number;
  totalFrames: number;
  fps: number;
  isLoaded: boolean;
  loadProgress: number; // 0 to 100
}

interface LamboCanvasProps {
  onTelemetryUpdate?: (telemetry: AnimationTelemetry) => void;
  className?: string;
  enable3DRotation?: boolean;
}

const CLIP_CONFIG = {
  A: {
    count: 118,
    startT: 0.0,
    endT: 0.35,
    pathPrefix: "/frames/clipA/frame_",
  },
  B: {
    count: 91,
    startT: 0.35,
    endT: 0.58,
    pathPrefix: "/frames/clipB/frame_",
  },
  C: {
    count: 150,
    startT: 0.58,
    endT: 1.0,
    pathPrefix: "/frames/clipC/frame_",
  },
};

export default function LamboCanvas({
  onTelemetryUpdate,
  className = "",
  enable3DRotation = true,
}: LamboCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // High performance in-memory image cache
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Animation & Scroll State Refs (Zero React re-renders)
  const currentTRef = useRef<number>(0);
  const targetTRef = useRef<number>(0);
  const lastDrawnFrameKeyRef = useRef<string>("");
  const lastRotTransformRef = useRef<string>("");

  // FPS tracking refs
  const frameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(performance.now());
  const currentFpsRef = useRef<number>(60);
  const lastTelemetryTimeRef = useRef<number>(0);

  // Interactive 3D Perspective Rotation State
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Loading state (only for initial UI splash)
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Helper to format frame path
  const getFramePath = useCallback((clip: "A" | "B" | "C", index: number) => {
    const config = CLIP_CONFIG[clip];
    const clamped = Math.max(1, Math.min(config.count, Math.round(index)));
    const padded = String(clamped).padStart(4, "0");
    return `${config.pathPrefix}${padded}.webp`;
  }, []);

  // Fast Concurrency Preloader: Preload and decode all 359 frames into RAM immediately
  useEffect(() => {
    let isCancelled = false;

    const allPaths: string[] = [];
    (["A", "B", "C"] as const).forEach((clip) => {
      const count = CLIP_CONFIG[clip].count;
      for (let i = 1; i <= count; i++) {
        allPaths.push(getFramePath(clip, i));
      }
    });

    const totalCount = allPaths.length;
    let completedCount = 0;
    const concurrency = 16;
    let queueIndex = 0;

    const loadWorker = async () => {
      while (queueIndex < totalCount && !isCancelled) {
        const path = allPaths[queueIndex++];
        if (imageCache.current.has(path)) {
          completedCount++;
          continue;
        }

        try {
          const img = new Image();
          img.src = path;
          if (typeof img.decode === "function") {
            await img.decode();
          } else {
            await new Promise((res) => {
              img.onload = () => res(img);
              img.onerror = () => res(img);
            });
          }
          imageCache.current.set(path, img);
        } catch {
          // Fallback if decode fails
        }

        completedCount++;
        // Throttle React progress updates to every 10 frames to avoid React overhead
        if (completedCount % 12 === 0 || completedCount === totalCount) {
          if (!isCancelled) {
            const pct = Math.round((completedCount / totalCount) * 100);
            setLoadPercentage(pct);
            if (completedCount >= 20 && !isReady) {
              setIsReady(true);
            }
          }
        }
      }
    };

    // Launch worker pool
    const workers = Array.from({ length: concurrency }, () => loadWorker());
    Promise.all(workers).then(() => {
      if (!isCancelled) {
        setLoadPercentage(100);
        setIsReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [getFramePath, isReady]);

  // Passive high-performance scroll listener (Updates ref directly, ZERO React re-renders)
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetTRef.current = Math.min(1, Math.max(0, scrollY / maxScroll));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse & Touch 3D Interactive Orbit Rotation Handlers
  useEffect(() => {
    if (!enable3DRotation) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 ... +1 from screen center
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouseRef.current = { x: nx, y: ny };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const nx = (t.clientX / window.innerWidth) * 2 - 1;
        const ny = (t.clientY / window.innerHeight) * 2 - 1;
        targetMouseRef.current = { x: nx, y: ny };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [enable3DRotation]);

  // Setup Canvas and Handle Resize
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
  }, []);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas, { passive: true });
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  // Main 60FPS RAF Render Loop (Runs completely decoupled from React state)
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let isRunning = true;
    let animationFrameId: number;

    const renderLoop = (now: number) => {
      if (!isRunning) return;

      // 1. Calculate precise FPS
      frameCountRef.current++;
      const timeElapsed = now - lastFpsTimeRef.current;
      if (timeElapsed >= 500) {
        currentFpsRef.current = Math.round((frameCountRef.current * 1000) / timeElapsed);
        frameCountRef.current = 0;
        lastFpsTimeRef.current = now;
      }

      // 2. Smooth interpolate scroll progress with optimal dampening
      const scrollDelta = targetTRef.current - currentTRef.current;
      currentTRef.current += scrollDelta * 0.18;
      if (Math.abs(scrollDelta) < 0.0001) {
        currentTRef.current = targetTRef.current;
      }

      const t = currentTRef.current;

      // 3. Smooth interpolate mouse orbit
      if (enable3DRotation && container) {
        mousePosRef.current.x += (targetMouseRef.current.x - mousePosRef.current.x) * 0.1;
        mousePosRef.current.y += (targetMouseRef.current.y - mousePosRef.current.y) * 0.1;

        const rotY = (mousePosRef.current.x * 8).toFixed(2);
        const rotX = (-mousePosRef.current.y * 5).toFixed(2);
        const transformStr = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.02)`;

        if (transformStr !== lastRotTransformRef.current) {
          lastRotTransformRef.current = transformStr;
          container.style.transform = transformStr;
        }
      }

      // 4. Calculate active clip & frame index
      let activeClip: "A" | "B" | "C" = "A";
      let clipFrame = 1;

      if (t < CLIP_CONFIG.A.endT) {
        activeClip = "A";
        const progressInA = (t - CLIP_CONFIG.A.startT) / (CLIP_CONFIG.A.endT - CLIP_CONFIG.A.startT);
        clipFrame = Math.max(1, Math.min(CLIP_CONFIG.A.count, Math.round(progressInA * (CLIP_CONFIG.A.count - 1)) + 1));
      } else if (t < CLIP_CONFIG.B.endT) {
        activeClip = "B";
        const progressInB = (t - CLIP_CONFIG.B.startT) / (CLIP_CONFIG.B.endT - CLIP_CONFIG.B.startT);
        clipFrame = Math.max(1, Math.min(CLIP_CONFIG.B.count, Math.round(progressInB * (CLIP_CONFIG.B.count - 1)) + 1));
      } else {
        activeClip = "C";
        const progressInC = (t - CLIP_CONFIG.C.startT) / (CLIP_CONFIG.C.endT - CLIP_CONFIG.C.startT);
        clipFrame = Math.max(1, Math.min(CLIP_CONFIG.C.count, Math.round(progressInC * (CLIP_CONFIG.C.count - 1)) + 1));
      }

      const frameKey = `${activeClip}_${clipFrame}`;

      // 5. Blit frame onto canvas if changed
      if (frameKey !== lastDrawnFrameKeyRef.current) {
        lastDrawnFrameKeyRef.current = frameKey;

        const path = getFramePath(activeClip, clipFrame);
        const img = imageCache.current.get(path);

        if (img && img.complete && img.naturalWidth > 0) {
          const cw = canvas.width;
          const ch = canvas.height;

          // Clear canvas with pitch carbon black
          ctx.fillStyle = "#050507";
          ctx.fillRect(0, 0, cw, ch);

          const targetAspect = 16 / 9;
          const canvasAspect = cw / ch;

          let drawW: number;
          let drawH: number;

          // Heroic full centering
          if (canvasAspect > targetAspect) {
            drawW = cw * 1.05;
            drawH = drawW / targetAspect;
          } else {
            drawH = ch * 0.98;
            drawW = drawH * targetAspect;
          }

          const dx = (cw - drawW) / 2;
          const dy = (ch - drawH) / 2;

          ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, drawW, drawH);
        }
      }

      // 6. Throttled telemetry dispatch (10 Hz max) to keep React thread 100% smooth
      if (onTelemetryUpdate && now - lastTelemetryTimeRef.current >= 90) {
        lastTelemetryTimeRef.current = now;
        onTelemetryUpdate({
          overallProgress: t,
          activeClip,
          clipFrame,
          totalFrames: CLIP_CONFIG[activeClip].count,
          fps: currentFpsRef.current || 60,
          isLoaded: isReady,
          loadProgress: loadPercentage,
        });
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    enable3DRotation,
    getFramePath,
    isReady,
    loadPercentage,
    onTelemetryUpdate,
  ]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none select-none will-change-transform ${className}`}
      style={{ transformOrigin: "center center" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-contain pointer-events-none"
        aria-label="Lamborghini 3D Exploded-View interactive canvas animation"
      />

      {/* Fast Preloader Splash — Dissolves immediately as frames buffer */}
      {!isReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg-pitch/95 backdrop-blur-md transition-opacity duration-500">
          <div className="w-64 max-w-[85vw] space-y-4 text-center">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-lambo-dim">
              <span>PRE-CACHING 359 FRAMES IN RAM</span>
              <span className="text-lambo-yellow font-bold">{loadPercentage}%</span>
            </div>
            <div className="h-[2px] w-full bg-lambo-border overflow-hidden">
              <div
                className="h-full bg-lambo-yellow transition-all duration-150 ease-out shadow-[0_0_10px_#e6b800]"
                style={{ width: `${loadPercentage}%` }}
              />
            </div>
            <p className="text-[10px] font-mono text-lambo-faint tracking-widest uppercase">
              DECODING 60 FPS HARDWARE BUFFERS
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
