"use client";

import React from "react";
import { soundFx } from "./SoundEffects";

interface VerticalRailProps {
  progress: number; // 0.0 to 1.0
  onJumpTo: (target: number) => void;
}

const STAGES = [
  { label: "ASSEMBLED", target: 0.0 },
  { label: "CLOSURES", target: 0.35 },
  { label: "POWERTRAIN", target: 0.65 },
  { label: "CHASSIS", target: 0.95 },
];

export default function VerticalRail({ progress, onJumpTo }: VerticalRailProps) {
  return (
    <div className="fixed right-5 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center">
      {/* Stage Labels floating to left of rail */}
      <div className="relative h-64 w-8 flex flex-col items-center justify-between">
        {/* Vertical Rail Line */}
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-lambo-border">
          {/* Animated Fill Line */}
          <div
            className="w-full bg-lambo-yellow transition-all duration-150 ease-out shadow-[0_0_8px_#e6b800]"
            style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>

        {/* Ticks and interactive targets */}
        {STAGES.map((s, idx) => {
          const isActive = Math.abs(progress - s.target) < 0.15;
          const isPassed = progress >= s.target;

          return (
            <div
              key={s.label}
              className="relative flex items-center group cursor-pointer z-10"
              onClick={() => {
                soundFx.playClick(750 + idx * 80);
                onJumpTo(s.target);
              }}
            >
              {/* Tick Pip */}
              <div
                className={`w-3 h-[2px] transition-all duration-200 ${
                  isActive
                    ? "w-5 bg-lambo-yellow shadow-[0_0_8px_#e6b800]"
                    : isPassed
                    ? "bg-lambo-yellow/70"
                    : "bg-lambo-faint group-hover:bg-lambo-ink"
                }`}
              />

              {/* Floating label on hover or when active */}
              <div
                className={`absolute right-7 whitespace-nowrap text-[9px] font-mono tracking-widest uppercase py-0.5 px-2 rounded-sm border transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "opacity-100 text-lambo-yellow border-lambo-yellow/40 bg-bg-pitch/90 translate-x-0"
                    : "opacity-0 group-hover:opacity-100 text-lambo-dim border-lambo-border bg-bg-pitch/80 translate-x-1 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Numerical percentage indicator under rail */}
      <div className="mt-4 text-[10px] font-mono text-lambo-dim tracking-widest text-center select-none">
        <span className="text-lambo-yellow font-bold">
          {String(Math.round(progress * 100)).padStart(3, "0")}
        </span>
        <span className="text-lambo-faint text-[8px] ml-0.5">%</span>
      </div>
    </div>
  );
}

