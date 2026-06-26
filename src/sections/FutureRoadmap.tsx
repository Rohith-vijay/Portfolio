import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { futureGoals } from "../data/futureGoals";
import { Calendar, Target } from "lucide-react";

export function FutureRoadmap() {
  return (
    <SectionWrapper id="roadmap" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">08 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Research Roadmap &amp; Goals
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Roadmap List */}
      <div className="max-w-2xl mx-auto w-full relative z-10 flex flex-col gap-8 text-left">
        {futureGoals.map((milestone, idx) => (
          <motion.div
            key={milestone.goal}
            className="glass-panel p-6 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors flex flex-col gap-3 group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            {/* Left status vertical border indicator */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${
              milestone.status === "active" ? "bg-accent-orange" : "bg-white/10"
            }`} />

            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-gray">
                <Calendar size={12} />
                <span className="font-mono">{milestone.period}</span>
              </div>
              <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${
                milestone.status === "active" 
                  ? "bg-accent-orange/15 border border-accent-orange/35 text-accent-orange" 
                  : "bg-white/5 border border-white/5 text-white/30"
              }`}>
                {milestone.status}
              </span>
            </div>

            {/* Target name */}
            <div className="flex items-center gap-2 mt-1">
              <Target size={14} className={milestone.status === "active" ? "text-accent-orange" : "text-white/20"} />
              <h4 className="text-base font-bold text-soft-white font-display">
                {milestone.goal}
              </h4>
            </div>

            <p className="text-xs leading-relaxed text-muted-gray font-sans">
              {milestone.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
