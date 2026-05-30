
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { cinematicFadeUp, cinematicZoom, staggerCinematic } from '@/lib/AnimationVariants.jsx';
import { triggerParticleBurst, triggerZoomCamera } from './CinematicTransitionManager.jsx';

const GiftSection = () => {
  const { navigateToScene } = useSceneNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    triggerParticleBurst('gold', 60, 3);
    triggerParticleBurst('hearts', 40, 4);
    triggerZoomCamera(document.getElementById('gift-container'), 4);
    
    setTimeout(() => {
      navigateToScene('inter-2');
    }, 7000); // 7s for deep emotional reveal
  };

  return (
    <section id="gift-container" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-10 bg-transparent px-responsive">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerCinematic} className="space-y-16">
          
          <motion.div 
            variants={cinematicZoom} 
            className="perspective-1000 w-64 h-64 md:w-80 md:h-80 mx-auto relative cursor-pointer group" 
            onClick={!isOpen ? handleOpen : undefined}
          >
            {/* Floating Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse pointer-events-none" />
            
            <motion.div 
              animate={isOpen ? { scale: 0, opacity: 0, filter: 'blur(20px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center animate-float-continuous"
            >
              <div className="relative">
                <Gift className="w-48 h-48 md:w-56 md:h-56 text-[#FFD700] drop-shadow-[0_0_50px_rgba(255,215,0,0.8)] group-hover:scale-110 transition-transform duration-700" />
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-[#FFD700]/20 blur-xl rounded-full"
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0, filter: 'blur(20px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,215,0,0.6)_90deg,transparent_180deg)] rounded-full blur-3xl mix-blend-screen" />
                  <Sparkles className="w-32 h-32 md:w-40 md:h-40 text-secondary drop-shadow-[0_0_80px_rgba(255,105,180,1)] animate-glow-pulse relative z-10" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-8 min-h-[250px]">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div key="closed" exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }} transition={{ duration: 1 }} className="space-y-10">
                  <h2 className="font-serif text-clamp-section italic text-white text-glow-white tracking-wider leading-tight text-balance">A Little Remembrance</h2>
                  <p className="font-serif italic text-white/70 text-clamp-quote font-light tracking-wide text-balance">"Dari kecil, kamu sudah belajar menjadi kuat."</p>
                  <AnimatedButton onClick={handleOpen} className="!px-12 !py-5 text-xl font-serif italic border-white/20 hover:bg-white/5 shadow-none">Step into her past</AnimatedButton>
                </motion.div>
              ) : (
                <motion.div key="opened" initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 2, duration: 2.5 }} className="space-y-10">
                  <h2 className="font-serif text-clamp-section italic text-white text-glow-gold leading-tight text-balance">
                    For Angelica Marcela Celestia Zianty...
                  </h2>
                  <p className="font-serif italic text-white/90 max-w-xl mx-auto text-clamp-quote leading-relaxed tracking-wide text-balance">
                    "someone who survived every hard day until today."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
      
      {!isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1.5 }} className="absolute bottom-10 left-10 z-20">
          <AnimatedButton onClick={() => navigateToScene('hero')} variant="glass" className="!px-6 !py-2 text-xs">Kembali</AnimatedButton>
        </motion.div>
      )}
    </section>
  );
};

export default GiftSection;
