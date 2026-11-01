"use client";

import React from "react";

interface HudAnnotationsProps {
  progress: number; // 0.0 to 1.0
}

interface TagConfig {
  label: string;
  sub: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  visibleMin: number;
  visibleMax: number;
}

const TAGS: TagConfig[] = [
  // Stage 1: Assembled / Early Closures
  {
    label: "SCISSOR CANOPY & DOORS",
    sub: "CARBON COMPOSITE KINEMATICS",
    xPercent: 32,
    yPercent: 30,
    visibleMin: 0.12,
    visibleMax: 0.34,
  },
  {
    label: "REAR AERO DIFFUSER",
    sub: "ACTIVE DOWNFORCE DUCTING",
    xPercent: 78,
    yPercent: 62,
    visibleMin: 0.08,
    visibleMax: 0.32,
  },
  // Stage 2: Suspended Closures / Powertrain
  {
    label: "6.5L V12 NATURALLY ASPIRATED",
    sub: "814 HP @ 9,250 RPM // L545",
    xPercent: 46,
    yPercent: 38,
    visibleMin: 0.38,
    visibleMax: 0.62,
  },
  {
    label: "MAGNETO-RHEOLOGICAL DAMPER",
    sub: "PUSH-ROD GEOMETRY",
    xPercent: 24,
    yPercent: 68,
    visibleMin: 0.40,
    visibleMax: 0.65,
  },
  // Stage 3: Chassis & Monocoque
  {
    label: "FORGED COMPOSITE MONOFUSELAGE",
    sub: "40,000 NM/DEG RIGIDITY",
    xPercent: 50,
    yPercent: 44,
    visibleMin: 0.66,
    visibleMax: 0.95,
  },
  {
    label: "CCM-R CARBON CERAMIC",
    sub: "410MM 10-PISTON MONOBLOCK",
    xPercent: 75,
    yPercent: 72,
    visibleMin: 0.68,
    visibleMax: 0.95,
  },
];

export default function HudAnnotations({ progress }: HudAnnotationsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-30">
      {TAGS.map((tag, idx) => {
        const isVisible = progress >= tag.visibleMin && progress <= tag.visibleMax;
        return (
          <div
            key={idx}
            className="absolute transition-all duration-500 ease-out flex flex-col items-start"
            style={{
              left: `${tag.xPercent}%`,
              top: `${tag.yPercent}%`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -40%) scale(0.9)",
              visibility: isVisible ? "visible" : "hidden",
            }}
          >
            {/* Target Reticle Pin */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-lambo-yellow bg-bg-pitch flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-lambo-yellow animate-ping" />
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-lambo-yellow to-transparent" />
            </div>

            {/* Tag Badge */}
            <div className="mt-1 bg-bg-pitch/85 backdrop-blur-md px-2.5 py-1.5 border border-lambo-border rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              <div className="text-[10px] font-mono font-bold text-lambo-yellow tracking-widest uppercase">
                {tag.label}
              </div>
              <div className="text-[8px] font-mono text-lambo-dim tracking-wider uppercase mt-0.5">
                {tag.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

