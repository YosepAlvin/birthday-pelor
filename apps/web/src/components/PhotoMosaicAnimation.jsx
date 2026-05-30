import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

// Coordinates for L-O-V-E on a 100x100 grid relative
const LOVE_COORDS = [
  // L (3)
  { x: 15, y: 25 }, { x: 15, y: 50 }, { x: 23, y: 50 },
  // O (4)
  { x: 35, y: 25 }, { x: 45, y: 25 }, { x: 35, y: 50 }, { x: 45, y: 50 },
  // V (3)
  { x: 57, y: 25 }, { x: 63, y: 50 }, { x: 69, y: 25 },
  // E (4)
  { x: 80, y: 25 }, { x: 80, y: 37 }, { x: 80, y: 50 }, { x: 88, y: 25 }
];

const PhotoMosaicAnimation = ({ photos }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.mosaic-photo');
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    
    // Initial random scatter
    gsap.set(items, {
      x: () => (Math.random() - 0.5) * window.innerWidth * 0.8,
      y: () => (Math.random() - 0.5) * window.innerHeight * 0.8,
      rotation: () => (Math.random() - 0.5) * 45,
      scale: 0.8,
      opacity: 0.6
    });

    // Form LOVE
    tl.to(items, {
      x: (i) => (LOVE_COORDS[i % LOVE_COORDS.length].x / 100 * window.innerWidth) - (window.innerWidth / 2),
      y: (i) => (LOVE_COORDS[i % LOVE_COORDS.length].y / 100 * window.innerHeight) - (window.innerHeight / 2),
      rotation: 0,
      scale: 1,
      opacity: 1,
      boxShadow: "0 0 20px var(--glow-pink)",
      duration: 2.5,
      ease: "power3.inOut",
      stagger: 0.05
    })
    // Hold formation for 2s (handled by repeatDelay and next animation start)
    .to(items, {
      x: () => (Math.random() - 0.5) * window.innerWidth * 0.8,
      y: () => (Math.random() - 0.5) * window.innerHeight * 0.8,
      rotation: () => (Math.random() - 0.5) * 60,
      scale: 0.8,
      opacity: 0.6,
      boxShadow: "0 0 0px transparent",
      duration: 2,
      ease: "power2.inOut",
      delay: 3 // Wait 3s before scattering
    });

    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black/50 rounded-3xl border border-white/10">
      {photos.slice(0, 14).map((src, i) => (
        <div 
          key={i} 
          className="mosaic-photo absolute w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-xl gpu-accelerated"
          style={{ transformOrigin: 'center center' }}
        >
          <img src={src} alt="Memory" className="w-full h-full object-cover" />
        </div>
      ))}
      
      <div className="absolute bottom-10 text-center w-full z-10 pointer-events-none">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-accent text-4xl text-white/80 drop-shadow-lg"
        >
          Every piece of my heart belongs to you
        </motion.p>
      </div>
    </div>
  );
};

export default PhotoMosaicAnimation;