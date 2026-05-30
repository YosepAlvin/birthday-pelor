import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';

const CinematicBreathingMoment = ({ lines, nextScene, lineDuration = 5000 }) => {
  const { navigateToScene } = useSceneNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [lines, nextScene]);

  useEffect(() => {
    if (currentIndex < lines.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, lineDuration);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        navigateToScene(nextScene);
      }, 450);
      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, lines.length, navigateToScene, nextScene, lineDuration]);

  return (
    <section className="fixed inset-0 z-[200] bg-[rgb(2,2,8)] flex items-center justify-center overflow-hidden">
      {/* Immersive Background - Simplified for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,112,219,0.05)_0%,transparent_70%)]"
        />
      </div>

      <AnimatePresence mode="wait">
        {currentIndex < lines.length && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center w-full max-w-[90%] md:max-w-[800px] px-6 relative z-[210] will-change-transform"
          >
            <p 
              className="font-serif italic text-clamp-breathing text-white/95 leading-relaxed tracking-wide text-balance drop-shadow-[0_4px_15px_rgba(0,0,0,1)] text-center"
              dangerouslySetInnerHTML={{ __html: lines[currentIndex] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CinematicBreathingMoment;
