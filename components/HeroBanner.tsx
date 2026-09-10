import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'assets/client/Gallery-1.jpg',
  'assets/client/Gallery-3.jpg',
  'assets/client/Gallery-2.jpg'
];

export const HeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sec-overview" className="relative w-full h-screen overflow-hidden bg-navy-950">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`NeoLiv Grand Forest Privé ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#1d417f]/80 via-black/30 to-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-white font-medium tracking-[0.4em] text-xs md:text-sm uppercase mb-4 drop-shadow-lg">
            A Premium Nature & Forest Lifestyle
          </h3>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight drop-shadow-2xl mb-6 leading-tight">
            Soul of the Seasons
          </h1>
          <div className="w-24 h-[2px] bg-[#d6ba43] mx-auto mb-6 opacity-80" />
          <p className="text-white/90 font-sans text-lg md:text-2xl tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Own a Nature-Inspired Luxury Plot at Grand Forest Privé
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase tracking-widest text-white/80">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/80 to-transparent" />
      </motion.div>
    </section>
  );
};
