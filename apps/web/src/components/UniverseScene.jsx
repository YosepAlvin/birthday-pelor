import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { cinematicFadeUp, staggerCinematic } from '@/lib/AnimationVariants.jsx';

const UniverseScene = () => {
  const { navigateToScene } = useSceneNavigation();
  const [phase, setPhase] = useState(0);

  const script = [
    "di semesta sebesar ini...",
    "aku cuma pengen kamu <br /> ngerasa ada yang nemenin.",
    "terima kasih ya, udah izinin <br /> aku ada di hidup kamu."
  ];

  useEffect(() => {
    if (phase < script.length) {
      const timer = setTimeout(() => {
        setPhase(prev => prev + 1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-10 bg-[rgb(1,1,5)]">
      {/* Immersive Universe Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() }}
            animate={{ 
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px rgba(255,255,255,0.4)'
            }}
          />
        ))}
        {/* Nebula Bloom */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,112,219,0.15)_0%,transparent_75%)]"
        />
        {/* Soft Ambient Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            animate={{ 
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity }}
            className="absolute w-2 h-2 bg-primary/20 blur-[10px] rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase < script.length ? (
          <motion.div
            key={phase}
            initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(20px)', y: -20 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="text-center px-responsive max-w-4xl"
          >
            <h2 
              className="font-serif text-clamp-breathing text-white/90 leading-relaxed italic tracking-wider text-balance"
              dangerouslySetInnerHTML={{ __html: script[phase] }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="name-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
            className="text-center z-10 space-y-20 px-responsive"
          >
            <motion.div 
              variants={staggerCinematic}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.h1 
                variants={cinematicFadeUp} 
                className="font-serif italic text-clamp-hero text-white text-glow-white tracking-tighter text-balance"
              >
                Angelica Marcela <br />
                Celestia Zianty
              </motion.h1>
              <motion.div 
                variants={cinematicFadeUp}
                className="w-32 h-[1px] bg-primary/40 mx-auto mt-8 blur-[1px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 2.5 }}
            >
              <AnimatedButton 
                onClick={() => navigateToScene('final')}
                className="!px-20 !py-8 text-2xl font-serif italic border-white/5 hover:bg-white/5 shadow-none tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-all duration-1000"
              >
                End Chapter
              </AnimatedButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UniverseScene;
