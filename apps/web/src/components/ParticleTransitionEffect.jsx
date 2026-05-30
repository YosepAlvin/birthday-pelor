
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const ParticleTransitionEffect = ({ type = 'hearts', count = 40 }) => {
  const particles = Array.from({ length: count });

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const velocity = 100 + Math.random() * 200;
        const randomX = Math.cos(angle) * velocity;
        const randomY = Math.sin(angle) * velocity;
        const scale = 0.5 + Math.random() * 1.5;
        const duration = 1 + Math.random() * 1.5;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ 
              opacity: 0,
              x: randomX,
              y: randomY,
              scale: scale,
              rotate: Math.random() * 360,
              backgroundColor: "rgba(0, 0, 0, 0)"
            }}
            transition={{ duration, ease: "easeOut" }}
            className="absolute origin-center gpu-accelerated"
          >
            {type === 'hearts' ? (
              <Heart className="w-6 h-6 fill-primary text-primary drop-shadow-[0_0_10px_var(--glow-pink)]" />
            ) : type === 'sakura' ? (
              <div className="w-4 h-4 bg-pink-300 rounded-tl-full rounded-br-full blur-[1px]" />
            ) : (
              <Sparkles className="w-5 h-5 text-secondary drop-shadow-[0_0_15px_var(--glow-gold)]" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticleTransitionEffect;
