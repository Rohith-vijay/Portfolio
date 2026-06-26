import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { certifications } from "../data/certifications";
import type { Certification } from "../data/certifications";
import { Award, CheckCircle2, RotateCw, ExternalLink, Calendar, Shield } from "lucide-react";
import { cn } from "../utils/cn";

const CATEGORIES = [
  "All",
  "Programming",
  "Cloud",
  "AI",
  "Databases",
  "English",
  "Competitive Programming",
  "Academic"
];

function CertCard({ cert }: { cert: Certification }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            <CheckCircle2 size={9} /> Verified
          </span>
        );
      case "Currently Pursuing":
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-400 font-semibold uppercase tracking-wider animate-pulse">
            <RotateCw size={9} className="animate-spin" style={{ animationDuration: '3s' }} /> Pursuing
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400 font-semibold uppercase tracking-wider">
            <Calendar size={9} /> Planned
          </span>
        );
    }
  };

  return (
    <div 
      className="h-[260px] w-full [perspective:1000px] select-none cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass-panel rounded-xl border border-white/5 bg-slate-950/40 flex flex-col overflow-hidden text-left shadow-lg transition-all duration-300 group-hover:border-white/10 group-hover:shadow-accent-orange/5">
          {/* Header Image Cover */}
          <div className="h-20 w-full relative overflow-hidden bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent z-10" />
            {cert.imageUrl ? (
              <img 
                src={cert.imageUrl} 
                alt={cert.name}
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-accent-crimson/10 to-accent-orange/10" />
            )}
            
            {/* Top Tag & Status */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
              <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/70 uppercase tracking-widest">
                {cert.category}
              </span>
              {getStatusBadge(cert.status)}
            </div>
          </div>

          <div className="p-5 flex flex-col flex-1 gap-2 justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-accent-orange uppercase tracking-wider">{cert.issuer}</span>
              <h4 className="text-xs md:text-sm font-bold text-soft-white leading-snug line-clamp-2 font-display">
                {cert.name}
              </h4>
            </div>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-1 mt-auto">
              {cert.skills.slice(0, 3).map((sk) => (
                <span key={sk} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-white/50 font-mono">
                  {sk}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-accent-gold font-mono">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel p-6 rounded-xl border border-white/10 bg-slate-950/95 flex flex-col justify-between text-left shadow-xl"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) {
              e.stopPropagation();
            }
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-muted-gray uppercase">CREDENTIAL_AUTHENTICATOR</span>
                <h4 className="text-xs font-semibold text-soft-white font-mono flex items-center gap-1.5">
                  <Shield size={12} className="text-accent-orange" />
                  <span>ID: {cert.credentialId}</span>
                </h4>
              </div>
              <div className="p-2 rounded-lg bg-white/5 text-accent-orange">
                <Award size={16} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-white/70 font-mono">SKILLS ACQUIRED:</span>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((sk) => (
                  <span key={sk} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-accent-cyan font-mono">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-[10px] text-muted-gray font-mono">
              Date: <span className="text-white/80">{cert.date}</span>
            </div>
          </div>

          {cert.verificationUrl && cert.status === "Completed" ? (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[11px] font-semibold text-soft-white mt-auto transition-colors cursor-pointer select-none"
            >
              <span>Verify Credential</span>
              <ExternalLink size={10} className="text-accent-orange" />
            </a>
          ) : (
            <div className="py-2.5 rounded-lg bg-white/3 border border-white/5 text-[11px] text-center text-white/30 font-mono mt-auto">
              Verification Link Pending
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Certifications() {
  const [activeTab, setActiveTab] = useState("All");

  // Filter and sort: Completed first, then Currently Pursuing, then Planned
  const filteredCertifications = useMemo(() => {
    const list = activeTab === "All" 
      ? certifications 
      : certifications.filter(c => c.category === activeTab);
    
    return [...list].sort((a, b) => {
      const order = { "Completed": 1, "Currently Pursuing": 2, "Planned": 3 };
      return order[a.status] - order[b.status];
    });
  }, [activeTab]);

  return (
    <SectionWrapper id="certifications" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">07 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Credential Registry
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5 z-20 relative">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300 cursor-pointer select-none",
              activeTab === cat
                ? "bg-gradient-to-r from-accent-crimson to-accent-orange text-soft-white border-transparent shadow-lg"
                : "bg-white/3 border-white/5 text-muted-gray hover:text-soft-white hover:bg-white/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredCertifications.map((cert) => (
            <motion.div
              key={cert.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
