import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { triggerGlowSpread } from './CinematicTransitionManager.jsx';

const PHOTOS = [
  "/assets/photos/p1.jpg",
  "/assets/photos/p2.jpg",
  "/assets/photos/p3.jpg",
  "/assets/photos/p4.jpg",
  "/assets/photos/p5.jpg",
  "/assets/photos/p7.jpg",
  "/assets/photos/p8.jpg",
  "/assets/photos/p9.jpg",
  "/assets/photos/p10.jpg",
  "/assets/photos/p11.jpg",
  "/assets/photos/p12.jpg",
  "/assets/photos/p13.jpg",
  "/assets/photos/p14.jpg",
  "/assets/photos/p15.jpg",
  "/assets/photos/p16.jpg",
  "/assets/photos/p17.jpg",
  "/assets/photos/kangen.jpeg",
  "/assets/photos/bahagia.jpeg",
];

// Simplified coordinates for "LOVE" layout mapping (relative to center)
const LOVE_COORDS = [
  {x: -180, y: -60}, {x: -180, y: 0}, {x: -180, y: 60}, {x: -120, y: 60}, // L
  {x: -40, y: -60}, {x: -40, y: 60}, {x: 40, y: -60}, {x: 40, y: 60}, // O
  {x: 100, y: -60}, {x: 130, y: 60}, {x: 160, y: -60}, // V
  {x: 220, y: -60}, {x: 220, y: 0}, {x: 220, y: 60}, {x: 270, y: -60}, {x: 270, y: 60} // E
];

const PhotoMosaicLove = () => {
  const { navigateToScene } = useSceneNavigation();
  const containerRef = useRef(null);
  const [mode, setMode] = useState('mosaic'); // 'mosaic', 'love', 'heart'
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getHeartPos = (index, total, scale = 15) => {
    const t = (index / total) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x * scale, y: y * scale };
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const photos = containerRef.current.querySelectorAll('.mosaic-photo');
    const loveTextNode = containerRef.current.querySelector('.love-text');
    
    const limit = Math.min(photos.length, LOVE_COORDS.length);
    const tl = gsap.timeline({ repeat: -1 });

    const animateToMosaic = () => {
      setMode('mosaic');
      return tl.to(photos, {
        x: () => (Math.random() - 0.5) * window.innerWidth * 0.8,
        y: () => (Math.random() - 0.5) * window.innerHeight * 0.8,
        rotation: () => Math.random() * 360,
        scale: 0.5,
        opacity: 0.4,
        boxShadow: "0 0 0px rgba(255,215,0,0)",
        duration: 1.5,
        ease: "power2.inOut"
      });
    };

    const animateToLove = () => {
      setMode('love');
      tl.to(loveTextNode, { opacity: 0.1, duration: 0.5 });
      tl.to(photos, {
        x: (i) => i < limit ? LOVE_COORDS[i].x * (isMobile ? 0.6 : 1.2) : (Math.random() - 0.5) * 400,
        y: (i) => i < limit ? LOVE_COORDS[i].y * (isMobile ? 0.6 : 1.2) : (Math.random() - 0.5) * 400,
        rotation: 0,
        scale: isMobile ? 0.7 : 1,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.2)",
        stagger: 0.05
      });
      tl.call(() => triggerGlowSpread(1));
      tl.to(photos, { boxShadow: "0 0 25px rgba(255,215,0,0.6)", duration: 0.5 });
      return tl.to({}, { duration: 4 });
    };

    const animateToHeart = () => {
      setMode('heart');
      tl.to(loveTextNode, { opacity: 0, duration: 0.5 });
      tl.to(photos, {
        x: (i) => getHeartPos(i, photos.length, isMobile ? 8 : 16).x,
        y: (i) => getHeartPos(i, photos.length, isMobile ? 8 : 16).y,
        rotation: 0,
        scale: isMobile ? 0.8 : 1.1,
        opacity: 1,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.03
      });
      tl.to(photos, { boxShadow: "0 0 30px rgba(255,105,180,0.8)", duration: 0.5 });
      return tl.to({}, { duration: 5 });
    };

    // Main Animation Loop
    animateToMosaic();
    tl.to({}, { duration: 1 });
    animateToLove();
    animateToHeart();
    tl.to(photos, { opacity: 0, scale: 0, duration: 1 });

    return () => tl.kill();
  }, [isMobile]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between py-responsive overflow-hidden bg-background px-responsive">
      {/* Floating handwritten notes */}
      <AnimatePresence>
        {mode === 'love' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 pointer-events-none z-10 w-full text-center md:text-left px-responsive"
          >
            <p className="font-handwriting text-clamp-handwriting text-primary/40 -rotate-3 md:-rotate-6 text-balance">
              hari dimana aku sadar <br />
              senyummu bikin semuanya lebih ringan.
            </p>
            <p className="font-sans text-clamp-caption tracking-[0.4em] uppercase text-white/10 mt-6 md:ml-10">
              Endless Laughter • Memory Fragment
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Heart Emoji Outline Background (only in heart mode) */}
        <AnimatePresence>
          {mode === 'heart' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
               {[...Array(40)].map((_, i) => {
                 const pos = getHeartPos(i, 40, isMobile ? 11 : 22);
                 return (
                   <motion.span 
                     key={i} 
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 0.4, scale: 1 }}
                     transition={{ delay: i * 0.02 }}
                     className="absolute text-xl md:text-4xl filter drop-shadow-[0_0_8px_rgba(255,105,180,0.5)]"
                     style={{ x: pos.x, y: pos.y }}
                   >
                     💖
                   </motion.span>
                 );
               })}
            </motion.div>
          )}
        </AnimatePresence>

        {PHOTOS.map((src, i) => (
          <div key={i} className="mosaic-photo absolute w-14 h-14 md:w-24 md:h-24 rounded-xl overflow-hidden glass-cinematic border border-white/20">
            <img src={src} alt="Memory" className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="love-text absolute font-serif text-[6rem] md:text-[15rem] font-bold text-white opacity-0 text-glow-gold tracking-widest pointer-events-none mix-blend-overlay uppercase">
          LOVE
        </div>

        {/* Aesthetic I Love You Text */}
        <AnimatePresence>
          {mode === 'heart' && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.5 }}
              animate={{ opacity: 1, y: isMobile ? 130 : 260, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.5 }}
              transition={{ delay: 1, duration: 1, type: "spring" }}
              className="absolute text-center z-30"
            >
              <h3 className="font-accent text-4xl md:text-8xl text-white text-glow-pink drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] italic">
                I Love You ❤️
              </h3>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1 }}
                className="h-1 bg-gradient-to-r from-transparent via-[#FF69B4] to-transparent mt-4 shadow-[0_0_10px_#FF69B4]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-50 text-center mt-auto mb-10 w-full px-responsive flex flex-col sm:flex-row justify-center gap-6">
        <AnimatedButton onClick={() => navigateToScene('cake')} variant="glass" className="font-serif italic !px-10">Back</AnimatedButton>
        <AnimatedButton onClick={() => navigateToScene('inter-3')} className="font-serif italic border-white/10 hover:bg-white/5 shadow-none !px-10">The Next Chapter</AnimatedButton>
      </div>
    </section>
  );
};

export default PhotoMosaicLove;
