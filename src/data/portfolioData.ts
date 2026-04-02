export interface Project {
  title: string;
  desc: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  ascii: string;
  impact: string;
  className: string;
  sourceUrl: string;
  liveUrl?: string;
  comingSoon?: boolean;
}

export interface Inspiration {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export const projects: Project[] = [
  {
    title: "Cookie Gallery",
    desc: "Artisanal bakery e-commerce with 3D interactions.",
    overview: "A high-performance e-commerce platform for a boutique bakery, featuring immersive 3D product visualizations and a seamless checkout experience. The project aimed to bridge the gap between physical sensory appeal and digital convenience.",
    problem: "A home-based artisan cookie business was stuck taking orders through Instagram DMs and WhatsApp—losing track of conversations, manually calculating totals, and missing payments. There was no way to showcase their full menu, handle secure transactions, or look professional enough to scale beyond word-of-mouth customers.",
    solution: "Built a complete e-commerce storefront from scratch with React 19 and TypeScript, featuring a visual cookie catalogue with nutritional info, ephemeral cart system, and Stripe-powered checkout for secure payments. Deployed on Vercel (frontend) and Railway (backend) with Firebase handling authentication and order storage—giving the business a professional online presence that converts browsers into buyers.",
    features: [
      "Interactive 3D Product Viewer (React Three Fiber)",
      "Real-time Inventory Management (Sanity CMS)",
      "Custom Cart & Checkout Flow (Stripe API)",
      "Performance Optimized (98+ Lighthouse Score)"
    ],
    tech: ["React", "Three.js", "Stripe", "Tailwind", "Zustand"],
    ascii: "[o_o]",
    impact: "Increased conversion rate by 25% and reduced bounce rate by 15% within the first month of launch.",
    className: "md:col-span-2 md:row-span-2",
    sourceUrl: "https://github.com/Mohammad-Ghouse-virtuoso/cookie-gallery_",
    liveUrl: "https://cookiegallery.mohammad-ghouse.site/"
  },
  {
    title: "EventiFy",
    desc: "Full-stack real-time event management platform for seamless coordination.",
    overview: "A full-stack real-time event platform that unifies planning, scheduling, attendee tracking, and check-ins into a single workflow for organizers and guests.",
    problem: "Event coordination with your network is fragmented across WhatsApp threads and social feeds. Hosts can't control RSVPs or track headcounts, guests miss updates, and organizers waste time chasing confirmations—resulting in poor turnout and planning chaos.",
    solution: "Built a responsive React frontend with dynamic updates for event creation, scheduling, and attendee tracking, backed by scalable APIs for event and user management. Added secure authentication with role-based access control and optimized request handling to support concurrent real-time usage.",
    features: [
      "Responsive UI with dynamic updates for event creation, scheduling, and attendee tracking",
      "Scalable backend APIs for efficient event and user lifecycle management",
      "Secure authentication and role-based access control for attendee/organizer/admin roles",
      "Performance-tuned architecture for concurrent users and high-volume real-time workloads"
    ],
    tech: ["React 18", "Vite", "TailwindCSS", "FastAPI", "SQLModel", "JWT", "SQLite", "Docker", "Vitest", "Pytest"],
    ascii: "{...}",
    impact: "Engineered for high-volume usage with smooth real-time performance under concurrent user load.",
    className: "md:col-span-1 md:row-span-1",
    sourceUrl: "https://github.com/Mohammad-Ghouse-virtuoso/EventiFy",
    liveUrl: "https://eventify.mohammad-ghouse.site/"
  },
  {
    title: "CRNN",
    desc: "End-to-end handwritten text recognition with CRNN + CTC.",
    overview: "An end-to-end handwriting recognition system built with a CRNN pipeline (CNN + RNN + CTC), designed for robust sequence decoding across diverse writing styles.",
    problem: "Neural network architectures are often treated as 'black boxes,' making it difficult for students to understand how data transforms through convolutional and recurrent layers.",
    solution: "Built a complete CRNN architecture for handwritten text recognition: CNN layers extract visual features, recurrent layers model character sequences, and CTC enables alignment-free training without pre-segmented labels.",
    features: [
      "End-to-end CRNN model (CNN + RNN + CTC) for handwritten text recognition",
      "CNN-based visual feature extraction from word and line images",
      "CTC (Connectionist Temporal Classification) for alignment-free training",
      "Trained on 100K+ handwritten samples for stronger robustness and generalization"
    ],
    tech: ["Python", "D3.js", "TensorFlow", "Flask", "NumPy"],
    ascii: "/_\\",
    impact: "Large-scale 100K+ sample training significantly improved robustness and generalization across diverse handwriting styles.",
    className: "md:col-span-1 md:row-span-1",
    sourceUrl: "https://github.com/Mohammad-Ghouse-virtuoso/Handwritten-text-recognition-crnn"
  }
];

export const inspirations: Inspiration[] = [
  // MENTORS (4)
  {
    name: "Swami Vivekananda",
    role: "Monk & Philosopher",
    image: "/assets/Swami_vivekananda.jpg",
    quote: "Arise, awake, and stop not till the goal is reached."
  },
  {
    name: "Friedrich Nietzsche",
    role: "Philosopher",
    image: "/assets/Neitzche.jpg",
    quote: "He who has a why to live can bear almost any how."
  },
  {
    name: "Albert Camus",
    role: "Existentialist",
    image: "/assets/albert_camus-2.jpeg",
    quote: "Man is the only creature who refuses to be what he is."
  },
  {
    name: "Steve Jobs",
    role: "Apple Co-founder",
    image: "/assets/Steve Jobs.jpg",
    quote: "The people who are crazy enough to think they can change the world are the ones who do."
  },
  // BOOKS (4)
  {
    name: "Psycho-Cybernetics",
    role: "Maxwell Maltz",
    image: "/assets/Pyschocybernatics_book.jpg",
    quote: "The self-image is the key to human personality and human behavior."
  },
  {
    name: "The Subtle Art",
    role: "Mark Manson",
    image: "/assets/Mark_manson book.jpg",
    quote: "Who you are is defined by what you're willing to struggle for."
  },
  {
    name: "48 Laws of Power",
    role: "Robert Greene",
    image: "/assets/Power.jpg",
    quote: "Never outshine the master. Make your masters appear more brilliant than they are."
  },
  {
    name: "Almanack of Naval",
    role: "Naval Ravikant",
    image: "/assets/Almanack_of_naval.jpg",
    quote: "Play long-term games with long-term people."
  }
];
