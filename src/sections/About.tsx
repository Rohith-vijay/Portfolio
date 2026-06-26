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
      <div className="text-left max-w-3xl text-sm leading-relaxed text-muted-gray flex flex-col gap-4 font-sans">
        <p>
          My entry into programming started with curiosity—understanding how simple lines of code could compile into tools that automate tasks. Over time, that curiosity evolved into a deeper interest in software engineering. I realized that writing code isn't just about problem-solving on a screen; it is about building structures and systems that people rely on to get work done.
        </p>
        <p>
          Serving as the Vice President of K V G Shanmukh Sai Trust has been a defining experience. Working on community initiatives and managing operational logistics taught me that technology is only as good as the real-world problems it solves. Designing the digital tools for the trust showed me how digital transformation can remove friction and help organizations focus on their core mission.
        </p>
        <p>
          Currently, my technical focus is on Generative AI and LLM systems. I am fascinated by how artificial intelligence can extend human capabilities when integrated thoughtfully into robust backend architectures. My long-term vision is to continue refining my skills as a full-stack engineer, building reliable, secure, and user-centric software that makes a meaningful, tangible impact on communities.
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
            <p className="text-sm font-semibold text-soft-white font-display">B.Tech Computer Science Engineering</p>
            <p className="text-xs text-muted-gray leading-relaxed">
              KL University. Generative AI Specialization. Focus on advanced neural orchestrations, deep learning streams, and scalable systems.
            </p>
            <div className="flex flex-col gap-1 mt-1 text-[10px] font-mono text-white/50">
              <div>Current Year: 2026</div>
              <div>Expected Graduation: 2027</div>
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mt-auto">
            <span className="text-xs font-mono text-muted-gray uppercase">Current Standing</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-extrabold text-accent-crimson">
                <AnimatedCounter value={9.55} decimals={2} duration={2} />
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
              <span className="text-sm font-display font-bold text-accent-orange uppercase tracking-wider">
                Coming Soon
              </span>
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
