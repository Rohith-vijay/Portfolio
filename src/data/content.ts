// Single source of truth for every word on the site.
// Edit this file to update the portfolio — no component changes needed.

export const profile = {
  name: 'Komma Rohith Vijay',
  firstName: 'Rohith',
  lastName: 'Vijay',
  initials: 'KRV',
  roles: ['Backend Engineer', 'Java · Spring Boot', 'Microservices Architect', 'Generative AI Builder'],
  tagline:
    'I design secure, resilient backends — from payment-grade REST APIs to event-driven microservices — and ship them to production.',
  location: 'Vijayawada, India',
  current: 'Vice President @ K.V.G. Shanmuka Sai Charitable Trust',
  email: 'vijayrohith358@gmail.com',
  phone: '+91 93905 64417',
  resume: './Komma_Rohith_Vijay_Resume.pdf',
  links: [
    { label: 'GitHub', href: 'https://github.com/Rohith-vijay', handle: 'Rohith-vijay' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rohithvijayk', handle: 'rohithvijayk' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/kl2400031537/', handle: 'kl2400031537' },
    { label: 'Trust Platform', href: 'https://shanmukasaitrust.org', handle: 'shanmukasaitrust.org' },
    { label: 'Chess.com', href: 'https://www.chess.com/member/sairohithv', handle: 'sairohithv' },
  ],
}

export const education = {
  school: 'KL University',
  degree: 'B.Tech, Computer Science & Engineering',
  specialisation: 'Generative AI specialisation',
  honors: 'Honors in Embedded Systems',
  graduation: 'Expected May 2028',
  stats: [
    { label: 'CGPA', value: 9.55, decimals: 2, suffix: ' / 10' },
    { label: 'Class XII (MPC)', value: 93, decimals: 0, suffix: '%' },
    { label: 'Class X', value: 95, decimals: 0, suffix: '%' },
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'System Design',
  ],
}

export const trust = {
  name: 'K.V.G. Shanmuka Sai Charitable Trust',
  logo: './kvg-trust-logo.jpg',
  role: 'Vice President',
  period: 'Oct 2025 — Present',
  location: 'Vijayawada, India',
  site: 'https://shanmukasaitrust.org',
  volunteerForm: 'https://forms.gle/KB5vDYQuroMpXHjY9',
  about: [
    'K.V.G. Shanmuka Sai Charitable Trust is a Vijayawada-based non-profit committed to education and community welfare. It offers free tuition to students in need and runs service initiatives that bring volunteers and donors together.',
    'As Vice President, I oversee the trust’s operations end to end, from academic support and outreach to volunteer coordination, events, administration and the technology platform that powers it.',
  ],
  stats: [
    { value: 50, prefix: '', suffix: '+', label: 'members' },
    { value: 5, prefix: '', suffix: '', label: 'programs' },
    { value: 50000, prefix: '₹', suffix: '+', label: 'raised online' },
    { value: 40, prefix: '', suffix: '+', label: 'donors' },
  ],
  responsibilities: [
    {
      icon: '⌘',
      title: 'Technology & Platform',
      text: 'Architected and maintain shanmukasaitrust.org as its sole engineer, covering donations, volunteer onboarding, events, content and reporting.',
    },
    {
      icon: '✎',
      title: 'Education',
      text: 'Teach and mentor the trust’s tuition students, strengthening their fundamentals and academic confidence.',
    },
    {
      icon: '◉',
      title: 'Social Media & Outreach',
      text: 'Manage the trust’s social media presence and communications, building awareness of its programs and impact.',
    },
    {
      icon: '✋',
      title: 'Volunteer Management',
      text: 'Lead volunteer recruitment, onboarding and coordination, including the registration form I designed and manage.',
    },
    {
      icon: '✦',
      title: 'Event Management',
      text: 'Plan and execute service events and community drives, from logistics through to post-event reporting.',
    },
    {
      icon: '▤',
      title: 'Administration & Operations',
      text: 'Oversee day-to-day operations, records, donor relations and coordination across programs.',
    },
  ],
  platform: {
    metrics: [
      { value: 60, prefix: '~', label: 'secured REST endpoints' },
      { value: 10, prefix: '', label: 'integration test suites' },
      { value: 5, prefix: '', label: 'tier RBAC' },
      { value: 0, prefix: '', label: 'critical / high findings' },
    ],
    log: [
      'Built shanmukasaitrust.org end-to-end on Java 21, Spring Boot 3, React and MySQL.',
      'Integrated Razorpay payments + webhooks; 80G tax-receipt PDFs now generate automatically instead of manual receipting.',
      'Hardened ~60 endpoints: 5-tier RBAC, JWT in HttpOnly cookies, refresh-token rotation with reuse detection, Bucket4j rate limiting, encrypted PAN storage.',
      'Zero critical/high findings on SpotBugs and OWASP Dependency-Check, backed by 10 integration test suites.',
      'Shipped with Docker to Railway + Cloudflare on a custom domain, with WebSocket/STOMP notifications and Cloudinary media.',
    ],
    stack: ['Java 21', 'Spring Boot 3', 'React', 'MySQL', 'Razorpay', 'JWT', 'Bucket4j', 'Docker', 'Railway', 'Cloudflare', 'STOMP', 'Cloudinary'],
  },
}

export type Project = {
  name: string
  kicker: string
  team: string
  href?: string
  demo?: string
  demoLabel?: string
  featured?: boolean
  description: string
  highlights: string[]
  viz: { kind: 'outbox' | 'states' | 'roles' | 'list'; items: string[] }
  metrics?: { value: number; label: string; text?: string }[]
  stack: string[]
  accent: 'cyan' | 'magenta' | 'green' | 'amber' | 'violet'
}

export const projects: Project[] = [
  {
    name: 'KVG Trust Platform',
    kicker: 'Live non-profit platform',
    team: 'Sole engineer',
    featured: true,
    href: 'https://github.com/Rohith-vijay/Trust-Frontend',
    demo: 'https://shanmukasaitrust.org',
    demoLabel: 'Visit live site',
    description:
      'The production platform behind K.V.G. Shanmuka Sai Charitable Trust: online donations with automatic 80G receipts, volunteer onboarding, events, a CMS and reporting for 50+ members across 5 programs.',
    highlights: [
      'Razorpay payments + webhooks generate 80G tax-receipt PDFs automatically, replacing manual receipting.',
      '~60 endpoints secured with 5-tier RBAC, JWT in HttpOnly cookies, refresh-token rotation and Bucket4j rate limiting.',
      'Zero critical/high findings on SpotBugs and OWASP Dependency-Check; shipped with Docker to Railway + Cloudflare.',
    ],
    viz: { kind: 'outbox', items: ['Donor', 'Razorpay', 'Spring Boot API', '80G Receipt'] },
    metrics: [
      { value: 0, label: 'raised online', text: '₹50K+' },
      { value: 60, label: 'secured endpoints' },
      { value: 10, label: 'integration test suites' },
    ],
    stack: ['Java 21', 'Spring Boot 3', 'React', 'MySQL', 'Razorpay', 'JWT', 'Docker', 'Cloudflare'],
    accent: 'violet',
  },
  {
    name: 'ByteVault Media',
    kicker: 'Distributed marketplace',
    team: 'Team of 3',
    href: 'https://github.com/Rohith-vijay/ByteVault',
    description:
      'A marketplace for digital products built as 14 Spring Boot microservices behind an API gateway — each service owning its own PostgreSQL database.',
    highlights: [
      'Transactional outbox: order events reach RabbitMQ even when the broker is down.',
      'Idempotent payment handling — a retried request never charges twice.',
      'Led the shared library, API gateway, auth, payment and product services.',
    ],
    viz: { kind: 'outbox', items: ['Order Service', 'Outbox', 'RabbitMQ'] },
    metrics: [
      { value: 14, label: 'microservices' },
      { value: 51, label: 'JUnit test classes' },
      { value: 1, label: 'DB per service', text: '1:1' },
    ],
    stack: ['Spring Boot', 'Spring Cloud', 'Eureka', 'OpenFeign', 'RabbitMQ', 'PostgreSQL', 'Docker Compose', 'React'],
    accent: 'cyan',
  },
  {
    name: 'CrediFlow',
    kicker: 'Loan management system',
    team: 'Team project',
    href: 'https://github.com/Rohith-vijay/Loanmanagement-backend',
    description:
      'Loan platform for borrowers, lenders and admins, driven by a state-machine lifecycle across 6 entities with transactional balance updates.',
    highlights: [
      'JWT + OAuth2 login with Google and GitHub.',
      'Bucket4j rate limiting and AOP-based audit logging.',
      'PDF, Excel and CSV reporting out of the box.',
    ],
    viz: { kind: 'states', items: ['Application', 'Review', 'Approval', 'Repayment', 'Closed'] },
    metrics: [
      { value: 6, label: 'domain entities' },
      { value: 3, label: 'user roles' },
      { value: 3, label: 'report formats' },
    ],
    stack: ['Spring Boot', 'Spring Security', 'OAuth2', 'MySQL', 'AOP', 'React'],
    accent: 'magenta',
  },
  {
    name: 'GreenBites',
    kicker: 'Food waste reduction',
    team: 'Frontend build',
    href: 'https://github.com/spiderman3137/GreenBites-H',
    demo: 'https://green-bites-h.vercel.app',
    description:
      'A full frontend platform that connects food donors with recipient organisations so surplus food reaches hungry people instead of the bin, with analytics to track the impact.',
    highlights: [
      'Four roles with their own dashboards: Admin, Food Donor, Recipient Organisation and Data Analyst.',
      'Roles communicate entirely on the frontend: donations, requests and status changes persist in localStorage.',
      'Full CRUD, role-based auth and routing, form validation and Recharts impact analytics.',
    ],
    viz: { kind: 'roles', items: ['Donor', 'Recipient', 'Admin', 'Analyst'] },
    metrics: [
      { value: 4, label: 'user roles' },
      { value: 0, label: 'frontend', text: '100%' },
      { value: 0, label: 'on Vercel', text: 'Live' },
    ],
    stack: ['React 19', 'React Router', 'Recharts', 'Framer Motion', 'localStorage', 'Vite'],
    accent: 'green',
  },
  {
    name: 'Railway Ticket Booking',
    kicker: 'DSA project in C',
    team: 'Solo build',
    description:
      'A railway ticket booking system written in C, where every feature runs on a hand-built data structure. No libraries, just pointers and memory.',
    highlights: [
      'Linked lists hold passengers and bookings, growing and shrinking with every reservation.',
      'Stacks and other core data structures drive booking history and cancellations.',
      'Book, cancel, search and display tickets from a console menu.',
    ],
    viz: { kind: 'list', items: ['PNR 101', 'PNR 102', 'PNR 103'] },
    stack: ['C', 'Linked lists', 'Stacks', 'Pointers', 'Dynamic memory'],
    accent: 'amber',
  },
]

export const skills = [
  { group: 'Languages', icon: '{ }', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C'] },
  {
    group: 'Backend',
    icon: '⚙',
    items: ['Spring Boot', 'Spring Security', 'Spring Cloud Gateway', 'Eureka', 'OpenFeign', 'JPA / Hibernate', 'REST', 'WebSocket / STOMP'],
  },
  { group: 'Data & Messaging', icon: '◈', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'RabbitMQ'] },
  {
    group: 'Cloud & Tools',
    icon: '☁',
    items: ['Docker', 'AWS', 'Railway', 'Cloudflare', 'Git', 'JUnit', 'Postman', 'SpotBugs', 'OWASP Dependency-Check'],
  },
  { group: 'Frontend', icon: '◐', items: ['React', 'Vite', 'Material UI', 'Tailwind CSS'] },
]

export const achievements = {
  leetcode: {
    solved: 155,
    java: 119,
    medium: 75,
    hard: 23,
    badge: '100 Days Badge 2026',
    href: 'https://leetcode.com/u/kl2400031537/',
  },
  hackathon: {
    title: 'Adobe India Hackathon 2025',
    detail: 'Cleared Round 1 — about 5,000 qualifiers from 2.5 lakh+ participants.',
    qualifiers: 5000,
    participants: 250000,
  },
  olympiads: [
    { short: 'IMO', name: 'International Mathematics Olympiad', result: 'Gold medal' },
    { short: 'IEO', name: 'International English Olympiad', result: 'Gold medal' },
  ],
  science: { short: 'ISO', name: 'International Science Olympiad', state: 42, national: 129 },
  certifications: [
    { name: 'Quantum Fundamentals', issuer: 'WISER × Government of Andhra Pradesh' },
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
    { name: 'Artificial Intelligence & Machine Learning', issuer: 'NPTEL' },
    { name: 'GitHub Copilot Certification', issuer: 'GitHub' },
    { name: 'AI-ML Virtual Internship (8 weeks)', issuer: 'AICTE × Google for Developers' },
  ],
}

// Every interest card has the same shape and the same visual weight.
export type Interest = {
  icon: string
  title: string
  text: string
  tags?: string[]
  actions?: { label: string; href: string }[]
  to?: string
}

export const interests: Interest[] = [
  {
    icon: '🚀',
    title: 'Space & space missions',
    text: 'I follow launches, probes and telescopes closely, and the engineering that takes us beyond Earth.',
    tags: ['Aditya-L1', 'Chandrayaan-3', 'Voyager 1', 'James Webb'],
  },
  {
    icon: '♞',
    title: 'Chess',
    text: 'I play on Chess.com as sairohithv. Send a challenge and let’s play a game.',
    actions: [
      { label: 'Challenge me', href: 'https://www.chess.com/play/online/new?opponent=sairohithv' },
      { label: 'Profile', href: 'https://www.chess.com/member/sairohithv' },
    ],
  },
  {
    icon: '🏏',
    title: 'Cricket',
    text: 'Playing or watching, cricket is my favourite way to switch off and recharge.',
  },
  {
    icon: '📖',
    title: 'Reading books',
    text: 'Books are where I pick up new ideas and perspectives, from stories to science.',
  },
  {
    icon: '🤝',
    title: 'Service',
    text: 'Teaching, volunteering and organising with the trust. Giving back keeps me grounded.',
    to: 'experience',
  },
]

export const inspirations = {
  title: 'People & ideas that inspire me',
  text: 'A collection of the people, ideas and moments that shaped how I think, build and serve. This page is being written.',
}

// Sections double as camera "stations" in the 3D journey (order matters).
// `waypoint` is the planet the light has passed by that station; `light` is
// that distance from the Sun in light-seconds (shown in the HUD).
export const sections = [
  { id: 'hero', label: 'Launch', short: '00', waypoint: 'The Sun', light: 0 },
  { id: 'about', label: 'Academics', short: '01', waypoint: 'Mercury', light: 193 },
  { id: 'experience', label: 'Trust', short: '02', waypoint: 'Venus', light: 360 },
  { id: 'projects', label: 'Projects', short: '03', waypoint: 'Earth', light: 499 },
  { id: 'skills', label: 'Skills', short: '04', waypoint: 'Mars', light: 760 },
  { id: 'workspace', label: 'Workspace', short: '05', waypoint: 'Jupiter', light: 2595 },
  { id: 'achievements', label: 'Achievements', short: '06', waypoint: 'Saturn', light: 4759 },
  { id: 'interests', label: 'Interests', short: '07', waypoint: 'Uranus', light: 9575 },
  { id: 'inspirations', label: 'Inspirations', short: '08', waypoint: 'Neptune', light: 14990 },
  { id: 'contact', label: 'Contact', short: '09', waypoint: 'Across the Milky Way', light: 3.156e12 },
] as const

export type SectionId = (typeof sections)[number]['id']
