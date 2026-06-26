import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { Tag, Clock } from "lucide-react";

export function VersionHistory() {
  const versions = [
    {
      version: "v1.0.0",
      date: "June 2026",
      title: "Initial System Launch",
      changes: [
        "React + Vite + Tailwind CSS v4 design implementation",
        "Cinematic Hero Orb utilizing R3F distortion mesh",
        "8-Layer background canvas composite and spotlight",
        "Command Palette and custom cursor spring animations"
      ]
    },
    {
      version: "v1.1.0 (Active)",
      date: "Active",
      title: "Identity & Governance Refinement",
      changes: [
        "Swapped design language colors to Crimson/Orange/Gold fire theme",
        "Renamed About to My Journey & integrated Engineering Philosophy",
        "Implemented Leadership & Social Impact nonprofit indicators",
        "Fixed cursor pointer-event overlays inside project modals"
      ]
    }
  ];

  return (
    <SectionWrapper id="changelog" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">09 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          System Changelog
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10 flex flex-col gap-6 text-left">
        {versions.reverse().map((v, idx) => (
          <motion.div
            key={v.version}
            className="glass-panel p-6 rounded-xl border border-white/5 bg-white/2 relative overflow-hidden flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-orange" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-1.5 text-xs text-soft-white font-mono font-bold">
                <Tag size={12} className="text-accent-orange" />
                <span>{v.version}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-white/30">
                <Clock size={10} />
                <span>{v.date}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-soft-white font-display">
                {v.title}
              </h4>
              <ul className="flex flex-col gap-2 pl-4 list-disc text-xs text-muted-gray leading-relaxed font-sans">
                {v.changes.map((change, cIdx) => (
                  <li key={cIdx} className="marker:text-accent-orange/70">
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
