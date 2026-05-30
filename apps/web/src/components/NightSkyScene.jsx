import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { cinematicFadeUp, staggerCinematic } from '@/lib/AnimationVariants.jsx';

const NightSkyScene = () => {
  const { navigateToScene } = useSceneNavigation();
  const [phase, setPhase] = useState(0);

  const script = [
    "kadang hidup bikin kamu capek ya?",
    "di antara semua hari yang pernah kamu lewati...",
    "aku cuma pengen kamu tahu, Angelica Marcela Celestia Zianty...",
    "kalau kamu gak harus jalan sendirian lagi."
  ];

  useEffect(() => {
    if (phase < script.length) {
      const timer = setTimeout(() => {
        setPhase(prev => prev + 1);
      }, 6000); // 6s for breathing room
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-10 bg-[rgb(2,2,8)] px-responsive">
      {/* Deep Night Sky Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
            className="absolute w-[1.2px] h-[1.2px] bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 5px rgba(255,255,255,0.3)'
            }}
          />
        ))}
        {/* Very Slow Moving Nebula Glow */}
        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,112,219,0.1)_0%,transparent_70%)]"
        />
      </div>

      <AnimatePresence mode="wait">
        {phase < script.length ? (
          <motion.div
            key={phase}
            initial={{ opacity: 0, filter: 'blur(15px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(15px)', y: -10 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="text-center px-responsive max-w-4xl"
          >
            <h2 className="font-serif text-clamp-breathing text-white/90 leading-relaxed italic tracking-wide text-balance">
              {script[phase]}
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="text-center z-10 space-y-16 px-responsive"
          >
            <motion.div 
              variants={staggerCinematic}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.p variants={cinematicFadeUp} className="font-serif italic text-clamp-quote text-white/40 tracking-[0.2em] uppercase text-balance">
                someone who stays.
              </motion.p>
              <motion.p variants={cinematicFadeUp} className="font-serif italic text-clamp-caption text-white/20 tracking-[0.15em] uppercase text-balance">
                through every galaxy of your life.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 2 }}
            >
              <AnimatedButton 
                onClick={() => navigateToScene('universe')}
                className="!px-16 !py-6 text-xl font-serif italic border-white/10 hover:bg-white/5 shadow-none"
              >
                look closer
              </AnimatedButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NightSkyScene;
