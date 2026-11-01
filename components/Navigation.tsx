"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { soundFx } from "./SoundEffects";

interface NavigationProps {
  onJumpTo: (progress: number) => void;
  onOpenSpecs: () => void;
  activeProgress: number;
}

export default function Navigation({
  onJumpTo,
  onOpenSpecs,
  activeProgress,
}: NavigationProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    soundFx.enabled = next;
    setSoundEnabled(next);
    if (next) {
      soundFx.playClick(1000);
    }
  };

  const navLinks = [
    { label: "01 // ASSEMBLED", target: 0.0 },
    { label: "02 // CLOSURES", target: 0.28 },
    { label: "03 // POWERTRAIN", target: 0.58 },
    { label: "04 // CHASSIS", target: 0.88 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-6 backdrop-blur-md bg-bg-pitch/60 border-b border-lambo-border/40 transition-all duration-300">
      {/* Brand Identity */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            soundFx.playClick(600);
            onJumpTo(0);
          }}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Custom Lamborghini Shield SVG */}
          <div className="w-8 h-9 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 40 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(230,184,0,0.35)]"
            >
              <polygon
                points="20,1 38,11 38,34 20,44 2,34 2,11"
                fill="#0e0e12"
                stroke="#e6b800"
                strokeWidth="2"
              />
              <path
                d="M12 28L20 14L28 28H23L20 22L17 28H12Z"
                fill="#fbfbfa"
              />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-extrabold tracking-[0.35em] text-lambo-white uppercase">
              AUTOMOBILI LAMBORGHINI
            </div>
            <div className="text-[9px] font-mono tracking-widest text-lambo-dim flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lambo-yellow animate-pulse" />
              <span>SANT&apos;AGATA BOLOGNESE // V12 R&amp;D</span>
            </div>
          </div>
        </button>
      </div>

      {/* Navigation Stage Links (Desktop) */}
      <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-widest">
        {navLinks.map((link) => {
          const isActive = Math.abs(activeProgress - link.target) < 0.15;
          return (
            <button
              key={link.label}
              onClick={() => {
                soundFx.playClick(800);
                onJumpTo(link.target);
              }}
              className={`transition-colors py-1 relative ${
                isActive
                  ? "text-lambo-yellow font-medium"
                  : "text-lambo-dim hover:text-lambo-ink"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-lambo-yellow shadow-[0_0_8px_#e6b800]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2.5 rounded-sm border transition-all duration-200 flex items-center gap-2 text-[10px] font-mono tracking-widest ${
            soundEnabled
              ? "border-lambo-yellow text-lambo-yellow bg-lambo-yellow/10 shadow-[0_0_10px_rgba(230,184,0,0.2)]"
              : "border-lambo-border text-lambo-dim hover:text-lambo-ink hover:border-lambo-borderLight"
          }`}
          title={soundEnabled ? "Mute tactile sound" : "Enable tactile sound"}
          aria-label="Toggle haptic audio"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AUDIO OFF</span>
            </>
          )}
        </button>

        {/* Technical Specs Drawer Button */}
        <button
          onClick={() => {
            soundFx.playClick(900);
            onOpenSpecs();
          }}
          className="flex items-center gap-2 px-3.5 py-2.5 border border-lambo-border hover:border-lambo-yellow bg-bg-carbon/80 text-lambo-ink hover:text-lambo-yellow text-[10px] font-mono tracking-widest transition-all duration-200 group"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-lambo-yellow" />
          <span className="font-semibold">TELEMETRY</span>
          <ArrowUpRight className="w-3 h-3 text-lambo-dim group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
}

