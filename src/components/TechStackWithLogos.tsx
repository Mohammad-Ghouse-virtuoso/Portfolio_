import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

interface Technology {
  name: string;
  logo: string; // SVG or emoji for simplicity
  category: string;
  color: string;
}

const TechStackWithLogos = () => {
  const technologies: Technology[] = [
    // Languages
    { name: "JavaScript", logo: "JS", category: "Language", color: "from-yellow-500 to-yellow-600" },
    { name: "TypeScript", logo: "TS", category: "Language", color: "from-blue-500 to-blue-600" },
    { name: "Python", logo: "PY", category: "Language", color: "from-cyan-400 to-cyan-500" },
    { name: "React", logo: "⚛️", category: "Framework", color: "from-cyan-400 to-blue-500" },
    { name: "Node.js", logo: "⬢", category: "Runtime", color: "from-green-500 to-green-600" },
    
    // Styling
    { name: "Tailwind CSS", logo: "🎨", category: "CSS", color: "from-cyan-400 to-cyan-600" },
    { name: "Framer Motion", logo: "✨", category: "Animation", color: "from-purple-500 to-purple-600" },
    
    // Databases
    { name: "MongoDB", logo: "🍃", category: "Database", color: "from-green-400 to-green-600" },
    { name: "PostgreSQL", logo: "🐘", category: "Database", color: "from-blue-600 to-blue-700" },
    { name: "Firebase", logo: "🔥", category: "Database", color: "from-orange-400 to-orange-600" },
    
    // DevOps
    { name: "Docker", logo: "🐳", category: "DevOps", color: "from-blue-400 to-blue-500" },
    { name: "Git", logo: "⚙️", category: "VCS", color: "from-red-500 to-orange-600" },
    { name: "AWS", logo: "☁️", category: "Cloud", color: "from-orange-400 to-orange-600" },
    
    // Testing
    { name: "Vitest", logo: "🧪", category: "Testing", color: "from-green-400 to-green-600" },
    { name: "Playwright", logo: "🎭", category: "Testing", color: "from-purple-500 to-purple-600" },
  ];

  const categories = Array.from(new Set(technologies.map(t => t.category)));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <SpotlightCard className="h-full">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-mono text-sm text-accent-teal mb-2">Tech Stack</h3>
          <p className="text-xs text-text-muted">
            {technologies.length} tools & technologies
          </p>
        </div>

        {/* By Category */}
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category}>
              <p className="font-mono text-[10px] text-text-muted/60 uppercase tracking-wider mb-3">
                {category}
              </p>
              
              <motion.div
                className="grid grid-cols-3 gap-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {technologies
                  .filter(t => t.category === category)
                  .map((tech, idx) => (
                    <motion.div
                      key={idx}
                      variants={item}
                      whileHover={{ scale: 1.08, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-lg border border-border/30 hover:border-border/60 transition-all cursor-pointer group bg-gradient-to-br ${tech.color} opacity-20 hover:opacity-30`}
                    >
                      <div className="text-2xl mb-2">{tech.logo}</div>
                      <div>
                        <p className="font-mono text-[10px] text-text-primary font-semibold">
                          {tech.name}
                        </p>
                        <p className="text-[9px] text-text-muted/70 group-hover:text-text-muted transition-colors">
                          {category}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted/70">Always learning new tech</span>
            <motion.span
              className="inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚙️
            </motion.span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default TechStackWithLogos;
