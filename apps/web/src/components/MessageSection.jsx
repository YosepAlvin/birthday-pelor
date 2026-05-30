
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { cinematicFadeUp, staggerCinematic } from '@/lib/AnimationVariants.jsx';

const FULL_LETTER = `Chella,

Di antara milyaran manusia, aku melihat seseorang yang luar biasa. Bukan cuma dari apa yang orang lain lihat, tapi dari caramu tetap bertahan dan peduli meski dunia mungkin gak selalu ramah.

Aku melihat seseorang yang sebenarnya hanya ingin dimengerti, ingin didengar, dan ingin dihargai. Dan sejak aku mengenalmu, aku tahu kalau aku cuma pengen ada buat kamu di hari buruk kamu juga.

Terima kasih sudah mengizinkanku menjadi bagian dari ceritamu. Aku pengen nemenin kamu ngelewatin setiap hari ke depannya, biar kamu gak ngerasa sendiri lagi.

Selamanya,
Seseorang yang akan selalu ada untukmu ❤️`;

const MessageSection = () => {
  const { navigateToScene } = useSceneNavigation();
  const [showModal, setShowModal] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let interval;
    if (showModal) {
      setIsTyping(true);
      setDisplayedText('');
      let i = 0;
      interval = setInterval(() => {
        setDisplayedText(FULL_LETTER.slice(0, i + 1));
        i++;
        if (i >= FULL_LETTER.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 30);
    } else {
      setDisplayedText('');
      setIsTyping(false);
    }
    return () => clearInterval(interval);
  }, [showModal]);

  return (
    <section className="relative min-h-[100dvh] flex items-center py-responsive overflow-hidden z-10 bg-transparent">
      <div className="max-w-4xl mx-auto px-responsive w-full relative z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerCinematic} className="space-y-16">
          
          <motion.div variants={cinematicFadeUp} className="glass-cinematic p-8 md:p-20 rounded-[3rem] relative overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40 opacity-50" />
            
            <h2 className="font-serif italic text-clamp-section text-white mb-10 text-glow-white">The Turning Point</h2>
            
            <p className="font-serif text-clamp-quote text-white/90 leading-relaxed italic mb-14 max-w-3xl mx-auto tracking-wide text-balance">
              "Dan di antara semua perjalanan itu... aku datang mengenal seseorang yang ternyata sangat spesial."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
              <AnimatedButton onClick={() => setShowModal(true)} className="!px-12 !py-5 text-xl font-serif italic border-white/10 hover:bg-white/5 shadow-none">Read her heart</AnimatedButton>
              <AnimatedButton onClick={() => navigateToScene('gallery')} variant="glass" className="!px-12 !py-5 text-xl font-serif italic">View Memory Lane</AnimatedButton>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 z-20">
        <AnimatedButton onClick={() => navigateToScene('gift')} variant="glass" className="!px-6 !py-2 text-xs">Back</AnimatedButton>
      </div>

      {/* Cinematic Letter Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.95, opacity: 0, y: 30, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fdfbf7] text-gray-900 max-w-2xl w-full p-10 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40 pointer-events-none" />
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-10">
                <X className="w-8 h-8" />
              </button>
              
              <div className="border-2 border-dashed border-gray-200 p-6 md:p-8 rounded-lg h-full relative">
                {/* Tape detail on the letter */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 tape-effect opacity-50" />
                
                <h3 className="font-serif text-clamp-breathing font-bold mb-8 text-center text-gray-800 italic relative z-10">A Note for Chella</h3>
                
                <div className="font-serif text-clamp-body leading-loose whitespace-pre-wrap min-h-[400px] relative z-10 text-gray-800 italic prose-max-width">
                  {displayedText}
                  {isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block w-2 h-6 bg-primary align-middle ml-1" />}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessageSection;
