import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface HistoryItem {
  command: string;
  output: string | JSX.Element;
}

const fileSystem: Record<string, string[] | string> = {
  '~': ['about/', 'skills/', 'contact.txt', 'interests.txt'],
  '~/about': ['bio.txt', 'philosophy.txt'],
  '~/skills': ['frontend.md', 'backend.md', 'design.md'],
};

const fileContents: Record<string, string | JSX.Element> = {
  'interests.txt': `**Technology & Engineering**
**AI & Future Systems**
**Finance & Global Markets**
**State & International Affairs**
**Philosophy**`,
  'contact.txt': `Website: mohammad-ghouse.site
Email: shaikmohammod109@gmail.com
GitHub: github.com/Mohammad-Ghouse-virtuoso
LinkedIn: linkedin.com/in/mohammad-ghouse-0bb138209
X/Twitter: x.com/MohVirtuoso_`,
  '~/about/bio.txt': `I'm **Mohammad Ghouse** - building at the intersection of code, capital, and curiosity.
My work sits where technology meets human behavior.

I explore life through philosophy and data, believing that good ideas come from asking better questions.
Books keep me grounded; questions keep me alive.

Capitalist by spirit, socialist by heart.
Nationalist with a social, humane, and progressive outlook.

**TLDR;**
Legacy over noise. Tenacity over trends.
Patterns. Purpose. Paradox.`,
  '~/about/philosophy.txt': `"Code is poetry, but shipping is prose."

I believe in:
-> Simplicity over complexity
-> Iteration over perfection
-> User experience over ego
-> Reason, progress, and equality`,
  '~/skills/frontend.md': `# Programming
C, C++, Java, Python, R, JavaScript

# Web Development
Frontend, Backend, APIs, System Flows

# AI & Automation
AI-assisted development, reasoning tools, workflow acceleration`,
  '~/skills/backend.md': `# Software Engineering
Architecture thinking, debugging, scalability mindset

# Problem-Solving
Pattern recognition, critical reasoning, structured thinking`,
  '~/skills/design.md': `# Markets & Finance
Trading, market structures, global finance

# Additional Skills
System design, data analysis, strategic planning`,
};

const AboutTerminal = () => {
  const [currentPath, setCurrentPath] = useState('~');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: 'cat interests.txt', output: fileContents['interests.txt'] as string }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getHelp = () => (
    <div className="text-text-muted">
      <p className="text-accent-glow mb-2">Available commands:</p>
      <div className="grid grid-cols-2 gap-x-8 gap-y-1">
        <span><span className="text-accent-teal">ls</span> - list files</span>
        <span><span className="text-accent-teal">cd</span> [dir] - change directory</span>
        <span><span className="text-accent-teal">cat</span> [file] - read file</span>
        <span><span className="text-accent-teal">pwd</span> - print working directory</span>
        <span><span className="text-accent-teal">clear</span> - clear terminal</span>
        <span><span className="text-accent-teal">whoami</span> - current user</span>
        <span><span className="text-accent-teal">date</span> - current date</span>
        <span><span className="text-accent-teal">help</span> - show this message</span>
      </div>
    </div>
  );

  const processCommand = (cmd: string): string | JSX.Element => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (command) {
      case '':
        return '';
      case 'help':
      case '?':
        return getHelp();
      case 'clear':
        setHistory([]);
        return '';
      case 'ls':
        const dirContent = fileSystem[currentPath];
        if (dirContent) {
          return (
            <div className="flex flex-wrap gap-4">
              {(dirContent as string[]).map((item, i) => (
                <span key={i} className={item.endsWith('/') ? 'text-accent-glow' : 'text-text'}>
                  {item}
                </span>
              ))}
            </div>
          );
        }
        return 'Directory empty';
      case 'pwd':
        return (
          <div>
            <span className="text-accent-teal">{currentPath}</span>
            <span className="text-text-muted ml-2">// you're exactly where you need to be ✨</span>
          </div>
        );
      case 'whoami':
        return 'guest@portfolio (visitor mode)';
      case 'date':
        return new Date().toLocaleString();
      case 'cd':
        if (!arg || arg === '~') {
          setCurrentPath('~');
          return '';
        }
        if (arg === '..') {
          if (currentPath === '~') return '';
          const parentPath = currentPath.split('/').slice(0, -1).join('/') || '~';
          setCurrentPath(parentPath);
          return '';
        }
        const newPath = currentPath === '~' ? `~/${arg.replace('/', '')}` : `${currentPath}/${arg.replace('/', '')}`;
        if (fileSystem[newPath]) {
          setCurrentPath(newPath);
          return '';
        }
        return `cd: no such directory: ${arg}`;
      case 'cat':
        if (!arg) return 'cat: missing file operand';
        const filePath = currentPath === '~' ? arg : `${currentPath}/${arg}`;
        const content = fileContents[filePath] || fileContents[arg];
        if (content) return content;
        return `cat: ${arg}: No such file or directory`;
      case 'sudo':
        return '🚫 Nice try! You need root access for that.';
      case 'rm':
        return '🛡️ Protected: Read-only filesystem';
      case 'exit':
        return '👋 Thanks for exploring! Refresh to restart.';
      case 'neofetch':
        return (
          <div className="text-accent-teal">
            <pre className="text-xs leading-tight">{`
   ╭─────────────────────╮
   │  Mohammad Ghouse    │
   │  ─────────────────  │
   │  OS: Portfolio v2.0 │
   │  Shell: React/TSX   │
   │  Theme: Obsidian    │
   │  Status: Hiring! 🟢 │
   ╰─────────────────────╯
            `}</pre>
          </div>
        );
      case 'cowsay':
        const cowArg = arg || 'Hello, World!';
        return (
          <pre className="text-xs text-text">{`
  ${'_'.repeat(cowArg.length + 2)}
 < ${cowArg} >
  ${'-'.repeat(cowArg.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
          `}</pre>
        );
      case 'matrix':
        return 'Wake up, Neo... The Matrix has you.';
      case 'coffee':
        return 'Brewing... Coffee ready!';
      case 'hire':
        return 'Great choice! Check out contact.txt or email me directly.';
      default:
        return `zsh: command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const output = processCommand(input);
      if (input.trim() !== 'clear') {
        setHistory(prev => [...prev, { command: input, output }]);
      }
      if (input.trim()) {
        setCommandHistory(prev => [...prev, input]);
      }
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-xl overflow-hidden shadow-2xl border-border bg-surface/80"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header - Clean Style */}
        <div className="bg-gradient-to-b from-[#3a3a3c] to-[#2d2d2f] border-b border-black/50 px-4 py-2.5 flex items-center">
          {/* Decorative Dots (non-interactive) */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]/60" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]/60" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]/60" />
          </div>

          {/* Center Title */}
          <div className="flex-1 flex justify-center items-center gap-2">
            <Terminal size={14} className="text-accent-teal" />
            <span className="font-sans text-sm text-white/90 font-medium">portfolio</span>
          </div>

          {/* Right Side Hint */}
          <div className="flex items-center text-text-muted/40">
            <span className="font-mono text-[10px] uppercase tracking-wider">type 'help'</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed text-text-muted max-h-[400px] overflow-y-auto"
        >
          {history.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-accent-teal">➜</span> 
                <span className="text-accent-glow">{currentPath === '~' ? '~' : currentPath.split('/').pop()}</span>
                <span className="text-text">{item.command}</span>
              </div>
              {item.output && (
                <div className="mt-2 ml-4 text-text whitespace-pre-wrap">
                  {typeof item.output === 'string' 
                    ? item.output.split('**').map((part, j) => 
                        j % 2 === 1 ? <span key={j} className="text-white font-bold">{part}</span> : part
                      )
                    : item.output
                  }
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <span className="text-accent-teal">➜</span> 
            <span className="text-accent-glow">{currentPath === '~' ? '~' : currentPath.split('/').pop()}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-text caret-accent-glow"
              spellCheck={false}
              autoComplete="off"
              autoFocus
              aria-label="Terminal input"
            />
            <span className="animate-pulse text-white">_</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutTerminal;
