import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { Heart, Users, Shield, ArrowUpRight } from "lucide-react";

export function LeadershipSocialImpact() {
  const initiatives = [
    {
      title: "Vice President Operations",
      desc: "Supervising non-profit administration, allocating infrastructure budgets, and coordinating volunteer deployments for community outreach drives.",
      icon: Shield,
      tag: "GOVERNANCE"
    },
    {
      title: "Digitalization Initiatives",
      desc: "Migrated spreadsheet logistics to custom PostgreSQL databases, saving K V G Trust over 40% in operational tracking time.",
      icon: Heart,
      tag: "SOCIAL IMPACT"
    },
    {
      title: "Mentorship & Guidance",
      desc: "Providing technical training and active project coordinates to 10+ student developers and non-profit volunteers.",
      icon: Users,
      tag: "MENTORSHIP"
    }
  ];

  return (
    <SectionWrapper id="leadership-impact" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">06 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Leadership &amp; Social Impact
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
        {initiatives.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="glass-panel p-8 rounded-xl flex flex-col gap-5 hover:translate-y-[-4px] transition-transform duration-300 relative overflow-hidden group border-glow-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-accent-orange to-accent-gold" />
              
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-accent-orange/10 text-accent-orange">
                  <Icon size={20} />
                </div>
                <span className="text-[9px] font-mono text-accent-gold uppercase border border-accent-gold/20 bg-accent-gold/5 px-2 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-soft-white font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-gray leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
              
              <a
                href="https://github.com/Rohith-vijay"
                target="_blank"
                rel="noreferrer"
                className="mt-auto pt-4 border-t border-white/5 flex items-center gap-1 text-[10px] font-mono text-white/40 group-hover:text-accent-orange transition-colors"
              >
                <span>View Project Org</span>
                <ArrowUpRight size={10} />
              </a>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
