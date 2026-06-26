export interface JobRole {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
  skillsUsed: string[];
}

export const experiences: JobRole[] = [
  {
    id: "kvg-trust",
    title: "Secretary & Technical Lead",
    organization: "K V G Shanmukh Sai Trust",
    location: "Karnataka, India",
    period: "2024 - Present",
    bullets: [
      "Directed the software modernization roadmap, shifting legacy excel-sheet workflows to a secure, unified web portal.",
      "Mentored a development squad of 10 volunteer engineers on REST API design patterns, Maven dependency management, and Github code review workflows.",
      "Architected the Trust Platform web application, streamlining donation collection, volunteer schedules, and event audits, reducing operational overhead by 40%.",
      "Established containerization standards using Docker, resolving local development env mismatch issues across the engineering team."
    ],
    skillsUsed: ["Spring Boot", "React", "PostgreSQL", "Docker", "Git", "Project Leadership"]
  }
];
