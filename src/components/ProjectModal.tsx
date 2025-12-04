import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const techColors: Record<string, string> = {
  "React": "bg-blue-100 text-blue-800 border-blue-200",
  "Three.js": "bg-gray-100 text-gray-800 border-gray-200",
  "Stripe": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Tailwind": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Zustand": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Next.js": "bg-black text-white border-gray-800",
  "Supabase": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "WebSockets": "bg-purple-100 text-purple-800 border-purple-200",
  "Redis": "bg-red-100 text-red-800 border-red-200",
  "Vercel Edge": "bg-gray-900 text-white border-gray-700",
  "Python": "bg-blue-50 text-blue-900 border-blue-200",
  "D3.js": "bg-orange-100 text-orange-800 border-orange-200",
  "TensorFlow": "bg-orange-50 text-orange-700 border-orange-200",
  "Flask": "bg-gray-100 text-gray-800 border-gray-300",
  "NumPy": "bg-blue-100 text-blue-700 border-blue-200",
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div
        layoutId={`card-container-${project.title}`}
        className="w-full max-w-3xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
      >
        {/* Header Image / Gradient Area */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-surface to-black relative p-8 flex flex-col justify-end border-b border-border">
          <div className="absolute top-0 right-0 p-6 z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <motion.h2 layoutId={`card-title-${project.title}`} className="font-serif-display text-4xl md:text-5xl relative z-10 text-white">
            {project.title}
          </motion.h2>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 overflow-y-auto bg-surface">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent-violet mb-3">Overview</h3>
            <p className="text-lg text-text-muted font-serif leading-relaxed">
              {project.overview || project.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span> Problem
                </h4>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  {project.problem || "Identifying the core user friction points and scalability bottlenecks."}
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-green rounded-full"></span> Solution
                </h4>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  {project.solution || "Architecting a robust, scalable system using modern best practices."}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">Key Features</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features && project.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-sans">
                    <span className="text-accent-violet mt-1">▹</span>
                    {feature}
                  </li>
                ))}
                {!project.features && (
                  <li className="text-sm text-gray-400 italic">Features data loading...</li>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">Impact</h4>
                <p className="font-sans text-white font-medium">
                  {project.impact}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t: string) => (
                    <span key={t} className={`text-xs font-mono border px-3 py-1 rounded-full ${techColors[t] || "bg-white/10 text-gray-300 border-white/10"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-mono text-sm hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.sourceUrl && (
                <a 
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-mono text-sm hover:bg-white/10 transition-colors"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
              {project.comingSoon && !project.liveUrl && (
                <span className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm overflow-hidden">
                  {/* Animated gradient border */}
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 opacity-80 animate-pulse" />
                  <span className="absolute inset-[1.5px] bg-surface rounded-full" />
                  {/* Glowing dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500" />
                  </span>
                  {/* Text with gradient */}
                  <span className="relative bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent font-semibold tracking-wide">
                    Coming Soon
                  </span>
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
