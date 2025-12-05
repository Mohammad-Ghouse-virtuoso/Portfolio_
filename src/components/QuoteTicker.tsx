import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "To improve is to change; to be perfect is to change often.", author: "Winston Churchill" },
  { text: "If you want to know who controls you, look at who you are not allowed to criticize.", author: "Voltaire" },
  { text: "To see further than anyone has seen before, you must be willing to tear out your eyes.", author: "Benjamin Labatut" },
  { text: "Plans should be measured in decades, execution should be measured in weeks.", author: "Sam Altman" },
  { text: "I can bear any pain as long as it has meaning.", author: "Haruki Murakami" },
  { text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.", author: "Carl Jung" },
];

const QuoteTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 border-y border-border overflow-hidden bg-gradient-to-b from-surface/50 to-background relative">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-accent-glow/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-8 text-center relative">
        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-accent-glow/30 mx-auto mb-6" />
        
        {/* Fixed height container to prevent CLS during quote transitions */}
        <div className="min-h-[160px] md:min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-6"
            >
            <p className="text-xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-text">
              "{quotes[currentIndex].text}"
            </p>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-transparent via-accent-teal to-transparent" />
              <span className="font-mono text-xs text-accent-teal tracking-widest uppercase">
                {quotes[currentIndex].author}
              </span>
              <span className="w-8 h-px bg-gradient-to-r from-transparent via-accent-teal to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentIndex 
                  ? 'w-8 bg-gradient-to-r from-accent-glow to-accent-teal' 
                  : 'w-2 bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteTicker;
