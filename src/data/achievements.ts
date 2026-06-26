export interface Achievement {
  id: string;
  metric: string;
  label: string;
  description: string;
  tag: string;
}

export const achievements: Achievement[] = [
  {
    id: "cgpa",
    metric: "9.21 CGPA",
    label: "Academic Excellence",
    description: "Maintained a top-tier CGPA in Computer Science Engineering, specializing in database modeling and algorithms.",
    tag: "Education"
  },
  {
    id: "hackathon",
    metric: "1st Place",
    label: "Smart Campus Hackathon 2025",
    description: "Designed and built an offline-first patient queuing terminal within a 36-hour sprint.",
    tag: "Competitions"
  },
  {
    id: "leetcode",
    metric: "Top 8%",
    label: "LeetCode Competitive Profile",
    description: "Solved 400+ problems across arrays, trees, dynamic programming, and graph algorithms.",
    tag: "Problem Solving"
  },
  {
    id: "open-source",
    metric: "10+ PRs",
    label: "Open Source Contributions",
    description: "Contributed code fixes and documentation expansions to regional developer tool repositories and libraries.",
    tag: "Community"
  }
];
