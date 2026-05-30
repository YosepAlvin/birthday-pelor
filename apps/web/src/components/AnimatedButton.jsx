
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

const AnimatedButton = ({ children, onClick, className, variant = "primary", disabled = false }) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={cn(
        "relative group overflow-hidden px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-300 gpu-accelerated uppercase",
        variant === 'primary' 
          ? "bg-gradient-to-r from-primary via-[#ffb700] to-primary text-primary-foreground shadow-[0_0_20px_var(--glow-gold)] hover:shadow-[0_0_40px_var(--glow-gold)] border border-yellow-300/50"
          : "glass-cinematic text-white hover:border-primary hover:shadow-[0_0_30px_var(--glow-pink)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-sweep" />
      
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bg-white/40 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 50,
            height: 50,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
        {children}
      </span>
    </motion.button>
  );
};

export default AnimatedButton;
