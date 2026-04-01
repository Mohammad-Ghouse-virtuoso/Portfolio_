import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SpotlightCard = ({ children, className = "", onClick }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [rawMouse, setRawMouse] = useState({ x: 0, y: 0 });

  // Spring-driven normalised cursor coords (-1 → +1) for smooth tilt
  const springX = useSpring(0, { stiffness: 180, damping: 22 });
  const springY = useSpring(0, { stiffness: 180, damping: 22 });

  // Map springs → tilt angles (±7°)
  const rotateY = useTransform(springX, [-1, 1], [-7, 7]);
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    springX.set((e.clientX - rect.left - cx) / cx);
    springY.set((e.clientY - rect.top - cy) / cy);
    setRawMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    springX.set(0);
    springY.set(0);
  };

  return (
    <motion.div
      ref={divRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformPerspective: 900,
        rotateX,
        rotateY,
      }}
      whileHover={{ y: -8, scale: 1.012 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-xl bg-surface border transition-[border-color,box-shadow] duration-300 ${
        hovered
          ? 'border-white/[0.11] shadow-[0_28px_56px_-8px_rgba(0,0,0,0.85),0_0_0_1px_rgba(129,140,248,0.14)]'
          : 'border-border shadow-none'
      } ${className}`}
    >
      {/* Specular gloss — small bright ellipse tracking cursor like a physical surface */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-150"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(130px circle at ${rawMouse.x}px ${rawMouse.y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />

      {/* Diagonal indigo tint from top-left — like angled studio light */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-350"
        style={{
          opacity: hovered ? 1 : 0,
          background: 'linear-gradient(145deg, rgba(129,140,248,0.07) 0%, transparent 50%)',
        }}
      />

      {/* Top catch-light — sharp 1px bar, brightens on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.22) 35%, rgba(129,140,248,0.55) 65%, transparent 95%)',
        }}
      />

      <div className="relative h-full">{children}</div>
    </motion.div>
  );
};

export default SpotlightCard;
