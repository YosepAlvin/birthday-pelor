
import React, { useEffect, useRef } from 'react';

const Confetti = ({ trigger = true, duration = 3000 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const colors = [
      'hsl(330 81% 60%)', // pink
      'hsl(45 93% 58%)',  // yellow
      'hsl(200 98% 48%)', // blue
      'hsl(270 60% 65%)', // purple
      'hsl(25 95% 53%)',  // orange
    ];

    const shapes = ['circle', 'square', 'triangle'];
    const confettiCount = 50;
    const confettiElements = [];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;

      confetti.style.position = 'fixed';
      confetti.style.left = `${left}%`;
      confetti.style.top = '-20px';
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.animation = `confetti-fall ${animationDuration}s linear ${delay}s forwards`;

      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = `${size / 2}px solid transparent`;
        confetti.style.borderRight = `${size / 2}px solid transparent`;
        confetti.style.borderBottom = `${size}px solid ${color}`;
      }

      containerRef.current.appendChild(confetti);
      confettiElements.push(confetti);
    }

    const cleanup = setTimeout(() => {
      confettiElements.forEach(el => el.remove());
    }, duration);

    return () => {
      clearTimeout(cleanup);
      confettiElements.forEach(el => el.remove());
    };
  }, [trigger, duration]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default Confetti;
