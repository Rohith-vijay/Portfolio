export interface Skill {
  name: string;
  proficiency: number; // 0 to 100 for visual progress bar width
  level: "Advanced" | "Proficient" | "Working Knowledge" | "Familiar" | "Currently Learning";
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
      { name: "Java", proficiency: 90, level: "Advanced", icon: "Coffee" },
      { name: "C", proficiency: 80, level: "Proficient", icon: "Terminal" },
      { name: "Python", proficiency: 80, level: "Proficient", icon: "Terminal" },
      { name: "SQL", proficiency: 80, level: "Proficient", icon: "Database" },
      { name: "JavaScript", proficiency: 85, level: "Proficient", icon: "Code" },
      { name: "TypeScript", proficiency: 65, level: "Familiar", icon: "Code" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", proficiency: 85, level: "Proficient", icon: "Atom" },
      { name: "Tailwind CSS", proficiency: 90, level: "Proficient", icon: "Wind" },
      { name: "Material UI", proficiency: 80, level: "Working Knowledge", icon: "Layers" },
      { name: "Framer Motion", proficiency: 75, level: "Working Knowledge", icon: "Activity" },
      { name: "Vite", proficiency: 85, level: "Proficient", icon: "Zap" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", proficiency: 85, level: "Proficient", icon: "Server" },
      { name: "Spring Security", proficiency: 70, level: "Working Knowledge", icon: "Shield" },
      { name: "Node.js", proficiency: 75, level: "Working Knowledge", icon: "Server" },
      { name: "Express", proficiency: 75, level: "Working Knowledge", icon: "Server" },
      { name: "REST APIs", proficiency: 85, level: "Proficient", icon: "Network" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", proficiency: 75, level: "Working Knowledge", icon: "Database" },
      { name: "MySQL", proficiency: 80, level: "Working Knowledge", icon: "Database" },
      { name: "MongoDB", proficiency: 70, level: "Working Knowledge", icon: "Database" },
    ],
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "Docker", proficiency: 75, level: "Working Knowledge", icon: "Box" },
      { name: "Git & GitHub", proficiency: 85, level: "Proficient", icon: "Github" },
      { name: "AWS (EC2, S3)", proficiency: 65, level: "Familiar", icon: "Cloud" },
      { name: "Postman", proficiency: 80, level: "Working Knowledge", icon: "Send" },
      { name: "Maven", proficiency: 75, level: "Working Knowledge", icon: "Folder" },
    ],
  },
  {
    title: "Current Focus",
    skills: [
      { name: "Generative AI", proficiency: 70, level: "Currently Learning", icon: "Brain" },
      { name: "Data Structures & Algos", proficiency: 80, level: "Working Knowledge", icon: "Binary" },
      { name: "LLM APIs Integration", proficiency: 65, level: "Currently Learning", icon: "Sparkles" },
    ],
  },
];
