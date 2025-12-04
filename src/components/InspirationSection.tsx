import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inspirations } from '../data/portfolioData';

const InspirationSection = () => {
  const [activeTab, setActiveTab] = useState<'mentors' | 'books'>('mentors');

  // Split data (assuming first 4 are mentors, next 4 are books based on data structure)
  const mentors = inspirations.slice(0, 4);
  const books = inspirations.slice(4, 8);
  
  const displayedItems = activeTab === 'mentors' ? mentors : books;

  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8 text-center">
          <span className="text-text-muted mr-4 font-mono text-sm">04</span>
          Inspiration
        </h2>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-surface border border-white/10 rounded-full relative">
          <div className="absolute inset-0 rounded-full bg-white/5 pointer-events-none" />
          <button
            onClick={() => setActiveTab('mentors')}
            className={`relative px-6 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              activeTab === 'mentors' ? 'text-black bg-white shadow-lg' : 'text-text-muted hover:text-white'
            }`}
          >
            Mentors
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`relative px-6 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              activeTab === 'books' ? 'text-black bg-white shadow-lg' : 'text-text-muted hover:text-white'
            }`}
          >
            Library
          </button>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group cursor-pointer h-[400px]"
            >
              <div className="h-full w-full overflow-hidden rounded-2xl bg-surface border border-border relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-100 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-accent-teal mb-3">{item.role}</p>
                    <p className="text-sm text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed line-clamp-3">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default InspirationSection;
