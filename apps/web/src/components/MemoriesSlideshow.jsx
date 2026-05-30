
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const INITIAL_SLIDES = [
  { img: "/assets/photos/p2.jpg", caption: "Memories of Us" },
  { img: "/assets/photos/p3.jpg", caption: "Endless Laughter" },
  { img: "/assets/photos/p4.jpg", caption: "Late Night Conversations" },
];

// Ensure at least 3 slides for loop mode to work properly without warnings
const SLIDES = INITIAL_SLIDES.length > 0 && INITIAL_SLIDES.length < 3 
  ? [...INITIAL_SLIDES, ...INITIAL_SLIDES, ...INITIAL_SLIDES].slice(0, 3) 
  : INITIAL_SLIDES;

const MemoriesSlideshow = () => {
  const { navigateToScene } = useSceneNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden py-responsive z-10 px-responsive">
      
      {/* Cinematic Background Blur of Current Slide */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
            animate={{ opacity: 0.2, scale: 1, filter: 'blur(20px)' }}
            exit={{ opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            src={SLIDES[activeIndex]?.img}
            className="w-full h-full object-cover mix-blend-screen"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-[rgba(0,0,0,0)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] max-h-[65vh] rounded-[2.5rem] overflow-hidden glass-cinematic shadow-[0_30px_60px_rgba(0,0,0,0.6)] mb-12 group">
          
          <Swiper
            modules={[EffectFade, Navigation, Autoplay]}
            effect="fade"
            speed={1500}
            loop={SLIDES.length >= 3}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full"
          >
            {SLIDES.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-full flex items-center justify-center bg-black/40 p-2 md:p-0">
                  <img 
                    src={slide.img} 
                    alt={slide.caption}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl md:rounded-none"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

          <div className="absolute inset-0 flex items-center justify-between p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
            <button className="swiper-button-prev-custom pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full glass-cinematic flex items-center justify-center text-white hover:text-primary hover:scale-110 transition-all duration-300">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button className="swiper-button-next-custom pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full glass-cinematic flex items-center justify-center text-white hover:text-primary hover:scale-110 transition-all duration-300">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>

        <div className="h-24 flex items-center justify-center mb-10 px-responsive">
          <AnimatePresence mode="wait">
            <motion.h3 
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="font-serif text-clamp-section text-white text-glow-gold tracking-wide text-center text-balance"
            >
              {SLIDES[activeIndex]?.caption}
            </motion.h3>
          </AnimatePresence>
        </div>

        <div className="flex gap-6">
          <AnimatedButton onClick={() => navigateToScene('gallery')} variant="glass">Back</AnimatedButton>
          <AnimatedButton onClick={() => navigateToScene('letters')}>Open Letters</AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default MemoriesSlideshow;
