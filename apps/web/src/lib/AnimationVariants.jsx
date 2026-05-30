
export const premiumEase = [0.25, 0.46, 0.45, 0.94];
export const cinematicEase = [0.4, 0, 0.2, 1]; // Slower, more emotional easing

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerCinematic = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
      ease: cinematicEase
    }
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: premiumEase } 
  }
};

export const cinematicFadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1.8, ease: cinematicEase } 
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: premiumEase } 
  }
};

export const cinematicZoom = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 2, ease: cinematicEase } 
  }
};

export const cinematicBlur = {
  hidden: { opacity: 0, filter: 'blur(20px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    transition: { duration: 1.5, ease: cinematicEase } 
  }
};

export const cinematicGlow = {
  hidden: { opacity: 0, filter: 'brightness(0.5) drop-shadow(0 0 0px rgba(255,215,0,0))' },
  visible: { 
    opacity: 1, 
    filter: 'brightness(1) drop-shadow(0 0 30px rgba(255,215,0,0.6))', 
    transition: { duration: 2.5, ease: cinematicEase } 
  }
};

export const cinematicParallax = (yOffset = 50) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.8, ease: cinematicEase } 
  }
});

export const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: premiumEase } }
};

export const wordAnimationCinematic = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: cinematicEase } 
  }
};
