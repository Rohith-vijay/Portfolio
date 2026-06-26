export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl?: string;
  status: "Completed" | "Currently Pursuing" | "Planned";
  skills: string[];
  category: "Programming" | "Cloud" | "AI" | "Databases" | "Web Development" | "English" | "Competitive Programming" | "Academic";
  imageUrl?: string;
  logoUrl?: string;
}

export const certifications: Certification[] = [
  // Completed Certifications
  {
    name: "Java Programming & Data Structures",
    issuer: "NPTEL (National Programme on Technology Enhanced Learning)",
    date: "November 2024",
    credentialId: "NOC25CS91S257103658",
    verificationUrl: "https://nptel.ac.in/noc/",
    status: "Completed",
    skills: ["Java", "OOPs", "Data Structures", "Algorithms"],
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    logoUrl: "https://nptel.ac.in/assets/img/nptel-logo.png"
  },
  {
    name: "Generative AI Specialization",
    issuer: "Google Cloud (Coursera)",
    date: "December 2024",
    credentialId: "Coursera-23PK77D4WAYR",
    verificationUrl: "https://coursera.org/verify/23PK77D4WAYR",
    status: "Completed",
    skills: ["Generative AI", "Large Language Models", "Google Cloud Vertex AI", "Transformers"],
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80",
    logoUrl: "https://www.coursera.org/share/coursera-logo.png"
  },
  {
    name: "Version Control with Git",
    issuer: "Meta (Coursera)",
    date: "July 2024",
    credentialId: "Coursera-WTG1XLHGJ7IB",
    verificationUrl: "https://coursera.org/verify/WTG1XLHGJ7IB",
    status: "Completed",
    skills: ["Git", "GitHub", "Branching", "Collaborative Workflows"],
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1556075798-482a134b532c?auto=format&fit=crop&w=400&q=80",
    logoUrl: "https://www.coursera.org/share/coursera-logo.png"
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (Coursera)",
    date: "September 2024",
    credentialId: "Coursera-0FAHBH7ZEJUW",
    verificationUrl: "https://coursera.org/verify/0FAHBH7ZEJUW",
    status: "Completed",
    skills: ["Cloud Computing", "AWS S3", "AWS EC2", "AWS IAM", "Cloud Security"],
    category: "Cloud",
    imageUrl: "https://images.unsplash.com/photo-1484417894907-623942c8ea29?auto=format&fit=crop&w=400&q=80",
    logoUrl: "https://www.coursera.org/share/coursera-logo.png"
  },
  {
    name: "Database Management Systems",
    issuer: "NPTEL (KL University)",
    date: "October 2024",
    credentialId: "NOC25CS91S8621B8CA",
    verificationUrl: "https://nptel.ac.in/noc/",
    status: "Completed",
    skills: ["SQL", "Relational Database Design", "Query Optimization", "Indexing"],
    category: "Databases",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=400&q=80",
    logoUrl: "https://nptel.ac.in/assets/img/nptel-logo.png"
  },
  {
    name: "English for Professional Communication",
    issuer: "Coursera",
    date: "May 2024",
    credentialId: "Coursera-MW9ZHB3LIC20",
    verificationUrl: "https://coursera.org/verify/MW9ZHB3LIC20",
    status: "Completed",
    skills: ["Technical Writing", "Presentation Skills", "Professional English"],
    category: "English",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80",
    logoUrl: "https://www.coursera.org/share/coursera-logo.png"
  },
  {
    name: "Unstop Tech Coding Assessment",
    issuer: "Unstop",
    date: "January 2025",
    credentialId: "UNSTOP-2C89QOMPWQ83",
    verificationUrl: "https://unstop.com/certificate/verify",
    status: "Completed",
    skills: ["Data Structures", "Algorithms", "Competitive Programming"],
    category: "Competitive Programming",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80",
    logoUrl: "https://d8it4hux1yz1t.cloudfront.net/images/logo/unstop-logo.svg"
  },
  // Currently Pursuing
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services (AWS)",
    date: "In Progress",
    credentialId: "AWS-SAA-PURSUE",
    status: "Currently Pursuing",
    skills: ["AWS Cloud Architecture", "High Availability Systems", "VPCs", "Load Balancing"],
    category: "Cloud",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "LangChain & LlamaIndex AI Agents Development",
    issuer: "DeepLearning.AI",
    date: "In Progress",
    credentialId: "DL-AGENT-PURSUE",
    status: "Currently Pursuing",
    skills: ["AI Agents", "LangChain", "Vector Databases", "Retrieval Augmented Generation (RAG)"],
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
  },
  // Planned
  {
    name: "Oracle Certified Professional: Java SE Developer",
    issuer: "Oracle",
    date: "Planned",
    credentialId: "ORACLE-OCP-PLAN",
    status: "Planned",
    skills: ["Java SE Advanced", "Concurrency API", "JVM Performance Tuning"],
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "MongoDB Associate Developer",
    issuer: "MongoDB Inc.",
    date: "Planned",
    credentialId: "MDB-DEV-PLAN",
    status: "Planned",
    skills: ["NoSQL", "Document Database Modeling", "Aggregation Pipeline", "Scaling MongoDB"],
    category: "Databases",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
  }
];
