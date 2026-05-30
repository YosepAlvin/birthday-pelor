
import React from 'react';
import { motion } from 'framer-motion';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { cinematicFadeUp, staggerCinematic, wordAnimationCinematic } from '@/lib/AnimationVariants.jsx';

const HeroSection = () => {
  const { navigateToScene } = useSceneNavigation();
  const firstName = "Angelica Marcela".split(" ");
  const lastName = "Celestia Zianty".split(" ");

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-10 pt-safe-hero pb-16 sm:pb-20" id="hero-section">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-grain opacity-[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-[800px] px-responsive text-center flex flex-col items-center justify-center">
        <motion.div 
          variants={staggerCinematic} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col items-center justify-center w-full"
        >
          
          <motion.div variants={staggerCinematic} className="flex flex-col gap-3 sm:gap-4 mb-10 sm:mb-14 items-center w-full">
            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-6">
              {firstName.map((word, idx) => (
                <motion.span 
                  key={idx} 
                  variants={wordAnimationCinematic} 
                  className="font-serif text-clamp-hero font-light text-white text-glow-gold tracking-tight italic"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-6">
              {lastName.map((word, idx) => (
                <motion.span 
                  key={idx} 
                  variants={wordAnimationCinematic} 
                  className="font-serif text-clamp-hero-sub font-light text-white/40 text-glow-white tracking-wider italic"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.p variants={cinematicFadeUp} className="font-serif text-clamp-quote text-white/80 mb-12 sm:mb-16 leading-[1.35] italic tracking-wide drop-shadow-md text-balance text-center max-w-[650px] mx-auto px-2 sm:px-0">
            "Hari ini bukan cuma ulang tahunmu. <br /> Hari ini dunia merayakan alasan kenapa aku bahagia."
          </motion.p>

          <motion.div 
            variants={cinematicFadeUp}
            className="mb-14 sm:mb-20 relative h-10 sm:h-12 w-full flex justify-center"
          >
            <p className="font-handwriting text-clamp-handwriting text-primary/60 -rotate-2 pointer-events-none whitespace-nowrap text-center">
              aku masih inget hari itu.
            </p>
          </motion.div>

          <motion.div variants={cinematicFadeUp} className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center w-full items-center">
            <AnimatedButton onClick={() => navigateToScene('inter-1')} className="!px-10 sm:!px-16 !py-4 sm:!py-6 text-lg sm:text-2xl font-serif italic border-white/20 hover:bg-white/5 transition-all duration-500 shadow-none">
              Explore Her Story
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
