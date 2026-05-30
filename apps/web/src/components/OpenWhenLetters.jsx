
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { staggerContainer, fadeUp, premiumEase } from '@/lib/AnimationVariants.jsx';

const LETTERS = [
  { id: 1, title: "When You are Sad", content: "Kalau kamu sedang sedih, pelan-pelan ya. Tarik napas, pejamkan mata sebentar, dan ingat: kamu tidak sendiri. Aku selalu ada, memelukmu lewat doa dan kata-kata ini." },
  { id: 2, title: "When You are Happy", content: "Kalau kamu sedang bahagia, bagikan senyummu—karena itu juga bahagiaku. Semoga kebahagiaanmu bertambah berkali-kali lipat, dan aku selalu jadi alasannya." },
  { id: 3, title: "When You Miss Me", content: "Kalau kamu kangen, lihat langit malam. Kita terhubung di tempat yang sama—di bawah bulan yang sama. Aku juga kangen, dan aku menantikan saat kita bertemu lagi." },
  { id: 4, title: "When You are Tired", content: "Kalau kamu lelah, istirahat dulu ya. Kamu sudah hebat sampai sejauh ini. Tidak apa-apa pelan-pelan, asal jangan menyerah. Aku bangga sama kamu." }
];

const OpenWhenLetters = () => {
  const { navigateToScene } = useSceneNavigation();
  const [activeLetter, setActiveLetter] = useState(null);

  return (
    <section className="relative min-h-[100dvh] py-responsive overflow-hidden bg-transparent z-10 px-responsive">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} 
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
          viewport={{ once: true }} 
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }} 
          className="text-center mb-24"
        >
          <h2 className="font-serif text-clamp-section text-white mb-6 text-glow-pink drop-shadow-2xl">Open When...</h2>
          <p className="font-sans text-clamp-quote text-white/70 font-light tracking-widest italic text-balance">Small reminders of my love for every moment.</p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8 opacity-40" />
        </motion.div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl mb-24"
        >
          {LETTERS.map((letter, idx) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1, 
                delay: idx * 0.15, 
                ease: [0.34, 1.56, 0.64, 1] // Bouncy/Elegant entry
              }}
              className="glass-cinematic p-10 rounded-[2.5rem] text-center cursor-pointer group hover:-translate-y-4 hover:rotate-2 transition-all duration-500 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              onClick={() => setActiveLetter(letter)}
            >
              <div className="relative mb-8">
                <Mail className="w-16 h-16 mx-auto text-secondary group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(255,105,180,0.8)]" />
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3, delay: idx * 0.5 }}
                  className="absolute inset-0 bg-secondary/20 blur-xl rounded-full -z-10"
                />
              </div>
              <h3 className="font-serif text-2xl text-white font-bold mb-2 group-hover:text-glow-pink transition-all duration-300">Open When...</h3>
              <p className="font-sans text-white/60 text-lg group-hover:text-white transition-colors duration-300 italic">{letter.title.replace('When ', '')}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-4">
          <AnimatedButton onClick={() => navigateToScene('memories')} variant="glass">Back</AnimatedButton>
          <AnimatedButton onClick={() => navigateToScene('timeline')}>Our Timeline</AnimatedButton>
        </div>
      </div>

      <AnimatePresence>
        {activeLetter && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6, ease: premiumEase }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fdfbf7] text-gray-900 max-w-md w-full p-10 rounded-xl shadow-2xl relative"
            >
              <button 
                onClick={() => setActiveLetter(null)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="border-2 border-dashed border-gray-200 p-6 md:p-8 rounded-lg h-full">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-clamp-breathing font-bold mb-8 text-center text-gray-800"
                >
                  {activeLetter.title}
                </motion.h3>
                
                <div className="space-y-4 prose-max-width">
                  {activeLetter.content.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.03 }}
                      className="font-sans text-clamp-body leading-relaxed text-gray-700 italic"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: activeLetter.content.length * 0.03 + 1 }}
                  className="mt-12 text-right"
                >
                  <p className="font-accent text-clamp-handwriting text-red-500">With Love, Me ❤️</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OpenWhenLetters;
