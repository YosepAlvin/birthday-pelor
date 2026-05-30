
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const AmbientBackgroundMotion = () => {
  const gradientRef = useRef(null);
  const fogRef = useRef(null);

  useEffect(() => {
    // Moving gradient rotation
    gsap.to(gradientRef.current, {
      rotate: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    });

    // Fog horizontal drift
    gsap.to(fogRef.current, {
      x: "20%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* 1. Moving Gradient Background */}
      <motion.div 
        ref={gradientRef}
        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        animate={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        className="absolute -inset-[50%] opacity-20 mix-blend-screen"
        style={{
          background: 'conic-gradient(from 0deg, rgba(255,105,180,0.3), rgba(157,78,221,0.3), rgba(255,215,0,0.3), rgba(255,105,180,0.3))',
          filter: 'blur(80px)'
        }}
      />

      {/* 2. Animated Glowing Orbs */}
      <motion.div
        initial={{ backgroundColor: "rgba(255, 215, 0, 0.2)" }}
        animate={{
          x: ['-5vw', '5vw', '-5vw'],
          y: ['-5vh', '5vh', '-5vh'],
          scale: [1, 1.2, 0.9],
          opacity: [0.3, 0.6, 0.3],
          backgroundColor: "rgba(255, 215, 0, 0.2)"
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full blur-[100px] mix-blend-screen"
      />
      <motion.div
        initial={{ backgroundColor: "rgba(255, 105, 180, 0.2)" }}
        animate={{
          x: ['5vw', '-5vw', '5vw'],
          y: ['5vh', '-5vh', '5vh'],
          scale: [0.9, 1.1, 1],
          opacity: [0.2, 0.5, 0.2],
          backgroundColor: "rgba(255, 105, 180, 0.2)"
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div
        initial={{ backgroundColor: "rgba(147, 112, 219, 0.15)" }}
        animate={{
          x: ['0vw', '10vw', '0vw'],
          y: ['10vh', '0vh', '10vh'],
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.4, 0.1],
          backgroundColor: "rgba(147, 112, 219, 0.15)"
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[150px] mix-blend-screen"
      />

      {/* 3. Floating Particles (CSS Animation) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-floating-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              opacity: Math.random() * 0.5 + 0.2,
              boxShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          />
        ))}
      </div>

      {/* 4. Fog/Mist Effect */}
      <div 
        ref={fogRef}
        className="absolute inset-0 -left-[20%] w-[140%] h-full opacity-10 pointer-events-none mix-blend-screen"
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0))',
          filter: 'blur(40px)'
        }}
      />

      {/* 5. Cinematic Lighting Overlay (Vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none mix-blend-multiply" />
    </div>
  );
};

export default AmbientBackgroundMotion;
