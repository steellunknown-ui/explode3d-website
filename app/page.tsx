"use client";

import React, { useState, useCallback } from "react";
import LamboCanvas, { AnimationTelemetry } from "@/components/LamboCanvas";
import Navigation from "@/components/Navigation";
import VerticalRail from "@/components/VerticalRail";
import BottomHud from "@/components/BottomHud";
import TechnicalSpecsDrawer from "@/components/TechnicalSpecsDrawer";
import HudAnnotations from "@/components/HudAnnotations";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [telemetry, setTelemetry] = useState<AnimationTelemetry | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);

  // Throttled telemetry receiver from LamboCanvas (runs at steady 10Hz, zero jank)
  const handleTelemetryUpdate = useCallback((t: AnimationTelemetry) => {
    setTelemetry(t);
  }, []);

  const scrollProgress = telemetry?.overallProgress || 0;

  // Jump to specific scroll percentage
  const jumpToProgress = (targetProgress: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  // Helper function to calculate smooth opacity & translateY for section cards
  const getSectionStyle = (
    enterStart: number,
    enterEnd: number,
    exitStart: number,
    exitEnd: number
  ) => {
    let opacity = 0;
    let translateY = 18;

    if (scrollProgress >= enterStart && scrollProgress <= exitEnd) {
      if (scrollProgress < enterEnd) {
        const ratio = (scrollProgress - enterStart) / (enterEnd - enterStart);
        opacity = ratio;
        translateY = 18 * (1 - ratio);
      } else if (scrollProgress > exitStart) {
        const ratio = (exitEnd - scrollProgress) / (exitEnd - exitStart);
        opacity = ratio;
        translateY = -18 * (1 - ratio);
      } else {
        opacity = 1;
        translateY = 0;
      }
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
      pointerEvents: (opacity > 0.3 ? "auto" : "none") as "auto" | "none",
      visibility: (opacity > 0 ? "visible" : "hidden") as "visible" | "hidden",
      transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
    };
  };

  return (
    <main className="relative min-h-[580vh] bg-bg-pitch text-lambo-ink">
      {/* 1. Hardware Accelerated 60FPS WebP Exploded View Scroll Canvas */}
      <LamboCanvas
        onTelemetryUpdate={handleTelemetryUpdate}
        enable3DRotation={true}
      />

      {/* 2. Interactive HUD Leader Reticles */}
      <HudAnnotations progress={scrollProgress} />

      {/* 3. Luxury Top Brand Navigation Bar */}
      <Navigation
        onJumpTo={jumpToProgress}
        onOpenSpecs={() => setSpecsOpen(true)}
        activeProgress={scrollProgress}
      />

      {/* 4. Precision Vertical Scrubber Rail (Right) */}
      <VerticalRail progress={scrollProgress} onJumpTo={jumpToProgress} />

      {/* 5. Telemetry Bottom HUD & Frame Status */}
      <BottomHud
        telemetry={telemetry}
        onExploreClick={() => jumpToProgress(0.15)}
      />

      {/* 6. Technical Engineering Datasheet Drawer */}
      <TechnicalSpecsDrawer
        isOpen={specsOpen}
        onClose={() => setSpecsOpen(false)}
      />

      {/* ======================================================== */}
      {/* SECTION OVERLAYS (Scroll Driven Fixed HUD Presentation) */}
      {/* ======================================================== */}

      {/* SECTION 00: HERO TITLE */}
      <section
        style={getSectionStyle(0.0, 0.05, 0.09, 0.15)}
        className="fixed inset-0 z-20 flex items-center justify-start px-6 md:px-16 pointer-events-none"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-lambo-yellow font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-2 h-2 bg-lambo-yellow rounded-sm" />
            <span>REVUELTO V12 // ANATOMY STUDY 01</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.92] text-lambo-white font-sans">
            ENGINEERED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lambo-white via-lambo-ink to-lambo-yellow">
              TO PERFORM.
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-lambo-dim max-w-lg font-mono leading-relaxed tracking-wide">
            Scroll to deconstruct the naturally aspirated V12 hypercar. Inspect
            every aerodynamic closure, mechanical assembly, and forged carbon
            monofuselage layer by layer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => jumpToProgress(0.28)}
              className="px-6 py-3.5 bg-lambo-yellow hover:bg-lambo-yellowHover text-black font-mono font-bold text-xs tracking-widest uppercase flex items-center gap-2.5 transition-all shadow-[0_0_20px_rgba(230,184,0,0.3)] hover:shadow-[0_0_28px_rgba(230,184,0,0.5)]"
            >
              <span>DECONSTRUCT CLOSURES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSpecsOpen(true)}
              className="px-6 py-3.5 border border-lambo-border hover:border-lambo-yellow bg-bg-carbon/70 backdrop-blur-md text-lambo-ink hover:text-lambo-yellow font-mono text-xs tracking-widest uppercase transition-all"
            >
              INSPECT TELEMETRY
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 01: THE MACHINE */}
      <section
        style={getSectionStyle(0.12, 0.17, 0.25, 0.30)}
        className="fixed inset-0 z-20 flex items-center justify-end px-6 md:px-16 pointer-events-none"
      >
        <div className="max-w-md bg-bg-pitch/80 backdrop-blur-md p-6 sm:p-8 border border-lambo-border rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
          <div className="text-xs font-mono tracking-widest text-lambo-dim flex items-center gap-2 mb-3">
            <span className="text-lambo-yellow font-bold">01 //</span>
            <span>AERODYNAMIC ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-lambo-white">
            THE MACHINE
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans text-lambo-dim leading-relaxed">
            A mid-engined twelve-cylinder study. No turbochargers, no lag—twelve
            combustion chambers against a fixed set of physical laws. Sculpted
            by aerodynamic downforce requirements.
          </p>
          <div className="mt-6 pt-4 border-t border-lambo-border flex items-center justify-between text-[10px] font-mono tracking-widest text-lambo-yellow">
            <span>V12 // 6,498 CM³</span>
            <span>830 CV @ 8,500 RPM</span>
          </div>
        </div>
      </section>

      {/* SECTION 02: UNDER THE SKIN (CLOSURES) */}
      <section
        style={getSectionStyle(0.28, 0.33, 0.42, 0.47)}
        className="fixed inset-0 z-20 flex items-center justify-start px-6 md:px-16 pointer-events-none"
      >
        <div className="max-w-md bg-bg-pitch/80 backdrop-blur-md p-6 sm:p-8 border border-lambo-border rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
          <div className="text-xs font-mono tracking-widest text-lambo-dim flex items-center gap-2 mb-3">
            <span className="text-lambo-yellow font-bold">02 //</span>
            <span>EXPLODED CLOSURES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-lambo-white">
            UNDER THE SKIN
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans text-lambo-dim leading-relaxed">
            The bodywork decouples from the structural chassis. Scissor canopy,
            forward aero bonnet, and rear engine lid separate simultaneously to
            expose the internal cooling channels and intake plenums.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-[10px] font-mono tracking-widest">
            <div className="p-2.5 bg-bg-card border border-lambo-border">
              <span className="text-lambo-dim block">PANEL MATERIAL</span>
              <span className="text-lambo-white font-bold mt-1 block">PRE-PREG CARBON</span>
            </div>
            <div className="p-2.5 bg-bg-card border border-lambo-border">
              <span className="text-lambo-dim block">CANOPY LIFT</span>
              <span className="text-lambo-yellow font-bold mt-1 block">PNEUMATIC SCISSOR</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: THE HEART (V12 POWERTRAIN) */}
      <section
        style={getSectionStyle(0.48, 0.54, 0.65, 0.70)}
        className="fixed inset-0 z-20 flex items-center justify-end px-6 md:px-16 pointer-events-none"
      >
        <div className="max-w-lg bg-bg-pitch/85 backdrop-blur-md p-6 sm:p-8 border border-lambo-border rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
          <div className="text-xs font-mono tracking-widest text-lambo-dim flex items-center gap-2 mb-3">
            <span className="text-lambo-yellow font-bold">03 //</span>
            <span>ATMOSPHERIC PROPULSION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-lambo-white">
            THE HEART
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans text-lambo-dim leading-relaxed">
            Eight hundred and fourteen naturally aspirated horsepower delivered
            through titanium exhaust runners and an ultra-lightweight transverse
            dual-clutch transmission.
          </p>

          <div className="mt-6 space-y-2 text-[10px] font-mono tracking-widest">
            <div className="flex justify-between py-1.5 border-b border-lambo-border">
              <span className="text-lambo-dim">CONFIGURATION</span>
              <span className="text-lambo-white font-semibold">V12 60° DRY SUMP</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-lambo-border">
              <span className="text-lambo-dim">DISPLACEMENT</span>
              <span className="text-lambo-white font-semibold">6,498 CM³</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-lambo-border">
              <span className="text-lambo-yellow font-bold">814 CV @ 9,250 RPM</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-lambo-border">
              <span className="text-lambo-dim">REDLINE CUT</span>
              <span className="text-lambo-yellow font-bold">9,500 RPM</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: THE MONOCOQUE STRUCTURE */}
      <section
        style={getSectionStyle(0.68, 0.74, 0.85, 0.90)}
        className="fixed inset-0 z-20 flex items-center justify-start px-6 md:px-16 pointer-events-none"
      >
        <div className="max-w-lg bg-bg-pitch/85 backdrop-blur-md p-6 sm:p-8 border border-lambo-border rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
          <div className="text-xs font-mono tracking-widest text-lambo-dim flex items-center gap-2 mb-3">
            <span className="text-lambo-yellow font-bold">04 //</span>
            <span>FORGED COMPOSITE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-lambo-white">
            THE CHASSIS
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans text-lambo-dim leading-relaxed">
            The monocoque tub and front structure are crafted entirely from
            forged carbon composite—delivering exceptional torsional stiffness
            while maintaining a flyweight dry mass.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-[10px] font-mono tracking-widest">
            <div className="p-3 bg-bg-card border border-lambo-border">
              <span className="text-lambo-dim block">TORSIONAL RIGIDITY</span>
              <span className="text-lambo-yellow font-bold text-xs mt-1 block">
                40,000 NM/DEG
              </span>
            </div>
            <div className="p-3 bg-bg-card border border-lambo-border">
              <span className="text-lambo-dim block">DRY MASS</span>
              <span className="text-lambo-white font-bold text-xs mt-1 block">
                1,470 KG
              </span>
            </div>
            <div className="p-3 bg-bg-card border border-lambo-border">
              <span className="text-lambo-dim block">BRAKE ROTORS</span>
              <span className="text-lambo-white font-bold text-xs mt-1 block">
                410 MM CCM-R
              </span>
            </div>
            <div className="p-3 bg-bg-card border border-lambo-border">
              <span className="text-lambo-dim block">SUSPENSION</span>
              <span className="text-lambo-yellow font-bold text-xs mt-1 block">
                PUSH-ROD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: FINAL REASSEMBLY */}
      <section
        style={getSectionStyle(0.88, 0.94, 0.99, 1.0)}
        className="fixed inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <div className="max-w-2xl bg-bg-pitch/90 backdrop-blur-xl p-8 sm:p-12 border border-lambo-border rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.95)]">
          <div className="text-xs font-mono tracking-[0.3em] text-lambo-yellow uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lambo-yellow" />
            <span>DECONSTRUCTION COMPLETE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-lambo-white leading-tight">
            ENGINEERED WITHOUT <br />
            <span className="text-lambo-yellow">COMPROMISE.</span>
          </h2>

          <p className="mt-6 text-xs sm:text-sm font-sans text-lambo-dim max-w-lg mx-auto leading-relaxed">
            The machine stands deconstructed into its purest physical form. Every
            gram accounted for, every aerodynamic line sculpted for ultimate
            circuit supremacy.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => jumpToProgress(0.0)}
              className="px-8 py-3.5 bg-lambo-yellow hover:bg-lambo-yellowHover text-black font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(230,184,0,0.3)]"
            >
              REASSEMBLE HYPERCAR
            </button>
            <button
              onClick={() => setSpecsOpen(true)}
              className="px-8 py-3.5 border border-lambo-border hover:border-lambo-yellow bg-bg-carbon text-lambo-white font-mono text-xs tracking-widest uppercase transition-all"
            >
              VIEW FULL TELEMETRY
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-lambo-border/60 text-[9px] font-mono text-lambo-faint tracking-widest uppercase">
            AUTOMOBILI LAMBORGHINI S.P.A. // SANT&apos;AGATA BOLOGNESE // MMXXVI
          </div>
        </div>
      </section>
    </main>
  );
}
