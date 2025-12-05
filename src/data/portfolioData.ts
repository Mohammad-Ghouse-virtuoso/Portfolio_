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
    problem: "The client struggled with low conversion rates due to static product imagery that failed to convey the texture and quality of their artisanal goods. Traditional e-commerce templates were too rigid for their brand identity.",
    solution: "Developed a custom storefront using React Three Fiber for interactive 3D cookie models, allowing users to inspect texture and toppings. Integrated a headless CMS for easy inventory management and Stripe for secure, frictionless payments.",
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
    desc: "Real-time event management platform.",
    overview: "A comprehensive event orchestration platform designed for large-scale virtual and hybrid conferences. It handles ticketing, live streaming, and attendee engagement in real-time.",
    problem: "Existing solutions were either too expensive or lacked the scalability to handle sudden spikes in traffic during keynote sessions. Organizers needed a reliable way to manage 10k+ concurrent users without downtime.",
    solution: "Architected a serverless backend using Supabase to handle real-time subscriptions for chat and polls. Implemented edge caching strategies and optimistic UI updates to ensure a lag-free experience for global attendees.",
    features: [
      "Real-time Chat & Q&A (WebSockets)",
      "Dynamic Seat Reservation System",
      "Live Stream Integration (HLS/RTMP)",
      "Role-based Access Control (RBAC)"
    ],
    tech: ["Next.js", "Supabase", "WebSockets", "Redis", "Vercel Edge"],
    ascii: "{...}",
    impact: "Successfully hosted 5 major conferences with zero downtime, scaling to support 10k+ concurrent users.",
    className: "md:col-span-1 md:row-span-1",
    sourceUrl: "https://github.com/Mohammad-Ghouse-virtuoso/EventiFy",
    comingSoon: true
  },
  {
    title: "CRNN",
    desc: "Neural network visualizer.",
    overview: "An educational tool designed to demystify Convolutional Recurrent Neural Networks (CRNNs) for students and researchers. It provides an interactive, layer-by-layer breakdown of data flow.",
    problem: "Neural network architectures are often treated as 'black boxes,' making it difficult for students to understand how data transforms through convolutional and recurrent layers.",
    solution: "Built a D3.js-based visualization engine that renders the internal state of the network in real-time. Users can input custom datasets and watch the activation maps update dynamically.",
    features: [
      "Layer-wise Activation Heatmaps",
      "Interactive Data Flow Diagram",
      "Custom Model Import (ONNX Support)",
      "Step-by-step Execution Mode"
    ],
    tech: ["Python", "D3.js", "TensorFlow", "Flask", "NumPy"],
    ascii: "/_\\",
    impact: "Adopted by 3 university courses as a primary teaching aid, simplifying complex neural architecture concepts.",
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
    name: "Elon Musk",
    role: "Engineer & Visionary",
    image: "/assets/Elon_musk.jpg",
    quote: "I think it's possible for ordinary people to be extraordinary."
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
