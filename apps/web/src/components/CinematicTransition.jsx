
import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleTransitionEffect from './ParticleTransitionEffect.jsx';

const TransitionContext = createContext();

export const useCinematicTransition = () => {
  return useContext(TransitionContext);
};

export const CinematicTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState(null);

  const triggerTransition = (callback, duration = 1500) => {
    setIsTransitioning(true);
    setTransitionData({ type: 'hearts' });
    
    setTimeout(() => {
      if (callback) callback();
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, duration / 2);
      
    }, duration / 2);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[99] bg-background/80 flex items-center justify-center"
          >
            <ParticleTransitionEffect type={transitionData?.type || 'hearts'} count={50} />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 mix-blend-screen"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};
