
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CinematicBackground = ({ colorScheme = 'pink' }) => {
  const bgRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic ambient lighting movement
      gsap.to(".ambient-orb-1", {
        x: "30vw", y: "20vh", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.to(".ambient-orb-2", {
        x: "-30vw", y: "-20vh", duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }, bgRef);

    return () => ctx.revert();
  }, [colorScheme]);

  return (
    <div ref={bgRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      {/* Base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] z-10" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light z-20" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} 
      />

      {/* Orbs */}
      <div className="ambient-orb-1 absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-screen opacity-40 bg-primary" />
      <div className="ambient-orb-2 absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full blur-[150px] mix-blend-screen opacity-30 bg-accent" />
    </div>
  );
};

export default CinematicBackground;
