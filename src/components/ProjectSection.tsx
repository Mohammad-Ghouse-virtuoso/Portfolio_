import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolioData';
import TechIcon from './TechIcon';

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        className="flex items-end justify-between mb-12"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Selected Works</h2>
        <span className="font-mono text-xs text-text-muted hidden md:block">01 — 03</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
          >
          <SpotlightCard 
            className={`p-8 cursor-pointer group h-full ${project.className}`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="font-mono text-accent-indigo text-xl">{project.ascii}</div>
                  {project.comingSoon && (
                    <span className="relative inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] rounded-full overflow-hidden group/badge">
                      {/* Animated gradient border */}
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 opacity-80 animate-pulse" />
                      <span className="absolute inset-[1px] bg-black rounded-full" />
                      {/* Glowing dot */}
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fuchsia-500" />
                      </span>
                      {/* Text with gradient */}
                      <span className="relative bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                        Coming Soon
                      </span>
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" style={{ animationDelay: '0.5s' }} />
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-glow transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-sm">
                  {project.desc}
                </p>
                
                {/* Show features preview on large cards */}
                {project.className?.includes('col-span-2') && project.features && (
                  <div className="mt-6 space-y-2">
                    {project.features.slice(0, 3).map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
                        <span className="text-accent-glow">▹</span>
                        <span className="truncate">{feature.split('(')[0].trim()}</span>
                      </div>
                    ))}
                    {project.impact && (
                      <p className="mt-4 text-xs text-accent-indigo/80 font-mono">
                        ↗ {project.impact.split('.')[0]}.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-end justify-between mt-8">
                <div className="flex flex-wrap gap-2 items-center">
                  {project.tech.map((t) => (
                    <TechIcon key={t} name={t} size="sm" />
                  ))}
                </div>
                <ArrowUpRight className="text-accent-indigo opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;
