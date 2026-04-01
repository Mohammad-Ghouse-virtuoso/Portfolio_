import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import DotGrid from './DotGrid';
import TechIcon from './TechIcon';

const AsciiHero = () => {
  const { x, y } = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse micro-parallax on the heading
  const textX = useTransform(x, [-1, 1], [-10, 10]);
  const textY = useTransform(y, [-1, 1], [-10, 10]);

  // Scroll-linked parallax — content drifts up as hero scrolls out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={sectionRef} className="min-h-[80vh] flex flex-col justify-center items-center relative p-8 overflow-hidden bg-background">
      {/* Interactive dot grid — responds to mouse proximity */}
      <DotGrid />

      {/* Slow-drifting ambient orb — breathes behind content */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full blur-[150px] w-[640px] h-[640px]"
          style={{
            top: '30%',
            left: '45%',
            background: 'radial-gradient(circle, rgba(129,140,248,0.13) 0%, transparent 70%)',
          }}
          animate={{
            x: ['-60%', '-28%'],
            y: ['-50%', '-18%'],
            scale: [1, 1.2],
          }}
          transition={{
            duration: 12,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Content — applies scroll parallax */}
      <motion.div className="z-10 max-w-5xl w-full text-center" style={{ y: parallaxY }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          {/* System Status Display - Strobing Red */}
          <div className="font-mono text-xs mb-6 tracking-[0.2em] uppercase flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-500 animate-pulse" style={{ textShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}>
              SYSTEM_READY :: v2.0.4
            </span>
          </div>
          
          <motion.h1 
            style={{ x: textX, y: textY }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8"
          >
            <span className="font-mono text-accent-indigo text-2xl md:text-3xl lg:text-4xl block mb-3 tracking-wide">Hej! I'm</span>
            <span className="font-bold text-gradient-glow">Mohammad{' '}
              <span className="glitch-text" data-text="Ghouse!">
                <span className="float-letter" style={{ animationDelay: '0s' }}>G</span>
                <span className="float-letter" style={{ animationDelay: '0.2s' }}>h</span>
                <span className="float-letter" style={{ animationDelay: '0.4s' }}>o</span>
                <span className="float-letter" style={{ animationDelay: '0.6s' }}>u</span>
                <span className="float-letter" style={{ animationDelay: '0.8s' }}>s</span>
                <span className="float-letter" style={{ animationDelay: '1.0s' }}>e</span>
                <span className="float-letter" style={{ animationDelay: '1.2s' }}>!</span>
              </span>
            </span>
          </motion.h1>
          
          <div className="flex flex-col items-center gap-4 font-mono text-sm text-text-muted">
            <p className="max-w-md leading-relaxed">
              <span className="text-accent-glow">{`>`}</span> Architecting digital voids into immersive experiences.
            </p>
            <div className="flex gap-3 mt-4 items-center justify-center">
              {['React', 'WebGL', 'Design'].map((t) => (
                <TechIcon key={t} name={t} size="sm" showFallback={false} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AsciiHero;
