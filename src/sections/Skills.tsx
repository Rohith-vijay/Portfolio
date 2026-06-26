import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { skillCategories } from "../data/skills";
import { TechStackCloud } from "../components/three/TechStackCloud";
import { cn } from "../utils/cn";

export function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SectionWrapper id="skills" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan">03 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Technical Core &amp; Stack
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mt-1" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Tab Selector & Skills Details (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Tab Selection Row */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-300 cursor-pointer select-none",
                  activeTab === idx
                    ? "bg-gradient-to-r from-accent-purple to-accent-blue text-soft-white border-transparent shadow-lg"
                    : "bg-white/3 border-white/5 text-muted-gray hover:text-soft-white hover:bg-white/5"
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active Skills List with Progress Tracks */}
          <div className="glass-panel p-6 rounded-xl min-h-[300px] flex flex-col gap-5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
              >
                {skillCategories[activeTab].skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-soft-white font-display">{skill.name}</span>
                      <span className="text-accent-cyan font-mono">{skill.proficiency}%</span>
                    </div>
                    {/* Proficiency bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: 3D orbiting tech cloud (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-sm rounded-2xl glass-panel p-4 relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-accent-cyan to-accent-blue" />
            <TechStackCloud />
            <div className="text-center font-mono text-[9px] text-white/20 uppercase tracking-widest mt-2">
              DRAG ORB TO INTERACT IN 3D
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
