
import React from 'react';
import { motion } from 'framer-motion';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import { premiumEase } from '@/lib/AnimationVariants.jsx';

const SCENES = [
  { id: 'hero', label: 'The Beginning' },
  { id: 'gift', label: 'A Gift for You' },
  { id: 'message', label: 'Heartfelt Words' },
  { id: 'gallery', label: 'Your Radiance' },
  { id: 'memories', label: 'Our Story' },
  { id: 'letters', label: 'Letters of Love' },
  { id: 'timeline', label: 'Through Time' },
  { id: 'cake', label: 'Celebration' },
  { id: 'mosaic', label: 'Our Love' },
  { id: 'night-sky', label: 'Under the Stars' },
  { id: 'universe', label: 'The Universe' },
  { id: 'final', label: 'Forever' },
];

const SideNavigation = () => {
  const { currentScene, navigateToScene } = useSceneNavigation();

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center">
      <div className="flex flex-col gap-4 py-4">
        {SCENES.map((scene) => {
          const isActive = currentScene === scene.id;
          return (
            <div key={scene.id} className="relative group flex items-center">
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                className="absolute right-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-ui font-medium whitespace-nowrap group-hover:opacity-100 group-hover:x-0 transition-all pointer-events-none text-white shadow-xl"
              >
                {scene.label}
              </motion.div>
              
              <button
                onClick={() => navigateToScene(scene.id)}
                className="w-8 h-8 flex items-center justify-center relative focus:outline-none cursor-none"
              >
                <motion.div
                  className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary' : 'bg-white/30'}`}
                  animate={{
                    scale: isActive ? 1.5 : 1,
                    boxShadow: isActive ? '0 0 15px rgba(255, 192, 0, 0.8)' : 'none'
                  }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeDotOutline"
                    className="absolute w-6 h-6 rounded-full border border-primary/50"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigation;
