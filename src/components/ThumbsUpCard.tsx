import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const ThumbsUpCard = () => {
  const [appreciationCount, setAppreciationCount] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const particleIdRef = useRef(0);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-appreciation');
    if (saved) {
      setAppreciationCount(parseInt(saved, 10));
    }
  }, []);

  // Save to localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem('portfolio-appreciation', appreciationCount.toString());
  }, [appreciationCount]);

  // Create text-to-speech audio or use a simple tone
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback if audio fails - create a simple beep using Web Audio API
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = 800;
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
          console.log('Audio playback not available');
        }
      });
    }
  };

  const handleThumbsUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Play sound
    playSound();

    // Increment counter
    setAppreciationCount(prev => prev + 1);

    // Create particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 8 }, () => ({
      id: particleIdRef.current++,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }));

    setParticles(newParticles);

    // Trigger animation
    setIsAnimating(true);

    // Remove particles after animation
    setTimeout(() => {
      setParticles([]);
      setIsAnimating(false);
    }, 1000);
  };

  const Particle = ({ particle }: { particle: (typeof particles)[0] }) => {
    const angle = (particle.id * 360) / 8;
    const distance = 100;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    return (
      <motion.div
        key={particle.id}
        className="fixed pointer-events-none font-bold text-lg"
        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        animate={{ x, y, opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          left: particle.x,
          top: particle.y,
        }}
      >
        👍
      </motion.div>
    );
  };

  return (
    <>
      {/* Hidden audio element for sound */}
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
      />

      <SpotlightCard className="h-full">
        <div className="p-6 flex flex-col items-center justify-center h-full text-center">
          {/* Emoji Animation */}
          <motion.div
            animate={isAnimating ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="text-6xl">👍</div>
          </motion.div>

          {/* Counter */}
          <motion.div
            key={appreciationCount}
            className="mb-4"
            animate={{ scale: isAnimating ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-mono text-5xl font-bold bg-gradient-to-r from-accent-teal to-accent-glow bg-clip-text text-transparent">
              {appreciationCount.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted mt-1">appreciates 💫</p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={handleThumbsUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 px-6 py-3 bg-gradient-to-r from-accent-teal/30 to-accent-glow/30 border border-accent-teal/50 hover:border-accent-teal rounded-lg font-mono text-sm text-accent-teal hover:from-accent-teal/40 hover:to-accent-glow/40 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>Show Appreciation</span>
            </div>
          </motion.button>

          {/* Stats */}
          <div className="space-y-2 text-[10px] text-text-muted/70">
            <p>
              <span className="text-accent-teal font-mono">
                {Math.round((appreciationCount / (appreciationCount + 1)) * 100)}%
              </span>
              {' '}of visitors appreciate this work
            </p>
            <p>Last updated: <span className="font-mono">{new Date().toLocaleDateString()}</span></p>
            <p className="text-text-muted/50 text-[9px] mt-2">
              💾 stored locally, always remembered
            </p>
          </div>

          {/* Milestone Messages */}
          <AnimatePresence>
            {appreciationCount > 0 && appreciationCount % 100 === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-accent-glow/10 border border-accent-glow/30 rounded text-xs text-accent-glow font-mono"
              >
                🎉 Milestone: {appreciationCount} appreciates!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>

      {/* Render particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <Particle key={particle.id} particle={particle} />
        ))}
      </AnimatePresence>
    </>
  );
};

export default ThumbsUpCard;
