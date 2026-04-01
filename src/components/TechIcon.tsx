import { useState } from 'react';

/**
 * Maps tech names → { slug, color } for https://cdn.simpleicons.org/{slug}/{color}
 * Only includes entries confirmed to exist in simple-icons.
 * Unlisted techs fall back to text badge (or hidden via showFallback=false).
 */
const TECH_MAP: Record<string, { slug: string; color: string }> = {
  // Frontend
  "React":        { slug: "react",           color: "61DAFB" },
  "React 18":     { slug: "react",           color: "61DAFB" },
  "Next.js":      { slug: "nextdotjs",       color: "FFFFFF" },
  "Vite":         { slug: "vite",            color: "646CFF" },
  "Tailwind":     { slug: "tailwindcss",     color: "06B6D4" },
  "TailwindCSS":  { slug: "tailwindcss",     color: "06B6D4" },
  "Three.js":     { slug: "threedotjs",      color: "FFFFFF" },
  "D3.js":        { slug: "d3dotjs",         color: "F9A03C" },
  // Payments
  "Stripe":       { slug: "stripe",          color: "635BFF" },
  // Backend
  "FastAPI":      { slug: "fastapi",         color: "009688" },
  "Flask":        { slug: "flask",           color: "FFFFFF" },
  "Python":       { slug: "python",          color: "3776AB" },
  "TensorFlow":   { slug: "tensorflow",      color: "FF6F00" },
  "NumPy":        { slug: "numpy",           color: "4DABCF" },
  // Infra / DB
  "Docker":       { slug: "docker",          color: "2496ED" },
  "SQLite":       { slug: "sqlite",          color: "4479A1" },
  "Supabase":     { slug: "supabase",        color: "3ECF8E" },
  "Redis":        { slug: "redis",           color: "DC382D" },
  "JWT":          { slug: "jsonwebtokens",   color: "FFFFFF" },
  // Testing
  "Vitest":       { slug: "vitest",          color: "6E9F18" },
  "Pytest":       { slug: "pytest",          color: "0A9EDC" },
  // Deployment
  "Vercel Edge":  { slug: "vercel",          color: "FFFFFF" },
  "Framer":       { slug: "framer",          color: "A5B4FC" },
  "Framer Motion":{ slug: "framer",          color: "A5B4FC" },
};

interface TechIconProps {
  name: string;
  /** 'sm' = 36px tile (cards/hero), 'md' = 40px tile (modal) */
  size?: 'sm' | 'md';
  /**
   * When false, returns null for unknown/failed techs (no text fallback).
   * Use for hero/footer where unknown items should be silently hidden.
   */
  showFallback?: boolean;
}

const TechIcon = ({ name, size = 'sm', showFallback = false }: TechIconProps) => {
  const [failed, setFailed] = useState(false);
  const entry = TECH_MAP[name];

  const tileClass = size === 'md'
    ? 'w-10 h-10 rounded-lg'
    : 'w-9 h-9 rounded-md';
  const iconPx = size === 'md' ? 20 : 16;

  // Unknown or failed icon
  if (!entry || failed) {
    if (!showFallback) return null;
    return (
      <span
        className={`font-mono uppercase tracking-wider border border-border rounded text-text-muted ${
          size === 'md'
            ? 'text-xs px-3 py-1'
            : 'text-[10px] px-2 py-1'
        }`}
      >
        {name}
      </span>
    );
  }

  return (
    <div
      title={name}
      className={`flex items-center justify-center ${tileClass} bg-surface border border-border/60 hover:border-accent-indigo/40 hover:bg-white/5 transition-colors duration-200 cursor-default`}
    >
      <img
        src={`https://cdn.simpleicons.org/${entry.slug}/${entry.color}`}
        alt={name}
        width={iconPx}
        height={iconPx}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

export default TechIcon;
