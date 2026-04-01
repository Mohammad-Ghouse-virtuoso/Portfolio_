import { useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AsciiHero from './components/AsciiHero';
import QuoteTicker from './components/QuoteTicker';
import SocialDock from './components/SocialDock';
import ShimmerStars from './components/ShimmerStars';
import TechIcon from './components/TechIcon';

// Lazy load below-fold components for faster initial load
const AboutTerminal = lazy(() => import('./components/AboutTerminal'));
const ProjectSection = lazy(() => import('./components/ProjectSection'));
const InspirationSection = lazy(() => import('./components/InspirationSection'));
const ContactForm = lazy(() => import('./components/ContactForm'));

// Minimal loading placeholder that doesn't cause layout shift
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-accent-indigo/30 border-t-accent-indigo rounded-full animate-spin" />
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Ensure page starts at top on refresh
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Fallback scroll after any lazy content loads
    const timeout = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {/* Scroll progress bar — fixed 1px line at the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left bg-accent-indigo"
        style={{ scaleX }}
      />
      <ShimmerStars count={60} />
      <main className="min-h-screen w-full selection:bg-accent-violet/30 selection:text-accent-violet relative z-10 text-text-primary overflow-x-hidden">
      <AsciiHero />
      <QuoteTicker />
      <Suspense fallback={<SectionLoader />}>
        <AboutTerminal />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProjectSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <InspirationSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactForm />
      </Suspense>
      <SocialDock />

      <footer className="pt-16 pb-32 px-4 md:px-8 border-t border-white/5 mt-20">
        {/* ASCII Divider */}
        <div className="max-w-4xl mx-auto mb-12 font-mono text-[10px] text-text-muted/30 text-center overflow-hidden whitespace-nowrap">
          {'─'.repeat(20)} ◈ {'─'.repeat(20)}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-mono text-sm text-accent-indigo mb-2">~/mohammad-ghouse</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              "One must imagine Sisyphus happy."<br />— Hyderabad, India 🇮🇳
            </p>
          </div>

          {/* Center - Quick Nav */}
          <div className="text-center">
            <h3 className="font-mono text-xs text-text-muted/50 uppercase tracking-wider mb-3">Navigate</h3>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-text-muted hover:text-accent-glow transition-colors">/home</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-text-muted hover:text-accent-glow transition-colors">/projects</a>
            </nav>
          </div>

          {/* Right - Built With */}
          <div className="text-center md:text-right">
            <h3 className="font-mono text-xs text-text-muted/50 uppercase tracking-wider mb-3">Built With</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 items-center">
              {['React', 'Vite', 'Tailwind', 'Framer'].map((t) => (
                <TechIcon key={t} name={t} size="sm" showFallback={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-white/5">
          <p className="font-mono text-[10px] text-text-muted/50 text-center">
            © 2025 Mohammad Ghouse. All rights reserved.
          </p>
        </div>

        {/* Easter Egg Sign-off */}
        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] text-text-muted/20 hover:text-text-muted/50 transition-colors cursor-default">
            {`/* crafted with <code/> & ☕ at 3 am */`}
          </p>
        </div>
      </footer>
    </main>
    <Analytics />
    </>
  );
}

export default App;
