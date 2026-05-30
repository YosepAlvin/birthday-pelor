
import React from 'react';

const Balloons = ({ count = 5 }) => {
  const colors = [
    'hsl(330 81% 60%)', // pink
    'hsl(45 93% 58%)',  // yellow
    'hsl(200 98% 48%)', // blue
    'hsl(270 60% 65%)', // purple
    'hsl(25 95% 53%)',  // orange
  ];

  const balloons = Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${(i + 1) * (100 / (count + 1))}%`,
    delay: i * 0.2,
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 h-screen overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-0"
          style={{
            left: balloon.left,
            animationDelay: `${balloon.delay}s`,
          }}
        >
          <div className="balloon-float">
            {/* Balloon */}
            <div
              className="relative w-16 h-20 rounded-full"
              style={{
                backgroundColor: balloon.color,
                boxShadow: `inset -10px -10px 20px rgba(0, 0, 0, 0.1), 0 4px 20px ${balloon.color}40`,
              }}
            >
              {/* Shine effect */}
              <div className="absolute top-2 left-3 w-6 h-8 bg-white/30 rounded-full blur-sm" />
            </div>
            {/* String */}
            <div
              className="absolute left-1/2 top-full w-0.5 h-32 -translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, ${balloon.color}, transparent)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Balloons;
