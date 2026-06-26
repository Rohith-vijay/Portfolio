export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  features: ProjectFeature[];
  challenges: string[];
  solutions: string[];
  metrics: Metric[];
  links: {
    github: string;
    live: string;
    caseStudy?: string;
  };
  mockupUrl: string;
}

export const projects: Project[] = [
  {
    id: "trust-platform",
    title: "Trust NGO Platform",
    tagline: "Enterprise NGO Management & Secure Donation Suite",
    overview: "A comprehensive production-grade management platform that streamlines administration, event organization, volunteer logistics, and secure financial transactions for charitable organizations.",
    problem: "NGO operations suffer from administrative inefficiencies: manual tracking of event attendance, unsecured volunteer credential management, and lacks a transparent, real-time audit trail for monetary donations.",
    solution: "Developed a secure Spring Boot microservices backbone connected to a highly responsive glassmorphic React admin client. Configured row-level database security and integrated an event scheduler utilizing cron triggers for notification dispatches.",
    architecture: [
      "Client Interface (React + Vite + Tailwind CSS v4)",
      "Authentication Gateway (Spring Security + stateless JWT tokens)",
      "Application Core (Spring Boot REST Engine + JPA + Hibernate)",
      "Database Layer (PostgreSQL - optimized with composite indexing)",
      "Deployment Pipeline (Docker containers hosted on AWS EC2)"
    ],
    techStack: ["React", "Spring Boot", "Tailwind CSS", "PostgreSQL", "Docker", "AWS", "Spring Security"],
    features: [
      {
        title: "Stateless JWT Authentication",
        description: "Secure, role-based login segregation (Admin, Vol, Donator) managing access tokens dynamically."
      },
      {
        title: "Content Management System (CMS)",
        description: "Dynamic blog and event updater featuring image uploading and formatting toolbar."
      },
      {
        title: "Real-time Donation Engine",
        description: "Secure transactional interface tracking donor details, target causes, and rendering receipts."
      },
      {
        title: "Volunteer Scheduler",
        description: "Calendar interface allowing volunteers to sign up for local community drives and log hours."
      }
    ],
    challenges: [
      "Mitigating database transaction contention during peak charity drives.",
      "Securing administrative endpoint gateways against unauthenticated payloads."
    ],
    solutions: [
      "Configured HikariCP pool parameters, adjusted transaction isolation levels, and added composite indexes on frequently-queried columns.",
      "Implemented strict Spring Security filters, validated JWT payloads at filter chain level, and added CORS configurations."
    ],
    metrics: [
      { label: "Volunteer Signups", value: "+140%" },
      { label: "API Gateway Latency", value: "<85ms" },
      { label: "Security Compliance", value: "100%" },
      { label: "Transaction Safety", value: "Audit-Pass" }
    ],
    links: {
      github: "https://github.com/rohithvijay/trust-ngo-platform",
      live: "https://trust-ngo.example.com",
      caseStudy: "/projects/trust-platform"
    },
    mockupUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "crediflow",
    title: "CrediFlow",
    tagline: "Real-time Credit Score & Personal Finance Engine",
    overview: "A sophisticated dashboard monitoring cash flow, assessing transaction patterns, and calculating real-time credit metrics using custom risk algorithms.",
    problem: "Existing budgeting tools present static spreadsheet metrics, lacking real-time credit implications or forecasting tools to guide users away from risk conditions.",
    solution: "Engineered a visual analytical canvas using Chart.js charting, analyzing simulated ledger inputs to output real-time credit score adjustments.",
    architecture: [
      "Client Layout (Vite + React + Tailwind CSS)",
      "Financial Analysis Module (Node.js REST Services)",
      "Data Warehouse (MongoDB - storing non-relational ledgers)"
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "Tailwind CSS"],
    features: [
      {
        title: "Interactive Flow Charting",
        description: "SVG flow charts detailing exactly where personal expenditures flow across categories."
      },
      {
        title: "Credit Risk Simulator",
        description: "Sliders simulating loan payments to see real-time shifts in FICO scores."
      }
    ],
    challenges: [
      "Parsing non-structured transaction payloads without causing blocking database lookups."
    ],
    solutions: [
      "Created transactional pipelines utilizing Node.js streams to parallelize dataset mapping before writing to Mongo databases."
    ],
    metrics: [
      { label: "Computation Time", value: "<15ms" },
      { label: "Forecasting Precision", value: "94%" },
      { label: "User Retention", value: "+45%" }
    ],
    links: {
      github: "https://github.com/rohithvijay/crediflow",
      live: "https://crediflow.example.com",
      caseStudy: "/projects/crediflow"
    },
    mockupUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "greenbites",
    title: "GreenBites",
    tagline: "Eco-Conscious Food Delivery Engine",
    overview: "A sustainable food ordering interface that computes carbon footprints for each delivery option and prioritizes locally-sourced organic ingredients.",
    problem: "Standard food delivery platforms ignore the ecological impact of delivery travel distances and packaging waste.",
    solution: "Created a Leaflet-based geospatial router that calculates route carbon equivalents and highlights local eco-certified restaurants.",
    architecture: [
      "Maps Integration (Leaflet Geospatial API)",
      "Backend Router (Express + Node.js)",
      "Database Store (MongoDB)"
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Leaflet API", "Tailwind CSS"],
    features: [
      {
        title: "Carbon Offset Calculator",
        description: "Displays emissions in equivalent tree-days, with offset checkouts at billing."
      },
      {
        title: "Eco-Badge Verification",
        description: "Certifies bio-sourced suppliers dynamically through crowd-sourced credentials."
      }
    ],
    challenges: [
      "Geospatial route mapping calculations caused delays on cellular client connections."
    ],
    solutions: [
      "Implemented server-side geofencing and caching of regional restaurant datasets to reduce client payloads."
    ],
    metrics: [
      { label: "Offset Transactions", value: "48%" },
      { label: "Response Delay", value: "<50ms" },
      { label: "CO2 Mitigated", value: "1.2 Tons" }
    ],
    links: {
      github: "https://github.com/rohithvijay/greenbites",
      live: "https://greenbites.example.com",
      caseStudy: "/projects/greenbites"
    },
    mockupUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "smart-clinic",
    title: "Smart Clinic System",
    tagline: "Digital Patient Flow & Clinic Scheduler",
    overview: "An administrative patient management solution that coordinates scheduling, doctor occupancy states, and maintains digital medical records securely.",
    problem: "Clinics suffer from long queue times and disconnected records databases, increasing check-in delay and errors.",
    solution: "Built a Spring Boot appointment scheduler utilizing WebSocket modules to push queue updates in real-time to active terminal client instances.",
    architecture: [
      "Client Panel (React Dashboard)",
      "Sync Engine (STOMP WebSockets + Spring Boot)",
      "Storage (PostgreSQL)"
    ],
    techStack: ["React", "Spring Boot", "PostgreSQL", "WebSockets", "Material UI"],
    features: [
      {
        title: "Live Queue Board",
        description: "WebSocket connection showing estimated wait-time updates pushed from receptionist logs."
      },
      {
        title: "Secure Health Records",
        description: "Encrypted patient fields in DB using AES-256 cipher streams."
      }
    ],
    challenges: [
      "Synchronizing live board states across multiple parallel active receptionist screens."
    ],
    solutions: [
      "Configured a STOMP message broker on Spring Boot, managing patient queues via concurrent safe list structures in memory."
    ],
    metrics: [
      { label: "Wait Times Reduced", value: "32%" },
      { label: "Record Retrieval", value: "<1.2s" },
      { label: "Security Verification", value: "AES-256" }
    ],
    links: {
      github: "https://github.com/rohithvijay/smart-clinic",
      live: "https://smart-clinic.example.com",
      caseStudy: "/projects/smart-clinic"
    },
    mockupUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "railway-reservation",
    title: "Railway Reservation System",
    tagline: "High-Concurrency Ticketing Engine",
    overview: "A database-focused ticket booking simulator demonstrating concurrent reservation handling and state validation rules.",
    problem: "High concurrency during seat allocation triggers race conditions, booking over-allocations, and database deadlock exceptions.",
    solution: "Designed SQL transactional boundaries incorporating optimistic locking checks and row-level pessimistic read locks during seat reservation updates.",
    architecture: [
      "Load Generator (Apache JMeter Script)",
      "Booking Endpoint (Spring Boot API)",
      "Database Instance (MySQL Server)"
    ],
    techStack: ["Java", "Spring Boot", "MySQL", "JMeter"],
    features: [
      {
        title: "Concurrency Booking Testbed",
        description: "Simulates up to 5,000 requests per minute targeting matching seat numbers."
      },
      {
        title: "Seat-lock Timeout System",
        description: "Automatically releases locked tickets if checkout payment sequence fails in 5 minutes."
      }
    ],
    challenges: [
      "Deadlock occurrences in MySQL database under high-concurrency ticket checkouts."
    ],
    solutions: [
      "Sorted seat selection queries alphabetically by coach number, forcing transactions to lock rows in identical order and resolving circular dependencies."
    ],
    metrics: [
      { label: "Concurrent Transactions", value: "1,200/sec" },
      { label: "Booking Overlap Rate", value: "0.0%" },
      { label: "Deadlock Frequency", value: "0" }
    ],
    links: {
      github: "https://github.com/rohithvijay/railway-reservation",
      live: "https://railway-booking.example.com",
      caseStudy: "/projects/railway-reservation"
    },
    mockupUrl: "https://images.unsplash.com/photo-1532103054090-334e6e60ab29?q=80&w=1200&auto=format&fit=crop"
  }
];
