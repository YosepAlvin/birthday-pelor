
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { triggerParticleBurst } from './CinematicTransitionManager.jsx';
import { fadeUp } from '@/lib/AnimationVariants.jsx';

const CakeWishesSection = () => {
  const { navigateToScene } = useSceneNavigation();
  const [wish, setWish] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    
    triggerParticleBurst('gold', 50);
    triggerParticleBurst('hearts', 20);
    toast.success("Terima kasih atas doa terbaikmu ❤️");
    setWish('');
    
    setTimeout(() => {
      navigateToScene('mosaic');
    }, 1500);
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center py-responsive overflow-hidden bg-transparent z-10 px-responsive">
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-12">
          
          <div className="space-y-6">
            <h2 className="font-serif text-clamp-section text-white text-glow-gold leading-tight">Make a Special Wish</h2>
            <p className="font-sans text-white/60 text-clamp-quote font-light italic text-balance">Tuliskan harapanmu untuk masa depan kita...</p>
          </div>
          
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse group-hover:bg-primary/30 transition-all duration-700" />
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <img 
                src="/assets/photos/p14.jpg" 
                alt="Cake" 
                className="w-full h-full object-cover rounded-full shadow-[0_0_60px_rgba(255,215,0,0.5)] border-4 border-[#FFD700]/30 p-2 bg-white/5 backdrop-blur-md"
              />
              {/* Virtual Candle Light */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full blur-md shadow-[0_0_20px_#ffa500]"
              />
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="glass-cinematic p-8 md:p-14 rounded-[3rem] max-w-2xl mx-auto border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
            
            <textarea 
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Apa harapan terbesarmu tahun ini? ❤️" 
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50 resize-none mb-8 font-sans transition-all duration-300 focus:bg-white/10"
            />
            
            <AnimatedButton 
              type="submit" 
              className="w-full !py-5 text-xl font-bold tracking-widest shadow-[0_0_30px_rgba(255,215,0,0.3)]"
            >
              KIRIM DOA KE SEMESTA
            </AnimatedButton>
          </form>

        </motion.div>

        <div className="mt-16 flex justify-center gap-8 relative z-20">
          <AnimatedButton onClick={() => navigateToScene('timeline')} variant="glass" className="!px-8 !py-3">Kembali</AnimatedButton>
          <AnimatedButton onClick={() => navigateToScene('mosaic')} variant="glass" className="!px-8 !py-3">Lewati</AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default CakeWishesSection;
