"use client";

import React from "react";
import { Activity, Compass, Cpu, Disc3, Move3d } from "lucide-react";
import type { AnimationTelemetry } from "./LamboCanvas";

interface BottomHudProps {
  telemetry: AnimationTelemetry | null;
  onExploreClick: () => void;
}

export default function BottomHud({ telemetry, onExploreClick }: BottomHudProps) {
  const progress = telemetry?.overallProgress || 0;
  const fps = telemetry?.fps || 60;
  const activeClip = telemetry?.activeClip || "A";
  const frame = telemetry?.clipFrame || 1;
  const totalFrames = telemetry?.totalFrames || 118;

  const clipDescriptions = {
    A: "AERO CLOSURES DECOUPLING",
    B: "POWERTRAIN SUSPENSION REVEAL",
    C: "CARBON MONOCOQUE SEPARATION",
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 md:px-12 md:py-5 flex items-end justify-between pointer-events-none select-none text-[10px] font-mono tracking-widest">
      {/* Left Telemetry Cluster */}
      <div className="flex flex-col gap-1.5 pointer-events-auto bg-bg-pitch/80 backdrop-blur-md p-3 rounded border border-lambo-border/50 max-w-[280px] sm:max-w-none">
        <div className="flex items-center gap-3 text-lambo-dim">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-lambo-yellow" />
            <span className="text-lambo-ink font-semibold">CLIP {activeClip}</span>
          </div>
          <span className="text-lambo-faint">//</span>
          <span className="text-lambo-yellow">
            FRAME {String(frame).padStart(4, "0")} / {String(totalFrames).padStart(4, "0")}
          </span>
          <span className="text-lambo-faint hidden sm:inline">//</span>
          <div className="hidden sm:flex items-center gap-1 text-emerald-400">
            <Activity className="w-3 h-3" />
            <span>{fps} FPS</span>
          </div>
        </div>

        <div className="text-[9px] text-lambo-dim truncate flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-sm bg-lambo-yellow/80 inline-block" />
          <span>{clipDescriptions[activeClip]}</span>
        </div>
      </div>

      {/* Center Animated Scroll Hint (Disappears once user starts scrolling) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-5 flex flex-col items-center pointer-events-auto cursor-pointer transition-all duration-500 ${
          progress > 0.04 ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100"
        }`}
        onClick={onExploreClick}
      >
        <span className="text-[9px] font-mono text-lambo-dim tracking-[0.3em] uppercase mb-2">
          SCROLL TO DECONSTRUCT
        </span>
        <div className="w-[1px] h-9 bg-lambo-faint relative overflow-hidden">
          <div className="absolute inset-0 bg-lambo-yellow animate-drop-hint" />
        </div>
      </div>

      {/* Right Metrics Cluster */}
      <div className="flex flex-col items-end gap-1 pointer-events-auto bg-bg-pitch/80 backdrop-blur-md p-3 rounded border border-lambo-border/50">
        <div className="flex items-center gap-2">
          <Compass className="w-3 h-3 text-lambo-yellow" />
          <span className="text-lambo-dim">EXPLODED DISPLACEMENT</span>
          <span className="text-lambo-yellow font-bold text-xs">
            {(progress * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-lambo-yellow/90">
          <Move3d className="w-3 h-3 text-lambo-yellow animate-pulse" />
          <span>3D PERSPECTIVE: MOVE MOUSE TO TILT</span>
        </div>
      </div>
    </footer>
  );
}
