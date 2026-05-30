
import React from 'react';
import { Crown, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { premiumEase } from '@/lib/AnimationVariants.jsx';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';

const Header = () => {
  const { isAudioPlaying, toggleAudioPlayback } = useSceneNavigation();
  const [audioProgress, setAudioProgress] = React.useState(0);

  React.useEffect(() => {
    const handleProgress = (e) => {
      setAudioProgress(e.detail.progress);
    };
    window.addEventListener('audio-progress-update', handleProgress);
    return () => window.removeEventListener('audio-progress-update', handleProgress);
  }, []);

  return (
    <header className="fixed top-0 w-full z-[150] p-3 sm:p-4 md:p-6 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full pointer-events-auto">
        {/* Music Player */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="glass-cinematic flex items-center gap-3 sm:gap-4 p-2 pr-3 sm:p-2.5 sm:pr-4 md:pr-6 rounded-full border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] max-w-[calc(100vw-2rem)]"
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <motion.img 
              animate={{ rotate: isAudioPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              src="/assets/photos/p1.jpg" 
              alt="Album Art" 
              className="w-full h-full object-cover"
            />
            {isAudioPlaying && (
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                 <div className="flex gap-1 items-end h-3 md:h-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        className="w-1 bg-[#FFD700] rounded-full" 
                        animate={{ height: ['30%', '100%', '30%'] }} 
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                 </div>
               </div>
            )}
          </div>
          
          <div className="hidden sm:block">
            <p className="font-serif text-sm md:text-base font-black text-white tracking-wide text-glow-white">Anugrah Terindah</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="font-sans text-[8px] md:text-[10px] text-white/50 uppercase tracking-[0.2em]">Now Playing</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 ml-1 md:ml-2">
            <button 
              onClick={toggleAudioPlayback}
              aria-label={isAudioPlaying ? 'Pause music' : 'Play music'}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#FFD700] text-[rgb(10,10,20)] rounded-full shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
            >
              {isAudioPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" /> : <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5 fill-current" />}
            </button>
          </div>
          
          <div className="hidden lg:block w-24 h-1 bg-white/10 rounded-full overflow-hidden ml-2 relative">
            <motion.div 
              className="h-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]"
              style={{ width: `${audioProgress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Right Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="hidden md:flex glass-cinematic items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-white/10 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all duration-500 group"
        >
          <span className="font-serif text-xs md:text-base font-bold tracking-widest text-[#FFD700] group-hover:text-white transition-colors duration-500">FOR MY QUEEN</span>
          <motion.div 
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }} 
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Crown className="w-4 h-4 md:w-5 md:h-5 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
