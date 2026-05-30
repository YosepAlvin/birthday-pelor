
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSceneNavigation } from '@/context/SceneNavigationContext.jsx';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { 
    year: "5 Juni 2004", 
    title: "The Beginning", 
    img: "/assets/photos/p7.jpg",
    desc: "Mungkin semesta sedang tersenyum hari itu. Menyiapkan seseorang yang kelak akan membawa begitu banyak hangat di hidupku. Aku masih inget hari itu, meski aku belum ada di sana." 
  },
  { 
    year: "Childhood Days", 
    title: "Small Steps", 
    img: "/assets/photos/p8.jpg",
    desc: "Langkah-langkah kecil yang mulai mengenal dunia. Dari kecil kamu belajar jadi kuat ya? Aku suka banget cara kamu cerita tentang masa kecilmu." 
  },
  { 
    year: "Growing Up", 
    title: "Finding Strength", 
    img: "/assets/photos/p9.jpg",
    desc: "Masa-masa dimana kamu mulai memahami arti perjuangan. Ada tawa, ada air mata. Aku tahu gak semua hari mudah buat kamu, tapi kamu tetap di sini." 
  },
  { 
    year: "Dreams & Goals", 
    title: "Chasing Light", 
    img: "/assets/photos/p10.jpg",
    desc: "Mengejar mimpi dengan segala keberanianmu. Aku bangga melihat betapa gigihnya kamu menjaga cahaya itu tetap menyala, walau kadang capek." 
  },
  { 
    year: "The Present", 
    title: "Her Journey", 
    img: "/assets/photos/p5.jpg",
    desc: "Terima kasih sudah bertahan sejauh ini. Aku cuma gak mau kamu ngerasa sendiri lagi, Angelica Marcela Celestia Zianty." 
  }
];

const TimelineSection = () => {
  const { navigateToScene } = useSceneNavigation();
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const parallaxRefs = useRef([]);

  const onBack = () => navigateToScene('letters');
  const onNext = () => navigateToScene('cake');

  useEffect(() => {
    // GSAP ScrollTrigger for vertical timeline growth
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    // GSAP Parallax effect for cards - Disabled on mobile for performance
    if (window.innerWidth >= 768) {
      parallaxRefs.current.forEach((el) => {
        if (el) {
          gsap.to(el, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });
    }
  }, []);

  return (
    <section className="relative bg-transparent py-responsive overflow-hidden w-full min-h-[100dvh] z-10" id="timeline-section">
      
      {/* Title & Subtitle */}
      <div className="text-center mb-32 md:mb-48 relative z-30 px-responsive">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif italic text-clamp-section text-white text-glow-white mb-8"
        >
          A Journey Through Her Life
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="font-serif italic text-clamp-quote text-white/80 max-w-2xl mx-auto tracking-widest uppercase text-balance"
        >
          from small steps to a beautiful soul
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-responsive">
        
        {/* Vertical Gold Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-white/5 z-0">
          <div 
            ref={lineRef} 
            className="w-full h-full bg-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.8)] origin-top scale-y-0" 
          />
        </div>

        {/* Milestones */}
        <div className="flex flex-col gap-32 md:gap-56 pb-48">
          {MILESTONES.map((m, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className="relative flex flex-col md:flex-row items-center w-full">
                
                {/* Center Dot Wrapper */}
                <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 pt-6 md:pt-0">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#FFD700] border-4 border-[rgb(10,10,20)] shadow-[0_0_25px_rgba(255,215,0,1)] animate-pulse-glow" />
                </div>

                {/* Left Side (Desktop) */}
                <div className="hidden md:flex w-1/2 pr-12 lg:pr-24 justify-end">
                  {isEven && (
                    <TimelineCard milestone={m} index={i} isEven={isEven} parallaxRef={el => parallaxRefs.current[i] = el} />
                  )}
                </div>

                {/* Right Side (Desktop + Mobile) */}
                <div className="w-full md:w-1/2 pl-14 md:pl-12 lg:pl-24 flex justify-start">
                  {/* On Mobile: Always show. On Desktop: Only show if !isEven */}
                  <div className={`w-full ${!isEven ? 'block' : 'block md:hidden'}`}>
                    <TimelineCard 
                      milestone={m} 
                      index={i} 
                      isEven={isEven} 
                      parallaxRef={el => {
                        if (!isEven || window.innerWidth < 768) {
                          parallaxRefs.current[i] = el;
                        }
                      }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-10 mt-20 relative z-30 pb-20">
        <button 
          onClick={onBack} 
          className="px-12 py-4 rounded-full border-2 border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700] hover:text-[rgb(10,10,20)] hover:border-[#FFD700] transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] text-xl font-serif italic"
        >
          Go back
        </button>
        <button 
          onClick={onNext} 
          className="px-12 py-4 rounded-full bg-transparent text-white border-2 border-white/10 hover:bg-white/5 transition-all duration-300 text-xl font-serif italic"
        >
          Next Chapter
        </button>
      </div>
    </section>
  );
};

const TimelineCard = ({ milestone, index, isEven, parallaxRef }) => (
  <motion.div
    ref={parallaxRef}
    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className="w-full max-w-[450px] p-6 md:p-8 rounded-2xl border border-white/5 bg-[rgba(20,20,35,0.4)] shadow-[0_0_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(255,215,0,0.2)] transition-all duration-700 backdrop-blur-xl group relative"
    style={{ rotate: index % 2 === 0 ? -1 : 1 }}
  >
    {/* Realistic tape detail */}
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-10 tape-effect opacity-40 group-hover:opacity-60 transition-opacity" />
    
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-primary text-clamp-hero-sub font-black tracking-tighter group-hover:scale-105 transition-transform duration-700 origin-left italic font-serif">{milestone.year}</h3>
      <div className="h-[1px] flex-grow mx-4 bg-white/10" />
      <span className="text-white/20 font-sans text-clamp-caption tracking-widest uppercase">#{index + 1}</span>
    </div>
    
    <h4 className="text-white/90 text-2xl font-serif italic mb-6 tracking-wide group-hover:text-primary transition-colors duration-500">{milestone.title}</h4>
    
    {milestone.img && (
       <div className="relative w-full mb-8 rounded-xl overflow-hidden shadow-2xl glass-cinematic p-2 border border-white/5">
         <img 
           src={milestone.img} 
           alt={milestone.title} 
           className="w-full h-auto max-h-[300px] object-cover rounded-lg brightness-90 grayscale-[20%] group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-[2s]"
         />
         <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity" />
       </div>
    )}
    
    <p className="text-white/70 font-serif italic text-clamp-body leading-relaxed group-hover:text-white/90 transition-colors duration-500 prose-max-width text-balance">
      {milestone.desc}
    </p>

    {/* Handwritten personal note snippet */}
    <div className="mt-10 pt-6 border-t border-white/5">
       <p className="font-handwriting text-clamp-handwriting text-primary/40 group-hover:text-primary/70 transition-colors duration-700 -rotate-2">
         {index === 0 ? "aku masih inget hari itu." : index === 4 ? "aku pengen ada buat kamu di hari buruk juga." : "momen kecil yang berharga."}
       </p>
    </div>
  </motion.div>
);

export default TimelineSection;
