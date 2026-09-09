import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const SCENES = [
  {
    src: "assets/grand_forest_optimized/cinematic-club-facade.webp",
    type: "panoramic"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-pool-clubhouse.webp",
    type: "zoom"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-pergola-jogging.webp",
    type: "panoramic"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-reception.webp",
    type: "zoom"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-gymnasium.webp",
    type: "panoramic"
  },
  {
    src: "assets/grand_forest_optimized/cinematic-event-lawns.webp",
    type: "zoom"
  }
];

interface SceneProps {
  scene: typeof SCENES[0];
  index: number;
  totalScenes: number;
  scrollYProgress: MotionValue<number>;
}

const Scene: React.FC<SceneProps> = ({ scene, index, totalScenes, scrollYProgress }) => {
  const start = index / totalScenes;
  const end = (index + 1) / totalScenes;
  const isFirst = index === 0;
  const isLast = index === totalScenes - 1;

  // Background Motion Logic - clean crossfade between scenes
  // For the final scene (06), stay at opacity 1 through scroll progress 1.0 to eliminate any blank gap
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, end - 0.04, end]
      : isLast
      ? [start - 0.04, start, 1]
      : [start - 0.04, start, end - 0.04, end],
    isFirst
      ? [1, 1, 0]
      : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    scene.type === "zoom" ? [1.08, 1.0] : [1.0, 1.06]
  );

  return (
    <motion.div
      style={{ 
        opacity,
        zIndex: index + 10,
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <motion.div
        style={{ 
          scale,
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={scene.src}
          alt="NeoLiv Grand Forest Privé"
          decoding="async"
          loading={index === 0 ? "eager" : "lazy"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/60" />
      </motion.div>
    </motion.div>
  );
};

interface ProgressIndicatorItemProps {
  index: number;
  totalScenes: number;
  scrollYProgress: MotionValue<number>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const ProgressIndicatorItem: React.FC<ProgressIndicatorItemProps> = ({ 
  index, 
  totalScenes, 
  scrollYProgress,
  containerRef 
}) => {
  const start = index / totalScenes;
  const end = (index + 1) / totalScenes;
  const isFirst = index === 0;
  const isLast = index === totalScenes - 1;
  const isActive = useTransform(
    scrollYProgress,
    isFirst
      ? [0, end - 0.04, end]
      : isLast
      ? [start - 0.04, start, 1]
      : [start - 0.04, start, end - 0.04, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const scaleY = useTransform(scrollYProgress, [start, end], [0, 1]);
  const numberOpacity = useTransform(isActive, [0, 1], [0.6, 1]);
  const numberScale = useTransform(isActive, [0, 1], [0.95, 1.18]);
  const numberColor = useTransform(isActive, [0, 1], ["#ffffff", "#F6D57E"]);

  const handleClick = () => {
    if (!containerRef?.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / totalScenes) * scrollableHeight + 10;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`View scene 0${index + 1}`}
      className="group relative flex flex-col items-center gap-1 sm:gap-1.5 focus:outline-none cursor-pointer touch-manipulation py-0.5"
    >
      {/* High-Contrast Floating Number Indicator - Crisp Serif Typography */}
      <motion.span
        style={{
          opacity: numberOpacity,
          scale: numberScale,
          color: numberColor,
        }}
        className="font-serif font-bold text-[11px] sm:text-xs md:text-sm tracking-wider select-none [text-shadow:_0_1px_4px_rgba(0,0,0,1),_0_2px_10px_rgba(0,0,0,0.95)] group-hover:text-amber-300 transition-colors duration-300"
      >
        0{index + 1}
      </motion.span>

      {/* Architectural Progress Line Track */}
      <div className="w-[2px] sm:w-[2.5px] h-6 sm:h-8 md:h-10 bg-white/35 rounded-full relative overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.9)] group-hover:bg-white/60 transition-colors duration-300">
        <motion.div
          style={{
            scaleY,
            opacity: isActive
          }}
          className="absolute inset-0 bg-gradient-to-b from-amber-300 via-gold-400 to-amber-500 origin-top rounded-full shadow-[0_0_12px_rgba(212,175,55,1)]"
        />
      </div>
    </button>
  );
};

export const CinematicShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[600vh] md:h-[1200vh] bg-navy-950">
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
        {SCENES.map((scene, index) => (
          <Scene 
            key={scene.src} 
            scene={scene} 
            index={index} 
            totalScenes={SCENES.length} 
            scrollYProgress={scrollYProgress} 
          />
        ))}

        {/* Ambient Left Lens Vignette: Soft feathered darkness ensuring 100% legibility across all bright scenes without an artificial container */}
        <div className="absolute inset-y-0 left-0 w-40 sm:w-60 md:w-72 bg-gradient-to-r from-black/65 via-black/25 to-transparent pointer-events-none z-[80]" />

        {/* Artistic Impression Overlay Label */}
        <div className="absolute top-6 right-6 z-[100] pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md border border-gold-400/30 text-[9px] uppercase tracking-[0.2em] text-amber-300 font-semibold shadow-lg">
            Artistic Impression
          </span>
        </div>

        {/* SIDE PROGRESS NAVIGATION - Floating Minimalist Luxury Rail (NO clunky box/capsule) */}
        <div className="absolute left-4 sm:left-7 md:left-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-3 sm:gap-4 md:gap-5 select-none">
          {SCENES.map((_, i) => (
            <ProgressIndicatorItem
              key={i}
              index={i}
              totalScenes={SCENES.length}
              scrollYProgress={scrollYProgress}
              containerRef={containerRef}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-grain" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
        </div>
      </div>
    </section>
  );
};
