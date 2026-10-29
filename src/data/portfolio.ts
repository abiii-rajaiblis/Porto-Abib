export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  fullOverview: string;
  stack: string[];
  highlights: string[];
  metrics: string[];
  githubUrl: string;
  liveUrl: string;
  badge: string;
  visualTheme: 'crimson' | 'dark' | 'amber' | 'cyan';
  slug: string;
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'UI/UX' | 'Tools' | 'AI & Tech';
  element: 'Slash' | 'Gun' | 'Agi' | 'Bufu' | 'Zio' | 'Garula' | 'Psi' | 'Frei' | 'Kouha' | 'Eiha';
  level: string;
  tag: string;
  proficiency: number;
  description: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Habib Aulia Az Zuhri",
    shortName: "Habib Aulia",
    nickname: "Abi",
    agentName: "Agent Ebi",
    codeName: "JOKER_DEV",
    monogram: "HAZ",
    photoUrl: "/assets/aistudio/file_00000000d3c081f58ee0c5a97e9ecbcf_ca969c45.png",
    role: "Developer • Designer • Creative Technologist",
    subRoles: ["Frontend Engineer", "UI/UX & Motion Designer", "Creative Technologist"],
    email: "abibaulia26@gmail.com",
    github: "https://github.com/abiii-rajaiblis",
    instagram: "https://instagram.com/abib_bibib",
    instagramHandle: "@abib_bibib",
    location: "Indonesia",
    availability: "Available for high-stakes projects & design engineering",
    bioSnippet: "Forging dynamic web experiences where bold typography, asymmetric architecture, and kinetic motion collide into unforgettable digital interfaces.",
    identityStory: {
      headline: "THE OPERATIVE: HABIB AULIA / ABI / AGENT EBI",
      callsign: "AGENT EBI // TAC-OPS",
      description: "Habib Aulia Az Zuhri is a developer and visual designer operating at the intersection of technical rigor and radical aesthetic expression. Known affectionately by friends and colleagues as Abi, he adopts the digital phantom moniker Agent Ebi when unleashing high-velocity digital craft.",
      dualNature: [
        {
          persona: "ABI — The Architect",
          focus: "Precision full-stack engineering, strict TypeScript typing, sub-second latency, accessible DOM structures, and reliable system architecture."
        },
        {
          persona: "AGENT EBI — The Phantom Operative",
          focus: "Rebellious visual direction, Persona 5 comic slashes, tactile microcopy triggers, and kinetic motion designed to steal hearts from boring templates."
        }
      ]
    },
    fullBio: [
      "I am a developer and visual designer who rejects sterile, cookie-cutter templates. My engineering philosophy blends precision full-stack architecture with the visceral punch of graphic design, comic arts, and game UI systems.",
      "Known as Abi in the developer community and Agent Ebi on high-stakes creative operations, I orchestrate web products where every interaction delivers immediate sensory feedback, uncompromising performance, and unmistakable personality.",
      "From engineering reactive health triage applications (Home Care AI) to interactive folklore simulations (Desa Senja Pixel) and experimental design academies (DGI Academy), I treat every viewport as a battlefield against digital monotony."
    ],
    stats: [
      { label: "YEARS CODING & DESIGN", value: "04+" },
      { label: "PRODUCTION MISSIONS", value: "15+" },
      { label: "FRAME RATE TARGET", value: "60 FPS" },
      { label: "ACCESSIBILITY RATING", value: "WCAG AA" },
    ],
  },

  skills: [
    {
      name: "React 19 & Next.js",
      category: "Frontend",
      element: "Slash",
      level: "MASTER",
      tag: "CORE WEAPON",
      proficiency: 96,
      description: "Modern component architecture, concurrent features, server components, and fluid lifecycle hooks."
    },
    {
      name: "TypeScript",
      category: "Frontend",
      element: "Gun",
      level: "EXPERT",
      tag: "TYPE SHIELD",
      proficiency: 94,
      description: "Strict static typing, generic interfaces, compile-time safety, and self-documenting codebases."
    },
    {
      name: "Motion & Framer Motion",
      category: "Frontend",
      element: "Zio",
      level: "EXPERT",
      tag: "KINETIC ARTS",
      proficiency: 92,
      description: "Compositor-driven spring physics, staggered orchestrations, gesture handlers, and layout transitions."
    },
    {
      name: "Tailwind CSS & CSS Grid",
      category: "Frontend",
      element: "Agi",
      level: "MASTER",
      tag: "STYLING BLADE",
      proficiency: 98,
      description: "Asymmetrical polygon clipping, responsive utility math, responsive fluid typography, and dark canvas styling."
    },
    {
      name: "Canvas API & SVG Vector",
      category: "Frontend",
      element: "Bufu",
      level: "ADVANCED",
      tag: "PARTICLE FORGE",
      proficiency: 90,
      description: "High-performance procedural star/sparkle fields, custom vector morphing, and interactive HUD screens."
    },
    {
      name: "Node.js & Express",
      category: "Backend",
      element: "Frei",
      level: "PROFICIENT",
      tag: "SERVER ENGINE",
      proficiency: 88,
      description: "RESTful architecture, API proxy routing, JWT authentication, and low-latency microservices."
    },
    {
      name: "PostgreSQL & Cloud SQL",
      category: "Backend",
      element: "Psi",
      level: "PROFICIENT",
      tag: "RELATIONAL VAULT",
      proficiency: 85,
      description: "Relational data modeling, ACID transactions, indexing strategies, and ORM query optimization."
    },
    {
      name: "Firebase & Firestore",
      category: "Backend",
      element: "Eiha",
      level: "ADVANCED",
      tag: "REALTIME CLOUD",
      proficiency: 90,
      description: "NoSQL document synchronization, security rules enforcement, and reactive user auth states."
    },
    {
      name: "Persona 5 Art Direction & UI",
      category: "UI/UX",
      element: "Kouha",
      level: "SPECIALTY",
      tag: "SIGNATURE FLIGHT",
      proficiency: 99,
      description: "Ransom cut-outs, high-contrast monochrome slashes, angled composition, and comic book visual punch."
    },
    {
      name: "Figma & Design Systems",
      category: "UI/UX",
      element: "Garula",
      level: "EXPERT",
      tag: "SYSTEM BLUEPRINT",
      proficiency: 92,
      description: "Tokenized design systems, responsive auto-layout archetypes, interactive prototyping, and handoff."
    },
    {
      name: "Gemini AI & LLM Systems",
      category: "AI & Tech",
      element: "Zio",
      level: "ADVANCED",
      tag: "NEURAL COGNITION",
      proficiency: 88,
      description: "Prompt orchestration, function calling, multimodal inputs, and server-side AI processing pipelines."
    },
    {
      name: "Git, Linux & Build Tooling",
      category: "Tools",
      element: "Slash",
      level: "EXPERT",
      tag: "ARSENAL SUITE",
      proficiency: 94,
      description: "Vite build pipelines, Dockerized runtime isolation, semantic versioning, and continuous delivery."
    }
  ] as SkillItem[],

  projects: [
    {
      id: "home-care-ai",
      title: "Home Care AI",
      tagline: "AI-Assisted Patient Triage & Emergency Healthcare Dispatch Hub",
      category: "AI & Full-Stack Medical Hub",
      description: "A high-reliability remote healthcare operating system combining patient diagnostic triage, vital telemetry analysis, and rapid alert dispatch.",
      fullOverview: "Home Care AI bridges the gap between home-bound patients and clinical first responders. Built with a responsive diagnostic dashboard, the application processes real-time vitals, highlights clinical anomalies with visual telemetry cards, and generates prioritized emergency dispatch workflows with AI-assisted clinical summarization.",
      stack: ["React 19", "TypeScript", "Gemini API", "Tailwind CSS", "Express", "Lucide"],
      highlights: [
        "Immediate AI diagnostic triage scoring and automated symptom severity clustering",
        "Live simulated cardiac telemetry monitor with responsive rhythm graph",
        "Role-based practitioner dispatch queue with one-tap emergency escalation",
        "Encrypted patient records management with rapid filter presets"
      ],
      metrics: [
        "Sub-800ms symptom triage analysis",
        "100% responsive medical operator interface",
        "Zero layout shifts during live data stream"
      ],
      githubUrl: "https://github.com/abiii-rajaiblis",
      liveUrl: "https://github.com/abiii-rajaiblis",
      badge: "MISSION #01",
      visualTheme: "crimson",
      slug: "home-care-ai"
    },
    {
      id: "desa-senja-pixel",
      title: "Desa Senja Pixel",
      tagline: "Interactive Rural Twilight Atmosphere & Folklore Adventure",
      category: "Creative Coding & Game Experience",
      description: "An evocative pixel-art web narrative exploring Indonesian village folklore, twilight atmosphere, and dynamic day-night soundscapes.",
      fullOverview: "Desa Senja Pixel is a love letter to Indonesian rural serenity and traditional twilight mythology ('waktu maghrib / senja'). Users explore an interactive village scene with dynamic pixel lanterns, reactive wind particles, character dialogue trees, and procedural environmental audio.",
      stack: ["HTML5 Canvas", "TypeScript", "Web Audio API", "Tailwind CSS", "Motion"],
      highlights: [
        "Bespoke 60 FPS Canvas pixel rendering engine with custom palette dithering",
        "Interactive narrative dialogue system with branching cultural story choices",
        "Dynamic ambient twilight gradient shifting based on local clock time",
        "Zero-external-asset audio synthesizer generating crickets and evening winds"
      ],
      metrics: [
        "Rock-solid 60 FPS canvas frame rate",
        "Under 45KB initial bundle footprint",
        "Touch-optimized village exploration controls"
      ],
      githubUrl: "https://github.com/abiii-rajaiblis",
      liveUrl: "https://github.com/abiii-rajaiblis",
      badge: "MISSION #02",
      visualTheme: "amber",
      slug: "desa-senja-pixel"
    },
    {
      id: "dgi-academy",
      title: "DGI Academy",
      tagline: "Graphic Design Masterclass & Interactive Typography Sandbox",
      category: "EdTech & Interactive Design System",
      description: "Interactive e-learning platform guiding Indonesian graphic design apprentices through brutalist layouts, Swiss grid discipline, and kinetic type.",
      fullOverview: "DGI Academy (Desain Grafis Indonesia) reimagines design education through hands-on browser labs. Students inspect real layout vectors, tweak typographic rhythm with live sliders, solve composition puzzles, and receive instant feedback on contrast, visual hierarchy, and balance.",
      stack: ["React 19", "TypeScript", "Motion", "Tailwind CSS", "Vite"],
      highlights: [
        "Real-time typographic kerning & baseline grid inspection sandbox",
        "Visual hierarchy grading algorithm detecting contrast ratios and focal balance",
        "Bespoke curriculum roadmap with unlockable design challenge badges",
        "High-contrast editorial interface with darkroom and print modes"
      ],
      metrics: [
        "Interactive real-time layout feedback engine",
        "12+ interactive typography mini-labs",
        "100% keyboard accessible design tools"
      ],
      githubUrl: "https://github.com/abiii-rajaiblis",
      liveUrl: "https://github.com/abiii-rajaiblis",
      badge: "MISSION #03",
      visualTheme: "dark",
      slug: "dgi-academy"
    },
    {
      id: "phantom-canvas-lab",
      title: "Phantom Canvas UI Lab",
      tagline: "Game-Grade Asymmetrical Web Interaction & Animation Engine",
      category: "Motion & UI Framework",
      description: "Experimental design system translating the visceral cutouts, comic slashes, and speed lines of Persona 5 into production web components.",
      fullOverview: "A dedicated design engineering laboratory where game aesthetics meet production web standards. It features zero-layout-shift polygon slash panels, ransom-note typography generators, bespoke sparkle physics, and high-performance keyboard-triggered microcopy tags.",
      stack: ["React 19", "Motion", "Tailwind CSS", "SVG Vectors", "TypeScript"],
      highlights: [
        "Compositor-only hardware-accelerated star & sparkle emitter",
        "Ransom note typography engine with variable angle jitter",
        "Accessible triggered stickers with safe-viewport positioning",
        "Seamless prefers-reduced-motion fallback system"
      ],
      metrics: [
        "0ms blocking time on interactive triggers",
        "Full WCAG AA color contrast compliance",
        "Lightweight pure vector graphics without heavy assets"
      ],
      githubUrl: "https://github.com/abiii-rajaiblis",
      liveUrl: "https://github.com/abiii-rajaiblis",
      badge: "MISSION #04",
      visualTheme: "cyan",
      slug: "phantom-canvas-lab"
    }
  ] as Project[],

  quotes: [
    {
      text: "THE CODE MUST STRIKE WITH VISCERAL IMPACT.",
      speaker: "HABIB AULIA",
      tag: "PHILOSOPHY"
    },
    {
      text: "STEAL HEARTS NOT WITH TEMPLATES, BUT WITH AUTHENTIC CRAFT.",
      speaker: "MANIFESTO",
      tag: "CORE VALUE"
    }
  ]
};
