# AUTOMOBILI LAMBORGHINI — 3D Exploded-View Scroll Experience

An ultra-luxury, high-performance scroll-driven Canvas animation deconstructing the naturally aspirated Lamborghini V12 hypercar. Inspect every aerodynamic closure, mechanical assembly, and forged carbon monofuselage layer by layer at a locked **60 FPS**.

---

## Key Features

- **High-Performance Canvas Engine**: Zero-jank HTML5 Canvas 2D engine with dual-buffer rendering, dirty-frame caching, and aggressive RAM pre-buffering.
- **Locked 60 FPS Performance**: Decoupled scroll listener and throttled UI telemetry updates preventing React re-render bottlenecks.
- **359 Optimized 4K WebP Frames**: 
  - **Clip A**: 118 frames (Assembled → Closures decoupling)
  - **Clip B**: 91 frames (Closures suspended, internal mechanics)
  - **Clip C**: 150 frames (Powertrain separation → Bare carbon monofuselage)
- **Interactive 3D Perspective Orbit**: Hardware-accelerated dynamic 3D perspective matrix (`perspective(1200px) rotateY(...) rotateX(...)`) that tilts and tracks cursor movement with genuine automotive depth.
- **Luxury Automotive HUD & Telemetry**:
  - Live FPS and frame-rate diagnostics
  - Pinned dynamic 3D HUD reticles and leader callouts
  - Vertical precision progress scrubber rail
  - Slide-over engineering datasheet with full powertrain, monofuselage, and aerodynamic kinematics specs
- **Procedural Web Audio Haptics**: Pure Web Audio API procedural sound synthesizer providing tactile mechanical feedback on section milestones and button interactions without external sound files.
- **Cinematic Visual Identity**:
  - Deep Carbon Black (`#050507`) & *Giallo Midas* Pearl Yellow (`#E6B800`) bespoke Lamborghini palette
  - Procedural SVG fractal noise film grain overlay
  - 130% studio radial vignette

---

## Tech Stack

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Typography**: Google Archivo & IBM Plex Mono
- **Audio Engine**: Web Audio API Procedural Synthesizer
- **Asset Pipeline**: Python, Pillow, OpenCV (Lanczos WebP encoding, unsharp mask clarity enhancement)

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/steellunknown-ui/explode3d-website.git
cd explode3d-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the site.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```text
3d-Website/
├── app/
│   ├── globals.css          # Theme variables, film grain, vignette
│   ├── layout.tsx           # Typography & metadata configuration
│   └── page.tsx             # Main narrative chapters & scroll container
├── components/
│   ├── LamboCanvas.tsx      # 60FPS scroll canvas engine & 3D tilt orbit
│   ├── Navigation.tsx       # Top brand header & telemetry trigger
│   ├── VerticalRail.tsx     # Right-side vertical precision scrubber
│   ├── BottomHud.tsx        # Diagnostics HUD, FPS monitor & scroll hint
│   ├── HudAnnotations.tsx   # Pinned 3D vehicle leader tags
│   ├── TechnicalSpecsDrawer.tsx # Engineering blueprint datasheet
│   └── SoundEffects.ts      # Procedural Web Audio synthesizer
├── public/
│   └── frames/              # 359 optimized WebP sequence frames
│       ├── clipA/
│       ├── clipB/
│       └── clipC/
├── original-videos/         # Source MP4 reference videos
└── scripts/
    ├── process_frames.py    # Automated WebP extraction & optimization
    └── enhance_sharpness.py # Micro-contrast & edge clarity enhancer
```

---

## License

This project is a concept study created for technical demonstration and portfolio purposes. Automotive marques and trademarks belong to their respective owners.

