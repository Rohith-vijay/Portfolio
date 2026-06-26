import { useEffect, useState } from "react";
import { ParticleCanvas } from "./ParticleCanvas";
import { usePrefersReduced } from "../../hooks/usePrefersReduced";

interface CosmicRegion {
  name: string;
  distance: string;
  gradient: string;
  aurora1: string;
  aurora2: string;
  particleColor: string;
}

const COSMIC_REGIONS: CosmicRegion[] = [
  {
    name: "The Sun (Core Origin)",
    distance: "0.00 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #2b1010, #ef444405)",
    aurora1: "bg-accent-crimson/8",
    aurora2: "bg-accent-orange/6",
    particleColor: "rgba(249, 115, 22, 0.4)", // Orange/Ember
  },
  {
    name: "Mercury Orbit",
    distance: "0.39 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #1f1414, #ff704305)",
    aurora1: "bg-accent-crimson/5",
    aurora2: "bg-accent-orange/4",
    particleColor: "rgba(255, 112, 67, 0.3)",
  },
  {
    name: "Venus Orbit",
    distance: "0.72 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #241a15, #ffb30005)",
    aurora1: "bg-accent-orange/5",
    aurora2: "bg-accent-gold/4",
    particleColor: "rgba(255, 179, 0, 0.3)",
  },
  {
    name: "Earth Orbit (The Oasis)",
    distance: "1.00 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #0f2027, #203a4305)",
    aurora1: "bg-blue-500/6",
    aurora2: "bg-cyan-500/4",
    particleColor: "rgba(56, 189, 248, 0.4)", // Cyan
  },
  {
    name: "Mars Orbit",
    distance: "1.52 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #2a0f0f, #bf360c05)",
    aurora1: "bg-accent-crimson/6",
    aurora2: "bg-accent-orange/3",
    particleColor: "rgba(239, 68, 68, 0.3)",
  },
  {
    name: "Asteroid Belt",
    distance: "2.77 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #18191d, #455a6405)",
    aurora1: "bg-slate-500/5",
    aurora2: "bg-zinc-600/4",
    particleColor: "rgba(248, 250, 252, 0.2)",
  },
  {
    name: "Jupiter (Gas Giant)",
    distance: "5.20 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #2b1f1a, #a1887f05)",
    aurora1: "bg-amber-600/5",
    aurora2: "bg-accent-orange/3",
    particleColor: "rgba(234, 179, 8, 0.3)",
  },
  {
    name: "Saturn (Rings System)",
    distance: "9.58 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #2d2a20, #ffe08205)",
    aurora1: "bg-yellow-600/5",
    aurora2: "bg-accent-gold/4",
    particleColor: "rgba(253, 224, 71, 0.3)",
  },
  {
    name: "Uranus Orbit",
    distance: "19.22 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #102a3a, #00acc105)",
    aurora1: "bg-teal-500/5",
    aurora2: "bg-cyan-600/4",
    particleColor: "rgba(34, 211, 238, 0.3)",
  },
  {
    name: "Neptune Orbit",
    distance: "30.05 AU",
    gradient: "linear-gradient(to bottom, #0a0a0c, #0d1b2a, #0f4c5c05)",
    aurora1: "bg-blue-600/6",
    aurora2: "bg-indigo-500/4",
    particleColor: "rgba(59, 130, 246, 0.35)",
  },
  {
    name: "Kuiper Belt",
    distance: "50.00 AU",
    gradient: "linear-gradient(to bottom, #050508, #0b0c10, #1f283305)",
    aurora1: "bg-indigo-950/20",
    aurora2: "bg-slate-900/10",
    particleColor: "rgba(148, 163, 184, 0.2)",
  },
  {
    name: "Deep Cosmic Space",
    distance: "150.0 AU",
    gradient: "linear-gradient(to bottom, #020205, #03071e, #37061705)",
    aurora1: "bg-purple-950/15",
    aurora2: "bg-rose-950/10",
    particleColor: "rgba(217, 70, 239, 0.25)",
  },
  {
    name: "Milky Way Galaxy Core",
    distance: "26,000 LY",
    gradient: "linear-gradient(to bottom, #010103, #13001f, #7b2cbf05)",
    aurora1: "bg-purple-500/6",
    aurora2: "bg-fuchsia-500/4",
    particleColor: "rgba(168, 85, 247, 0.4)", // Violet/Purple
  }
];

export function BackgroundSystem() {
  const prefersReduced = usePrefersReduced();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentRegion, setCurrentRegion] = useState<CosmicRegion>(COSMIC_REGIONS[0]);

  useEffect(() => {
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      
      const rawProgress = scrollY / maxScroll;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(progress);

      // Find region index matching progress
      const regionIndex = Math.min(
        Math.floor(progress * COSMIC_REGIONS.length),
        COSMIC_REGIONS.length - 1
      );
      setCurrentRegion(COSMIC_REGIONS[regionIndex]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prefersReduced]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0 bg-bg-primary">
      {/* Layer 1: HSL Base Gradient Mesh (Smoothly transitions based on cosmic region) */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out" 
        style={{ background: currentRegion.gradient }}
      />

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

      {/* Layer 3: Dynamic Glowing Auroras */}
      {!prefersReduced && (
        <>
          <div className={`absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full ${currentRegion.aurora1} blur-[130px] animate-aurora-slow transition-all duration-1000`} />
          <div className={`absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] rounded-full ${currentRegion.aurora2} blur-[130px] animate-aurora-slow transition-all duration-1000`} style={{ animationDelay: "-5s" }} />
        </>
      )}

      {/* Layer 4: Connection Network Particles with dynamically managed colors */}
      <ParticleCanvas particleColor={currentRegion.particleColor} />

      {/* Layer 5: Organic Noise Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Layer 6: Dynamic Mouse Spotlight Tracking */}
      {!prefersReduced && (
        <div 
          className="absolute inset-0 mix-blend-screen opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.04), transparent 80%)`
          }}
        />
      )}

      {/* Layer 7: Floating Space Galaxies and Nebula Clouds */}
      {!prefersReduced && (
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-[20%] right-[15%] w-72 h-72 rounded-full bg-accent-orange/2 blur-3xl animate-pulse-slow transition-transform duration-500 ease-out" 
            style={{ transform: `translateY(${scrollProgress * -100}px)` }}
          />
          <div 
            className="absolute bottom-[30%] left-[10%] w-96 h-96 rounded-full bg-accent-crimson/2 blur-3xl animate-pulse-slow transition-transform duration-500 ease-out" 
            style={{ animationDuration: '6s', transform: `translateY(${scrollProgress * 80}px)` }}
          />
        </div>
      )}


      {/* Layer 8: Pulsing Star Field & Shooting Stars */}
      {/* Layer 8: Progressive Pulsing Star Field based on scroll depth */}
      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: 0.2 + scrollProgress * 0.6 }}>
        <div className="absolute top-[12%] left-[18%] w-[1.5px] h-[1.5px] rounded-full bg-white animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[48%] left-[82%] w-[1px] h-[1px] rounded-full bg-white animate-pulse" style={{ animationDuration: '4.5s' }} />
        <div className="absolute top-[72%] left-[28%] w-[1.5px] h-[1.5px] rounded-full bg-white animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-[28%] left-[72%] w-[2px] h-[2px] rounded-full bg-white animate-pulse" style={{ animationDuration: '5.5s' }} />
        <div className="absolute top-[85%] left-[62%] w-[1.2px] h-[1.2px] rounded-full bg-white animate-pulse" style={{ animationDuration: '3.5s' }} />
        
        {/* Dynamic stars appearing as journey deepens */}
        {scrollProgress > 0.2 && (
          <>
            <div className="absolute top-[22%] left-[45%] w-[1.5px] h-[1.5px] rounded-full bg-white animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-[60%] left-[15%] w-[1px] h-[1px] rounded-full bg-white animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute top-[80%] left-[78%] w-[2px] h-[2px] rounded-full bg-white animate-pulse" style={{ animationDuration: '5s' }} />
          </>
        )}
        {scrollProgress > 0.5 && (
          <>
            <div className="absolute top-[35%] left-[88%] w-[1px] h-[1px] rounded-full bg-white animate-pulse" style={{ animationDuration: '2.5s' }} />
            <div className="absolute top-[15%] left-[65%] w-[2px] h-[2px] rounded-full bg-white animate-pulse" style={{ animationDuration: '3.5s' }} />
            <div className="absolute top-[90%] left-[30%] w-[1.5px] h-[1.5px] rounded-full bg-white animate-pulse" style={{ animationDuration: '4.5s' }} />
          </>
        )}

        {/* Parallax space dust details */}
        <div 
          className="absolute top-[5%] left-[40%] w-[1.5px] h-[1.5px] rounded-full bg-white opacity-60 transition-transform duration-300"
          style={{ transform: `translateY(${scrollProgress * -250}px)` }}
        />
        <div 
          className="absolute top-[65%] left-[85%] w-[2px] h-[2px] rounded-full bg-white opacity-85 transition-transform duration-300"
          style={{ transform: `translateY(${scrollProgress * -180}px)` }}
        />
        <div 
          className="absolute top-[80%] left-[15%] w-[1px] h-[1px] rounded-full bg-white opacity-40 transition-transform duration-300"
          style={{ transform: `translateY(${scrollProgress * -300}px)` }}
        />
      </div>

      {/* Layer 9: Shooting Stars (Meteor showers triggered dynamically at deep space progress) */}
      {!prefersReduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500" style={{ opacity: 0.3 + scrollProgress * 0.7 }}>
          <div className="absolute top-[10%] left-[30%] w-[120px] h-[1px] bg-gradient-to-r from-accent-orange/80 to-transparent rotate-[35deg] origin-left animate-shooting-star" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[40%] left-[60%] w-[150px] h-[1px] bg-gradient-to-r from-accent-gold/80 to-transparent rotate-[35deg] origin-left animate-shooting-star" style={{ animationDelay: '4s', animationDuration: '6s' }} />
          <div className="absolute top-[25%] left-[75%] w-[100px] h-[1px] bg-gradient-to-r from-accent-crimson/60 to-transparent rotate-[35deg] origin-left animate-shooting-star" style={{ animationDelay: '8s', animationDuration: '9s' }} />
        </div>
      )}

      {/* Layer 10: Dynamic Discoverable Planetary Silhouettes mapped precisely to scroll milestones */}
      {!prefersReduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Mercury - Visible early in journey */}
          <div 
            className="absolute top-[15%] right-[25%] w-16 h-16 rounded-full border border-white/5 bg-gradient-to-tr from-black to-transparent shadow-2xl transition-all duration-1000 ease-out"
            style={{
              opacity: scrollProgress > 0.05 && scrollProgress < 0.25 ? (0.25 - Math.abs(scrollProgress - 0.15) * 2.5) : 0,
              transform: `translateY(${scrollProgress * -60}px) scale(0.8)`,
              background: `radial-gradient(circle at 70% 30%, rgba(255, 112, 67, 0.2) 0%, rgba(0,0,0,0.95) 75%)`
            }}
          />
          {/* Earth - Visible mid journey */}
          <div 
            className="absolute top-[35%] left-[15%] w-24 h-24 rounded-full border border-white/5 bg-gradient-to-tr from-black to-transparent shadow-2xl transition-all duration-1000 ease-out"
            style={{
              opacity: scrollProgress > 0.25 && scrollProgress < 0.5 ? (0.3 - Math.abs(scrollProgress - 0.35) * 3.0) : 0,
              transform: `translateY(${scrollProgress * -40}px)`,
              background: `radial-gradient(circle at 65% 35%, rgba(56, 189, 248, 0.25) 0%, rgba(0,0,0,0.95) 75%)`
            }}
          />
          {/* Jupiter - Massive planet deep in space */}
          <div 
            className="absolute bottom-[20%] right-[8%] w-64 h-64 rounded-full border border-white/5 bg-gradient-to-tr from-black to-transparent shadow-2xl transition-all duration-1000 ease-out"
            style={{
              opacity: scrollProgress > 0.5 && scrollProgress < 0.85 ? (0.25 - Math.abs(scrollProgress - 0.7) * 1.5) : 0,
              transform: `translateY(${scrollProgress * -30}px) scale(1.1)`,
              background: `radial-gradient(circle at 75% 25%, rgba(234, 179, 8, 0.15) 0%, rgba(0,0,0,0.95) 80%)`
            }}
          />
        </div>
      )}

      {/* Travelling Light Scroll Guide Ray */}
      {!prefersReduced && (
        <div 
          className="scroll-light-ray" 
          style={{ top: `${15 + scrollProgress * 70}%` }} 
        />
      )}

      {/* Dynamic Cosmic HUD Overlays for Space Travel Storytelling */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col gap-1 font-mono text-[10px] tracking-widest text-white/30 hover:text-white/60 transition-colors pointer-events-auto bg-slate-950/20 backdrop-blur-md p-3 rounded-lg border border-white/5 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping" />
          <span>COSMIC HUD: ACTIVATED</span>
        </div>
        <div>REGION: <span className="text-soft-white font-bold">{currentRegion.name.toUpperCase()}</span></div>
        <div>COORDINATE: <span className="text-accent-gold">{currentRegion.distance}</span></div>
        <div>PROGRESS: <span className="text-accent-cyan">{(scrollProgress * 100).toFixed(0)}%</span></div>
      </div>
    </div>
  );
}
