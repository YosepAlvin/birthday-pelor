import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { triggerParticleBurst } from './CinematicTransitionManager.jsx';
import { Heart, Star } from 'lucide-react';

const SCRIPT_LINES = [
  "before today became special...",
  "there was a girl trying her best <br /> to grow through life.",
  "aku tahu gak semua hari <br /> mudah buat kamu.",
  "tapi kamu masih di sini.",
  "And this is her story."
];

const MEMORY_MESSAGES = [
  "this moment matters.",
  "you are loved.",
  "someone cares about you.",
  "keep going, Chella.",
  "you are never alone."
];

const LoadingScreen = () => {
  const { navigateToScene, unlockAndPlayAudio } = useSceneNavigation();
  const [gameState, setGameState] = useState('gate');
  const [phase, setPhase] = useState(0);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const targetScore = 5;
  const starField = useMemo(
    () => Array.from({ length: 28 }, (_, index) => ({
      id: index,
      opacity: 0.2 + Math.random() * 0.8,
      duration: 2 + Math.random() * 3,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    })),
    []
  );

  // Mini-game logic: Spawning items
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnItem = () => {
      const newItem = {
        id: Math.random(),
        x: Math.random() * 80 + 10, // 10% to 90%
        y: -10,
        type: Math.random() > 0.5 ? 'heart' : 'star',
        speed: 2 + Math.random() * 3,
        message: MEMORY_MESSAGES[Math.floor(Math.random() * MEMORY_MESSAGES.length)]
      };
      setItems(prev => [...prev, newItem]);
    };

    const interval = setInterval(spawnItem, 1200);
    return () => clearInterval(interval);
  }, [gameState]);

  // Mini-game logic: Falling items
  useEffect(() => {
    if (gameState !== 'playing') return;

    const fallInterval = setInterval(() => {
      setItems(prev => prev.map(item => ({ ...item, y: item.y + 0.5 }))
        .filter(item => item.y < 110));
    }, 16);

    return () => clearInterval(fallInterval);
  }, [gameState]);

  const handleCatch = (id) => {
    triggerParticleBurst('gold', 10, 1);
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= targetScore) {
        // Transition to opening cinematic
        setTimeout(() => setGameState('memory-transition'), 500);
      }
      return newScore;
    });
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Cinematic Intro Pacing
  useEffect(() => {
    if (gameState === 'memory-transition') {
      const timer = setTimeout(() => setGameState('intro'), 5000);
      return () => clearTimeout(timer);
    }
    if (gameState === 'intro' && phase < SCRIPT_LINES.length) {
      const timer = setTimeout(() => {
        setPhase(prev => prev + 1);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [gameState, phase]);

  const handleStartJourney = async () => {
    await unlockAndPlayAudio();
    triggerParticleBurst('gold', 12, 1.2);
    setGameState('playing');
  };

  const handleBegin = () => {
    triggerParticleBurst('gold', 40, 2.5);
    setTimeout(() => navigateToScene('hero'), 1000);
  };

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-50 bg-[rgb(5,5,12)] px-responsive">
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {starField.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: star.opacity }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: star.duration, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ top: star.top, left: star.left }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'gate' ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-3xl text-center px-2 sm:px-6"
          >
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 px-5 py-8 sm:px-8 sm:py-10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-4 text-[11px] sm:text-sm uppercase tracking-[0.45em] text-primary/70"
              >
                Tap To Start Journey
              </motion.p>
              <h1 className="font-serif text-clamp-hero-sub text-white/95 leading-tight text-balance">
                Sebelum ceritanya dimulai, sentuh layar dulu ya.
              </h1>
              <p className="mt-5 text-sm sm:text-base text-white/65 leading-relaxed max-w-xl mx-auto">
                Tap ini akan menyalakan musik dan membuka mini game pembuka, supaya pengalaman di mobile maupun laptop tetap terasa utuh.
              </p>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-8"
              >
                <AnimatedButton
                  onClick={handleStartJourney}
                  className="!px-10 sm:!px-14 !py-4 sm:!py-5 text-lg sm:text-xl font-serif italic tracking-[0.15em] border-white/20 hover:bg-white/5"
                >
                  Tap to Start Journey
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>
        ) : gameState === 'playing' ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 2 }}
            className="relative w-full h-full flex flex-col items-center justify-center pt-32 pb-12 sm:pt-28 sm:pb-10"
          >
            <div className="absolute top-6 sm:top-10 text-center z-10 px-4 sm:px-responsive max-w-xl">
              <h2 className="font-serif text-clamp-quote text-white/50 italic mb-3 tracking-[0.25em] uppercase">Catch the Memories</h2>
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-white/70 text-xs sm:text-sm tracking-[0.2em] uppercase"
              >
                Tangkap 5 hati atau bintang yang jatuh untuk memulai cerita
              </motion.p>
              <p className="mt-3 text-primary text-glow-gold font-serif text-clamp-body opacity-80">{score} / {targetScore}</p>
            </div>

            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x: `${item.x}vw`, y: `${item.y}vh` }}
                whileTap={{ scale: 0.92 }}
                className="absolute cursor-pointer p-5 sm:p-4 group touch-manipulation"
                onClick={() => handleCatch(item.id)}
              >
                <div className="relative">
                  {item.type === 'heart' ? (
                    <Heart className="w-8 h-8 sm:w-6 sm:h-6 text-red-400/70 fill-red-400/15 group-hover:scale-125 transition-transform" />
                  ) : (
                    <Star className="w-8 h-8 sm:w-6 sm:h-6 text-[#FFD700]/70 fill-[#FFD700]/15 group-hover:scale-125 transition-transform" />
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: -20 }}
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-white/35 text-clamp-caption tracking-widest italic font-serif pointer-events-none hidden sm:block"
                  >
                    {item.message}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : gameState === 'memory-transition' ? (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-responsive"
          >
            <motion.h3 
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: [0, 1, 0.18], filter: ['blur(4px)', 'blur(0px)', 'blur(2px)'] }}
              transition={{ duration: 3.2, ease: "easeInOut" }}
              className="font-serif italic text-clamp-breathing text-white/60 tracking-widest text-balance"
            >
              every little memory matters.
            </motion.h3>
          </motion.div>
        ) : phase < SCRIPT_LINES.length ? (
          <motion.div
            key={phase}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="text-center px-responsive max-w-4xl"
          >
            <h1 
              className="font-serif text-clamp-breathing text-white/90 leading-relaxed italic drop-shadow-2xl text-balance"
              dangerouslySetInnerHTML={{ __html: SCRIPT_LINES[phase] }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-center z-10 space-y-16 px-responsive"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-serif text-clamp-quote text-primary/80 tracking-[0.3em] uppercase relative max-w-3xl mx-auto"
            >
              <span className="opacity-40 block mb-6">The Journey of</span>
              <span className="text-white text-glow-white text-clamp-hero-sub block text-balance">Angelica Marcela Celestia Zianty</span>
              <p className="font-handwriting text-clamp-handwriting text-primary/40 absolute -bottom-16 right-0 md:-right-20 -rotate-6 hidden md:block whitespace-nowrap">
                it's finally your day...
              </p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4, duration: 2.4 }}
              className="pt-8 sm:pt-12"
            >
              <AnimatedButton 
                onClick={handleBegin}
                className="!px-10 sm:!px-16 !py-4 sm:!py-6 text-lg sm:text-2xl font-serif italic tracking-[0.18em] bg-transparent border-white/20 hover:bg-white/5 shadow-none opacity-70 hover:opacity-100 transition-all duration-1000"
              >
                begin her journey
              </AnimatedButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Ambient Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default LoadingScreen;
