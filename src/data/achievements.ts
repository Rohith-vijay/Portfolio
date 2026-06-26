export interface Achievement {
  title: string;
  year: string;
  description: string;
  tag: string;
}

export const achievements: Achievement[] = [
  {
    title: "International Mathematics Olympiad (IMO) Gold Medal",
    year: "Verified",
    description: "Awarded Gold Medal in the IMO, demonstrating strong mathematical foundation and problem-solving skills.",
    tag: "Academic"
  },
  {
    title: "International English Olympiad (IEO) Gold Medal",
    year: "Verified",
    description: "Awarded Gold Medal in IEO, showing excellent communication and command over the English language.",
    tag: "Language"
  },
  {
    title: "International Science Olympiad (ISO) Country Rank 126",
    year: "Verified",
    description: "Secured All-India Country Rank 126 in the ISO, showcasing core analytical concepts and scientific reasoning.",
    tag: "Academic"
  },
  {
    title: "Non-profit Leadership Contributions",
    year: "2024 - Present",
    description: "Serving as Vice President at K V G Shanmukh Sai Trust. Leading regional outreach initiatives, operational digitalization, and volunteer structures.",
    tag: "Leadership"
  },
  {
    title: "Student Mentoring & Peer Instruction",
    year: "2024 - Present",
    description: "Mentoring student developers on REST API design, Git workflow systems, and frontend frameworks.",
    tag: "Mentorship"
  }
];
