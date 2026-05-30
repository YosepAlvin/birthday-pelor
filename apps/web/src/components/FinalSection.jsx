
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { cinematicFadeUp, staggerCinematic, wordAnimationCinematic } from '@/lib/AnimationVariants.jsx';
import { triggerParticleBurst, triggerGlowSpread } from './CinematicTransitionManager.jsx';

const FinalSection = () => {
  const { navigateToScene } = useSceneNavigation();
  const [showFinale, setShowFinale] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const climaxText = [
    "dan setelah semua hal yang berhasil kamu lewati...",
    "Angelica Marcela Celestia Zianty...",
    "aku cuma ingin kamu tahu...",
    "aku akan tetap ada.",
    "someone who stays.",
    "someone who cares.",
    "someone who loves you sincerely."
  ];

  useEffect(() => {
    // Sequence the finale text
    const timer = setTimeout(() => setShowFinale(true), 3000); 
    const thankYouTimer = setTimeout(() => setShowThankYou(true), 18000); // Wait longer for emotional aftertaste
    return () => {
      clearTimeout(timer);
      clearTimeout(thankYouTimer);
    };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link berhasil disalin! Bagikan kebahagiaan ini.");
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center py-responsive overflow-hidden z-10 bg-[rgb(5,5,10)] px-responsive">
      {/* Dynamic Celebration Lights & Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Stars Background */}
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity }}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle,rgba(147,112,219,0.08)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(5,5,10)] via-transparent to-[rgb(5,5,10)] opacity-90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-16">
        <AnimatePresence>
          {showFinale && (
            <motion.div 
              variants={staggerCinematic} 
              initial="hidden" 
              animate="visible" 
              className="space-y-10"
            >
              {climaxText.map((line, idx) => (
                <motion.p 
                  key={idx} 
                  variants={cinematicFadeUp} 
                  className={`font-serif italic text-clamp-quote leading-tight text-balance ${
                    idx >= climaxText.length - 3 ? 'text-white text-glow-white font-light' : 'text-white/80'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 10, duration: 4 }}
          className="pt-24 space-y-16"
        >
          <div className="space-y-8">
            <motion.h2 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="font-serif italic text-clamp-hero text-white text-glow-white mb-6 text-balance"
            >
              Happy Birthday, <br />
              Angelica Marcela Celestia Zianty ❤️
            </motion.h2>
            <p className="font-serif italic text-clamp-quote text-white/30 tracking-widest uppercase pt-4 text-balance">
              Today is about the journey you've conquered.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 13, duration: 2 }} 
            className="flex flex-col sm:flex-row justify-center gap-10 pt-12"
          >
            <AnimatedButton onClick={() => navigateToScene('loading')} variant="glass" className="!px-12 !py-5 text-xl font-serif italic">Relive the Story</AnimatedButton>
            <AnimatedButton onClick={handleShare} className="!px-12 !py-5 text-xl font-serif italic border-white/10 hover:bg-white/5 shadow-none">Share the Hug</AnimatedButton>
          </motion.div>

          <AnimatePresence>
            {showThankYou && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 5 }}
                className="pt-40"
              >
                <p className="font-serif italic text-clamp-caption tracking-[0.5em] uppercase text-white/90">
                  thank you for surviving this far.
                </p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 6, duration: 4 }}
                  className="mt-24 w-1 h-24 bg-gradient-to-b from-primary/20 to-transparent mx-auto"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Final Fade to Black overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={showThankYou ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 25, duration: 10 }}
        className="fixed inset-0 bg-black pointer-events-none z-[200]"
      />
    </section>
  );
};

export default FinalSection;
