export interface Skill {
  name: string;
  proficiency: number; // 0 to 100
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", proficiency: 90, icon: "Coffee" },
      { name: "Python", proficiency: 85, icon: "Terminal" },
      { name: "TypeScript", proficiency: 85, icon: "Code" },
      { name: "JavaScript", proficiency: 90, icon: "Code" },
      { name: "C++", proficiency: 75, icon: "Cpu" },
      { name: "SQL", proficiency: 85, icon: "Database" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", proficiency: 90, icon: "Atom" },
      { name: "Tailwind CSS", proficiency: 95, icon: "Wind" },
      { name: "Material UI", proficiency: 85, icon: "Layers" },
      { name: "Framer Motion", proficiency: 80, icon: "Activity" },
      { name: "TypeScript", proficiency: 85, icon: "Code" },
      { name: "Vite", proficiency: 90, icon: "Zap" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", proficiency: 90, icon: "Server" },
      { name: "Spring Security", proficiency: 80, icon: "Shield" },
      { name: "Node.js", proficiency: 85, icon: "Server" },
      { name: "Express", proficiency: 85, icon: "Server" },
      { name: "REST APIs", proficiency: 95, icon: "Network" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", proficiency: 85, icon: "Database" },
      { name: "MySQL", proficiency: 85, icon: "Database" },
      { name: "MongoDB", proficiency: 80, icon: "Database" },
      { name: "Redis", proficiency: 75, icon: "Cpu" },
    ],
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "Docker", proficiency: 80, icon: "Box" },
      { name: "Git & GitHub", proficiency: 90, icon: "Github" },
      { name: "AWS (EC2, S3)", proficiency: 70, icon: "Cloud" },
      { name: "Postman", proficiency: 90, icon: "Send" },
      { name: "Maven", proficiency: 80, icon: "Folder" },
    ],
  },
  {
    title: "Current Focus",
    skills: [
      { name: "AI & Agentic Systems", proficiency: 75, icon: "Brain" },
      { name: "Data Structures & Algos", proficiency: 80, icon: "Binary" },
      { name: "LLM Orchestration", proficiency: 70, icon: "Sparkles" },
    ],
  },
];
