import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, Cpu, BarChart3, Settings } from "lucide-react";
import { Github } from "./BrandIcons";
import type { Project } from "../../data/projects";
import { cn } from "../../utils/cn";
import { useState } from "react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "architecture" | "challenges">("overview");

  if (!project) return null;

  const tabs = [
    { id: "overview", label: "Overview", icon: Cpu },
    { id: "architecture", label: "Architecture", icon: Settings },
    { id: "challenges", label: "Challenges & Metrics", icon: BarChart3 }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-3xl glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.6)] flex flex-col my-8"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Hero Banner Area */}
          <div className="relative h-48 md:h-64 overflow-hidden bg-slate-950">
            <img
              src={project.mockupUrl}
              alt={project.title}
              className="w-full h-full object-cover opacity-50 filter brightness-90 saturate-110"
            />
            {/* Dark gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-black/20" />
            
            {/* Title / Tags */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1.5 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan bg-white/5 border border-white/8 px-2 py-0.5 rounded-full w-max">
                PROJECT SPECIFICATION
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-soft-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm text-white/70 font-display font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-lg bg-black/40 border border-white/5 text-muted-gray hover:text-soft-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-white/5 bg-white/1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={cn(
                    "flex-1 py-3.5 flex items-center justify-center gap-2 text-xs font-semibold border-b-2 transition-all duration-300 cursor-pointer select-none",
                    activeSubTab === tab.id
                      ? "border-accent-cyan text-soft-white bg-white/3"
                      : "border-transparent text-muted-gray hover:text-soft-white"
                  )}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable details wrapper */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[380px] flex flex-col gap-6 text-left">
            {activeSubTab === "overview" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">Problem Statement</h4>
                  <p className="text-xs leading-relaxed text-muted-gray">{project.problem}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">The Solution</h4>
                  <p className="text-xs leading-relaxed text-muted-gray">{project.solution}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">Core Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feat) => (
                      <div key={feat.title} className="p-4 rounded-xl bg-white/2 border border-white/5 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-soft-white font-display">
                          <ShieldCheck size={12} className="text-accent-cyan" />
                          <span>{feat.title}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-muted-gray">{feat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === "architecture" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">Deployment Architecture</h4>
                  <ol className="flex flex-col gap-2.5">
                    {project.architecture.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-muted-gray">
                        <span className="font-mono text-accent-purple font-semibold bg-accent-purple/10 px-2 py-0.5 rounded text-[10px]">0{idx+1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-soft-white font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === "challenges" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">Engineering Bottlenecks</h4>
                    <ul className="flex flex-col gap-3">
                      {project.challenges.map((ch, idx) => (
                        <li key={idx} className="text-[11px] leading-relaxed text-muted-gray border-l-2 border-red-500/50 pl-3">
                          {ch}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">Resolutions Applied</h4>
                    <ul className="flex flex-col gap-3">
                      {project.solutions.map((sol, idx) => (
                        <li key={idx} className="text-[11px] leading-relaxed text-muted-gray border-l-2 border-green-500/50 pl-3">
                          {sol}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-2 flex flex-col gap-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan">Impact Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {project.metrics.map((met) => (
                      <div key={met.label} className="p-4 rounded-xl bg-white/2 border border-white/5 text-center flex flex-col gap-1">
                        <span className="text-xl md:text-2xl font-display font-extrabold text-accent-cyan">{met.value}</span>
                        <span className="text-[9px] font-mono text-muted-gray uppercase tracking-wider">{met.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Links */}
          <div className="flex items-center justify-between p-6 bg-white/2 border-t border-white/5">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-soft-white transition-colors cursor-pointer select-none"
            >
              <Github size={14} />
              <span>GitHub Code</span>
            </a>

            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-xs font-semibold text-soft-white transition-colors cursor-pointer select-none"
            >
              <ExternalLink size={14} />
              <span>Launch Application</span>
            </a>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
