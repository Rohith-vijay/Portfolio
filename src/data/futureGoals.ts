export interface Milestone {
  period: string;
  goal: string;
  description: string;
  status: "active" | "planned" | "achieved";
}

export const futureGoals: Milestone[] = [
  {
    period: "Q3 2026 - Q4 2026",
    goal: "Distributed Database Architectures",
    description: "Deep dive into multi-node consensus algorithms (Raft/Paxos) and write custom database replication hooks in Go/C++.",
    status: "active"
  },
  {
    period: "Q1 2027",
    goal: "Enterprise AI Agent Pipelines",
    description: "Deploy production-grade orchestration systems combining LLM reasoning chains with Java REST microservices.",
    status: "planned"
  },
  {
    period: "Q3 2027",
    goal: "Kubernetes & Cloud Orchestration",
    description: "Achieve CKA certification, migrating local dockerized services to auto-scaling Kubernetes cluster deployments.",
    status: "planned"
  }
];
