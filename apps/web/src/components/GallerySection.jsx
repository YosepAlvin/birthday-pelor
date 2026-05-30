
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import { cinematicFadeUp, staggerCinematic } from '@/lib/AnimationVariants.jsx';

gsap.registerPlugin(ScrollTrigger);

const URLS = [
  "/assets/photos/p1.jpg",
  "/assets/photos/p2.jpg",
  "/assets/photos/p3.jpg",
  "/assets/photos/p4.jpg",
  "/assets/photos/p5.jpg",
  "/assets/photos/p7.jpg",
  "/assets/photos/p8.jpg",
  "/assets/photos/p9.jpg",
  "/assets/photos/p10.jpg",
  "/assets/photos/p11.jpg",
  "/assets/photos/p12.jpg",
  "/assets/photos/p13.jpg",
  "/assets/photos/p14.jpg",
  "/assets/photos/p15.jpg",
  "/assets/photos/p16.jpg",
  "/assets/photos/p17.jpg",
  "/assets/photos/kangen.jpeg",
  "/assets/photos/p1.jpg", // Duplicated to fill grid gap
];

const CAPTIONS = [
  { text: "Aku suka caramu tersenyum walau capek.", date: "02:13 AM - Late night talk" },
  { text: "Kamu berharga, lebih dari yang kamu kira.", date: "Random beautiful day" },
  { text: "Gak apa-apa kalau hari ini berat.", date: "Our Favorite Spot" },
  { text: "Terima kasih sudah bertahan ya?", date: "That One Afternoon" },
  { text: "01:45 AM - Kamu bilang kamu capek.", date: "Memory Lane" },
  { text: "Aku di sini, selalu.", date: "The Beginning" },
  { text: "Pure Heart.", date: "Nostalgia" },
  { text: "Beautiful Soul.", date: "Sweet Moment" },
  { text: "Graceful.", date: "Dreamy Day" },
  { text: "Radiant.", date: "Sunset Vibes" },
  { text: "The One and Only.", date: "Forever" },
  { text: "aku masih inget cara kamu cerita waktu itu.", date: "Chapter One" }
];

const GallerySection = () => {
  const { navigateToScene } = useSceneNavigation();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const parallaxBgRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const onBack = () => navigateToScene('message');
  const onNext = () => navigateToScene('memories');

  const PhotoFrame = ({ src, delay, index, className = "" }) => {
    const isMobileDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
    // Controlled rotation for cleaner look
    const rotation = (index % 2 === 0 ? -2 : 2);
    const caption = CAPTIONS[index % CAPTIONS.length];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1, 
          delay: delay,
          ease: "easeOut"
        }}
        onClick={() => setSelectedPhoto(src)}
        whileHover={isMobileDevice ? {} : { 
          scale: 1.05, 
          y: -10,
          zIndex: 50,
          transition: { duration: 0.4 }
        }}
        className={`polaroid-item cursor-pointer group ${className}`}
        style={{ rotate: rotation }}
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-sm bg-gray-100">
          <img 
            src={src} 
            alt="Memory" 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            loading="lazy"
          />
        </div>

        {/* Polaroid caption area - Handwritten style inside card */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex flex-col items-center justify-center px-3 bg-white">
          <p className="polaroid-handwriting">
            {caption.text}
          </p>
          <span className="text-[10px] text-black/40 uppercase tracking-tighter mt-1">
            {caption.date}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="gallery-container relative bg-[rgb(8,8,15)] py-responsive overflow-hidden min-h-[100dvh] w-full flex flex-col items-center z-10" id="gallery-section">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FFD700]/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#FF69B4]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-responsive flex flex-col items-center">
        <motion.div 
          variants={staggerCinematic} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="text-center mb-24 relative z-10 px-responsive"
        >
          <motion.h2 variants={cinematicFadeUp} className="font-serif text-clamp-section font-black text-white text-glow-gold mb-6 tracking-tight">
            Memory Lane
          </motion.h2>
          <motion.div variants={cinematicFadeUp} className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
          <motion.p variants={cinematicFadeUp} className="font-accent text-clamp-breathing text-white/80 max-w-2xl mx-auto leading-relaxed text-balance">
            Setiap foto punya cerita, dan setiap cerita ada kamu di dalamnya.
          </motion.p>
        </motion.div>

        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 auto-rows-[180px] md:auto-rows-[300px] grid-flow-dense">
            {URLS.map((src, i) => {
              // Custom grid sizing for a "Puzzle/Masonry" interlocking effect
              // We apply different logic for mobile (cols-2) and desktop (cols-4/6)
              const isLarge = i === 0 || i === 7;
              const isTall = i === 2 || i === 5 || i === 10 || i === 13;
              const isWide = i === 3 || i === 8;

              return (
                <PhotoFrame 
                  key={i} 
                  src={src} 
                  index={i} 
                  delay={0.1 + (i % 5) * 0.1} 
                  className={`
                    ${isLarge ? 'col-span-2 row-span-2' : ''}
                    ${isTall ? 'row-span-2' : ''}
                    ${isWide ? 'col-span-2' : ''}
                    w-full h-full
                  `}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-16 relative z-40">
          <button onClick={onBack} className="px-8 py-2.5 rounded-full border-2 border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10 transition-all text-sm font-bold uppercase tracking-widest">
            Kembali
          </button>
          <button onClick={onNext} className="px-10 py-2.5 rounded-full bg-[#FFD700] text-[rgb(10,10,20)] shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-105 transition-all text-sm font-bold uppercase tracking-widest">
            Lanjut
          </button>
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.9)] p-4 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#FFD700] transition-colors z-[110] bg-black/30 rounded-full p-2"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={36} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative max-h-[80vh] max-w-[95vw] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.8)] border-[3px] border-[#FFD700]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPhoto} alt="Gallery Full Size" className="w-full h-full object-contain max-h-[80vh]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
