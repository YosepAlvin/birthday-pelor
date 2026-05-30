
import React from 'react';

const SakuraPetalsBackground = () => {
  const petals = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-pink-300/60 rounded-tl-full rounded-br-full animate-sakura"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 7}s`,
            filter: `blur(${Math.random() * 4}px)`,
            transform: `scale(${0.5 + Math.random()})`
          }}
        />
      ))}
    </div>
  );
};

export default SakuraPetalsBackground;
