
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RippleEffect = ({ ripples }) => {
  const premiumEase = [0.25, 0.46, 0.45, 0.94];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ 
              top: ripple.y, 
              left: ripple.x, 
              width: 0, 
              height: 0, 
              opacity: 0.5 
            }}
            animate={{ 
              top: ripple.y - 100, 
              left: ripple.x - 100, 
              width: 200, 
              height: 200, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="absolute rounded-full bg-white/30 mix-blend-overlay"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RippleEffect;
