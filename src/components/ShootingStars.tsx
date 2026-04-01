import { useMemo } from 'react';

const ShootingStars = () => {
  const bgStars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.4,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 40,
      delay: Math.random() * 15,
      duration: Math.random() * 2 + 1,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ background: '#050505' }}
    >
      {/* Background stars */}
      {bgStars.map((star) => (
        <div
          key={`bg-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `star-twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animation: `star-shoot ${star.duration}s linear infinite`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.9)]" />
          <div
            className="absolute -top-px left-0 w-36 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
          />
        </div>
      ))}
    </div>
  );
};

export default ShootingStars;