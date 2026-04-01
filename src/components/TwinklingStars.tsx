import { useMemo } from 'react';

interface ShootingStar {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

const ShootingStars = () => {
  const stars: ShootingStar[] = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      delay: Math.random() * 15,
      duration: Math.random() * 2 + 1.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none h-full min-h-[800px]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-shooting-star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
          <div className="absolute -top-px -right-1 w-2 h-2 rounded-full bg-white opacity-80 blur-[1px]" />
        </div>
      ))}
    </div>
  );
};

export default ShootingStars;