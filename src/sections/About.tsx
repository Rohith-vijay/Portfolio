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
          My Journey
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Narrative Intro */}
      <div className="text-left max-w-3xl text-sm leading-relaxed text-muted-gray flex flex-col gap-4">
        <p>
          I build software that bridges computational theory and real-world utility. My path integrates rigorous academic foundations in computer science engineering, full-stack systems design, and hands-on non-profit leadership.
        </p>
        <p>
          From optimizing high-concurrency database transactions to deploying custom WebGL graphics and orchestrating Generative AI agents, I treat software engineering as a discipline of continuous verification, modular layouts, and performance metrics.
        </p>
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
            <span className="text-xs font-mono text-muted-gray uppercase">Degree &amp; Specialization</span>
            <p className="text-sm font-semibold text-soft-white font-display">B.E. Computer Science Engineering</p>
            <p className="text-xs text-muted-gray leading-relaxed">
              K.S. Institute of Technology, Bangalore. Specializing in Generative AI architectures, neural orchestrations, and data structure systems.
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
            <h3 className="font-display font-bold text-soft-white text-lg">Leadership &amp; Impact</h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-muted-gray uppercase">Nonprofit Focus</span>
            <p className="text-sm font-semibold text-soft-white font-display">Vice President</p>
            <p className="text-xs text-muted-gray leading-relaxed">
              Spearheading digitalization workflows at K V G Shanmukh Sai Trust. Setting up clean repositories, secure code reviews, and container stacks.
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

      {/* Engineering Mindset / Philosophy Section */}
      <div className="glass-panel p-8 rounded-xl border border-white/5 bg-white/2 relative overflow-hidden mt-6 text-left flex flex-col gap-6">
        <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-accent-crimson via-accent-orange to-accent-gold" />
        
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono text-accent-orange uppercase tracking-wider">ENGINEERING MINDSET</span>
          <h3 className="text-xl font-bold text-soft-white font-display">Core Philosophies</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-muted-gray leading-relaxed">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-soft-white font-display">1. Build Software that Solves Real-World Problems</span>
              <p className="text-xs">Technology exists to serve people and streamline workflows, not just as abstract architecture.</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-soft-white font-display">2. Prioritize Maintainable Architecture</span>
              <p className="text-xs">Stateless interfaces, decoupled configurations, and rigorous typing pay dividends over the lifecycle.</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-soft-white font-display">3. Optimize Only After Correctness</span>
              <p className="text-xs">Verify accuracy first; run transaction analysis and index optimization when constraints dictate.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-soft-white font-display">4. Value Performance Without Sacrificing Readability</span>
              <p className="text-xs">Strive for fast loads (95+ Lighthouse scores) but keep components modular and clear.</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-soft-white font-display">5. Lead with Integrity &amp; Empathy</span>
              <p className="text-xs">Empower colleagues with standard environments, clear parameters, and clean code documentation.</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-soft-white font-display">6. Continuous Learning</span>
              <p className="text-xs">Deepen understanding by focusing on core structures and verifying systems in production environments.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
