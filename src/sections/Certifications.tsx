import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { certifications } from "../data/certifications";
import type { Certification } from "../data/certifications";
import { Award, CheckCircle2, RotateCw, ExternalLink } from "lucide-react";

function CertCard({ cert }: { cert: Certification }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-[220px] w-full [perspective:1000px] select-none cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        
        {/* CARD FRONT LAYER */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass-panel p-6 rounded-xl border border-white/5 bg-white/2 flex flex-col gap-4 text-left shadow-lg overflow-hidden border-glow-hover">
          <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-accent-crimson to-accent-orange" />
          
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-lg bg-accent-crimson/10 text-accent-crimson">
              <Award size={18} />
            </div>
            
            <RotateCw size={12} className="text-white/20 hover:text-soft-white transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5 mt-1">
            <span className="text-[9px] font-mono text-accent-orange uppercase tracking-wider">{cert.issuer}</span>
            <h4 className="text-sm font-bold text-soft-white font-display leading-snug line-clamp-2">
              {cert.name}
            </h4>
          </div>

          {/* Key skills chips */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {cert.skills.slice(0, 3).map((sk) => (
              <span key={sk} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-white/50 font-mono">
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* CARD BACK LAYER (Rotated 180deg) */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel p-6 rounded-xl border border-white/8 bg-slate-900/90 flex flex-col justify-center gap-4 text-left shadow-xl"
          onClick={(e) => {
            // Prevent card flip when clicking verification link
            if ((e.target as HTMLElement).closest("a")) {
              e.stopPropagation();
            }
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-muted-gray uppercase">CREDENTIAL_AUTHENTICATOR</span>
            <h4 className="text-xs font-semibold text-soft-white font-mono flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-green-400" />
              <span>ID: {cert.credentialId}</span>
            </h4>
          </div>

          <p className="text-[11px] leading-relaxed text-muted-gray font-sans">
            Issued on {cert.date}. This credential has been officially verified by {cert.issuer} database registry.
          </p>

          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[11px] font-semibold text-soft-white mt-auto transition-colors cursor-pointer select-none"
          >
            <span>Verify Credential</span>
            <ExternalLink size={10} className="text-accent-orange" />
          </a>
        </div>

      </motion.div>
    </div>
  );
}

export function Certifications() {
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

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {certifications.map((cert) => (
          <CertCard key={cert.name} cert={cert} />
        ))}
      </div>
    </SectionWrapper>
  );
}
