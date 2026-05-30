
import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { transitionToScene } from '@/components/CinematicTransitionManager.jsx';

const SceneNavigationContext = createContext();

export const useSceneNavigation = () => useContext(SceneNavigationContext);

export const SceneNavigationProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState('loading');
  const [previousScene, setPreviousScene] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Validate scenes
  const SCENES = ['loading', 'hero', 'inter-1', 'gift', 'inter-2', 'message', 'gallery', 'memories', 'letters', 'timeline', 'cake', 'mosaic', 'inter-3', 'night-sky', 'universe', 'final'];

  const clearFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeAudioTo = useCallback((targetVolume, duration = 1200) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval();

    const startVolume = audio.volume;
    const totalSteps = Math.max(1, Math.round(duration / 100));
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step += 1;
      const nextVolume = startVolume + ((targetVolume - startVolume) * step) / totalSteps;
      audio.volume = Math.max(0, Math.min(nextVolume, targetVolume));

      if (step >= totalSteps) {
        audio.volume = targetVolume;
        clearFadeInterval();
      }
    }, 100);
  }, [clearFadeInterval]);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      if (audio.paused) {
        audio.volume = 0;
        await audio.play();
      }

      fadeAudioTo(0.3);
      setIsAudioPlaying(true);
      return true;
    } catch (error) {
      console.error('Playback failed:', error);
      setIsAudioPlaying(false);
      return false;
    }
  }, [fadeAudioTo]);

  const toggleAudioPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    if (!audio.paused) {
      clearFadeInterval();
      audio.pause();
      setIsAudioPlaying(false);
      return true;
    }

    return playAudio();
  }, [clearFadeInterval, playAudio]);

  const unlockAndPlayAudio = useCallback(async () => playAudio(), [playAudio]);

  const navigateToScene = (sceneName) => {
    if (!SCENES.includes(sceneName) || isTransitioning || currentScene === sceneName) return;
    
    setIsTransitioning(true);
    
    transitionToScene(
      currentScene,
      sceneName,
      () => {
        setPreviousScene(currentScene);
        setCurrentScene(sceneName);
        window.scrollTo(0, 0);
      },
      () => {
        setIsTransitioning(false);
      }
    );
  };

  useEffect(() => () => clearFadeInterval(), [clearFadeInterval]);

  const contextValue = useMemo(() => ({
    currentScene,
    previousScene,
    isTransitioning,
    navigateToScene,
    isAudioPlaying,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    toggleAudioPlayback,
    unlockAndPlayAudio,
  }), [currentScene, previousScene, isTransitioning, isAudioPlaying, volume, isMuted, toggleAudioPlayback, unlockAndPlayAudio]);

  return (
    <SceneNavigationContext.Provider value={contextValue}>
      {/* Global Transition Overlay */}
      <div id="transition-overlay" className="fixed inset-0 z-[90] bg-black opacity-0 pointer-events-none" />
      {/* Global Particle Container */}
      <div id="global-particles" className="fixed inset-0 z-[95] pointer-events-none" />
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (!audio?.duration) return;

          // Dispatch custom event instead of updating global state
          // to prevent app-wide re-renders every millisecond
          const progress = (audio.currentTime / audio.duration) * 100;
          window.dispatchEvent(new CustomEvent('audio-progress-update', { 
            detail: { progress } 
          }));
          
          if (audio.paused !== !isAudioPlaying) {
            setIsAudioPlaying(!audio.paused);
          }
        }}
        onPause={() => setIsAudioPlaying(false)}
        onPlay={() => setIsAudioPlaying(true)}
        onEnded={() => {
          setIsAudioPlaying(false);
          window.dispatchEvent(new CustomEvent('audio-progress-update', { 
            detail: { progress: 0 } 
          }));
        }}
      >
        <source src="/assets/bgm.mp4" type="audio/mp4" />
      </audio>
      
      {children}
    </SceneNavigationContext.Provider>
  );
};
