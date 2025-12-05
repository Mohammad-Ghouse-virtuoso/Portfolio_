import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import { useState, useEffect, useRef } from 'react';

// Custom X (formerly Twitter) icon
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialItem = ({ icon: Icon, href }: { icon: any, href: string }) => {
  const { ref, x, y, handleMouse, reset } = useMagnetic();

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-border text-text-muted hover:text-accent-teal hover:border-accent-teal/50 transition-all duration-300"
      animate={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Icon size={20} />
    </motion.a>
  );
};

const SocialDock = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll updates to animation frames
      if (rafId.current !== null) return;
      
      rafId.current = requestAnimationFrame(() => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const bottomThreshold = document.documentElement.scrollHeight - 100;
        setIsAtBottom(scrollPosition >= bottomThreshold);
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isAtBottom ? 100 : 0, 
        opacity: isAtBottom ? 0 : 1 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4 p-2 rounded-full bg-surface/50 backdrop-blur-xl border border-white/5 shadow-2xl">
        <SocialItem icon={Github} href="https://github.com/Mohammad-Ghouse-virtuoso" />
        <SocialItem icon={XIcon} href="https://x.com/MohVirtuoso_" />
        <SocialItem icon={Linkedin} href="https://www.linkedin.com/in/mohammad-ghouse-0bb138209/" />
        <SocialItem icon={Mail} href="mailto:shaikmohammod109@gmail.com" />
      </div>
    </motion.div>
  );
};

export default SocialDock;
