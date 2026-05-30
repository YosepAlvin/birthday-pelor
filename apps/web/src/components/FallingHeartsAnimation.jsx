
import React from 'react';
import { Heart } from 'lucide-react';

const FallingHeartsAnimation = () => {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {hearts.map((_, i) => (
        <div
          key={i}
          className="absolute animate-heart-fall text-[#FF69B4]"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        >
          <Heart className="w-6 h-6 fill-current opacity-50" style={{ filter: `blur(${Math.random() * 3}px)` }} />
        </div>
      ))}
    </div>
  );
};

export default FallingHeartsAnimation;
