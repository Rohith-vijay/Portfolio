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
    title: "Vice President",
    organization: "K V G Shanmukh Sai Trust",
    location: "Karnataka, India",
    period: "2024 - Present",
    bullets: [
      "Serve as Vice President, spearheading technology initiatives and digital website development/maintenance.",
      "Coordinate volunteers for regional community outreach, educational drives, and non-profit logistics.",
      "Drive digital transformation, migrating legacy records to secure, organized digital formats.",
      "Organize non-profit events, manage volunteer tasks, and teach/mentor students on technical subjects."
    ],
    skillsUsed: ["React", "Website Maintenance", "Volunteer Coordination", "Digital Transformation", "Event Management", "Community Outreach"]
  }
];
