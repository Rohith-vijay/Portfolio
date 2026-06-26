import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { BookOpen, Award, Cpu } from "lucide-react";

export function About() {
  return (
    <SectionWrapper id="about" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">01 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Who I Am &amp; What I Focus On
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* Card 1: Education & CGPA */}
        <motion.div 
          className="glass-panel p-8 rounded-xl flex flex-col gap-6 hover:translate-y-[-4px] transition-transform duration-300 relative overflow-hidden group border-glow-hover"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Card Accent Top Glow */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-crimson to-transparent" />
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent-crimson/10 text-accent-crimson">
              <BookOpen size={20} />
            </div>
            <h3 className="font-display font-bold text-soft-white text-lg">Academic Roots</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-muted-gray uppercase">Degree</span>
            <p className="text-sm font-semibold text-soft-white font-display">B.E. Computer Science Engineering</p>
            <p className="text-xs text-muted-gray leading-relaxed">
              K.S. Institute of Technology, Bangalore.
            </p>
          </div>

          <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mt-auto">
            <span className="text-xs font-mono text-muted-gray uppercase">Current Standing</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-extrabold text-accent-crimson">
                <AnimatedCounter value={9.21} decimals={2} duration={2} />
              </span>
              <span className="text-xs text-muted-gray font-mono">/ 10.0 CGPA</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Algorithms & Development */}
        <motion.div 
          className="glass-panel p-8 rounded-xl flex flex-col gap-6 hover:translate-y-[-4px] transition-transform duration-300 relative overflow-hidden group border-glow-hover"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-orange to-transparent" />
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent-orange/10 text-accent-orange">
              <Cpu size={20} />
            </div>
            <h3 className="font-display font-bold text-soft-white text-lg">Problem Solving</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-muted-gray uppercase">LeetCode Profile</span>
            <p className="text-sm font-semibold text-soft-white font-display">Data Structures &amp; Algorithms</p>
            <p className="text-xs text-muted-gray leading-relaxed">
              Applying modular optimizations, memory-bounded array partitions, and graphing sweeps to complex code problems.
            </p>
          </div>

          <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mt-auto">
            <span className="text-xs font-mono text-muted-gray uppercase">Problems Solved</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-extrabold text-accent-orange">
                <AnimatedCounter value={400} decimals={0} duration={1.5} suffix="+" />
              </span>
              <span className="text-xs text-muted-gray font-mono">Solved Log</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Trust Leadership */}
        <motion.div 
          className="glass-panel p-8 rounded-xl flex flex-col gap-6 hover:translate-y-[-4px] transition-transform duration-300 relative overflow-hidden group border-glow-hover"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-gold to-transparent" />
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent-gold/10 text-accent-gold">
              <Award size={20} />
            </div>
            <h3 className="font-display font-bold text-soft-white text-lg">Leadership Focus</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-muted-gray uppercase">Nonprofit Impact</span>
            <p className="text-sm font-semibold text-soft-white font-display">Technical Director</p>
            <p className="text-xs text-muted-gray leading-relaxed">
              Spearheading digitalization workflows at K V G Shanmukh Sai Trust. Setting up clean repositories, code reviews, and container stacks.
            </p>
          </div>

          <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mt-auto">
            <span className="text-xs font-mono text-muted-gray uppercase">Mentorship Record</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-extrabold text-accent-gold">
                <AnimatedCounter value={10} decimals={0} duration={1.2} suffix="+" />
              </span>
              <span className="text-xs text-muted-gray font-mono">Developers Led</span>
            </div>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
