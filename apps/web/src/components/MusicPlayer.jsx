
import React from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';

const MusicPlayer = () => {
  const { 
    isAudioPlaying, 
    toggleAudioPlayback, 
    volume, 
    setVolume, 
    isMuted, 
    setIsMuted 
  } = useSceneNavigation();

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-50 glass-cinematic rounded-2xl shadow-2xl p-4 border border-white/10"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleAudioPlayback}
          className="relative p-4 bg-[#FFD700] text-[rgb(10,10,20)] rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label={isAudioPlaying ? 'Pause music' : 'Play music'}
        >
          {isAudioPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
          {isAudioPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#FFD700]/40"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </button>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-white/60 hover:text-[#FFD700] transition-colors duration-300"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FFD700] [&::-webkit-slider-thumb]:shadow-[0_0_10px_#FFD700]"
              aria-label="Volume control"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 h-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#FFD700] rounded-full shadow-[0_0_5px_#FFD700]"
                  animate={isAudioPlaying ? {
                    height: ['4px', '16px', '4px'],
                  } : { height: '4px' }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Our Journey</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
