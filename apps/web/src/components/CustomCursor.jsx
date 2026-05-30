
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const addTrailParticle = useCallback((x, y) => {
    const id = Math.random().toString(36).substr(2, 9);
    setTrail((prev) => [...prev.slice(-15), { id, x, y }]);
    setTimeout(() => {
      setTrail((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    // Check if it's mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (isMobile) return;
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.7) {
        addTrailParticle(e.clientX, e.clientY);
      }
    };
    
    const handleMouseOver = (e) => {
      if (isMobile) return;
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) || 
          e.target.closest('button') || 
          e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [addTrailParticle, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <AnimatePresence>
        {trail.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 0, y: p.y + 20 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#FFD700] rounded-full pointer-events-none z-[99] shadow-[0_0_8px_#FFD700]"
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#FFD700] rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: isHovering ? 0.5 : 1,
          boxShadow: isHovering ? "0 0 20px #FFD700" : "0 0 0px #FFD700"
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-[#FFD700]/50 rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#FFD700' : 'rgba(255, 215, 0, 0.3)',
          backgroundColor: isHovering ? 'rgba(255, 215, 0, 0.1)' : 'transparent'
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
