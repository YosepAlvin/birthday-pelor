
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift } from 'lucide-react';
import ParticleTransitionEffect from './ParticleTransitionEffect.jsx';

const MiniGameScreen = ({ onGameWon }) => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [won, setWon] = useState(false);
  const targetScore = 20;

  useEffect(() => {
    if (won) return;
    const interval = setInterval(() => {
      setHearts(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
    }, 600);
    return () => clearInterval(interval);
  }, [won]);

  const handleCatch = (id) => {
    setHearts(prev => prev.filter(h => h.id !== id));
    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= targetScore) {
      setWon(true);
      setTimeout(() => {
        onGameWon();
      }, 3000);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {!won ? (
        <>
          <div className="absolute top-10 w-full max-w-md px-6 z-20">
            <div className="flex justify-between text-white font-sans mb-2">
              <span>Kumpulkan Hati</span>
              <span>{score} / {targetScore}</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${(score / targetScore) * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence>
            {hearts.map(heart => (
              <motion.div
                key={heart.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => handleCatch(heart.id)}
                className="absolute cursor-pointer z-10"
                style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
              >
                <Heart className="w-12 h-12 fill-primary text-primary drop-shadow-[0_0_15px_var(--glow-pink)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-20 space-y-6"
        >
          <ParticleTransitionEffect type="hearts" count={50} />
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1 }}
          >
            <Gift className="w-24 h-24 mx-auto text-secondary drop-shadow-[0_0_30px_var(--glow-gold)]" />
          </motion.div>
          <h2 className="font-serif text-4xl text-white">Menerima Hadiah Spesial...</h2>
        </motion.div>
      )}
    </div>
  );
};

export default MiniGameScreen;
