import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const masterpieceData = [
  {
    title: "Bespoke Grandeur",
    subtitle: "A Masterclass in Luxury",
    description: "Every dimension of your estate is meticulously sculpted to reflect your taste. This is where architectural brilliance meets natural splendor, creating a sanctuary of unparalleled elegance.",
    image: "assets/client/Gallery-1.jpg",
  },
  {
    title: "Curated Vistas",
    subtitle: "Panoramic Mountain Frontage",
    description: "Wake up to infinite expanses of rolling green valleys and mountain vistas. The spectacular forest views are not just a backdrop, but an integral part of your daily living experience.",
    image: "assets/client/Gallery-3.jpg",
  },
  {
    title: "Exclusive Enclave",
    subtitle: "An Address of Distinction",
    description: "Join a community of the discerning few. With world-class amenities and unparalleled privacy, this is a legacy designed to be cherished for generations.",
    image: "assets/client/Gallery-2.jpg",
  }
];

interface LayerProps {
  data: any;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const ImageLayer: React.FC<LayerProps> = ({ data, index, total, progress }) => {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  
  const imageInput = index === 0 
    ? [0, end - 0.1, end] 
    : index === total - 1 
      ? [start - 0.1, start, 1] 
      : [start - 0.1, start, end - 0.1, end];

  const imageOpacityOutput = index === 0 
    ? [1, 1, 0] 
    : index === total - 1 
      ? [0, 1, 1] 
      : [0, 1, 1, 0];

  const opacity = useTransform(progress, imageInput, imageOpacityOutput);

  // MOBILE FIX: Toggle CSS visibility so invisible 9MB images are removed from the 
  // browser paint cycle entirely, saving massive GPU memory on phones.
  const visibility = useTransform(opacity, (v: number) => v < 0.01 ? "hidden" : "visible");

  return (
    <motion.div
      className="absolute inset-0 w-full h-full will-change-transform"
      style={{ opacity, visibility, zIndex: index }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />
      <img 
        src={encodeURI(data.image)} 
        alt={data.title} 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center"
      />
    </motion.div>
  );
};

const TextLayer: React.FC<LayerProps> = ({ data, index, total, progress }) => {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  
  const textInput = index === 0 
    ? [0, end - 0.1, end] 
    : index === total - 1 
      ? [start - 0.1, start, 1] 
      : [start - 0.1, start, end - 0.1, end];

  const textOpacityOutput = index === 0 
    ? [1, 1, 0] 
    : index === total - 1 
      ? [0, 1, 1] 
      : [0, 1, 1, 0];

  const textYOutput = index === 0 
    ? [0, 0, -50] 
    : index === total - 1 
      ? [50, 0, 0] 
      : [50, 0, 0, -50];

  const opacity = useTransform(progress, textInput, textOpacityOutput);
  const y = useTransform(progress, textInput, textYOutput);

  return (
    <motion.div
      className="absolute left-0 right-0 flex flex-col justify-center will-change-transform"
      style={{ opacity, y, zIndex: 20 + index }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] w-12 bg-gold-400" />
        <span className="text-gold-400 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
          {data.subtitle}
        </span>
      </div>
      
      <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 leading-[1.1]">
        {data.title}
      </h2>
      
      <p className="text-gray-300 text-base md:text-xl font-light leading-relaxed max-w-xl">
        {data.description}
      </p>
    </motion.div>
  );
};

export const MasterpieceCollection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef} 
      className="bg-navy-950" 
      style={{ position: 'relative', height: `${masterpieceData.length * 100}dvh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Images Layer */}
        {masterpieceData.map((data, index) => (
          <ImageLayer 
            key={`img-${index}`} 
            data={data} 
            index={index} 
            total={masterpieceData.length} 
            progress={scrollYProgress} 
          />
        ))}

        {/* Content Layer */}
        <div className="relative z-30 container mx-auto px-6 h-full flex items-center pointer-events-none">
          <div className="max-w-2xl relative h-[400px] w-full flex items-center">
            {masterpieceData.map((data, index) => (
              <TextLayer 
                key={`text-${index}`} 
                data={data} 
                index={index} 
                total={masterpieceData.length} 
                progress={scrollYProgress} 
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 md:gap-3">
          <span className="text-white/60 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-light">Scroll Down</span>
          <div className="w-[1px] h-12 md:h-16 bg-white/20 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-gold-400"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
