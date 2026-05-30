
import gsap from 'gsap';

const cinematicEase = "power3.inOut";

export const triggerParticleBurst = (type, count = 40, duration = 2) => {
  const container = document.getElementById('global-particles');
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = `absolute w-2 h-2 md:w-3 md:h-3 rounded-full blur-[1px] ${
      type === 'hearts' ? 'bg-pink-500' : type === 'gold' ? 'bg-yellow-400' : 'bg-white'
    }`;
    container.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 150 + Math.random() * 300;
    
    gsap.fromTo(p, 
      { x: window.innerWidth/2, y: window.innerHeight/2, scale: 0, opacity: 1 },
      { 
        x: window.innerWidth/2 + Math.cos(angle) * velocity, 
        y: window.innerHeight/2 + Math.sin(angle) * velocity,
        scale: Math.random() * 2.5,
        opacity: 0,
        duration: duration + Math.random() * 1.5,
        ease: "power2.out",
        onComplete: () => p.remove()
      }
    );
  }
};

export const triggerGlowSpread = (duration = 2) => {
  const glow = document.createElement('div');
  glow.className = 'fixed inset-0 pointer-events-none z-[80] mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.5)_0%,transparent_80%)]';
  document.body.appendChild(glow);
  
  gsap.fromTo(glow,
    { scale: 0, opacity: 0 },
    { scale: 4, opacity: 1, duration: duration / 2, ease: "power2.out", yoyo: true, repeat: 1, onComplete: () => glow.remove() }
  );
};

export const triggerLightingShift = (fromColor, toColor, duration = 2.5) => {
  gsap.to(document.documentElement, {
    "--background": toColor,
    duration: duration,
    ease: cinematicEase
  });
};

export const triggerBlurTransition = (element, duration = 1.5) => {
  gsap.fromTo(element, 
    { filter: 'blur(0px)' },
    { filter: 'blur(15px)', duration: duration / 2, ease: "power2.in", yoyo: true, repeat: 1 }
  );
};

export const triggerZoomCamera = (element, duration = 2) => {
  gsap.fromTo(element,
    { scale: 1 },
    { scale: 1.05, duration: duration / 2, ease: "power2.inOut", yoyo: true, repeat: 1 }
  );
};

export const triggerParallaxDepth = (elements, duration = 2) => {
  elements.forEach((el, i) => {
    gsap.fromTo(el,
      { y: 0 },
      { y: (i + 1) * 20, duration: duration / 2, ease: "power2.inOut", yoyo: true, repeat: 1 }
    );
  });
};

export const transitionToScene = (fromScene, toScene, callback, onComplete) => {
  const overlay = document.getElementById('transition-overlay');
  const mainContent = document.getElementById('main-scene-content');
  
  if (!overlay || !mainContent) {
    if (callback) callback();
    if (onComplete) onComplete();
    return;
  }

  gsap.killTweensOf([overlay, mainContent]);
  gsap.set(overlay, { opacity: 0, backdropFilter: 'blur(0px)' });
  gsap.set(mainContent, { opacity: 1, filter: 'blur(0px)', scale: 1 });

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(mainContent, { clearProps: 'opacity,filter,scale' });
      gsap.set(overlay, { clearProps: 'opacity,backdropFilter' });
      if (onComplete) onComplete();
    }
  });

  // 1. Cinematic Blur & Zoom Out
  tl.to(mainContent, { 
    opacity: 0, 
    filter: 'none', 
    scale: 0.99,
    duration: 0.8, 
    ease: cinematicEase 
  });

  // 2. Overlay covers screen with deep emotional fade
  tl.to(overlay, {
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    duration: 0.5
  }, "-=0.3");

  // Call the callback to swap React components
  tl.call(() => {
    if (callback) callback();
    triggerParticleBurst('gold', 15, 1.2);
    triggerGlowSpread(1.0);
    gsap.set(mainContent, { opacity: 0, filter: 'none', scale: 1.01 });
  });

  // 3. Zoom effect and fade in next scene (Scale 1.05 -> 1)
  tl.to(mainContent, 
    { opacity: 1, filter: 'none', scale: 1, duration: 1.0, ease: "power3.out" }
  );

  tl.to(overlay, {
    opacity: 0,
    duration: 0.6
  }, "-=0.8");
};
