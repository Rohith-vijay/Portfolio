import { useEffect, useState } from "react";
import { ParticleCanvas } from "./ParticleCanvas";
import { usePrefersReduced } from "../../hooks/usePrefersReduced";

export function BackgroundSystem() {
  const prefersReduced = usePrefersReduced();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReduced]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0 bg-bg-primary">
      {/* Layer 1: HSL Base Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-[#0a0524] opacity-100" />

      {/* Layer 2: Glowing Intersections Vector Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Layer 3: Aurora Glowing Auroras */}
      {!prefersReduced && (
        <>
          <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-purple/8 blur-[130px] animate-aurora-slow" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] rounded-full bg-accent-blue/6 blur-[130px] animate-aurora-slow" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full bg-accent-cyan/4 blur-[110px] animate-aurora-slow" style={{ animationDelay: "-10s" }} />
        </>
      )}

      {/* Layer 4: Connection Network Particles */}
      <ParticleCanvas />

      {/* Layer 5: Organic Noise Grain Overlay (SVG filter emulation) */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Layer 6: Dynamic Mouse Spotlight Tracking */}
      {!prefersReduced && (
        <div 
          className="absolute inset-0 mix-blend-screen opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.05), transparent 80%)`
          }}
        />
      )}

      {/* Layer 7: Floating Soft Blur Blobs */}
      {!prefersReduced && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[15%] w-72 h-72 rounded-full bg-accent-cyan/3 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-[30%] left-[10%] w-96 h-96 rounded-full bg-accent-purple/3 blur-3xl animate-pulse-slow" style={{ animationDuration: '6s' }} />
        </div>
      )}

      {/* Layer 8: Pulsing Star Field */}
      <div className="absolute inset-0 opacity-35">
        <div className="absolute top-[12%] left-[18%] w-[1.5px] h-[1.5px] rounded-full bg-white animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[48%] left-[82%] w-[1px] h-[1px] rounded-full bg-white animate-pulse" style={{ animationDuration: '4.5s' }} />
        <div className="absolute top-[72%] left-[28%] w-[1.5px] h-[1.5px] rounded-full bg-white animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-[28%] left-[72%] w-[2px] h-[2px] rounded-full bg-white animate-pulse" style={{ animationDuration: '5.5s' }} />
        <div className="absolute top-[85%] left-[62%] w-[1.2px] h-[1.2px] rounded-full bg-white animate-pulse" style={{ animationDuration: '3.5s' }} />
      </div>
    </div>
  );
}
