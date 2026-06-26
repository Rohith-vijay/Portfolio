import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { ExternalLink, ArrowRight, ShieldCheck, Database, Server } from "lucide-react";
import { Github } from "../components/ui/BrandIcons";

interface ProjectsProps {
  onProjectSelect: (project: Project) => void;
  onFlagshipSelect: () => void;
}

export function Projects({ onProjectSelect, onFlagshipSelect }: ProjectsProps) {
  return (
    <SectionWrapper id="projects" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">04 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Featured Engineering Showcases
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Projects Display Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Flagship Highlight Container (12 Cols Span on Top) */}
        {projects.filter(p => p.id === "trust-platform").map((flagship) => (
          <motion.div
            key={flagship.id}
            className="lg:col-span-12 glass-panel rounded-2xl overflow-hidden border border-white/8 hover:border-accent-orange/40 shadow-[0_20px_50px_rgba(249,115,22,0.1)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-500 flex flex-col md:flex-row group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Visual Screen Cover left/top */}
            <div className="w-full md:w-[55%] relative h-64 md:h-auto overflow-hidden bg-slate-950">
              <img
                src={flagship.mockupUrl}
                alt={flagship.title}
                className="w-full h-full object-cover opacity-60 filter brightness-90 saturate-110 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg-secondary via-transparent to-transparent" />
            </div>

            {/* Spec Details right/bottom */}
            <div className="w-full md:w-[45%] p-8 flex flex-col gap-5 text-left justify-center">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-orange bg-accent-orange/10 border border-accent-orange/20 px-2.5 py-0.5 rounded-full w-max">
                  FLAGSHIP PLATFORM DEEP DIVE
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-soft-white tracking-tight">
                  {flagship.title}
                </h3>
                <p className="text-xs font-mono text-muted-gray">{flagship.tagline}</p>
              </div>

              <p className="text-xs text-muted-gray leading-relaxed font-sans">
                {flagship.overview}
              </p>

              {/* Mini tech traits */}
              <div className="flex flex-wrap gap-2 border-y border-white/5 py-4">
                <div className="flex items-center gap-1 text-[11px] text-soft-white font-display">
                  <Server size={12} className="text-accent-crimson" />
                  <span>Spring Boot</span>
                </div>
                <span className="text-white/20">•</span>
                <div className="flex items-center gap-1 text-[11px] text-soft-white font-display">
                  <Database size={12} className="text-accent-orange" />
                  <span>PostgreSQL</span>
                </div>
                <span className="text-white/20">•</span>
                <div className="flex items-center gap-1 text-[11px] text-soft-white font-display">
                  <ShieldCheck size={12} className="text-accent-gold" />
                  <span>JWT Tokens</span>
                </div>
              </div>

              {/* Action launchers */}
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={onFlagshipSelect}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-accent-crimson to-accent-orange text-xs font-bold text-soft-white shadow-lg hover:shadow-accent-orange/15 hover:scale-102 transition-all duration-300 cursor-pointer"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={14} />
                </button>
                
                <div className="flex items-center gap-3">
                  <a
                    href={flagship.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/5 text-muted-gray hover:text-soft-white transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={flagship.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/5 text-muted-gray hover:text-soft-white transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Secondary project blocks (2 Columns) */}
        {projects.filter(p => p.id !== "trust-platform").map((proj, idx) => (
          <motion.div
            key={proj.id}
            onClick={() => onProjectSelect(proj)}
            className="lg:col-span-6 glass-panel rounded-xl overflow-hidden flex flex-col hover:translate-y-[-4px] hover:border-white/20 transition-all duration-300 cursor-pointer group relative border-glow-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            {/* Visual thumbnail top */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img
                src={proj.mockupUrl}
                alt={proj.title}
                className="w-full h-full object-cover opacity-45 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary" />
            </div>

            {/* Meta details bottom */}
            <div className="p-6 flex flex-col gap-4 text-left flex-grow">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono text-accent-orange uppercase tracking-wider">{proj.tagline}</span>
                <h4 className="text-lg font-bold text-soft-white font-display leading-tight group-hover:text-accent-orange transition-colors">
                  {proj.title}
                </h4>
              </div>

              <p className="text-xs text-muted-gray leading-relaxed font-sans line-clamp-3">
                {proj.overview}
              </p>

              {/* Action buttons footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 text-xs text-soft-white font-semibold">
                <span className="text-accent-orange group-hover:text-accent-gold transition-colors flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={proj.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded bg-white/3 text-muted-gray hover:text-soft-white"
                    aria-label="GitHub Repository"
                  >
                    <Github size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </SectionWrapper>
  );
}
