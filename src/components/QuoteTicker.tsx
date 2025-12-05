import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface QuoteData {
  text: string;
  author: string;
  category: string;
}

const quotes: QuoteData[] = [
  { text: "To improve is to change; to be perfect is to change often.", author: "Winston Churchill", category: "Growth" },
  { text: "If you want to know who controls you, look at who you are not allowed to criticize.", author: "Voltaire", category: "Freedom" },
  { text: "To see further than anyone has seen before, you must be willing to tear out your eyes.", author: "Benjamin Labatut", category: "Vision" },
  { text: "Plans should be measured in decades, execution should be measured in weeks.", author: "Sam Altman", category: "Strategy" },
  { text: "I can bear any pain as long as it has meaning.", author: "Haruki Murakami", category: "Purpose" },
  { text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.", author: "Carl Jung", category: "Awareness" },
];

const QuoteTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 15 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-glow/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
          <span className="font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase">Beliefs</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
        </div>

        {/* Quote container with fixed height */}
        <div className="min-h-[280px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              {/* Category tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-6"
              >
                <span className="inline-block px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-accent-teal border border-accent-teal/20 rounded-full bg-accent-teal/5">
                  {quotes[currentIndex].category}
                </span>
              </motion.div>

              {/* Quote text with elegant typography */}
              <blockquote className="relative">
                <span className="absolute -top-4 -left-2 text-6xl text-accent-glow/10 font-serif select-none">"</span>
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-text/90 px-4 md:px-8">
                  {quotes[currentIndex].text}
                </p>
                <span className="absolute -bottom-8 -right-2 text-6xl text-accent-glow/10 font-serif select-none rotate-180">"</span>
              </blockquote>

              {/* Author attribution */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 flex items-center justify-center gap-4"
              >
                <span className="w-8 h-px bg-border" />
                <span className="font-mono text-sm text-text-muted">
                  {quotes[currentIndex].author}
                </span>
                <span className="w-8 h-px bg-border" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots with progress indicator */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {quotes.map((quote, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`View quote by ${quote.author}`}
              className="group relative p-2 -m-2"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? 'w-8 bg-gradient-to-r from-accent-glow to-accent-teal'
                    : 'w-1.5 bg-white/15 group-hover:bg-white/30'
                }`}
              />
              {/* Tooltip on hover */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-text-muted whitespace-nowrap">
                {quote.category}
              </span>
            </button>
          ))}
        </div>

        {/* Keyboard hint */}
        <p className="text-center mt-8 text-[10px] font-mono text-text-muted/40">
          Click to explore • Auto-advances every 8s
        </p>
      </div>
    </section>
  );
};

export default QuoteTicker;
