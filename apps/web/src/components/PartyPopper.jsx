
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PartyPopper = ({ onPop }) => {
  const [isPopped, setIsPopped] = useState(false);

  const handlePop = () => {
    setIsPopped(true);
    if (onPop) onPop();
    setTimeout(() => setIsPopped(false), 1000);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handlePop}
        className="relative p-4 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Pop party popper"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isPopped && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: [
                    'hsl(330 81% 60%)',
                    'hsl(45 93% 58%)',
                    'hsl(200 98% 48%)',
                    'hsl(270 60% 65%)',
                    'hsl(25 95% 53%)',
                  ][i % 5],
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 30 * Math.PI) / 180) * 100,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 100,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PartyPopper;
