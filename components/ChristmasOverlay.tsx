import React, { useEffect, useState } from 'react';

const ChristmasOverlay: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; duration: number; delay: number; size: number; char: string }>>([]);

  useEffect(() => {
    // Generate static particles on mount to avoid re-renders causing jitter
    const count = 20; // Reduced from 30
    const chars = ['❄', '❅', '❆', '★', '✦', '•'];
    const newParticles = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100, // Random horizontal position %
        duration: 10 + Math.random() * 20, // Duration slower (10s to 30s)
        delay: Math.random() * 10, // Random delay
        size: 4 + Math.random() * 10, // Size smaller (4px to 14px)
        char: chars[Math.floor(Math.random() * chars.length)]
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="christmas-particle text-white/30 drop-shadow-sm"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
};

export default ChristmasOverlay;