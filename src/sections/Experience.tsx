import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { experiences } from "../data/experience";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <SectionWrapper id="experience-timeline" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">06 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Professional Journey
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Timeline Layout */}
      <div className="max-w-3xl mx-auto w-full relative z-10 flex flex-col gap-8 text-left">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            className="relative pl-8 md:pl-12 border-l border-white/10 flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            {/* Timeline node bullet */}
            <div className="absolute top-0.5 left-[-9px] w-[18px] h-[18px] rounded-full border-4 border-bg-primary bg-accent-orange shadow-[0_0_8px_rgba(249,115,22,0.5)] z-20" />
            
            {/* Top header details */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold text-soft-white font-display leading-snug">
                  {exp.title}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent-crimson bg-accent-crimson/10 border border-accent-crimson/20 px-2 py-0.5 rounded-full">
                  LEADERSHIP ROLE
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-gray mt-1">
                <span className="flex items-center gap-1">
                  <Briefcase size={12} className="text-white/30" />
                  <span className="font-semibold text-white/70">{exp.organization}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-white/30" />
                  <span>{exp.period}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-white/30" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            {/* Responsibility points */}
            <ul className="flex flex-col gap-3 mt-2 list-disc pl-4 text-xs md:text-sm text-muted-gray leading-relaxed font-sans">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="marker:text-accent-orange pl-1">
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Technology stack tags */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Technologies &amp; Competencies</span>
              <div className="flex flex-wrap gap-2">
                {exp.skillsUsed.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded bg-white/3 border border-white/5 text-[11px] text-white/70 font-mono hover:border-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
