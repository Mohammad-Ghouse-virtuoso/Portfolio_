import { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const ShimmerStars = ({ count = 50 }: { count?: number }) => {
  const stars: Star[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      // Full viewport — fixed position keeps them visible on every section
      y: Math.random() * 100,
      // Smaller, more distant: 0.8–1.8 px
      size: Math.random() * 1 + 0.8,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            // Slightly more visible site-wide
            opacity: 0.45,
            animation: `star-shimmer ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ShimmerStars;