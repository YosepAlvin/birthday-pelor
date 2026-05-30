import React, { useEffect, useRef, useMemo, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';

const GlobalCinematicBackground = memo(() => {
  const containerRef = useRef(null);
  const fogRef = useRef(null);
  const { scrollY } = useScroll();
  const { currentScene } = useSceneNavigation();
  
  const isInterScene = ['inter-1', 'inter-2', 'inter-3', 'loading'].includes(currentScene);

  // Parallax scroll transforms
  const yBg = useTransform(scrollY, [0, 5000], [0, -500]);
  const yFg = useTransform(scrollY, [0, 5000], [0, -1000]);

  const elements = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      dreamyOrbs: Array.from({ length: isMobile ? 3 : 8 }),
      stars: Array.from({ length: isMobile ? 15 : 40 }),
      sparkles: Array.from({ length: isMobile ? 10 : 25 }),
      orbs: [
        { color: 'rgba(147, 112, 219, 0.08)', size: isMobile ? '70vw' : '40vw', blur: isMobile ? '30px' : '60px', delay: 0, pos: { top: '5%', left: '5%' } },
        { color: 'rgba(70, 130, 180, 0.08)', size: isMobile ? '80vw' : '50vw', blur: isMobile ? '40px' : '80px', delay: 2, pos: { top: '45%', left: '55%' } },
        { color: 'rgba(138, 43, 226, 0.05)', size: isMobile ? '90vw' : '60vw', blur: isMobile ? '50px' : '100px', delay: 5, pos: { top: '15%', left: '35%' } }
      ]
    };
  }, []);

  useEffect(() => {
    if (isInterScene || !fogRef.current) return;

    // Fog horizontal drift
    gsap.to(fogRef.current, {
      x: "20%",
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Mouse movement interaction (subtle)
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(".interactive-layer", {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInterScene]);

  if (isInterScene) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[rgb(10,10,20)]">
      
      {/* 1. Base Cinematic Lighting (Orbs) */}
      <div className="interactive-layer absolute inset-0">
        {!isInterScene && elements.orbs.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            animate={{
              x: ['-8vw', '8vw', '-8vw'],
              y: ['-8vh', '8vh', '-8vh'],
              scale: [1, 1.15, 0.9],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
            className="absolute rounded-full mix-blend-screen"
            style={{
              backgroundColor: orb.color,
              width: orb.size,
              height: orb.size,
              top: orb.pos.top,
              left: orb.pos.left,
              filter: `blur(${orb.blur})`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      {/* 2. Background Layer (Moves slower) */}
      <motion.div style={{ y: yBg, willChange: 'transform' }} className="absolute inset-0">
        {/* Slow Stars */}
        {elements.stars.map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: 'transform'
            }}
          />
        ))}

        {/* Dreamy Orbs */}
        {!isInterScene && elements.dreamyOrbs.map((_, i) => (
          <motion.div
            key={`dreamy-${i}`}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 10 
            }}
            className="absolute rounded-full bg-white/10 blur-[20px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 40}px`,
              height: `${10 + Math.random() * 40}px`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </motion.div>

      {/* 4. Foreground Layer (Moves faster) */}
      <motion.div style={{ y: yFg, willChange: 'transform' }} className="absolute inset-0">
        {/* Twinkling Sparkles */}
        {elements.sparkles.map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-sparkle shadow-[0_0_12px_white]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.6,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </motion.div>

      {/* 5. Cinematic Fog */}
      <div 
        ref={fogRef}
        className="absolute inset-0 -left-[20%] w-[140%] h-full opacity-[0.08] pointer-events-none mix-blend-screen"
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0))',
          filter: 'blur(40px)'
        }}
      />

      {/* 7. Vignette (Dark Corners) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.85)_100%)] mix-blend-multiply" />
      
      {/* Noise Texture for Cinematic Feel - Disabled on mobile for performance */}
      {typeof window !== 'undefined' && window.innerWidth >= 768 && (
        <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} 
        />
      )}
    </div>
  );
});

export default GlobalCinematicBackground;
