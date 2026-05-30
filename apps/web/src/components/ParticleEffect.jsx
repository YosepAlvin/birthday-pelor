
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParticleEffect = ({ active, x, y }) => {
  const particles = Array.from({ length: 12 });
  const premiumEase = [0.25, 0.46, 0.45, 0.94];

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
          {particles.map((_, i) => {
            const angle = (i / particles.length) * 360;
            const velocity = 40 + Math.random() * 40;
            const rad = (angle * Math.PI) / 180;
            const xMove = Math.cos(rad) * velocity;
            const yMove = Math.sin(rad) * velocity;

            return (
              <motion.div
                key={i}
                initial={{ 
                  x: x || "50%", 
                  y: y || "50%", 
                  scale: 0, 
                  opacity: 1 
                }}
                animate={{ 
                  x: (x || 0) + xMove, 
                  y: (y || 0) + yMove, 
                  scale: Math.random() * 1.5 + 0.5, 
                  opacity: 0 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.6 + Math.random() * 0.4, 
                  ease: premiumEase 
                }}
                className="absolute w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]"
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ParticleEffect;
