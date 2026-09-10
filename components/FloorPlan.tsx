import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const floorPlans = [
  { id: 1, src: 'assets/client/Masterplan.jpg', alt: 'Grand Forest Privé Masterplan View' },
  { id: 2, src: 'assets/client/Clubhouse-amenities.jpg', alt: 'Neo Club Architectural Plan View' },
  { id: 3, src: 'assets/client/amenities-3.jpg', alt: 'Club Facilities & Lawns View' }
];

export const FloorPlan: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % floorPlans.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + floorPlans.length) % floorPlans.length);
  };

  return (
    <section id="sec-floor" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1d417f] leading-tight mb-4">
            A Township Designed for Space & Serenity
          </h2>
          <div className="w-24 h-1 bg-[#d6ba43] mx-auto opacity-80" />
        </div>

        {/* Custom Slider */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-50" ref={containerRef}>
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <motion.img
              key={currentIndex}
              src={floorPlans[currentIndex].src}
              alt={floorPlans[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            aria-label="Previous floor plan"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-[#d6ba43] hover:text-white backdrop-blur-sm rounded-full flex items-center justify-center text-[#1d417f] transition-all shadow-lg z-10 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            aria-label="Next floor plan"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-[#d6ba43] hover:text-white backdrop-blur-sm rounded-full flex items-center justify-center text-[#1d417f] transition-all shadow-lg z-10 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {floorPlans.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="p-2 flex items-center justify-center cursor-pointer"
              >
                <span className={`w-3 h-3 rounded-full transition-all block ${
                  idx === currentIndex ? 'bg-[#d6ba43] scale-125' : 'bg-white/50 hover:bg-white'
                }`} />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
