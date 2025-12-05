import { useEffect } from 'react';
import AsciiHero from './components/AsciiHero';
import AboutTerminal from './components/AboutTerminal';
import QuoteTicker from './components/QuoteTicker';
import ProjectSection from './components/ProjectSection';
import InspirationSection from './components/InspirationSection';
import ContactForm from './components/ContactForm';
import SocialDock from './components/SocialDock';

function App() {
  // Ensure page starts at top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);
  return (
    <main className="min-h-screen w-full selection:bg-accent-violet/30 selection:text-accent-violet relative bg-background text-text-primary overflow-x-hidden">
      <AsciiHero />
      <QuoteTicker />
      <AboutTerminal />
      <ProjectSection />
      <InspirationSection />
      <ContactForm />
      <SocialDock />
      
      <footer className="pt-16 pb-32 px-4 md:px-8 border-t border-white/5 mt-20">
        {/* ASCII Divider */}
        <div className="max-w-4xl mx-auto mb-12 font-mono text-[10px] text-text-muted/30 text-center overflow-hidden whitespace-nowrap">
          {'─'.repeat(20)} ◈ {'─'.repeat(20)}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-mono text-sm text-accent-teal mb-2">~/mohammad-ghouse</h3>
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
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono bg-surface border border-border rounded">React</span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-surface border border-border rounded">Vite</span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-surface border border-border rounded">Tailwind</span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-surface border border-border rounded">Framer</span>
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
  );
}

export default App;
