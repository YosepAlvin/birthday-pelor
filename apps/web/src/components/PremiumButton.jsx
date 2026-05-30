
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

const PremiumButton = ({ onClick, children, variant = 'primary', className, disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={cn(
        "relative group overflow-hidden px-8 py-4 rounded-full font-sans font-semibold text-lg transition-all duration-300 gpu-accelerated",
        variant === 'primary' 
          ? "bg-gradient-to-r from-primary via-accent to-primary text-white shadow-[0_0_20px_var(--glow-pink)] hover:shadow-[0_0_40px_var(--glow-pink)]"
          : "bg-black/40 border border-white/20 text-white backdrop-blur-md hover:border-secondary hover:shadow-[0_0_30px_var(--glow-gold)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Ripple Glow Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
        {children}
      </span>
    </motion.button>
  );
};

export default PremiumButton;
