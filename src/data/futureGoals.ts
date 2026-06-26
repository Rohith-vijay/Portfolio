export interface Milestone {
  period: string;
  goal: string;
  description: string;
  status: "active" | "planned" | "achieved";
}

export const futureGoals: Milestone[] = [
  {
    period: "2025 - 2026",
    goal: "Generative AI & Agentic Systems",
    description: "Building pipelines with LLM APIs, exploring Retrieval-Augmented Generation (RAG) structures, and studying agent workflows.",
    status: "active"
  },
  {
    period: "2026",
    goal: "Distributed Systems & Backend Engineering",
    description: "Deepening knowledge of distributed databases, system design, concurrency control models, and caching strategies in Java.",
    status: "planned"
  },
  {
    period: "2026 - 2027",
    goal: "Cloud Infrastructure & Open Source",
    description: "Mastering deployment automation, containerization orchestrations, and contributing to open-source software tools.",
    status: "planned"
  }
];
