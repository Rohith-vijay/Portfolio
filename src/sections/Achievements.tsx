import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { achievements } from "../data/achievements";
import { Trophy, Medal, Globe, Users } from "lucide-react";

export function Achievements() {
  const getIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "academic":
        return <Trophy className="text-accent-gold" size={20} />;
      case "language":
        return <Globe className="text-accent-cyan" size={20} />;
      case "leadership":
        return <Users className="text-accent-crimson" size={20} />;
      default:
        return <Medal className="text-accent-orange" size={20} />;
    }
  };

  return (
    <SectionWrapper id="achievements" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-gold">08 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Milestones &amp; Honors
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-orange to-accent-gold mt-1" />
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={achievement.title}
            className="glass-panel p-6 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 flex flex-col gap-4 text-left shadow-lg relative group overflow-hidden border-glow-hover"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Top color tag indicator */}
            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-accent-orange to-accent-gold opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                {getIcon(achievement.tag)}
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-muted-gray uppercase tracking-wider">
                {achievement.tag}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest">{achievement.year}</span>
              <h3 className="text-base font-bold text-soft-white leading-snug font-display line-clamp-2">
                {achievement.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-gray mt-1 font-sans">
                {achievement.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
