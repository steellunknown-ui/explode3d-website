import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AUTOMOBILI LAMBORGHINI — Exploded View Aerodynamics & Powertrain",
  description: "An interactive, scroll-driven deconstruction of the naturally aspirated Lamborghini V12 hypercar. Inspect closures, mechanicals, powertrain, and carbon monocoque architecture in full 4K frame fidelity.",
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-bg-pitch text-lambo-ink selection:bg-lambo-yellow selection:text-black">
        {/* Cinematic Film Grain */}
        <div id="grain" aria-hidden="true" />
        {/* Cinematic Radial Vignette */}
        <div id="vignette" aria-hidden="true" />
        {/* Subtle Ambient Studio Glow */}
        <div className="ambient-glow top-1/4 left-1/3" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  );
}
