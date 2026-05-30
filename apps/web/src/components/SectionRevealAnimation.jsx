
import React from 'react';
import { motion } from 'framer-motion';

const SectionRevealAnimation = ({ children, staggerDelay = 0.15, direction = 'up', className }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } }
      }}
      className={className}
    >
      {React.Children.map(children, child => (
        <motion.div variants={variants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionRevealAnimation;
