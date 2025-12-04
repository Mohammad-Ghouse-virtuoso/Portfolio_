import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: any;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      layoutId={`card-container-${project.title}`}
      onClick={onClick}
      className="group relative bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Background Gradient Blob */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-green/5 rounded-full blur-3xl group-hover:bg-accent-green/10 transition-colors duration-500" />

      <motion.div 
        layoutId={`card-ascii-${project.title}`}
        className="font-mono text-accent-green mb-6 text-xl relative z-10"
      >
        {project.ascii}
      </motion.div>
      
      <motion.h3 
        layoutId={`card-title-${project.title}`}
        className="font-serif text-2xl mb-3 group-hover:text-accent-green transition-colors relative z-10"
      >
        {project.title}
      </motion.h3>
      
      <motion.p 
        layoutId={`card-desc-${project.title}`}
        className="text-gray-500 font-sans text-sm leading-relaxed mb-8 relative z-10"
      >
        {project.desc}
      </motion.p>

      <div className="flex flex-wrap gap-2 mb-8 relative z-10">
        {project.tech.map((t: string) => (
          <span key={t} className="text-[10px] font-mono uppercase tracking-wider border border-gray-200 px-2 py-1 rounded-full text-gray-400 bg-white/50 backdrop-blur-sm">
            {t}
          </span>
        ))}
      </div>

      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4 duration-300">
        <ArrowUpRight className="text-accent-green" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
