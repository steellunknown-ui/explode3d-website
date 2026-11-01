"use client";

import React, { useState } from "react";
import { X, Gauge, Shield, Zap, Wrench, Download, ChevronRight } from "lucide-react";
import { soundFx } from "./SoundEffects";

interface TechnicalSpecsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechnicalSpecsDrawer({
  isOpen,
  onClose,
}: TechnicalSpecsDrawerProps) {
  const [activeTab, setActiveTab] = useState<"powertrain" | "chassis" | "aero">(
    "powertrain"
  );

  if (!isOpen) return null;

  const tabs = [
    { id: "powertrain", label: "POWERTRAIN & V12", icon: Zap },
    { id: "chassis", label: "CARBON MONOFUSELAGE", icon: Shield },
    { id: "aero", label: "AERO & KINEMATICS", icon: Gauge },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-lg h-full bg-bg-pitch/95 border-l border-lambo-border flex flex-col justify-between p-6 sm:p-8 overflow-y-auto select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-lambo-border">
            <div>
              <div className="text-[10px] font-mono text-lambo-yellow tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lambo-yellow inline-block animate-pulse" />
                <span>TECHNICAL DATASHEET // REVUELTO V12</span>
              </div>
              <h3 className="text-xl font-bold tracking-wider text-lambo-white mt-1 uppercase">
                ENGINEERING TELEMETRY
              </h3>
            </div>
            <button
              onClick={() => {
                soundFx.playClick(500);
                onClose();
              }}
              className="p-2 border border-lambo-border hover:border-lambo-yellow text-lambo-dim hover:text-lambo-yellow transition-colors"
              aria-label="Close telemetry datasheet"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-lambo-border pb-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playClick(750);
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-[10px] font-mono tracking-widest border transition-all ${
                    isSelected
                      ? "border-lambo-yellow bg-lambo-yellow/10 text-lambo-yellow font-bold shadow-[0_0_12px_rgba(230,184,0,0.15)]"
                      : "border-transparent text-lambo-dim hover:text-lambo-ink"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="mt-6 space-y-4 font-mono">
            {activeTab === "powertrain" && (
              <div className="space-y-3">
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">ENGINE ARCHITECTURE</span>
                  <span className="text-lambo-white font-semibold">6.5L NATURALLY ASPIRATED V12 (L545)</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">MAX POWER OUTPUT</span>
                  <span className="text-lambo-yellow font-bold">814 CV (825 HP) @ 9,250 RPM</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">COMBINED HYBRID HP</span>
                  <span className="text-lambo-white font-semibold">1,015 CV (1,001 HP)</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">MAX TORQUE</span>
                  <span className="text-lambo-white font-semibold">725 NM @ 6,750 RPM</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">TRANSMISSION</span>
                  <span className="text-lambo-white font-semibold">8-SPEED TRANSVERSE DUAL-CLUTCH (DCT)</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">REDLINE CUTOFF</span>
                  <span className="text-lambo-yellow font-bold">9,500 RPM</span>
                </div>
              </div>
            )}

            {activeTab === "chassis" && (
              <div className="space-y-3">
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">MONOCOQUE TUB</span>
                  <span className="text-lambo-white font-semibold">FORGED COMPOSITE CARBON FIBRE</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">TORSIONAL RIGIDITY</span>
                  <span className="text-lambo-yellow font-bold">40,000 NM/DEG (+25% VS AVENTADOR)</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">FRONT STRUCTURE</span>
                  <span className="text-lambo-white font-semibold">100% FORGED COMPOSITE FORERUNNER</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">BRAKING SYSTEM</span>
                  <span className="text-lambo-white font-semibold">CCM-R PLUS CARBON CERAMIC (410x38MM)</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">FRONT / REAR CALIPERS</span>
                  <span className="text-lambo-white font-semibold">10-PISTON FRONT / 4-PISTON REAR</span>
                </div>
              </div>
            )}

            {activeTab === "aero" && (
              <div className="space-y-3">
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">ACTIVE AERO MODES</span>
                  <span className="text-lambo-white font-semibold">LOW DRAG / HIGH DOWNFORCE / CORSA</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">OVERALL DOWNFORCE GAIN</span>
                  <span className="text-lambo-yellow font-bold">+61% FRONT / +66% REAR</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">CLOSURES MECHANISM</span>
                  <span className="text-lambo-white font-semibold">SCISSOR CANOPY &amp; REAR AERO DECK</span>
                </div>
                <div className="p-3 bg-bg-card border border-lambo-border flex justify-between items-center text-xs">
                  <span className="text-lambo-dim">SUSPENSION</span>
                  <span className="text-lambo-white font-semibold">PUSH-ROD MAGNETO-RHEOLOGICAL</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-lambo-border space-y-3">
          <button
            onClick={() => {
              soundFx.playClick(1000);
              alert("Lamborghini Technical Blueprint exported successfully.");
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-lambo-yellow hover:bg-lambo-yellowHover text-black font-bold text-xs tracking-widest font-mono uppercase transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD SPECIFICATION PDF</span>
          </button>
          <div className="text-center text-[9px] font-mono text-lambo-faint">
            DATA VERIFIED BY AUTOMOBILI LAMBORGHINI AERODYNAMICS LABORATORY
          </div>
        </div>
      </div>
    </div>
  );
}

