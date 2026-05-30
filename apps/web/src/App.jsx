
import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SceneNavigationProvider } from '@/context/SceneNavigationContext.jsx';
import GlobalCinematicBackground from '@/components/GlobalCinematicBackground.jsx';
import HomePage from '@/pages/HomePage.jsx';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: isMobile ? 1 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: isMobile ? 1.2 : 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <SceneNavigationProvider>
        <div className="bg-grain min-h-screen">
          {/* Global Cinematic Background - Always Running */}
          <GlobalCinematicBackground />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          
          <Toaster 
            position="top-center" 
            toastOptions={{
              className: "bg-black/80 backdrop-blur-2xl border border-white/5 text-white/90 font-serif italic shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
              duration: 4000
            }}
          />
        </div>
      </SceneNavigationProvider>
    </Router>
  );
}

export default App;
